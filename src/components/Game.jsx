import React, { useState } from 'react';
import IdleComputer from '../assets/IdleComputer.gif';
import IdlePlayer from '../assets/IdlePlayer.gif';

const Game = () => {
  const [playerLife, setPlayerLife] = useState(100);
  const [computerLife, setComputerLife] = useState(100);
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
      setComputerLife(prevLife => {
        const newLife = prevLife - 20;
        if (newLife <= 0) {
          setIsModalOpen(true);
        }
        return newLife;
      });
      winner = 'player';
    } else {
      setPlayerLife(prevLife => {
        const newLife = prevLife - 20;
        if (newLife <= 0) {
          setIsModalOpen(true);
        }
        return newLife;
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
    setPlayerLife(100);
    setComputerLife(100);
    setRoundWinner('');
    setPlayerSelection('');
    setComputerSelection('');
    setIsModalOpen(false);
  };

  const updateScoreMessage = (winner, playerSelection, computerSelection) => {
    let message = '';
    if (winner === 'player') {
      message = `${playerSelection} BEATS ${computerSelection}!`;
    } else if (winner === 'computer') {
      message = `${playerSelection} IS BEATEN BY ${computerSelection}!`;
    } else {
      message = 'TIE!';
    }
    return message;
  };

  return (
    <div>

      <h3 className="flex justify-center text-center text-lg py-10">
      First to win five rounds decides humanity's fate!
      </h3>

      <div className="mb-6">
        <div className="flex justify-center">
          <div className="flex items-center">
            <div className="bg-red-600 h-10 w-96 border border-yellow-500 relative">
              <p className="text-lg mr-2 italic absolute left-2 top-1/2 transform -translate-y-1/2">
                PLAYER
              </p>
              <div className="bg-blue-700 h-full" style={{ width: `${playerLife}%` }}></div>
              <img
      src={IdlePlayer}
      alt="Idle Player"
      className="absolute top-8 right-40 h-64 mt-10"
    />
            </div>
            
          </div>
          <div className="flex items-center ml-4">
            <div className="bg-blue-700 h-10 w-96 border border-yellow-500 relative">
              <p className="text-lg mr-2 italic absolute right-2 top-1/2 transform -translate-y-1/2">
                COMPUTER
              </p>
              <div
                className="bg-red-600 h-full"
                style={{ width: `${100 - computerLife}%` }}
              ></div>
              <img
      src={IdleComputer}
      alt="Idle Computer"
      className="absolute top-8 left-40 h-64 mt-10"
    />
            </div>
          </div>
        </div>





      </div>



      {roundWinner && (
        <div className="flex justify-center">
          <p className="text-lg">
            {updateScoreMessage(roundWinner, playerSelection, computerSelection)}
          </p>
        </div>
      )}


      <div className="mb-6">
        <div className="flex justify-center mt-96">
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

      

      {isModalOpen && (
        <div className="fixed top-0 left-0 w-screen h-screen flex items-center justify-center">
          <div className="bg-red-500 rounded-lg p-8">
            <p className="text-lg">
              {playerLife > computerLife
                ? 'Player wins! Humanity is saved from termination!'
                : 'Computer wins. Humanity is doomed.'}
            </p>
            <button className="mt-4 font-bold py-2 px-4 rounded" onClick={restartGame}>
              Play Again
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default Game;
