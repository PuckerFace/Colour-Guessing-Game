import { useEffect, useState } from 'react';

const App = () => {
  const colours = [
    '#FFBF00',
    '#DE3163 ',
    '#9FE2BF',
    '#6495ED',
    '#FF7F50',
    '#CCCCFF',
  ];

  const [score, setScore] = useState(0);
  const [message, setMessage] = useState('Guess the correct colour!');
  const [targetColour, setTargetColour] = useState('');
  const [isCorrect, setIsCorrect] = useState(null);
  const [animation, setAnimation] = useState('');

  useEffect(() => {
    colourGame();
  }, []);

  const colourGame = () => {
    const randomColor = colours[Math.floor(Math.random() * colours.length)];
    setTargetColour(randomColor);
    setMessage('Guess the correct colour!');
    setIsCorrect(null);
    setAnimation('');
  };

  const handleGame = (selectedColour) => {
    if (selectedColour === targetColour) {
      setMessage('Colour Guessed Correctly');
      setScore((score) => score + 1);
      setIsCorrect(true);
      setAnimation('bounce');
      const randomColor = colours[Math.floor(Math.random() * colours.length)];
      setTargetColour(randomColor);
    } else {
      setMessage('Try Again!, Guess the correct colour!');
      setIsCorrect(false);
      setAnimation('fade-out');
    }

    setTimeout(() => {
      setAnimation('');
    }, 500);
  };

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
          </div>
          <div className="row">
            <div className="score-box">
              <p data-testid="score">
                {' '}
                Score:
                {score}
              </p>
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
                // className="color-option"
                className={`color-option ${animation}`}
              ></button>
            ))}
          </div>
          <div className="new-game-box">
            <button
              data-testid="newGameButton"
              className="new-game"
              onClick={colourGame}
            >
              New Game
            </button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default App;
