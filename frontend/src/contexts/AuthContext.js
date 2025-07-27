import { createContext, useContext, useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import { api } from '../services/api';

const AuthContext = createContext();

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const router = useRouter();

  useEffect(() => {
    async function loadUserFromToken() {
      const token = localStorage.getItem('token');
      if (token) {
        try {
          // Aqui você pode adicionar uma chamada para validar o token
          // ou decodificá-lo para obter informações do usuário
          const payload = JSON.parse(atob(token.split('.')[1]));
          setUser({
            id: payload.id,
            email: payload.email,
            role: payload.role,
          });
        } catch (error) {
          localStorage.removeItem('token');
        }
      }
      setLoading(false);
    }
    loadUserFromToken();
  }, []);

  const register = async (name, email, password, role) => {
  try {
    const response = await fetch('https://teg-backend.vercel.app/auth/register', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ name, email, password, role }),
    });

    const data = await response.json();
    
    if (!response.ok) {
      throw new Error(data.error || 'Falha no registro');
    }

    return { success: true };
  } catch (error) {
    return { success: false, error: error.message };
  }
};

  const login = async (email, password) => {
    try {
      const { token } = await api.post('auth/login', { email, password });
      localStorage.setItem('token', token);
      
      // Decodificar o token para obter informações do usuário
      const payload = JSON.parse(atob(token.split('.')[1]));
      setUser({
        id: payload.id,
        email: payload.email,
        name: payload.name,
        role: payload.role,
      });
      
      return { success: true };
    } catch (error) {
      return { success: false, error: error.message };
    }
  };

  const logout = () => {
    localStorage.removeItem('token');
    setUser(null);
    router.push('/login');
  };

  return (
    <AuthContext.Provider value={{ user, loading, register, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
}

export const useAuth = () => useContext(AuthContext);