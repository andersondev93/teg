import { useState } from 'react';
import Head from 'next/head';
import styles from '../styles/Dashboard.module.css';
import Header from '../components/Header';
import Image from 'next/image';

const Dashboard = () => {
  // Lista de jogos disponíveis
  const [games] = useState([
    {
      id: 1,
      title: "Matemática Básica",
      description: "Pratique operações matemáticas fundamentais",
      subject: "Matemática",
      level: "Iniciante",
      thumbnail: "/math-thumbnail.png"
    },
    {
      id: 2,
      title: "Português Divertido",
      description: "Aprenda gramática e vocabulário",
      subject: "Português",
      level: "Intermediário",
      thumbnail: "/portuguese-thumbnail.png"
    },
    {
      id: 3,
      title: "Ciências Exploratórias",
      description: "Descubra o mundo da ciência",
      subject: "Ciências",
      level: "Iniciante",
      thumbnail: "/science-thumbnail.png"
    }
  ]);

  const [selectedGame, setSelectedGame] = useState(null);
  const [mathScore, setMathScore] = useState(0);
  const [portugueseScore, setPortugueseScore] = useState(0);
  const [scienceScore, setScienceScore] = useState(0);

  // Jogo de Matemática
  const MathGame = () => {
    const [num1, setNum1] = useState(Math.floor(Math.random() * 10) + 1);
    const [num2, setNum2] = useState(Math.floor(Math.random() * 10) + 1);
    const [userAnswer, setUserAnswer] = useState('');
    const [feedback, setFeedback] = useState('');
    const [operation, setOperation] = useState('+');

    const generateNewProblem = () => {
      const ops = ['+', '-', '*'];
      const newOp = ops[Math.floor(Math.random() * ops.length)];
      setOperation(newOp);
      setNum1(Math.floor(Math.random() * 10) + 1);
      setNum2(Math.floor(Math.random() * 10) + 1);
      setUserAnswer('');
      setFeedback('');
    };

    const checkAnswer = () => {
      let correctAnswer;
      switch(operation) {
        case '+': correctAnswer = num1 + num2; break;
        case '-': correctAnswer = num1 - num2; break;
        case '*': correctAnswer = num1 * num2; break;
        default: correctAnswer = num1 + num2;
      }

      if (parseInt(userAnswer) === correctAnswer) {
        setFeedback("Correto! 🎉");
        setMathScore(prev => prev + 10);
        setTimeout(generateNewProblem, 1500);
      } else {
        setFeedback("Tente novamente!");
      }
    };

    return (
      <div className={styles.gameContainer}>
        <h3>Jogo de Matemática</h3>
        <p>Pontuação: {mathScore}</p>
        <div className={styles.problem}>
          {num1} {operation} {num2} = ?
        </div>
        <input
          type="number"
          value={userAnswer}
          onChange={(e) => setUserAnswer(e.target.value)}
          onKeyPress={(e) => e.key === 'Enter' && checkAnswer()}
          className={styles.gameInput}
        />
        <button onClick={checkAnswer} className={styles.gameButton}>
          Verificar
        </button>
        {feedback && (
          <div className={feedback.includes("Correto") ? styles.correctFeedback : styles.incorrectFeedback}>
            {feedback}
          </div>
        )}
      </div>
    );
  };

  // Jogo de Português
  const PortugueseGame = () => {
    const [currentQuestion, setCurrentQuestion] = useState(0);
    const [selectedOption, setSelectedOption] = useState(null);
    const [feedback, setFeedback] = useState('');

    const questions = [
      {
        question: "Qual é o plural de 'cão'?",
        options: ["Cães", "Cãos", "Cãozinhos"],
        answer: 0
      },
      {
        question: "Complete: Eu ____ um livro",
        options: ["ler", "li", "leio"],
        answer: 2
      },
      {
        question: "Qual palavra está escrita corretamente?",
        options: ["Excessão", "Exceção", "Ecessão"],
        answer: 1
      }
    ];

    const checkAnswer = (optionIndex) => {
      setSelectedOption(optionIndex);
      if (optionIndex === questions[currentQuestion].answer) {
        setFeedback("Correto! 🎉");
        setPortugueseScore(prev => prev + 10);
      } else {
        setFeedback("Incorreto! Tente novamente.");
      }
    };

    const nextQuestion = () => {
      setCurrentQuestion(prev => (prev < questions.length - 1 ? prev + 1 : 0));
      setSelectedOption(null);
      setFeedback('');
    };

    return (
      <div className={styles.gameContainer}>
        <h3>Jogo de Português</h3>
        <p>Pontuação: {portugueseScore}</p>
        <div className={styles.question}>
          <p>{questions[currentQuestion].question}</p>
          <div className={styles.options}>
            {questions[currentQuestion].options.map((option, index) => (
              <button
                key={index}
                onClick={() => checkAnswer(index)}
                className={`${styles.optionButton} ${
                  selectedOption === index 
                    ? index === questions[currentQuestion].answer 
                      ? styles.correctOption 
                      : styles.incorrectOption
                    : ''
                }`}
                disabled={selectedOption !== null}
              >
                {option}
              </button>
            ))}
          </div>
        </div>
        {feedback && (
          <div className={feedback.includes("Correto") ? styles.correctFeedback : styles.incorrectFeedback}>
            {feedback}
            {selectedOption !== null && (
              <button onClick={nextQuestion} className={styles.nextButton}>
                Próxima Pergunta
              </button>
            )}
          </div>
        )}
      </div>
    );
  };

  // Jogo de Ciências
  const ScienceGame = () => {
    const [currentQuestion, setCurrentQuestion] = useState(0);
    const [selectedOption, setSelectedOption] = useState(null);
    const [feedback, setFeedback] = useState('');

    const questions = [
      {
        question: "Qual é o maior planeta do sistema solar?",
        options: ["Terra", "Júpiter", "Saturno"],
        answer: 1,
        explanation: "Júpiter é o maior planeta do nosso sistema solar."
      },
      {
        question: "O que as plantas produzem durante a fotossíntese?",
        options: ["Dióxido de carbono", "Oxigênio", "Nitrogênio"],
        answer: 1,
        explanation: "As plantas produzem oxigênio como subproduto da fotossíntese."
      },
      {
        question: "Qual destes é um mamífero?",
        options: ["Tubarão", "Pinguim", "Golfinho"],
        answer: 2,
        explanation: "Golfinhos são mamíferos marinhos, não peixes."
      }
    ];

    const checkAnswer = (optionIndex) => {
      setSelectedOption(optionIndex);
      if (optionIndex === questions[currentQuestion].answer) {
        setFeedback("Correto! 🎉");
        setScienceScore(prev => prev + 10);
      } else {
        setFeedback(`Incorreto! ${questions[currentQuestion].explanation}`);
      }
    };

    const nextQuestion = () => {
      setCurrentQuestion(prev => (prev < questions.length - 1 ? prev + 1 : 0));
      setSelectedOption(null);
      setFeedback('');
    };

    return (
      <div className={styles.gameContainer}>
        <h3>Jogo de Ciências</h3>
        <p>Pontuação: {scienceScore}</p>
        <div className={styles.question}>
          <p>{questions[currentQuestion].question}</p>
          <div className={styles.options}>
            {questions[currentQuestion].options.map((option, index) => (
              <button
                key={index}
                onClick={() => checkAnswer(index)}
                className={`${styles.optionButton} ${
                  selectedOption === index 
                    ? index === questions[currentQuestion].answer 
                      ? styles.correctOption 
                      : styles.incorrectOption
                    : ''
                }`}
                disabled={selectedOption !== null}
              >
                {option}
              </button>
            ))}
          </div>
        </div>
        {feedback && (
          <div className={feedback.includes("Correto") ? styles.correctFeedback : styles.incorrectFeedback}>
            <p>{feedback}</p>
            {selectedOption !== null && (
              <button onClick={nextQuestion} className={styles.nextButton}>
                Próxima Pergunta
              </button>
            )}
          </div>
        )}
      </div>
    );
  };



  return (
    
    <div >
      <Head>
        <title>Jogos Educacionais</title>
      </Head>
     
      <header className={styles.header}>
        <Header />
        <h1>Jogos Educacionais</h1>
        <p>Escolha um jogo para começar a aprender!</p>
      </header>

      {selectedGame ? (
        <main className={styles.gameView}>
          <button 
            onClick={() => setSelectedGame(null)} 
            className={styles.backButton}
          >
            Voltar para todos os jogos
          </button>
          
          {selectedGame.id === 1 && <MathGame />}
          {selectedGame.id === 2 && <PortugueseGame />}
          {selectedGame.id === 3 && <ScienceGame />}
        </main>
      ) : (
        <main className={styles.gamesGrid}>
          {games.map((game) => (
            <div 
              key={game.id} 
              className={styles.gameCard}
              onClick={() => setSelectedGame(game)}
            >
              <div className={styles.gameThumbnail}>
                {game.thumbnail ? (
                  <Image src={game.thumbnail} alt={game.title} />
                ) : (
                  <div className={styles.thumbnailPlaceholder}>
                    {game.subject.charAt(0)}
                  </div>
                )}
              </div>
              <div className={styles.gameInfo}>
                <h3>{game.title}</h3>
                <p>{game.description}</p>
                <div className={styles.gameMeta}>
                  <span>{game.subject}</span>
                  <span>{game.level}</span>
                </div>
              </div>
            </div>
          ))}
        </main>
      )}
    </div>
  );
};



export default Dashboard;