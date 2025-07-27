import Head from 'next/head'
import styles from '../styles/Home.module.css'
import Link from 'next/link'

export default function Schools() {
  const features = [
    {
      title: "Painel de Acompanhamento",
      description: "Acompanhe o desempenho de todas as turmas e alunos em tempo real.",
      icon: "📊"
    },
    {
      title: "Relatórios Pedagógicos",
      description: "Gere relatórios detalhados para auxiliar no planejamento das aulas.",
      icon: "📝"
    },
    {
      title: "Gestão de Turmas",
      description: "Organize suas turmas e alunos de forma simples e intuitiva.",
      icon: "👨‍🏫"
    },
    {
      title: "Conteúdo Alinhado à BNCC",
      description: "Jogos desenvolvidos por especialistas em educação.",
      icon: "🎯"
    },
    {
      title: "Suporte Dedicado",
      description: "Equipe especializada para ajudar sua escola a implementar a plataforma.",
      icon: "🛟"
    },
    {
      title: "Integração com Sistemas",
      description: "Possibilidade de integração com sistemas escolares existentes.",
      icon: "🔌"
    }
  ];

  return (
    <div className={styles.container}>
      <Head>
        <title>Para Escolas - Plataforma de Ensino</title>
      </Head>

      <header className={styles.header}>
        <div className={styles.logo}>EduGame</div>
        <nav className={styles.nav}>
          <Link href="/">Home</Link>
          <Link href="/pricing">Planos</Link>
          <Link href="/schools">Para Escolas</Link>
          <Link href="/login">Login</Link>
          <Link href="/register" className={styles.ctaButton}>Cadastre-se</Link>
        </nav>
      </header>

      <main className={styles.main}>
        <section className={styles.schoolsHero}>
          <div className={styles.heroContent}>
            <h1>Solução completa para sua escola</h1>
            <p>Transforme a aprendizagem com nossa plataforma gamificada, alinhada ao currículo escolar e com ferramentas pedagógicas poderosas.</p>
            <div className={styles.heroButtons}>
              <Link href="#contact" className={styles.primaryButton}>Fale conosco</Link>
              <Link href="/pricing" className={styles.secondaryButton}>Ver planos</Link>
            </div>
          </div>
          <div className={styles.heroImage}>
            {/* Imagem ilustrativa */}
            <div className={styles.imagePlaceholder}></div>
          </div>
        </section>

        <section className={styles.schoolsFeatures}>
          <h2>Como nossa plataforma ajuda sua escola</h2>
          <div className={styles.featuresGrid}>
            {features.map((feature, index) => (
              <div key={index} className={styles.featureCard}>
                <div className={styles.featureIcon}>{feature.icon}</div>
                <h3>{feature.title}</h3>
                <p>{feature.description}</p>
              </div>
            ))}
          </div>
        </section>

        <section className={styles.schoolsTestimonials}>
          <h2>Escolas que já usam nossa plataforma</h2>
          <div className={styles.testimonialsGrid}>
            <div className={styles.testimonialCard}>
              <p>"Os alunos estão muito mais engajados e os professores conseguem acompanhar o desenvolvimento de forma individualizada."</p>
              <div className={styles.testimonialAuthor}>
                <strong>Escola Municipal São Paulo</strong>
                <span>São Paulo/SP</span>
              </div>
            </div>
            <div className={styles.testimonialCard}>
              <p>"A plataforma trouxe uma nova dinâmica para nossas aulas, tornando o aprendizado mais significativo."</p>
              <div className={styles.testimonialAuthor}>
                <strong>Colégio Santa Maria</strong>
                <span>Belo Horizonte/MG</span>
              </div>
            </div>
          </div>
        </section>

        <section id="contact" className={styles.schoolsContact}>
          <h2>Fale com nosso time comercial</h2>
          <form className={styles.contactForm}>
            <div className={styles.formRow}>
              <div className={styles.formGroup}>
                <label htmlFor="name">Nome</label>
                <input type="text" id="name" placeholder="Seu nome" />
              </div>
              <div className={styles.formGroup}>
                <label htmlFor="email">E-mail</label>
                <input type="email" id="email" placeholder="seu@email.com" />
              </div>
            </div>
            <div className={styles.formRow}>
              <div className={styles.formGroup}>
                <label htmlFor="school">Nome da Escola</label>
                <input type="text" id="school" placeholder="Nome da sua escola" />
              </div>
              <div className={styles.formGroup}>
                <label htmlFor="phone">Telefone</label>
                <input type="tel" id="phone" placeholder="(00) 00000-0000" />
              </div>
            </div>
            <div className={styles.formGroup}>
              <label htmlFor="message">Mensagem</label>
              <textarea id="message" rows="4" placeholder="Conte-nos sobre sua escola e como podemos ajudar"></textarea>
            </div>
            <button type="submit" className={styles.submitButton}>Enviar mensagem</button>
          </form>
        </section>
      </main>

      <footer className={styles.footer}>
        <p>© 2023 EduGame - Todos os direitos reservados</p>
      </footer>
    </div>
  )
}