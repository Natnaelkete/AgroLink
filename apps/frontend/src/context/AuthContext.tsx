// context/AuthContext.tsx
import React, { createContext, useContext, useState, useEffect } from 'react';
import type { ReactNode } from 'react';

interface AuthContextType {
  token: string | null;
  userId: string | null;
  loading: boolean;
  isAuthenticated: boolean;
  setAuth: (token: string, userId: string) => void;
  signOut: () => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

interface AuthProviderProps {
  children: ReactNode;
}

export const AuthProvider: React.FC<AuthProviderProps> = ({ children }) => {
  const [token, setToken] = useState<string | null>(null);
  const [userId, setUserId] = useState<string | null>(null);
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    const initializeAuth = () => {
      try {
        const storedToken = localStorage.getItem('authToken');
        const storedUserId = localStorage.getItem('user-id');
        
        console.log('AuthProvider Initializing:', {
          storedToken: !!storedToken,
          storedUserId: !!storedUserId
        });
        
        if (storedToken && storedUserId) {
          setToken(storedToken);
          setUserId(stUserId);
          console.log('Auth initialized with token');
        } else {
          console.log('No auth token found');
        }
      } catch (error) {
        console.error('Error initializing auth:', error);
      } finally {
        setLoading(false);
      }
    };

    initializeAuth();
  }, []);

  const setAuth = (newToken: string, newUserId: string) => {
    console.log('Setting auth:', { newToken: !!newToken, newUserId });
    setToken(newToken);
    setUserId(newUserId);
    localStorage.setItem('authToken', newToken);
    localStorage.setItem('user-id', newUserId);
  };

  const signOut = () => {
    console.log('Signing out');
    setToken(null);
    setUserId(null);
    localStorage.removeItem('authToken');
    localStorage.removeItem('user-id');
    localStorage.removeItem('role');
  };

  const isAuthenticated = !!token;

  console.log('AuthProvider State:', {
    token: !!token,
    userId,
    isAuthenticated,
    loading
  });

  const value = {
    token,
    userId,
    loading,
    isAuthenticated,
    setAuth,
    signOut,
  };
  
  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};