import { useState, useEffect } from 'react';

interface User {
  name: string;
}

export function useAuth() {
  const [user, setUser] = useState<User | null>(() => {
    return JSON.parse(localStorage.getItem('user') || 'null');
  });

  useEffect(() => {
    localStorage.setItem('user', JSON.stringify(user));
  }, [user]);

  const login = (userData: User) => setUser(userData);
  const logout = () => setUser(null);

  return { user, login, logout };
}
