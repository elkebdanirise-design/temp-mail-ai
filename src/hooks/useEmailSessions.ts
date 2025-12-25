import { useState, useEffect, useCallback } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { useAuth } from '@/contexts/AuthContext';

export interface EmailSession {
  id: string;
  session_id: string;
  user_id: string | null;
  email_address: string;
  mail_tm_token: string;
  mail_tm_account_id: string;
  mail_tm_password: string;
  is_active: boolean;
  created_at: string;
  expires_at: string;
}

const getOrCreateBrowserSessionId = (): string => {
  const key = 'tempmail_browser_session_id';
  let sessionId = localStorage.getItem(key);
  if (!sessionId) {
    sessionId = crypto.randomUUID();
    localStorage.setItem(key, sessionId);
  }
  return sessionId;
};

export const useEmailSessions = () => {
  const { user } = useAuth();
  const [sessions, setSessions] = useState<EmailSession[]>([]);
  const [activeSession, setActiveSession] = useState<EmailSession | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  
  const browserSessionId = getOrCreateBrowserSessionId();

  // Fetch all sessions for current user/browser
  const fetchSessions = useCallback(async () => {
    setLoading(true);
    try {
      let query = supabase
        .from('email_sessions')
        .select('*')
        .gt('expires_at', new Date().toISOString())
        .order('created_at', { ascending: false });

      if (user) {
        query = query.eq('user_id', user.id);
      } else {
        query = query.eq('session_id', browserSessionId).is('user_id', null);
      }

      const { data, error: fetchError } = await query;

      if (fetchError) {
        console.error('Error fetching sessions:', fetchError);
        setError(fetchError.message);
        return;
      }

      setSessions(data || []);
      
      // Set active session
      const active = data?.find(s => s.is_active);
      if (active) {
        setActiveSession(active);
      } else if (data && data.length > 0) {
        setActiveSession(data[0]);
      }
    } catch (err) {
      console.error('Error in fetchSessions:', err);
    } finally {
      setLoading(false);
    }
  }, [user, browserSessionId]);

  // Save a new email session
  const saveSession = useCallback(async (
    emailAddress: string,
    token: string,
    accountId: string,
    password: string
  ): Promise<EmailSession | null> => {
    try {
      // Calculate expiry based on user pro status
      const { data: expiryData } = await supabase.rpc('calculate_retention_expiry', {
        p_user_id: user?.id || null
      });

      const expiresAt = expiryData || new Date(Date.now() + 24 * 60 * 60 * 1000).toISOString();

      // Deactivate all other sessions first
      if (user) {
        await supabase
          .from('email_sessions')
          .update({ is_active: false })
          .eq('user_id', user.id);
      } else {
        await supabase
          .from('email_sessions')
          .update({ is_active: false })
          .eq('session_id', browserSessionId)
          .is('user_id', null);
      }

      // Insert new session
      const { data, error: insertError } = await supabase
        .from('email_sessions')
        .insert({
          session_id: browserSessionId,
          user_id: user?.id || null,
          email_address: emailAddress,
          mail_tm_token: token,
          mail_tm_account_id: accountId,
          mail_tm_password: password,
          is_active: true,
          expires_at: expiresAt
        })
        .select()
        .single();

      if (insertError) {
        console.error('Error saving session:', insertError);
        return null;
      }

      // Refresh sessions list
      await fetchSessions();
      return data;
    } catch (err) {
      console.error('Error in saveSession:', err);
      return null;
    }
  }, [user, browserSessionId, fetchSessions]);

  // Switch to a different email session
  const switchSession = useCallback(async (sessionId: string): Promise<EmailSession | null> => {
    try {
      // Deactivate all sessions
      if (user) {
        await supabase
          .from('email_sessions')
          .update({ is_active: false })
          .eq('user_id', user.id);
      } else {
        await supabase
          .from('email_sessions')
          .update({ is_active: false })
          .eq('session_id', browserSessionId)
          .is('user_id', null);
      }

      // Activate selected session
      const { data, error: updateError } = await supabase
        .from('email_sessions')
        .update({ is_active: true })
        .eq('id', sessionId)
        .select()
        .single();

      if (updateError) {
        console.error('Error switching session:', updateError);
        return null;
      }

      setActiveSession(data);
      await fetchSessions();
      return data;
    } catch (err) {
      console.error('Error in switchSession:', err);
      return null;
    }
  }, [user, browserSessionId, fetchSessions]);

  // Get remaining time for a session
  const getTimeRemaining = useCallback((expiresAt: string): string => {
    const diff = new Date(expiresAt).getTime() - Date.now();
    if (diff <= 0) return 'Expired';
    
    const hours = Math.floor(diff / (1000 * 60 * 60));
    const minutes = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));
    
    if (hours >= 24) {
      const days = Math.floor(hours / 24);
      return `${days}d ${hours % 24}h`;
    }
    return `${hours}h ${minutes}m`;
  }, []);

  // Migrate anonymous sessions to user account on login (Google OAuth, etc.)
  const migrateSessionsToUser = useCallback(async () => {
    if (!user) return;

    try {
      console.log('[EmailSessions] Starting migration for user:', user.id);
      
      // Find anonymous sessions with this browser session ID that haven't been migrated
      const { data: anonSessions, error: fetchError } = await supabase
        .from('email_sessions')
        .select('*')
        .eq('session_id', browserSessionId)
        .is('user_id', null)
        .gt('expires_at', new Date().toISOString()); // Only migrate non-expired sessions

      if (fetchError) {
        console.error('[EmailSessions] Error fetching anonymous sessions:', fetchError);
        return;
      }

      if (anonSessions && anonSessions.length > 0) {
        console.log(`[EmailSessions] Found ${anonSessions.length} anonymous sessions to migrate`);
        
        // Calculate new expiry based on user's pro status
        const { data: expiryData, error: expiryError } = await supabase.rpc('calculate_retention_expiry', {
          p_user_id: user.id
        });

        if (expiryError) {
          console.error('[EmailSessions] Error calculating expiry:', expiryError);
        }

        // Migrate all sessions in a single batch update for efficiency
        const sessionIds = anonSessions.map(s => s.id);
        const { error: updateError } = await supabase
          .from('email_sessions')
          .update({ 
            user_id: user.id,
            expires_at: expiryData || new Date(Date.now() + 24 * 60 * 60 * 1000).toISOString()
          })
          .in('id', sessionIds);

        if (updateError) {
          console.error('[EmailSessions] Error migrating sessions:', updateError);
        } else {
          console.log(`[EmailSessions] Successfully migrated ${anonSessions.length} sessions to user ${user.id}`);
        }
      } else {
        console.log('[EmailSessions] No anonymous sessions to migrate');
      }

      // Refresh sessions after migration
      await fetchSessions();
    } catch (err) {
      console.error('[EmailSessions] Unexpected error during migration:', err);
    }
  }, [user, browserSessionId, fetchSessions]);

  // Initialize and migrate on user change
  useEffect(() => {
    fetchSessions();
    if (user) {
      migrateSessionsToUser();
    }
  }, [user, fetchSessions, migrateSessionsToUser]);

  return {
    sessions,
    activeSession,
    loading,
    error,
    saveSession,
    switchSession,
    fetchSessions,
    getTimeRemaining,
    browserSessionId
  };
};
