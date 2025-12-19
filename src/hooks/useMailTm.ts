import { useState, useEffect, useCallback } from 'react';

const API_BASE = 'https://api.mail.tm';

interface Domain {
  id: string;
  domain: string;
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

  const generateRandomString = (length: number) => {
    const chars = 'abcdefghijklmnopqrstuvwxyz0123456789';
    return Array.from({ length }, () => chars[Math.floor(Math.random() * chars.length)]).join('');
  };

  const getDomains = async (): Promise<Domain[]> => {
    const response = await fetch(`${API_BASE}/domains`);
    const data = await response.json();
    return data['hydra:member'] || [];
  };

  const createAccount = async (address: string, password: string): Promise<Account> => {
    const response = await fetch(`${API_BASE}/accounts`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ address, password }),
    });
    
    if (!response.ok) {
      throw new Error('Failed to create account');
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

  const generateEmail = useCallback(async () => {
    setLoading(true);
    setError(null);
    
    try {
      const domains = await getDomains();
      if (domains.length === 0) {
        throw new Error('No domains available');
      }
      
      const domain = domains[0].domain;
      const username = generateRandomString(10);
      const address = `${username}@${domain}`;
      const password = generateRandomString(16);
      
      const account = await createAccount(address, password);
      const authToken = await login(address, password);
      
      setEmail(address);
      setToken(authToken);
      setAccountId(account.id);
      setMessages([]);
      
      // Store in session for persistence
      sessionStorage.setItem('aura_email', address);
      sessionStorage.setItem('aura_token', authToken);
      sessionStorage.setItem('aura_password', password);
      
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to generate email');
    } finally {
      setLoading(false);
    }
  }, []);

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
      setMessages(data['hydra:member'] || []);
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
      
      sessionStorage.removeItem('aura_email');
      sessionStorage.removeItem('aura_token');
      sessionStorage.removeItem('aura_password');
      
      setEmail(null);
      setToken(null);
      setAccountId(null);
      setMessages([]);
    } catch (err) {
      console.error('Error deleting account:', err);
    }
  };

  // Auto-generate email on mount
  useEffect(() => {
    const savedEmail = sessionStorage.getItem('aura_email');
    const savedToken = sessionStorage.getItem('aura_token');
    
    if (savedEmail && savedToken) {
      setEmail(savedEmail);
      setToken(savedToken);
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
    generateEmail,
    getMessageDetail,
    deleteMessage,
    deleteAccount,
    refreshMessages: fetchMessages,
  };
};
