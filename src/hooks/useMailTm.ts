import { useState, useEffect, useCallback, useRef } from 'react';

const API_BASE = 'https://api.mail.tm';
const MAX_RETRIES = 3;
const RETRY_DELAY = 500;

interface Domain {
  id: string;
  domain: string;
  isActive: boolean;
}

interface Account {
  id: string;
  address: string;
}

interface Message {
  id: string;
  from: {
    address: string;
    name: string;
  };
  to: {
    address: string;
    name: string;
  }[];
  subject: string;
  intro: string;
  text?: string;
  html?: string[];
  createdAt: string;
  seen: boolean;
}

interface MessageDetail extends Message {
  text: string;
  html: string[];
}

export const useMailTm = () => {
  const [email, setEmail] = useState<string | null>(null);
  const [token, setToken] = useState<string | null>(null);
  const [accountId, setAccountId] = useState<string | null>(null);
  const [messages, setMessages] = useState<Message[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [domains, setDomains] = useState<Domain[]>([]);
  const previousMessageCount = useRef(0);
  const onNewMessageCallback = useRef<(() => void) | null>(null);
  const isInitialized = useRef(false);

  const generateRandomString = (length: number) => {
    const chars = 'abcdefghijklmnopqrstuvwxyz0123456789';
    return Array.from({ length }, () => chars[Math.floor(Math.random() * chars.length)]).join('');
  };

  // Set callback for new message notification
  const setOnNewMessage = useCallback((callback: () => void) => {
    onNewMessageCallback.current = callback;
  }, []);

  const fetchActiveDomains = useCallback(async (): Promise<Domain[]> => {
    try {
      const response = await fetch(`${API_BASE}/domains`);
      if (!response.ok) throw new Error('Failed to fetch domains');
      
      const data = await response.json();
      // Filter only active domains for reliable email creation
      const activeDomains = (data['hydra:member'] || []).filter((d: Domain) => d.isActive !== false);
      setDomains(activeDomains);
      return activeDomains;
    } catch (err) {
      console.error('Error fetching domains:', err);
      return [];
    }
  }, []);

  const createAccount = async (address: string, password: string): Promise<Account> => {
    const response = await fetch(`${API_BASE}/accounts`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ address, password }),
    });
    
    if (!response.ok) {
      const errorText = await response.text();
      throw new Error(`Failed to create account: ${errorText}`);
    }
    
    return response.json();
  };

  const login = async (address: string, password: string): Promise<string> => {
    const response = await fetch(`${API_BASE}/token`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ address, password }),
    });
    
    if (!response.ok) {
      throw new Error('Failed to login');
    }
    
    const data = await response.json();
    return data.token;
  };

  const sleep = (ms: number) => new Promise(resolve => setTimeout(resolve, ms));

  const generateEmail = useCallback(async () => {
    setLoading(true);
    setError(null);
    
    let lastError: Error | null = null;
    
    for (let attempt = 0; attempt < MAX_RETRIES; attempt++) {
      try {
        // Fetch fresh domains on each attempt for reliability
        let activeDomains = domains.length > 0 ? domains : await fetchActiveDomains();
        
        if (activeDomains.length === 0) {
          activeDomains = await fetchActiveDomains();
        }
        
        if (activeDomains.length === 0) {
          throw new Error('No active domains available');
        }
        
        // Pick a random active domain for better distribution
        const randomDomain = activeDomains[Math.floor(Math.random() * activeDomains.length)];
        const username = generateRandomString(10);
        const address = `${username}@${randomDomain.domain}`;
        const password = generateRandomString(16);
        
        const account = await createAccount(address, password);
        const authToken = await login(address, password);
        
        setEmail(address);
        setToken(authToken);
        setAccountId(account.id);
        setMessages([]);
        previousMessageCount.current = 0;
        
        // Store in session for persistence
        sessionStorage.setItem('aura_email', address);
        sessionStorage.setItem('aura_token', authToken);
        sessionStorage.setItem('aura_password', password);
        sessionStorage.setItem('aura_account_id', account.id);
        
        setLoading(false);
        return; // Success - exit the retry loop
        
      } catch (err) {
        lastError = err instanceof Error ? err : new Error('Unknown error');
        console.error(`Attempt ${attempt + 1} failed:`, lastError.message);
        
        if (attempt < MAX_RETRIES - 1) {
          await sleep(RETRY_DELAY * (attempt + 1)); // Exponential backoff
        }
      }
    }
    
    // All retries failed
    setError(lastError?.message || 'Failed to generate email after multiple attempts');
    setLoading(false);
  }, [domains, fetchActiveDomains]);

  const fetchMessages = useCallback(async () => {
    if (!token) return;
    
    try {
      const response = await fetch(`${API_BASE}/messages`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      
      if (!response.ok) {
        throw new Error('Failed to fetch messages');
      }
      
      const data = await response.json();
      const newMessages = data['hydra:member'] || [];
      
      // Check for new messages and trigger notification
      if (newMessages.length > previousMessageCount.current && previousMessageCount.current > 0) {
        onNewMessageCallback.current?.();
      }
      previousMessageCount.current = newMessages.length;
      
      setMessages(newMessages);
    } catch (err) {
      console.error('Error fetching messages:', err);
    }
  }, [token]);

  const getMessageDetail = async (messageId: string): Promise<MessageDetail | null> => {
    if (!token) return null;
    
    try {
      const response = await fetch(`${API_BASE}/messages/${messageId}`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      
      if (!response.ok) {
        throw new Error('Failed to fetch message');
      }
      
      return response.json();
    } catch (err) {
      console.error('Error fetching message detail:', err);
      return null;
    }
  };

  const deleteMessage = async (messageId: string) => {
    if (!token) return;
    
    try {
      await fetch(`${API_BASE}/messages/${messageId}`, {
        method: 'DELETE',
        headers: { Authorization: `Bearer ${token}` },
      });
      
      setMessages(prev => prev.filter(m => m.id !== messageId));
    } catch (err) {
      console.error('Error deleting message:', err);
    }
  };

  const deleteAccount = async () => {
    if (!token || !accountId) return;
    
    try {
      await fetch(`${API_BASE}/accounts/${accountId}`, {
        method: 'DELETE',
        headers: { Authorization: `Bearer ${token}` },
      });
    } catch (err) {
      console.error('Error deleting account:', err);
    } finally {
      // Always clear local state regardless of API result
      sessionStorage.removeItem('aura_email');
      sessionStorage.removeItem('aura_token');
      sessionStorage.removeItem('aura_password');
      sessionStorage.removeItem('aura_account_id');
      
      setEmail(null);
      setToken(null);
      setAccountId(null);
      setMessages([]);
      previousMessageCount.current = 0;
    }
  };

  // Initialize on mount
  useEffect(() => {
    if (isInitialized.current) return;
    isInitialized.current = true;
    
    const savedEmail = sessionStorage.getItem('aura_email');
    const savedToken = sessionStorage.getItem('aura_token');
    const savedAccountId = sessionStorage.getItem('aura_account_id');
    
    if (savedEmail && savedToken && savedAccountId) {
      setEmail(savedEmail);
      setToken(savedToken);
      setAccountId(savedAccountId);
    } else {
      generateEmail();
    }
  }, [generateEmail]);

  // Poll for new messages
  useEffect(() => {
    if (!token) return;
    
    fetchMessages();
    const interval = setInterval(fetchMessages, 5000);
    
    return () => clearInterval(interval);
  }, [token, fetchMessages]);

  return {
    email,
    messages,
    loading,
    error,
    domains,
    generateEmail,
    getMessageDetail,
    deleteMessage,
    deleteAccount,
    refreshMessages: fetchMessages,
    setOnNewMessage,
  };
};