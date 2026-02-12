import React, { createContext, useContext, useState, useEffect } from 'react';
import { authAPI } from '../services/api';

export interface User {
  id: string;
  email: string;
  firstName: string;
  lastName: string;
  role?: string;
  location?: string;
}

interface AuthResponse {
  token?: string;
  access_token?: string;
  user?: {
    id: string;
    email: string;
    firstName?: string;
    first_name?: string;
    lastName?: string;
    last_name?: string;
    role?: string;
    location?: string;
  };
  id?: string;
}

interface AuthContextType {
  user: User | null;
  isConnected: boolean;
  loading: boolean;
  login: (email: string, password: string) => Promise<void>;
  signup: (email: string, password: string, firstName: string, lastName: string, role: string, location?: string) => Promise<void>;
  logout: () => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);

  // Vérifier si l'utilisateur est déjà connecté au chargement
  useEffect(() => {
    const token = localStorage.getItem('authToken');
    if (token) {
      // Vous pouvez vérifier le token avec l'API si nécessaire
      const savedUser = localStorage.getItem('user');
      if (savedUser) {
        setUser(JSON.parse(savedUser));
      }
    }
    setLoading(false);
  }, []);

  const login = async (email: string, password: string) => {
    setLoading(true);
    try {
      const data = (await authAPI.login({ email, password })) as AuthResponse;
      
      // Sauvegarder le token et l'utilisateur
      const token = data.token || data.access_token || '';
      localStorage.setItem('authToken', token);
      
      // Récupérer les données existantes si elles existent
      let existingUser: User | null = null;
      const existingSavedUser = localStorage.getItem('user');
      if (existingSavedUser) {
        try {
          existingUser = JSON.parse(existingSavedUser);
        } catch {
          // ignore
        }
      }
      
      const userData: User = {
        id: data.user?.id || data.id || '',
        email: data.user?.email || email,
        firstName: data.user?.firstName || data.user?.first_name || existingUser?.firstName || '',
        lastName: data.user?.lastName || data.user?.last_name || existingUser?.lastName || '',
        role: data.user?.role || existingUser?.role,
        location: data.user?.location || existingUser?.location,
      };
      localStorage.setItem('user', JSON.stringify(userData));
      setUser(userData);
    } catch (error) {
      throw new Error(error instanceof Error ? error.message : 'Erreur de connexion');
    } finally {
      setLoading(false);
    }
  };

  const signup = async (email: string, password: string, firstName: string, lastName: string, role: string, location?: string) => {
    setLoading(true);
    try {
      const data = (await authAPI.signup({ 
        email, 
        password, 
        firstName, 
        lastName,
        role,
        location 
      })) as AuthResponse;
      
      // Sauvegarder le token et l'utilisateur
      const token = data.token || data.access_token || '';
      localStorage.setItem('authToken', token);
      
      const userData: User = {
        id: data.user?.id || data.id || '',
        email: data.user?.email || email,
        firstName: data.user?.firstName || data.user?.first_name || firstName || '',
        lastName: data.user?.lastName || data.user?.last_name || lastName || '',
        role: data.user?.role || role,
        location: data.user?.location || location,
      };
      localStorage.setItem('user', JSON.stringify(userData));
      setUser(userData);
    } catch (error) {
      throw new Error(error instanceof Error ? error.message : 'Erreur lors de l\'inscription');
    } finally {
      setLoading(false);
    }
  };

  const logout = () => {
    localStorage.removeItem('authToken');
    localStorage.removeItem('user');
    setUser(null);
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        isConnected: !!user,
        loading,
        login,
        signup,
        logout,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

// eslint-disable-next-line react-refresh/only-export-components
export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth doit être utilisé dans AuthProvider');
  }
  return context;
};
