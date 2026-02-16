import React, { createContext, useContext, useState, useEffect } from 'react';
import { authAPI } from '../services/api';

export interface User {
  id?: string;
  email?: string;
  firstName?: string;
  lastName?: string;
  role?: string;
  location?: string;
}

interface AuthResponse {
  acces_token: string;
  access_token: string;
  user: {
    id: string;
    email: string;
    firstName: string;
    lastName: string;
    role: string;
    location: string;
  };
}

interface AuthContextType {
  user: User | null;
  isConnected: boolean;
  loading: boolean;
  login: (email: string, password: string) => Promise<void>;
  logout: () => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);

  // Vérifier si l'utilisateur est déjà connecté au chargement
  useEffect(() => {
    const acces_token = localStorage.getItem('authToken');
    if (acces_token) {
      // Vous pouvez vérifier le acces_token avec l'API si nécessaire
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
      const getToken = localStorage.getItem("authToken")
      if (getToken) {
        
      }
      const data = (await authAPI.login({ email, password })) as AuthResponse;

      // Sauvegarder le acces_token et l'utilisateur
      const acces_token = data.access_token;
      localStorage.setItem('authToken', acces_token);

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
        id: data.user?.id || existingUser?.id ,
        email: data.user?.email  || existingUser?.email ,
        firstName: data.user?.firstName || existingUser?.firstName,
        lastName: data.user?.lastName ||existingUser?.lastName,
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
