import { useEffect, useState } from 'react';
import { toast, ToastContainer } from 'react-toastify';

const App = () => {
  const colours = [
    '#5f4e91',
    '#c8b6ff',
    '#937adc',
    '#9370DB',
    '#806ac3',
    '#8c69f5',
  ];
  const [score, setScore] = useState(0);
  const [message, setMessage] = useState('Guess the correct colour!');
  const [targetColour, setTargetColour] = useState('');
  const [isCorrect, setIsCorrect] = useState(null);
  const [rounds, setRounds] = useState(0);
  const [highScore, setHighScore] = useState(0);
  const [animation, setAnimation] = useState('');
  const [gameOver, setGameOver] = useState(false);

  const colourGame = () => {
    const randomColor = colours[Math.floor(Math.random() * colours.length)];
    setTargetColour(randomColor);
    setMessage('Guess the correct colour!');
    setIsCorrect(null);
    setGameOver(false);
    setRounds(0);
    setAnimation('');
    setScore(0);
    setHighScore(Math.max(highScore, score));
  };
  const handleGame = (selectedColour) => {
    if (gameOver) return;

    if (selectedColour === targetColour) {
      setMessage('Colour Guessed Correctly');
      setScore((score) => score + 1);
      setIsCorrect(true);
      setAnimation('bounce');
      toast.success('Correct!');
    } else {
      setMessage('Try Again!, Guess the correct colour!');
      setIsCorrect(false);
      setAnimation('fade-out');
      toast.error('Wrong!');
    }

    setTimeout(() => {
      setAnimation('');
    }, 500);

    setRounds((prevRounds) => prevRounds + 1);
  };

  useEffect(() => {
    colourGame();
  }, []);

  useEffect(() => {
    if (rounds === 5) {
      setGameOver(true);
      setMessage('Game over! Restart to play again.');
      setHighScore((prevHighScore) => Math.max(prevHighScore, score));

      if (score >= 5) {
        toast.success('Game Over! You won!');
      } else {
        toast.error('Game Over! You lost!');
      }
    } else if (rounds < 5) {
      // Set a new target colour if the game is still ongoing
      const randomColour = colours[Math.floor(Math.random() * colours.length)];
      setTargetColour(randomColour);
    }
  }, [rounds, score]); // Run when `newRounds` or `score` changes

  return (
    <section>
      <div className="heading">
        <h1>Guess The Colour</h1>

        <p data-testid="gameInstructions" className="message">
          {message}
        </p>
      </div>

      <div className="box">
        <div className="info-box">
          <div className="row">
            <div className="status-box">
              <p data-testid="gameStatus">
                {isCorrect === true
                  ? 'Correct!'
                  : isCorrect === false
                  ? 'Wrong!'
                  : 'Make a guess!'}
              </p>
            </div>

            <div className="round-box">
              <p data-testid="round">Rounds: {rounds}/5</p>
            </div>
          </div>
          <div className="row">
            <div className="score-box">
              <p data-testid="score">
                {' '}
                Score:
                {score}
              </p>
            </div>
            <div className="highScore-box">
              <p data-testid="highScore">High Score: {highScore}</p>
            </div>
          </div>
        </div>
        <div className="content">
          <div
            className={`color-box ${animation}`}
            data-testid="colorBox"
            style={{ backgroundColor: targetColour }}
          ></div>
          <div className="options">
            {colours.map((colour, index) => (
              <button
                data-testid="colorOption"
                key={index}
                style={{ backgroundColor: colour }}
                onClick={() => handleGame(colour)}
                className="color-option"
              ></button>
            ))}
          </div>
          <div className="new-game-box">
            <button
              data-testid="newGameButton"
              className={`new-game ${gameOver ? 'bounce' : ''}`}
              onClick={colourGame}
            >
              New Game
            </button>
          </div>
          <ToastContainer autoClose={1000} />
        </div>
      </div>
    </section>
  );
};

export default App;
