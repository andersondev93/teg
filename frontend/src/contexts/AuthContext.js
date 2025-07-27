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
          // Verifica se o token está expirado antes de usar
          const payload = JSON.parse(atob(token.split('.')[1]));
          if (payload.exp * 1000 < Date.now()) {
            throw new Error('Token expirado');
          }
          
          setUser({
            id: payload.id,
            email: payload.email,
            name: payload.name,
            role: payload.role,
          });
          
          // Atualiza o token se estiver perto de expirar
          if (payload.exp * 1000 < Date.now() + 3600000) { // 1 hora antes
            await refreshToken();
          }
        } catch (error) {
          console.error('Erro ao carregar usuário:', error);
          localStorage.removeItem('token');
        }
      }
      setLoading(false);
    }
    loadUserFromToken();
  }, []);

  const refreshToken = async () => {
    try {
      const { token } = await api.post('auth/refresh', {}, {
        withCredentials: true
      });
      localStorage.setItem('token', token);
      return token;
    } catch (error) {
      logout();
      throw error;
    }
  };

  const register = async (name, email, password, role) => {
  try {
    const response = await fetch('https://teg-backend.vercel.app/auth/register', {
      method: 'POST',
      mode: 'cors',
      credentials: 'include',
      headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json'
      },
      body: JSON.stringify({ name, email, password, role })
    });

    // Verifica se a resposta foi bem-sucedida
    if (!response.ok) {
      const errorData = await response.json().catch(() => ({}));
      throw new Error(errorData.message || 'Erro no registro');
    }

    const data = await response.json();
    
    // Se o backend retornar um token no registro
    if (data.token) {
      localStorage.setItem('token', data.token);
      const payload = JSON.parse(atob(data.token.split('.')[1]));
      setUser({
        id: payload.id,
        email: payload.email,
        name: payload.name,
        role: payload.role,
      });
    }

    return { success: true, data };
  } catch (error) {
    console.error('Erro no registro:', error);
    return { 
      success: false, 
      error: error.message || 'Falha no registro. Tente novamente.' 
    };
  }
};

  const login = async (email, password) => {
    try {
      const response = await fetch('https://teg-backend.vercel.app/auth/login', {
        method: 'POST',
        mode: 'cors',
        credentials: 'include', // Importante para cookies/sessões
        headers: {
          'Content-Type': 'application/json',
          'Accept': 'application/json',
        },
        body: JSON.stringify({ email, password }),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || 'Credenciais inválidas');
      }

      const { token } = await response.json();
      localStorage.setItem('token', token);
      
      const payload = JSON.parse(atob(token.split('.')[1]));
      setUser({
        id: payload.id,
        email: payload.email,
        name: payload.name,
        role: payload.role,
      });
      
      return { success: true };
    } catch (error) {
      console.error('Erro no login:', error);
      return { 
        success: false, 
        error: error.message || 'Falha no login. Verifique suas credenciais.' 
      };
    }
  };

  const logout = async () => {
    try {
      // Chama o endpoint de logout no backend se necessário
      await fetch('https://teg-backend.vercel.app/auth/logout', {
        method: 'POST',
        credentials: 'include',
      });
    } catch (error) {
      console.error('Erro ao fazer logout:', error);
    } finally {
      localStorage.removeItem('token');
      setUser(null);
      router.push('/login');
    }
  };

  // Função para fazer requisições autenticadas
  const authFetch = async (url, options = {}) => {
    const token = localStorage.getItem('token');
    
    const headers = {
      'Content-Type': 'application/json',
      'Accept': 'application/json',
      ...options.headers,
    };
    
    if (token) {
      headers['Authorization'] = `Bearer ${token}`;
    }

    try {
      const response = await fetch(url, {
        ...options,
        mode: 'cors',
        credentials: 'include',
        headers,
      });

      // Se token expirou, tenta renovar
      if (response.status === 401) {
        const newToken = await refreshToken();
        headers['Authorization'] = `Bearer ${newToken}`;
        
        const retryResponse = await fetch(url, {
          ...options,
          mode: 'cors',
          credentials: 'include',
          headers,
        });
        
        if (!retryResponse.ok) throw new Error('Erro após renovar token');
        return await retryResponse.json();
      }

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || 'Erro na requisição');
      }

      return await response.json();
    } catch (error) {
      console.error('Erro na requisição autenticada:', error);
      throw error;
    }
  };

  return (
    <AuthContext.Provider value={{ 
      user, 
      loading, 
      register, 
      login, 
      logout,
      authFetch // Exporta a função para requisições autenticadas
    }}>
      {children}
    </AuthContext.Provider>
  );
}

export const useAuth = () => useContext(AuthContext);