import Head from 'next/head'
import styles from '../styles/Dashboard.module.css'
import Link from 'next/link'

export default function Games() {
  const gameCategories = [
    {
      name: "Matemática",
      games: [
        { name: "Operações Básicas", level: "Fácil", description: "Aprenda a somar, subtrair, multiplicar e dividir" },
        { name: "Frações Divertidas", level: "Médio", description: "Domine o mundo das frações" },
        { name: "Desafio Geométrico", level: "Difícil", description: "Explore formas e ângulos" },
      ]
    },
    {
      name: "Português",
      games: [
        { name: "Gramática Básica", level: "Fácil", description: "Aprenda as regras gramaticais" },
        { name: "Interpretação de Texto", level: "Médio", description: "Melhore sua compreensão de textos" },
      ]
    },
    {
      name: "Ciências",
      games: [
        { name: "Corpo Humano", level: "Médio", description: "Conheça os sistemas do corpo humano" },
        { name: "Ecologia", level: "Fácil", description: "Aprenda sobre meio ambiente" },
      ]
    }
  ];

  return (
    <div className={styles.dashboardContainer}>
      <Head>
        <title>Jogos - Plataforma de Ensino</title>
      </Head>

      <aside className={styles.sidebar}>
        {/* Mesmo sidebar do dashboard */}
      </aside>

      <main className={styles.mainContent}>
        <header className={styles.mainHeader}>
          <h1>Nossos Jogos Educacionais</h1>
          <div className={styles.searchBar}>
            <input type="text" placeholder="Pesquisar jogos..." />
          </div>
        </header>

        <section className={styles.filterSection}>
          <div className={styles.filterButtons}>
            <button className={styles.filterActive}>Todos</button>
            <button>Matemática</button>
            <button>Português</button>
            <button>Ciências</button>
            <button>História</button>
            <button>Geografia</button>
          </div>
        </section>

        {gameCategories.map((category, index) => (
          <section key={index} className={styles.gameCategory}>
            <h2>{category.name}</h2>
            <div className={styles.gamesGrid}>
              {category.games.map((game, gameIndex) => (
                <div key={gameIndex} className={styles.gameCardLarge}>
                  <div className={styles.gameImage}>
                    {/* Imagem do jogo */}
                    <div className={styles.imagePlaceholder}></div>
                  </div>
                  <div className={styles.gameInfo}>
                    <h3>{game.name}</h3>
                    <span className={styles.gameLevel}>{game.level}</span>
                    <p>{game.description}</p>
                    <button className={styles.playButton}>Jogar</button>
                  </div>
                </div>
              ))}
            </div>
          </section>
        ))}
      </main>
    </div>
  )
}