import React, { useState, useEffect } from "react";
import IdleComputer from "../assets/IdleComputerBig.gif";
import IdlePlayer from "../assets/IdlePlayerBig.gif";
import DeadComputer from "../assets/DeadComputerBig.gif";
import DeadPlayer from "../assets/DeadPlayerBig.gif";
import HurtComputer from "../assets/HurtComputerBig.gif";
import HurtPlayer from "../assets/HurtPlayerBig.gif";
import ShootComputer from "../assets/ShootComputerBig.gif";
import ShootPlayer from "../assets/ShootPlayerBig.gif";
import playerRock from "../assets/playerRock.png";
import playerPaper from "../assets/playerPaper.png";
import playerScissors from "../assets/playerScissors.png";
import computerRock from "../assets/computerRock.png";
import computerPaper from "../assets/computerPaper.png";
import computerScissors from "../assets/computerScissors.png";

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
  const [isSelectionVisible, setIsSelectionVisible] = useState(false);

  useEffect(() => {
    const resetGIFs = setTimeout(() => {
      setIsPlayerHurt(false);
      setIsComputerHurt(false);
      setIsPlayerShooting(false);
      setIsComputerShooting(false);
    }, 900);

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

    setTimeout(() => {
      setRoundWinner("");
      setIsSelectionVisible(false);
    }, 1000);

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
    setIsSelectionVisible(true);
    setTimeout(() => {
      playRound(playerSelection, computerSelection);
    }, 900);
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

    

    if (winner === "player") {
      return "YOU WIN!";
    } else if (winner === "computer") {
      return "YOU LOSE!";
    } else {
      return "TIE!";
    }
  };


  
  return (
    <div className="h-screen overflow-hidden background-game">
      <div className="flex justify-center text-center text-lg py-10">
        Best of five decides humanity's fate!
      </div>

      <div className="scale-50 md:scale-75 lg:scale-100  mb-6">
        <div className="flex justify-center gap-10 md:gap-32">
          <div className="flex items-center">
            {/* Player container */}
            <div className="relative">
              <div className="bg-red-600 h-10 w-96 border border-yellow-500 relative">
                <p className="text-lg mr-2 italic absolute left-2 top-1/2 transform -translate-y-1/2">
                  YOU{" "}
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
                  className="absolute top-48 md:top-40 right-32 scale-150"
                />
              </div>
            </div>
          </div>

          <div className="flex items-center">
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
                  className="absolute top-48 md:top-40 left-32 scale-150"
                />
              </div>
            </div>
          </div>
        </div>
      </div>

      {!isModalOpen && (
                <div>
      {isSelectionVisible ? (
  <div className="flex justify-center relative top-10 md:top-32 gap-4">
    <div
      className={`flex items-center border border-white p-4 ${
        roundWinner === "computer" ? "brightness-0" : ""
      }`}
    >
      <img
        src={
          playerSelection === "ROCK"
            ? playerRock
            : playerSelection === "PAPER"
            ? playerPaper
            : playerScissors
        }
        alt={playerSelection}
        className="w-20"
      />
    </div>
    <div
      className={`flex items-center border border-white p-4 ${
        roundWinner === "player" ? "brightness-0" : ""
      }`}
    >
      <img
        src={
          computerSelection === "ROCK"
            ? computerRock
            : computerSelection === "PAPER"
            ? computerPaper
            : computerScissors
        }
        alt={computerSelection}
        className="w-20"
      />
    </div>
  </div>



) : (
            <div className="flex flex-col items-center justify-center relative top-52 md:top-96 m-6 ">
  <p className="mb-4 text-white text-xl">CHOOSE YOUR WEAPON!</p>
  <div className="flex gap-4">
    <button
      className="border border-white px-5 py-3 hover:scale-110 saturate-0 brightness-150 hover:saturate-100 hover:brightness-100"
      onClick={() => handleClick("ROCK")}
      disabled={areButtonsDisabled}
    >
      <img src={playerRock} alt="Rock" className="w-14" />
    </button>
    <button
      className="border border-white px-2 py-3 hover:scale-110 saturate-0 brightness-150 hover:saturate-100 hover:brightness-100"
      onClick={() => handleClick("PAPER")}
      disabled={areButtonsDisabled}
    >
      <img src={playerPaper} alt="Paper" className="w-20" />
    </button>
    <button
      className="border border-white px-2 py-3 hover:scale-110 saturate-0 brightness-150 hover:saturate-100 hover:brightness-100"
      onClick={() => handleClick("SCISSORS")}
      disabled={areButtonsDisabled}
    >
      <img src={playerScissors} alt="Scissors" className="w-20" />
    </button>
  </div>
</div>

          )}
        </div>
      )}

      {roundWinner && (
        <div className="flex justify-center z-50 relative bottom-10 scale-50 md:scale-75 lg:scale-100 ">
          <div className="text-4xl text-center">
            {updateScoreMessage(
              roundWinner,
              playerSelection,
              computerSelection
            )}
          </div>
          <div></div>
        </div>
      )}

      {isModalOpen && (
        
        <div className="flex justify-center">
          {/* Modal content */}
          <div className="md:p-8 text-center z-50">
            <p className="md:text-3xl">
              {playerLife > computerLife ? (
                <p>
                  Victory! <br /> Humanity is saved! 
                </p>
              ) : (
                <p>
                  Defeat. <br /> Humanity is terminated.
                </p>
              )}
            </p>
            <button
              className="border-2 border-white p-2 mt-8 hover:bg-white hover:text-black transition-colors duration-100"
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
