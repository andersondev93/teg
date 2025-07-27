import { useState } from 'react';
import { useRouter } from 'next/router';
import { useAuth } from '../contexts/AuthContext';
import Head from 'next/head';
import Image from 'next/image';
import styles from '../styles/Auth.module.css';
import Header from '../components/Header';

export default function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const [rememberMe, setRememberMe] = useState(false);

  const { login } = useAuth();
  const router = useRouter();

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      setError('');
      setLoading(true);
      const result = await login(email, password);

      if (result.success) {
        router.push('/dashboard');
      } else {
        setError(result.error);
      }
    } catch (err) {
      setError('Falha ao fazer login. Tente novamente.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className={styles.loginPage}>
      <Head>
        <title>Login | TEG - Tecnologia Educacional Gamificada</title>
        <meta name="description" content="Acesse sua conta na plataforma de educação gamificada" />
      </Head>

      <Header />

      <div className={styles.loginContainer}>
        

        <div className={styles.loginFormContainer}>
          <div className={styles.loginFormHeader}>
            <h1>Bem-vindo de volta!</h1>
            <p>Acesse sua conta para continuar sua jornada de aprendizado</p>
          </div>

          {error && (
            <div className={styles.errorMessage}>
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor">
                <path fillRule="evenodd" d="M9.401 3.003c1.155-2 4.043-2 5.197 0l7.355 12.748c1.154 2-.29 4.5-2.599 4.5H4.645c-2.309 0-3.752-2.5-2.598-4.5L9.4 3.003zM12 8.25a.75.75 0 01.75.75v3.75a.75.75 0 01-1.5 0V9a.75.75 0 01.75-.75zm0 8.25a.75.75 0 100-1.5.75.75 0 000 1.5z" clipRule="evenodd" />
              </svg>
              <span>{error}</span>
            </div>
          )}

          <form onSubmit={handleSubmit} className={styles.loginForm}>
            <div className={styles.formGroup}>
              <label htmlFor="email">E-mail</label>
              <div className={styles.inputWithIcon}>
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M1.5 8.67v8.58a3 3 0 003 3h15a3 3 0 003-3V8.67l-8.928 5.493a3 3 0 01-3.144 0L1.5 8.67z" />
                  <path d="M22.5 6.908V6.75a3 3 0 00-3-3h-15a3 3 0 00-3 3v.158l9.714 5.978a1.5 1.5 0 001.572 0L22.5 6.908z" />
                </svg>
                <input
                  type="email"
                  id="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="seu@email.com"
                  required
                />
              </div>
            </div>

            <div className={styles.formGroup}>
              <label htmlFor="password">Senha</label>
              <div className={styles.inputWithIcon}>
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor">
                  <path fillRule="evenodd" d="M12 1.5a5.25 5.25 0 00-5.25 5.25v3a3 3 0 00-3 3v6.75a3 3 0 003 3h10.5a3 3 0 003-3v-6.75a3 3 0 00-3-3v-3c0-2.9-2.35-5.25-5.25-5.25zm3.75 8.25v-3a3.75 3.75 0 10-7.5 0v3h7.5z" clipRule="evenodd" />
                </svg>
                <input
                  type="password"
                  id="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="Sua senha"
                  required
                />
              </div>
            </div>

            <div className={styles.formOptions}>
              <label className={styles.rememberMe}>
                <input 
                  type="checkbox" 
                  id="remember" 
                  checked={rememberMe}
                  onChange={(e) => setRememberMe(e.target.checked)}
                />
                <span className={styles.checkmark}></span>
                Lembrar de mim
              </label>
              <a href="/forgot-password" className={styles.forgotPassword}>
                Esqueceu a senha?
              </a>
            </div>

            <button
              type="submit"
              className={styles.submitButton}
              disabled={loading}
            >
              {loading ? (
                <>
                  <svg className={styles.spinner} viewBox="0 0 50 50">
                    <circle cx="25" cy="25" r="20" fill="none" strokeWidth="5"></circle>
                  </svg>
                  Entrando...
                </>
              ) : (
                'Entrar na plataforma'
              )}
            </button>
          </form>

          <div className={styles.loginFooter}>
            <p>Não tem uma conta? <Link href="/register/">Cadastre-se</Link></p>
            
          </div>
        </div>
      </div>
    </div>
  );
}