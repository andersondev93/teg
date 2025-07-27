import { useState } from 'react';
import { useRouter } from 'next/router';
import { useAuth } from '../contexts/AuthContext';
import Head from 'next/head';
import Image from 'next/image';
import styles from '../styles/Register.module.css';
import Header from '../components/Header';

export default function Register() {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [role, setRole] = useState('ALUNO');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const [termsAccepted, setTermsAccepted] = useState(false);
  
  const { register } = useAuth();
  const router = useRouter();

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (password !== confirmPassword) {
      return setError('As senhas não coincidem');
    }
    
    if (!termsAccepted) {
      return setError('Você deve aceitar os termos e condições');
    }
    
    try {
      setError('');
      setLoading(true);
      const result = await register(name, email, password, role);
      
      if (result.success) {
        router.push('/login');
      } else {
        setError(result.error);
      }
    } catch (err) {
      setError('Falha ao criar conta. Tente novamente.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className={styles.registerPage}>
      <Head>
        <title>Criar Conta | TEG - Tecnologia Educacional Gamificada</title>
        <meta name="description" content="Crie sua conta na plataforma de educação gamificada" />
      </Head>

      <Header />

      <div className={styles.registerContainer}>
        

        <div className={styles.registerFormContainer}>
          <div className={styles.registerFormHeader}>
            <h1>Comece sua jornada de aprendizado</h1>
            <p>Crie sua conta para acessar todos os recursos da plataforma</p>
          </div>

          {error && (
            <div className={styles.errorMessage}>
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor">
                <path fillRule="evenodd" d="M9.401 3.003c1.155-2 4.043-2 5.197 0l7.355 12.748c1.154 2-.29 4.5-2.599 4.5H4.645c-2.309 0-3.752-2.5-2.598-4.5L9.4 3.003zM12 8.25a.75.75 0 01.75.75v3.75a.75.75 0 01-1.5 0V9a.75.75 0 01.75-.75zm0 8.25a.75.75 0 100-1.5.75.75 0 000 1.5z" clipRule="evenodd" />
              </svg>
              <span>{error}</span>
            </div>
          )}

          <form onSubmit={handleSubmit} className={styles.registerForm}>
            <div className={styles.formGroup}>
              <label htmlFor="name">Nome completo</label>
              <div className={styles.inputWithIcon}>
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor">
                  <path fillRule="evenodd" d="M7.5 6a4.5 4.5 0 119 0 4.5 4.5 0 01-9 0zM3.751 20.105a8.25 8.25 0 0116.498 0 .75.75 0 01-.437.695A18.683 18.683 0 0112 22.5c-2.786 0-5.433-.608-7.812-1.7a.75.75 0 01-.437-.695z" clipRule="evenodd" />
                </svg>
                <input
                  type="text"
                  id="name"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  placeholder="Seu nome completo"
                  required
                />
              </div>
            </div>

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
                  placeholder="Crie uma senha"
                  minLength="6"
                  required
                />
              </div>
              <p className={styles.passwordHint}>Mínimo de 6 caracteres</p>
            </div>

            <div className={styles.formGroup}>
              <label htmlFor="confirmPassword">Confirme sua senha</label>
              <div className={styles.inputWithIcon}>
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor">
                  <path fillRule="evenodd" d="M12 1.5a5.25 5.25 0 00-5.25 5.25v3a3 3 0 00-3 3v6.75a3 3 0 003 3h10.5a3 3 0 003-3v-6.75a3 3 0 00-3-3v-3c0-2.9-2.35-5.25-5.25-5.25zm3.75 8.25v-3a3.75 3.75 0 10-7.5 0v3h7.5z" clipRule="evenodd" />
                </svg>
                <input
                  type="password"
                  id="confirmPassword"
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                  placeholder="Digite a senha novamente"
                  required
                />
              </div>
            </div>

            <div className={styles.formGroup}>
              <label htmlFor="userType">Tipo de usuário</label>
              <div className={styles.selectWrapper}>
                <select
                  id="userType"
                  value={role}
                  onChange={(e) => setRole(e.target.value)}
                  className={styles.roleSelect}
                >
                  <option value="ALUNO">Aluno</option>
                  <option value="teacher">Professor</option>
                  <option value="school">Escola</option>
                  
                </select>
                <svg className={styles.selectArrow} xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
                  <path fillRule="evenodd" d="M5.23 7.21a.75.75 0 011.06.02L10 11.168l3.71-3.938a.75.75 0 111.08 1.04l-4.25 4.5a.75.75 0 01-1.08 0l-4.25-4.5a.75.75 0 01.02-1.06z" clipRule="evenodd" />
                </svg>
              </div>
            </div>

            <div className={styles.termsGroup}>
              <label className={styles.termsLabel}>
                <input 
                  type="checkbox" 
                  id="terms" 
                  checked={termsAccepted}
                  onChange={(e) => setTermsAccepted(e.target.checked)}
                  className={styles.termsCheckbox}
                />
                <span className={styles.checkmark}></span>
                <span>
                  Eu concordo com os <a href="/terms" target="_blank">Termos de Serviço</a> e <a href="/privacy" target="_blank">Política de Privacidade</a>
                </span>
              </label>
            </div>

            <button
              type="submit"
              className={styles.submitButton}
              disabled={loading || !termsAccepted}
            >
              {loading ? (
                <>
                  <svg className={styles.spinner} viewBox="0 0 50 50">
                    <circle cx="25" cy="25" r="20" fill="none" strokeWidth="5"></circle>
                  </svg>
                  Criando conta...
                </>
              ) : (
                'Criar minha conta'
              )}
            </button>
          </form>

          <div className={styles.registerFooter}>
            <p>Já tem uma conta? <a href="/login">Faça login</a></p>
          </div>
        </div>
      </div>
    </div>
  );
}