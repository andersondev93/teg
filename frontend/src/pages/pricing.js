import Head from 'next/head'
import styles from '../styles/Pricing.module.css'
import Link from 'next/link'
import Header from '@/components/Header';
import Logo from '../../public/logo-branco.png';
import Image from 'next/image';
import { FiCheck, FiZap, FiAward, FiUsers, FiClock, FiMail, FiLifeBuoy, FiBarChart2, FiBookOpen } from 'react-icons/fi';

export default function Pricing() {
  const plans = [
    {
      name: "Gratuito",
      price: "R$0",
      period: "sempre",
      features: [
        { text: "Acesso a 5 jogos básicos", icon: <FiBookOpen /> },
        { text: "Até 2 horas de jogos por semana", icon: <FiClock /> },
        { text: "Relatórios básicos de progresso", icon: <FiBarChart2 /> },
        { text: "Suporte por e-mail", icon: <FiMail /> }
      ],
      cta: "Começar agora",
      featured: false,
      color: "var(--free-color)"
    },
    {
      name: "Premium Individual",
      price: "R$29",
      period: "por mês",
      features: [
        { text: "Todos os jogos disponíveis (50+)", icon: <FiBookOpen /> },
        { text: "Tempo ilimitado de jogos", icon: <FiClock /> },
        { text: "Relatórios detalhados de progresso", icon: <FiBarChart2 /> },
        { text: "Certificados de conclusão", icon: <FiAward /> },
        { text: "Suporte prioritário 24/7", icon: <FiLifeBuoy /> },
        { text: "Acesso antecipado a novos recursos", icon: <FiZap /> }
      ],
      cta: "Assinar agora",
      featured: true,
      color: "var(--premium-color)"
    },
    {
      name: "Escola Pública",
      price: "Sob consulta",
      period: "anual",
      features: [
        { text: "Licenças para todos os alunos", icon: <FiUsers /> },
        { text: "Painel de acompanhamento para professores", icon: <FiBarChart2 /> },
        { text: "Relatórios pedagógicos completos", icon: <FiBarChart2 /> },
        { text: "Treinamento para educadores", icon: <FiBookOpen /> },
        { text: "Suporte dedicado", icon: <FiLifeBuoy /> },
        { text: "Descontos progressivos", icon: <FiAward /> }
      ],
      cta: "Fale conosco",
      featured: false,
      color: "var(--school-public-color)"
    },
    {
      name: "Escola Privada",
      price: "Sob consulta",
      period: "anual",
      features: [
        { text: "Licenças para todos os alunos e professores", icon: <FiUsers /> },
        { text: "Painel de acompanhamento avançado", icon: <FiBarChart2 /> },
        { text: "Relatórios personalizados por turma", icon: <FiBarChart2 /> },
        { text: "Integração com sistemas escolares", icon: <FiZap /> },
        { text: "Suporte 24/7 com gerente dedicado", icon: <FiLifeBuoy /> },
        { text: "Formação continuada para equipe", icon: <FiBookOpen /> }
      ],
      cta: "Fale conosco",
      featured: false,
      color: "var(--school-private-color)"
    }
  ];

  const testimonials = [
    {
      quote: "Minha escola melhorou em 30% os resultados em matemática após implementar a plataforma.",
      author: "Prof. Ana Silva, Escola Municipal"
    },
    {
      quote: "Meus filhos adoram aprender com os jogos. O relatório de progresso me ajuda a acompanhar.",
      author: "Carlos Oliveira, Pai de alunos"
    },
    {
      quote: "A ferramenta mais completa que já usei para engajar meus alunos no aprendizado.",
      author: "Prof. Marcos Antônio, Colégio Particular"
    }
  ];

  return (
    <div className={styles.container}>
      <Head>
        <title>Planos e Preços - TEG Plataforma de Ensino</title>
        <meta name="description" content="Escolha o melhor plano para suas necessidades educacionais" />
      </Head>

      <Header />

      <main className={styles.main}>
        {/* Seção Hero */}
        <section className={styles.pricingHero}>
          <div className={styles.heroContent}>
            <h1>Planos que se adaptam ao seu aprendizado</h1>
            <p>Seja um aluno, professor ou instituição, temos a solução ideal para você</p>
            <div className={styles.heroBenefits}>
              <span><FiCheck /> 7 dias grátis no Premium</span>
              <span><FiCheck /> Cancelamento a qualquer momento</span>
              <span><FiCheck /> Descontos para escolas</span>
            </div>
          </div>
        </section>

        {/* Seção Planos */}
        <section className={styles.pricingPlans}>
          <h2 className={styles.sectionTitle}>Compare nossos planos</h2>
          <div className={styles.plansGrid}>
            {plans.map((plan, index) => (
              <div
                key={index}
                className={`${styles.planCard} ${plan.featured ? styles.featuredPlan : ''}`}
                style={{ borderTop: `4px solid ${plan.color}` }}
              >
                {plan.featured && (
                  <div className={styles.featuredBadge} style={{ backgroundColor: plan.color }}>
                    Mais Popular
                  </div>
                )}

                <div className={styles.planHeader}>
                  <h3>{plan.name}</h3>
                  <div className={styles.planPrice}>
                    <span>{plan.price}</span>
                    <span>/{plan.period}</span>
                  </div>
                  {plan.price !== "R$0" && plan.price !== "Sob consulta" && (
                    <p className={styles.billingInfo}>Cobrança {plan.period === "por mês" ? "mensal" : "anual"}</p>
                  )}
                </div>

                <ul className={styles.planFeatures}>
                  {plan.features.map((feature, featureIndex) => (
                    <li key={featureIndex}>
                      <span className={styles.featureIcon}>{feature.icon}</span>
                      {feature.text}
                    </li>
                  ))}
                </ul>

                <Link
                  href={plan.price === "Sob consulta" ? "/contato" : "/cadastro"}
                  className={`${styles.planButton} ${plan.featured ? styles.primaryButton : styles.secondaryButton}`}
                  style={plan.featured ? { backgroundColor: plan.color } : {}}
                >
                  {plan.cta}
                </Link>

                {plan.price === "R$29" && (
                  <p className={styles.trialInfo}>7 dias grátis • Sem compromisso</p>
                )}
              </div>
            ))}
          </div>
        </section>

        {/* Seção Comparação */}
        <section className={styles.comparisonSection}>
          <h2 className={styles.sectionTitle}>Comparação detalhada</h2>
          <div className={styles.comparisonTable}>
            <table>
              <thead>
                <tr>
                  <th>Recurso</th>
                  <th>Gratuito</th>
                  <th>Premium</th>
                  <th>Escolas</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td>Quantidade de jogos</td>
                  <td>5 básicos</td>
                  <td>Todos (50+)</td>
                  <td>Todos (50+)</td>
                </tr>
                <tr>
                  <td>Tempo de uso</td>
                  <td>2h/semana</td>
                  <td>Ilimitado</td>
                  <td>Ilimitado</td>
                </tr>
                <tr>
                  <td>Relatórios</td>
                  <td>Básicos</td>
                  <td>Detalhados</td>
                  <td>Pedagógicos completos</td>
                </tr>
                <tr>
                  <td>Suporte</td>
                  <td>E-mail</td>
                  <td>Prioritário 24/7</td>
                  <td>Dedicado</td>
                </tr>
                <tr>
                  <td>Usuários</td>
                  <td>1</td>
                  <td>1</td>
                  <td>Ilimitados</td>
                </tr>
              </tbody>
            </table>
          </div>
        </section>

        {/* Seção Depoimentos */}
        <section className={styles.testimonialsSection}>
          <h2 className={styles.sectionTitle}>O que estão dizendo</h2>
          <div className={styles.testimonialsGrid}>
            {testimonials.map((testimonial, index) => (
              <div key={index} className={styles.testimonialCard}>
                <p className={styles.testimonialQuote}>"{testimonial.quote}"</p>
                <p className={styles.testimonialAuthor}>— {testimonial.author}</p>
              </div>
            ))}
          </div>
        </section>

        {/* Seção FAQ */}
        <section className={styles.pricingFAQ}>
          <h2 className={styles.sectionTitle}>Perguntas Frequentes</h2>
          <div className={styles.faqGrid}>
            <div className={styles.faqItem}>
              <h3><FiZap /> Posso mudar de plano depois?</h3>
              <p>Sim, você pode mudar de plano a qualquer momento. A alteração será aplicada no próximo ciclo de cobrança sem taxas adicionais.</p>
            </div>
            <div className={styles.faqItem}>
              <h3><FiAward /> Há desconto para escolas?</h3>
              <p>Oferecemos descontos progressivos para escolas com base no número de alunos. Para instituições públicas, temos condições especiais.</p>
            </div>
            <div className={styles.faqItem}>
              <h3><FiClock /> Posso cancelar a qualquer momento?</h3>
              <p>Sim, você pode cancelar seu plano quando quiser sem taxas de cancelamento ou multas.</p>
            </div>
            <div className={styles.faqItem}>
              <h3><FiMail /> Como funcionam os pagamentos?</h3>
              <p>Aceitamos todas as bandeiras de cartão, PIX e boleto. Para escolas, oferecemos opção de faturamento com nota fiscal.</p>
            </div>
            <div className={styles.faqItem}>
              <h3><FiUsers /> Posso compartilhar minha conta?</h3>
              <p>O plano individual é para uso pessoal. Para múltiplos usuários, recomendamos nossos planos institucionais.</p>
            </div>
            <div className={styles.faqItem}>
              <h3><FiBarChart2 /> Como vejo meu progresso?</h3>
              <p>Todos os planos incluem relatórios. Quanto maior o plano, mais detalhadas são as análises de desempenho.</p>
            </div>
          </div>
        </section>

        {/* CTA Final */}
        <section className={styles.finalCTA}>
          <h2>Pronto para transformar sua experiência de aprendizado?</h2>
          <p>Comece hoje mesmo com o plano gratuito ou experimente o Premium por 7 dias sem custo.</p>
          <div className={styles.ctaButtons}>
            <Link href="/register" className={styles.secondaryButton}>Experimente Grátis</Link>
          </div>
        </section>
      </main>

      <footer className={styles.footer}>
        <div className={styles.footerColumns}>
          <div className={styles.footerColumn}>
            <div className={styles.footerLogo}>
              <Link href="/" className={styles.logoLink}>
                <div className={styles.logoImage}>
                  <Image
                    src={Logo}
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