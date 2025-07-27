import { useState, useEffect } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { useAuth } from '../contexts/AuthContext';
import styles from '../styles/Header.module.css';
import Logo from '../../public/logo.png';

const Header = () => {
  const { user, logout } = useAuth();
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth < 768);
    };

    handleResize(); // Verifica no carregamento inicial
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  return (
    <header className={styles.header}>
      <div className={styles.headerContainer}>
        <div className={styles.logoContainer}>
          <Link href="/" className={styles.logoLink}>
            <div className={styles.logoImage}>
              <Image 
                src={Logo} 
                alt="TEG - Tecnologia Educacional Gamificada" 
                width={90}
                height={90} 
                priority
              />
            </div>
          </Link>
        </div>

        {/* Botão do menu hambúrguer para mobile */}
        {isMobile && (
          <button 
            className={styles.mobileMenuButton}
            onClick={toggleMobileMenu}
            aria-label="Menu"
          >
            <span className={`${styles.hamburger} ${isMobileMenuOpen ? styles.open : ''}`}></span>
          </button>
        )}

        {/* Navegação principal */}
        <nav className={`${styles.nav} ${isMobileMenuOpen ? styles.open : ''}`}>
          <Link href="/" className={styles.navLink} onClick={() => setIsMobileMenuOpen(false)}>Início</Link>
          <Link href="/pricing" className={styles.navLink} onClick={() => setIsMobileMenuOpen(false)}>Planos e Preços</Link>
          
          {user ? (
            <div className={styles.userDropdown}>
              <button 
                className={styles.userButton}
                onClick={() => setIsDropdownOpen(!isDropdownOpen)}
              >
                <span className={styles.userName}>
                  {user.name || 'Minha Conta'}
                </span>
                <svg
                  className={`${styles.dropdownIcon} ${isDropdownOpen ? styles.open : ''}`}
                  viewBox="0 0 20 20"
                  fill="currentColor"
                >
                  <path
                    fillRule="evenodd"
                    d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z"
                    clipRule="evenodd"
                  />
                </svg>
              </button>
              
              {isDropdownOpen && (
                <div className={styles.dropdownMenu}>
                  <Link href="/dashboard" className={styles.dropdownItem} onClick={() => {
                    setIsDropdownOpen(false);
                    setIsMobileMenuOpen(false);
                  }}>
                    Meu Dashboard
                  </Link>
                  <Link href="/profile" className={styles.dropdownItem} onClick={() => {
                    setIsDropdownOpen(false);
                    setIsMobileMenuOpen(false);
                  }}>
                    Meu Perfil
                  </Link>
                  {user.role === 'teacher' && (
                    <Link href="/teacher-portal" className={styles.dropdownItem} onClick={() => {
                      setIsDropdownOpen(false);
                      setIsMobileMenuOpen(false);
                    }}>
                      Painel do Professor
                    </Link>
                  )}
                  <button 
                    onClick={() => {
                      logout();
                      setIsDropdownOpen(false);
                      setIsMobileMenuOpen(false);
                    }}
                    className={styles.dropdownItem}
                  >
                    Sair
                  </button>
                </div>
              )}
            </div>
          ) : (
            <>
              <Link href="/login" className={styles.navLink} onClick={() => setIsMobileMenuOpen(false)}>Login</Link>
              <Link href="/register" className={styles.ctaButton} onClick={() => setIsMobileMenuOpen(false)}>Começar Agora</Link>
            </>
          )}
        </nav>
      </div>
    </header>
  );
};

export default Header;