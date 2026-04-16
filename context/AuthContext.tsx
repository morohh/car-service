'use client';

import { createContext, useContext, useState, useEffect, type ReactNode } from 'react';
import { type User, getCurrentUser, setCurrentUser, logoutUser, findUserByEmail, createUser } from '@/lib/storage';

interface AuthContextType {
  user: User | null;
  login: (email: string, password: string) => { success: boolean; error?: string };
  register: (name: string, email: string, phone: string, password: string) => { success: boolean; error?: string };
  logout: () => void;
  updateProfile: (name: string, phone: string) => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(null);

  useEffect(() => {
    const currentUser = getCurrentUser();
    if (currentUser) {
      // Получаем актуальные данные пользователя из списка
      const updated = findUserByEmail(currentUser.email);
      setUser(updated || currentUser);
    }
  }, []);

  const login = (email: string, password: string) => {
    const found = findUserByEmail(email);
    if (!found) return { success: false, error: 'Пользователь не найден' };
    if (found.password !== password) return { success: false, error: 'Неверный пароль' };
    
    setCurrentUser(found);
    setUser(found);
    return { success: true };
  };

  const register = (name: string, email: string, phone: string, password: string) => {
    const existing = findUserByEmail(email);
    if (existing) return { success: false, error: 'Пользователь с таким email уже существует' };

    const newUser = createUser(name, email, phone, password);
    setCurrentUser(newUser);
    setUser(newUser);
    return { success: true };
  };

  const logout = () => {
    logoutUser();
    setUser(null);
  };

  const updateProfile = (name: string, phone: string) => {
    if (!user) return;
    const users = JSON.parse(localStorage.getItem('levservice_users') || '[]');
    const updated = users.map((u: User) => u.id === user.id ? { ...u, name, phone } : u);
    localStorage.setItem('levservice_users', JSON.stringify(updated));
    const updatedUser = { ...user, name, phone };
    setCurrentUser(updatedUser);
    setUser(updatedUser);
  };

  return (
    <AuthContext.Provider value={{ user, login, register, logout, updateProfile }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error('useAuth must be used within AuthProvider');
  return ctx;
}
