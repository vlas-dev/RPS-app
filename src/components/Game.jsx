import React, { useState } from 'react';

const App = () => {
  const [playerScore, setPlayerScore] = useState(0);
  const [computerScore, setComputerScore] = useState(0);
  const [roundWinner, setRoundWinner] = useState('');
  const [playerSelection, setPlayerSelection] = useState('');
  const [computerSelection, setComputerSelection] = useState('');
  const [isModalOpen, setIsModalOpen] = useState(false);

  const playRound = (playerSelection, computerSelection) => {
    let winner = '';
    if (playerSelection === computerSelection) {
      winner = 'tie';
    } else if (
      (playerSelection === 'ROCK' && computerSelection === 'SCISSORS') ||
      (playerSelection === 'SCISSORS' && computerSelection === 'PAPER') ||
      (playerSelection === 'PAPER' && computerSelection === 'ROCK')
    ) {
      setPlayerScore(prevScore => {
        const newScore = prevScore + 1;
        if (newScore === 5) {
          setIsModalOpen(true);
        }
        return newScore;
      });
      winner = 'player';
    } else {
      setComputerScore(prevScore => {
        const newScore = prevScore + 1;
        if (newScore === 5) {
          setIsModalOpen(true);
        }
        return newScore;
      });
      winner = 'computer';
    }
    setRoundWinner(winner);
    updateScoreMessage(winner, playerSelection, computerSelection);
  };

  const getRandomChoice = () => {
    const choices = ['ROCK', 'PAPER', 'SCISSORS'];
    const randomIndex = Math.floor(Math.random() * choices.length);
    return choices[randomIndex];
  };

  const handleClick = playerSelection => {
    const computerSelection = getRandomChoice();
    setPlayerSelection(playerSelection);
    setComputerSelection(computerSelection);
    playRound(playerSelection, computerSelection);
  };

  const restartGame = () => {
    setPlayerScore(0);
    setComputerScore(0);
    setRoundWinner('');
    setPlayerSelection('');
    setComputerSelection('');
    setIsModalOpen(false);
  };

  const updateScoreMessage = (winner, playerSelection, computerSelection) => {
    let message = '';
    if (winner === 'player') {
      message = `${(playerSelection)} beats ${computerSelection}`;
    } else if (winner === 'computer') {
      message = `${(playerSelection)} is beaten by ${computerSelection}`;
    } else {
      message = `${(playerSelection)} ties with ${computerSelection}`;
    }
    return message;
  };


  return (
    <div className="min-h-screen">
      <div className="flex justify-center py-8">
      </div>
      <div className="mx-auto mt-8 max-w-3xl">
        <div className="mb-6">
          <h3 className="flex justify-center text-lg">The first to score 5 points wins the round!</h3>
          <div className="flex justify-center mt-4">
            <button
              className="mx-2 font-bold py-2 px-4 rounded"
              onClick={() => handleClick('ROCK')}
            >
              Rock
            </button>
            <button
              className="mx-2 font-bold py-2 px-4 rounded"
              onClick={() => handleClick('PAPER')}
            >
              Paper
            </button>
            <button
              className="mx-2 font-bold py-2 px-4 rounded"
              onClick={() => handleClick('SCISSORS')}
            >
              Scissors
            </button>
          </div>
        </div>
      
        <div className="mb-6">
          <div className="flex justify-center">
          <h2 className="text-2xl font-bold mr-2">Score</h2>

            <div className="flex items-center">
              <p className="text-lg mr-2">Player:</p>
              <p className="text-lg font-bold">{playerScore}</p>
            </div>
            <div className="flex items-center ml-4">
              <p className="text-lg mr-2">Computer:</p>
              <p className="text-lg font-bold">{computerScore}</p>
            </div>
          </div>
        </div>
        {roundWinner && (
          <div className="flex justify-center mb-6">
            <p className="text-lg">{updateScoreMessage(roundWinner, playerSelection, computerSelection)}</p>
          </div>
        )}
      </div>
      {isModalOpen && (
        <div className="fixed top-0 left-0 w-screen h-screen flex items-center justify-center">
          <div className="bg-red-500 rounded-lg p-8">
            <h2 className="text-2xl font-bold mb-4">Game Over</h2>
            <p className="text-lg">
              {playerScore > computerScore
                ? 'Congratulations! You won the game!'
                : 'Better luck next time! The computer won the game.'}
            </p>
            <button
              className="mt-4 font-bold py-2 px-4 rounded"
              onClick={restartGame}
            >
              Restart Game
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default App;
