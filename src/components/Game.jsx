import React, { useState, useEffect } from "react";
import IdleComputer from "../assets/IdleComputerBig.gif";
import IdlePlayer from "../assets/IdlePlayerBig.gif";
import DeadComputer from "../assets/DeadComputerBig.gif";
import DeadPlayer from "../assets/DeadPlayerBig.gif";
import HurtComputer from "../assets/HurtComputerBig.gif";
import HurtPlayer from "../assets/HurtPlayerBig.gif";
import ShootComputer from "../assets/ShootComputerBig.gif";
import ShootPlayer from "../assets/ShootPlayerBig.gif";
import defaultRock from "../assets/defaultRock.png";
import defaultPaper from "../assets/defaultPaper.png";
import defaultScissors from "../assets/defaultScissors.png";

const Game = () => {
  const [playerLife, setPlayerLife] = useState(100);
  const [computerLife, setComputerLife] = useState(100);
  const [roundWinner, setRoundWinner] = useState("");
  const [playerSelection, setPlayerSelection] = useState("");
  const [computerSelection, setComputerSelection] = useState("");
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isPlayerDead, setIsPlayerDead] = useState(false);
  const [isComputerDead, setIsComputerDead] = useState(false);
  const [isPlayerHurt, setIsPlayerHurt] = useState(false);
  const [isComputerHurt, setIsComputerHurt] = useState(false);
  const [isPlayerShooting, setIsPlayerShooting] = useState(false);
  const [isComputerShooting, setIsComputerShooting] = useState(false);
  const [areButtonsDisabled, setAreButtonsDisabled] = useState(false);

  useEffect(() => {
    const resetGIFs = setTimeout(() => {
      setIsPlayerHurt(false);
      setIsComputerHurt(false);
      setIsPlayerShooting(false);
      setIsComputerShooting(false);
    }, 1000);

    return () => clearTimeout(resetGIFs);
  }, [isPlayerHurt, isComputerHurt, isPlayerShooting, isComputerShooting]);

  useEffect(() => {
    setAreButtonsDisabled(
      isPlayerHurt || isComputerHurt || isPlayerShooting || isComputerShooting
    );
  }, [isPlayerHurt, isComputerHurt, isPlayerShooting, isComputerShooting]);

  const playRound = (playerSelection, computerSelection) => {
    let winner = "";
    if (playerSelection === computerSelection) {
      winner = "tie";
    } else if (
      (playerSelection === "ROCK" && computerSelection === "SCISSORS") ||
      (playerSelection === "SCISSORS" && computerSelection === "PAPER") ||
      (playerSelection === "PAPER" && computerSelection === "ROCK")
    ) {
      setComputerLife((prevLife) => {
        const newLife = prevLife - 20;
        if (newLife <= 0) {
          setIsModalOpen(true);
          setIsComputerDead(true);
          setIsPlayerShooting(true);
          setIsComputerShooting(false); // Stop computer shooting GIF
        } else {
          setIsPlayerShooting(true);
          setIsComputerHurt(true);
          setIsComputerShooting(false); // Stop computer shooting GIF
        }
        return newLife;
      });
      winner = "player";
    } else {
      setPlayerLife((prevLife) => {
        const newLife = prevLife - 20;
        if (newLife <= 0) {
          setIsModalOpen(true);
          setIsPlayerDead(true);
          setIsPlayerShooting(false); // Stop player shooting GIF
          setIsComputerShooting(true);
        } else {
          setIsPlayerHurt(true);
          setIsComputerShooting(true);
          setIsPlayerShooting(false); // Stop player shooting GIF
        }
        return newLife;
      });
      winner = "computer";
    }
    setRoundWinner(winner);
    updateScoreMessage(winner, playerSelection, computerSelection);
  };

  const getRandomChoice = () => {
    const choices = ["ROCK", "PAPER", "SCISSORS"];
    const randomIndex = Math.floor(Math.random() * choices.length);
    return choices[randomIndex];
  };

  const handleClick = (playerSelection) => {
    const computerSelection = getRandomChoice();
    setPlayerSelection(playerSelection);
    setComputerSelection(computerSelection);
    playRound(playerSelection, computerSelection);
  };

  const restartGame = () => {
    setPlayerLife(100);
    setComputerLife(100);
    setRoundWinner("");
    setPlayerSelection("");
    setComputerSelection("");
    setIsModalOpen(false);
    setIsPlayerDead(false);
    setIsComputerDead(false);
  };

  const updateScoreMessage = (winner, playerSelection, computerSelection) => {
    if (isModalOpen) {
      return null; // Don't render the message when the modal is open
    }
    let message = "";
    if (winner === "player") {
      message = `${playerSelection} BEATS ${computerSelection}!`;
    } else if (winner === "computer") {
      message = `${playerSelection} IS BEATEN BY ${computerSelection}!`;
    } else {
      message = "TIE!";
    }
    return message;
  };

  return (
    <div className="scale-50 md:scale-75 lg:scale-100 h-[700px]">
      <div className="flex justify-center text-center text-lg py-10">
        Best of five decides humanity's fate!
      </div>

      <div className="mb-6">
        <div className="flex justify-center md:gap-32">
          <div className="flex items-center">
            {/* Player container */}
            <div className="relative">
              <div className="bg-red-600 h-10 w-96 border border-yellow-500 relative">
                <p className="text-lg mr-2 italic absolute left-2 top-1/2 transform -translate-y-1/2">
                  PLAYER
                </p>
                <div
                  className="bg-blue-700 h-full"
                  style={{ width: `${playerLife}%` }}
                ></div>
                <img
                  src={
                    isPlayerDead
                      ? DeadPlayer
                      : isPlayerHurt
                      ? HurtPlayer
                      : isPlayerShooting
                      ? ShootPlayer
                      : IdlePlayer
                  }
                  alt="Player"
                  className="absolute top-8 h-72 mt-10"
                />
              </div>
            </div>
          </div>
          <div className="flex items-center ml-4">
            {/* Computer container */}
            <div className="relative">
              <div className="bg-blue-700 h-10 w-96 border border-yellow-500 relative">
                <p className="text-lg mr-2 italic absolute right-2 top-1/2 transform -translate-y-1/2">
                  COMPUTER
                </p>
                <div
                  className="bg-red-600 h-full"
                  style={{ width: `${100 - computerLife}%` }}
                ></div>
                <img
                  src={
                    isComputerDead
                      ? DeadComputer
                      : isComputerHurt
                      ? HurtComputer
                      : isComputerShooting
                      ? ShootComputer
                      : IdleComputer
                  }
                  alt="Computer"
                  className="absolute top-14 h-64 mt-10"
                />
              </div>
            </div>
          </div>
        </div>
      </div>

      {!isModalOpen && (
        <div className="mb-6 flex justify-center">
          {/* Buttons container */}
          <div className="flex relative top-96">
            <button
              className="mx-2 font-bold py-2 px-4 rounded"
              onClick={() => handleClick("ROCK")}
              disabled={areButtonsDisabled}
            >
              <div className="border border-white px-5 py-6">
                <img src={defaultRock} alt="Rock" className="w-16" />
              </div>
            </button>
            <button
              className="mx-2 font-bold py-2 px-4 rounded"
              onClick={() => handleClick("PAPER")}
              disabled={areButtonsDisabled}
            >
              <div className="border border-white  px-3 py-6">
                <img src={defaultPaper} alt="Paper" className="w-20" />
              </div>
            </button>
            <button
              className="mx-2 font-bold py-2 px-4 rounded"
              onClick={() => handleClick("SCISSORS")}
              disabled={areButtonsDisabled}
            >
              <div className="border border-white px-3 py-6" >
                <img src={defaultScissors} alt="Scissors" className="w-20" />
              </div>
            </button>
          </div>
        </div>
      )}

      {roundWinner && (
        <div className="flex justify-center relative top-52">
          <p className="text-lg">
            {updateScoreMessage(
              roundWinner,
              playerSelection,
              computerSelection
            )}
          </p>
        </div>
      )}

      {isModalOpen && (
        <div className="fixed top-0 left-0 w-screen h-screen flex items-center justify-center">
          {/* Modal content */}
          <div className="p-8 text-center">
            <p className="text-lg">
              {playerLife > computerLife ? (
                <p>
                  Player wins! <br /> Humanity is saved!
                </p>
              ) : (
                <p>
                  Computer wins. <br /> Humanity is doomed.
                </p>
              )}
            </p>
            <button
              className="mt-14 font-bold py-2 px-4 border border-white"
              onClick={restartGame}
            >
              Play Again
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default Game;
