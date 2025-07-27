import Head from 'next/head'
import { useState } from 'react';
import styles from '../styles/Home.module.css'
import Link from 'next/link'
import LogoBranco from '../../public/logo-branco.png';
import Image from 'next/image';
import { useAuth } from '../contexts/AuthContext';
import Header from '../components/Header';


export default function Home() {

  const { user, logout } = useAuth();
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);

  return (
    <div className={styles.container}>
      <Head>
        <title>TEG - Tecnologia Educacional Gamificada</title>
        <meta name="description" content="Revolucione a educação na sua escola com nossa plataforma gamificada" />
      </Head>

      <Header />

      {/* Hero Section */}
      <section className={styles.hero}>
        <div className={styles.heroContainer}>
          <div className={styles.heroContent}>
            <h1 className={styles.heroTitle}>Revolucione a Educação na Sua Escola</h1>
            <p className={styles.heroText}>
              Nossa plataforma combina gamificação, tecnologia e pedagogia para criar
              uma experiência de aprendizado única e eficaz.
            </p>
            <div className={styles.heroButtons}>
              <Link href="/register" className={styles.primaryButton}>
                Cadastrar Escola Gratuitamente →
              </Link>
              <Link href="#demo" className={styles.secondaryButton}>
                ▶ Agendar Demonstração
              </Link>
            </div>
            <div className={styles.heroBadges}>
              <span>✅ Teste grátis por 30 dias</span>
              <span>✅ Sem compromisso</span>
              <span>✅ Suporte completo</span>
            </div>
          </div>

          <div className={styles.heroImage}>
            <Image
              src="/hero-image.png" // Substitua pelo caminho da sua imagem
              alt="Estudantes usando tecnologia educacional"
              width={600}
              height={400}
              priority
              className={styles.image}
            />
          </div>
        </div>
      </section>

      {/* Why TEG Section */}
      <section className={styles.sectionDark} id="why">
        <div className={styles.sectionContainer}>
          <h2 className={styles.sectionTitle}>Por que TEG?</h2>
          <div className={styles.featuresGrid}>
            {/* Feature 1 */}
            <div className={styles.featureCard}>
              <div className={styles.featureIcon}>🎮</div>
              <h3>Gamificação Educacional</h3>
              <p>Transforme conteúdos em aventuras épicas com desafios, rankings, conquistas e recompensas que motivam os alunos a aprender mais.</p>
            </div>

            {/* Feature 2 */}
            <div className={styles.featureCard}>
              <div className={styles.featureIcon}>📊</div>
              <h3>Gestão Inteligente</h3>
              <p>Dashboards completos para professores e gestores acompanharem o progresso individual e coletivo com métricas detalhadas.</p>
            </div>

            {/* Feature 3 */}
            <div className={styles.featureCard}>
              <div className={styles.featureIcon}>👥</div>
              <h3>Para Todas as Escolas</h3>
              <p>Planos flexíveis e acessíveis para escolas públicas e privadas, adaptados às diferentes realidades e necessidades educacionais.</p>
            </div>

            {/* Feature 4 */}
            <div className={styles.featureCard}>
              <div className={styles.featureIcon}>📚</div>
              <h3>Conteúdo Alinhado</h3>
              <p>Todos os jogos e atividades seguem a BNCC, garantindo que o aprendizado seja divertido sem perder o foco pedagógico.</p>
            </div>

            {/* Feature 5 */}
            <div className={styles.featureCard}>
              <div className={styles.featureIcon}>🏆</div>
              <h3>Resultados Comprovados</h3>
              <p>Aumento médio de 40% no engajamento dos alunos e melhoria significativa nas notas e participação em sala de aula.</p>
            </div>

            {/* Feature 6 */}
            <div className={styles.featureCard}>
              <div className={styles.featureIcon}>⚡</div>
              <h3>Fácil Implementação</h3>
              <p>Plataforma intuitiva que não requer treinamento complexo. Professores e alunos começam a usar no primeiro dia.</p>
            </div>
          </div>
        </div>
      </section>

      {/* How It Works Section */}
      <section className={styles.sectionLight} id="how-it-works">
        <div className={styles.sectionContainer}>
          <h2 className={styles.sectionTitle}>Como Funciona a TEG?</h2>
          <p className={styles.sectionSubtitle}>Em apenas 3 passos simples, sua escola estará transformando a educação</p>

          <div className={styles.stepsContainer}>
            {/* Step 1 */}
            <div className={styles.stepCard}>
              <div className={styles.stepNumber}>1</div>
              <div className={styles.stepIcon}>👥</div>
              <h3>Cadastre sua Escola</h3>
              <p>Registre sua instituição e configure as turmas em poucos minutos. Processo 100% online e gratuito.</p>
            </div>

            {/* Step 2 */}
            <div className={styles.stepCard}>
              <div className={styles.stepNumber}>2</div>
              <div className={styles.stepIcon}>🎮</div>
              <h3>Acesse os Jogos</h3>
              <p>Professores e alunos acessam centenas de jogos educativos organizados por série e matéria.</p>
            </div>

            {/* Step 3 */}
            <div className={styles.stepCard}>
              <div className={styles.stepNumber}>3</div>
              <div className={styles.stepIcon}>📊</div>
              <h3>Acompanhe Resultados</h3>
              <p>Monitore o progresso com relatórios detalhados e métricas de engajamento e aprendizado.</p>
            </div>
          </div>

          <div className={styles.ctaCenter}>
            <Link href="/register" className={styles.primaryButton}>Começar Agora - É Grátis! →</Link>
          </div>
        </div>
      </section>

      {/* Testimonials Section */}
      <section className={styles.sectionDark} id="testimonials">
        <div className={styles.sectionContainer}>
          <h2 className={styles.sectionTitle}>O que Dizem Sobre a TEG</h2>
          <p className={styles.sectionSubtitle}>Histórias reais de transformação educacional</p>

          <div className={styles.testimonialsGrid}>
            {/* Testimonial 1 */}
            <div className={styles.testimonialCard}>
              <div className={styles.testimonialStars}>⭐⭐⭐⭐⭐</div>
              <p className={styles.testimonialText}>"A TEG revolucionou nossa escola! Os alunos estão mais engajados do que nunca. As notas de matemática subiram 35% em apenas um semestre."</p>
              <div className={styles.testimonialAuthor}>
                <div className={styles.authorInitial}>M</div>
                <div>
                  <strong>Diretora Maria Silva</strong>
                  <p>Escola Pública - São Paulo</p>
                </div>
              </div>
            </div>

            {/* Testimonial 2 */}
            <div className={styles.testimonialCard}>
              <div className={styles.testimonialStars}>⭐⭐⭐⭐⭐</div>
              <p className={styles.testimonialText}>"Nunca pensei que matemática pudesse ser tão divertida! Agora eu quero fazer todas as lições e competir com meus amigos."</p>
              <div className={styles.testimonialAuthor}>
                <div className={styles.authorInitial}>L</div>
                <div>
                  <strong>Lucas Oliveira</strong>
                  <p>Aluno do 6º ano</p>
                </div>
              </div>
            </div>

            {/* Testimonial 3 */}
            <div className={styles.testimonialCard}>
              <div className={styles.testimonialStars}>⭐⭐⭐⭐⭐</div>
              <p className={styles.testimonialText}>"Como professora, vejo a diferença no interesse dos alunos. A plataforma me ajuda a identificar dificuldades rapidamente."</p>
              <div className={styles.testimonialAuthor}>
                <div className={styles.authorInitial}>A</div>
                <div>
                  <strong>Prof. Ana Costa</strong>
                  <p>Colégio Particular - RJ</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Final CTA Section */}
      <section className={styles.finalCta}>
        <div className={styles.finalCtaContent}>
          <h2>Pronto para Transformar a Educação?</h2>
          <p>Junte-se a mais de 500 escolas que já revolucionaram o aprendizado com a TEG. Comece gratuitamente hoje mesmo!</p>
          <div className={styles.finalCtaButtons}>
            <Link href="/register" className={styles.primaryButton}>Cadastrar Escola Gratuitamente →</Link>
            <Link href="#demo" className={styles.secondaryButton}>▶ Agendar Demonstração</Link>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className={styles.footer}>
        <div className={styles.footerColumns}>
          <div className={styles.footerColumn}>
            <div className={styles.footerLogo}>
              <Link href="/" className={styles.logoLink}>
                <div className={styles.logoImage}>
                  <Image
                    src={LogoBranco}
                    alt="TEG - Tecnologia Educacional Gamificada"
                    width={200}
                    height={200}
                    priority
                  />
                </div>
              </Link>
            </div>
          </div>

          <div className={styles.footerColumn}>
            <h4>Produto</h4>
            <Link href="#features">Funcionalidades</Link>
            <Link href="/pricing">Preços</Link>
            <Link href="#demo">Demonstração</Link>
          </div>

          <div className={styles.footerColumn}>
            <h4>Suporte</h4>
            <Link href="/help">Central de Ajuda</Link>
            <Link href="/contact">Contato</Link>
            <Link href="/training">Treinamento</Link>
          </div>

          <div className={styles.footerColumn}>
            <h4>Empresa</h4>
            <Link href="/about">Sobre Nós</Link>
            <Link href="/blog">Blog</Link>
            <Link href="/careers">Carreiras</Link>
          </div>
        </div>

        <div className={styles.footerBottom}>
          <p>© 2025 TEG - Tecnologia Educacional Gamificada. Todos os direitos reservados.</p>
        </div>
      </footer>
    </div>
  )
}