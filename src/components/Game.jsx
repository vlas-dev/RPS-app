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
import soundOn from "../assets/soundOn.png";
import soundOff from "../assets/soundOff.png";
import gameMusic from "../sounds/gameMusic.mp3";
import roundWon from "../sounds/roundWon.mp3";
import roundLost from "../sounds/roundLost.mp3";
import youWinSound from "../sounds/victory.mp3";
import youLoseSound from "../sounds/defeat.mp3";
import playerShootSound from "../sounds/playerShoot.mp3";
import computerShootSound from "../sounds/computerShoot.mp3";
import clashSound from "../sounds/clashSound.mp3";
import tieSound from "../sounds/tieSound.mp3";
import startSound from "../sounds/start.mp3";
import backgroundImage from "../assets/gameStageBig.png";
import linkedin from "../assets/linkedin.png";
import github from "../assets/github.png";
import mail from "../assets/mail.png";

const Game = ({ isMuted, toggleMusicMute }) => {
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
  const [isSelectionVisible, setIsSelectionVisible] = useState(false);
  const [isGameOver, setIsGameOver] = useState(false);

  useEffect(() => {
    let backgroundAudio = new Audio(gameMusic);
    backgroundAudio.loop = true;

    const handleCanPlayThrough = () => {
      if (!isMuted && !isGameOver) {
        backgroundAudio.play();
      }
    };

    backgroundAudio.addEventListener("canplaythrough", handleCanPlayThrough);

    return () => {
      backgroundAudio.removeEventListener(
        "canplaythrough",
        handleCanPlayThrough
      );
      backgroundAudio.pause();
    };
  }, [isMuted, isGameOver]);

  useEffect(() => {
    const resetGIFs = setTimeout(() => {
      setIsPlayerHurt(false);
      setIsComputerHurt(false);
      setIsPlayerShooting(false);
      setIsComputerShooting(false);
    }, 900);

    return () => clearTimeout(resetGIFs);
  }, [isPlayerHurt, isComputerHurt, isPlayerShooting, isComputerShooting]);

  const playRound = (playerSelection, computerSelection) => {
    let winner = "";
    if (playerSelection === computerSelection) {
      winner = "tie";
      playSoundEffect(tieSound);
    } else if (
      (playerSelection === "ROCK" && computerSelection === "SCISSORS") ||
      (playerSelection === "SCISSORS" && computerSelection === "PAPER") ||
      (playerSelection === "PAPER" && computerSelection === "ROCK")
    ) {
      winner = "player";
      playSoundEffect(roundWon);
    } else {
      winner = "computer";
      playSoundEffect(roundLost);
    }
    setRoundWinner(winner);

    setTimeout(() => {
      setIsSelectionVisible(false);
    }, 1000);

    updateScoreMessage(winner, playerSelection, computerSelection);

    setTimeout(() => {
      if (winner === "player") {
        setComputerLife((prevLife) => {
          const newLife = prevLife - 20;
          if (newLife <= 0) {
            setIsComputerDead(true);
            setIsPlayerShooting(true);
            playSoundEffect(playerShootSound);
            setIsGameOver(true);
            setTimeout(() => {
              setIsModalOpen(true);
              playSoundEffect(youWinSound);
            }, 1000);
          } else {
            setIsPlayerShooting(true);
            playSoundEffect(playerShootSound);
            setIsComputerHurt(true);
            setIsComputerShooting(false); // Stop computer shooting GIF
          }
          return newLife;
        });
      } else if (winner === "computer") {
        setPlayerLife((prevLife) => {
          const newLife = prevLife - 20;
          if (newLife <= 0) {
            setIsPlayerDead(true);
            setIsComputerShooting(true);
            playSoundEffect(computerShootSound);
            setIsGameOver(true);
            setTimeout(() => {
              setIsModalOpen(true);
              playSoundEffect(youLoseSound);
            }, 1000);
          } else {
            setIsPlayerHurt(true);
            setIsComputerShooting(true);
            playSoundEffect(computerShootSound);
            setIsPlayerShooting(false); // Stop player shooting GIF
          }
          return newLife;
        });
      }
    }, 1000);
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
    setRoundWinner("");

    setIsSelectionVisible(true);
    playSoundEffect(clashSound);
    setTimeout(() => {
      playRound(playerSelection, computerSelection);
    }, 600);
  };

  const playSoundEffect = (soundFile) => {
    if (!isMuted) {
      const soundEffect = new Audio(soundFile);
      soundEffect.play();
    }
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
    setIsGameOver(false);
  };

  const updateScoreMessage = (winner, playerSelection, computerSelection) => {
    if (isModalOpen || !isSelectionVisible) {
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

  const copyEmail = () => {
    const email = "musiccofabian@gmail.com";
    navigator.clipboard.writeText(email);
    showMessage("Email copied!");
  };

  const showMessage = (message) => {
    const popup = document.createElement("div");
    popup.className =
      "border border-white text-white lg:text-xl p-8 z-10 fixed top-1/3 left-1/2 transform -translate-x-1/2 -translate-y-1/2 md:mt-10";
    popup.textContent = message;
    document.body.appendChild(popup);

    setTimeout(() => {
      document.body.removeChild(popup);
    }, 500);
  };

  return (
    <div className="h-screen overflow-hidden flex md:items-center justify-center">
      <div>
        <div
          className="md:scale-50 lg:scale-75 h-[400px] w-[700px] md:h-[700px] md:w-[1500px] items-center mb-10 md:mb-0 border border-white bg-cover bg-no-repeat2"
          style={{ backgroundImage: `url(${backgroundImage})` }}
        >
          <div className="scale-50 md:scale-100">
            <div className="flex justify-center text-center text-2xl mb-4 md:my-10 z-50">
              First to get five hits decides humanity's fate!
            </div>
            <div className="flex justify-center gap-10 md:gap-32">
              <div className="flex items-center">
                {/* Player container */}
                <div className="relative">
                  <div className="bg-red-600 h-10 w-96 border border-yellow-500">
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
                      className="absolute top-32 md:top-20 right-0 max-w-2xl"
                    />
                  </div>
                </div>
              </div>

              <div className="flex items-center">
                {/* Computer container */}
                <div className="relative">
                  <div className="bg-blue-700 h-10 w-96 border border-yellow-500">
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
                      className="absolute top-32 md:top-20 left-0 max-w-2xl"
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>

          {isSelectionVisible && (
            <div className="flex justify-center relative top-20 md:top-40 gap-4">
              <div className="flex items-center border border-white p-4 ">
                <img
                  src={
                    playerSelection === "ROCK"
                      ? playerRock
                      : playerSelection === "PAPER"
                      ? playerPaper
                      : playerScissors
                  }
                  alt={playerSelection}
                  className={`w-10 md:w-28 ${
                    roundWinner === "computer" ? "brightness-0" : ""
                  }`}
                />
              </div>
              <div className="flex items-center border border-white p-4">
                <img
                  src={
                    computerSelection === "ROCK"
                      ? computerRock
                      : computerSelection === "PAPER"
                      ? computerPaper
                      : computerScissors
                  }
                  alt={computerSelection}
                  className={`w-10 md:w-28 ${
                    roundWinner === "player" ? "brightness-0" : ""
                  }`}
                />
              </div>
            </div>
          )}

          {roundWinner && (
            <div className="flex justify-center z-50 relative bottom-8 md:bottom-10 scale-50 md:scale-100 ">
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
              <div className=" text-center z-50">
                <div className="md:text-4xl relative md:top-20">
                  {playerLife > computerLife ? (
                    <p>
                      Victory! <br /> Humanity is saved!
                    </p>
                  ) : (
                    <p>
                      Defeat. <br /> Humanity is terminated.
                    </p>
                  )}
                </div>
                <button
                  className="border-2 border-white p-2 mt-8 md:mt-32 hover:bg-white hover:text-black relative  md:text-3xl "
                  onClick={() => {
                    restartGame();

                    playSoundEffect(startSound);
                  }}
                >
                  REPLAY
                </button>
              </div>
            </div>
          )}
        </div>

        <div
          className={`flex flex-col items-center justify-center relative bottom-8 md:bottom-40 lg:bottom-20 ${
            isSelectionVisible ||
            isModalOpen ||
            isPlayerHurt ||
            isPlayerShooting ||
            isComputerHurt ||
            isComputerShooting ||
            isGameOver
              ? "brightness-0"
              : ""
          }`}
        >
          <p className="mb-4 text-white text-xl">CHOOSE YOUR WEAPON!</p>
          <div className="flex gap-4">
            <button
              className="border border-white px-2 py-3 saturate-0 brightness-150 hover:saturate-100 hover:brightness-100"
              onClick={() => handleClick("ROCK")}
              disabled={
                isSelectionVisible ||
                isModalOpen ||
                isPlayerHurt ||
                isPlayerShooting ||
                isComputerHurt ||
                isComputerShooting ||
                isGameOver
              }
            >
              <img src={playerRock} alt="Rock" className="w-20" />
            </button>
            <button
              className="border border-white px-2 py-3 saturate-0 brightness-150 hover:saturate-100 hover:brightness-100"
              onClick={() => handleClick("PAPER")}
              disabled={
                isSelectionVisible ||
                isModalOpen ||
                isPlayerHurt ||
                isPlayerShooting ||
                isComputerHurt ||
                isComputerShooting ||
                isGameOver
              }
            >
              <img src={playerPaper} alt="Paper" className="w-20" />
            </button>
            <button
              className="border border-white px-2 py-3 saturate-0 brightness-150 hover:saturate-100 hover:brightness-100"
              onClick={() => handleClick("SCISSORS")}
              disabled={
                isSelectionVisible ||
                isModalOpen ||
                isPlayerHurt ||
                isPlayerShooting ||
                isComputerHurt ||
                isComputerShooting ||
                isGameOver
              }
            >
              <img src={playerScissors} alt="Scissors" className="w-20" />
            </button>
          </div>
        </div>
      </div>

      <button
        className="fixed bottom-7 md:bottom-10 right-9 z-50 cursor-pointer"
        onClick={toggleMusicMute}
      >
        <img
          src={isMuted ? soundOff : soundOn}
          alt={isMuted ? "Sound Off" : "Sound On"}
          className="w-8 h-8"
        />
      </button>

      <div className="fixed gap-10 bottom-6 left-0 right-0 flex justify-center  lg:flex-col lg:left-auto lg:right-8 lg:top-1/2 lg:bottom-auto lg:transform lg:-translate-y-1/2 ">
        <a
          href="https://www.linkedin.com/in/fabi%C3%A1n-musicco-a164231b4/"
          target="_blank"
          rel="noopener noreferrer"
        >
          <button className="cursor-pointer">
            <img src={linkedin} alt="Linkedin button" className="w-10 h-10" />
          </button>
        </a>

        <a
          href="https://github.com/vlas-dev"
          target="_blank"
          rel="noopener noreferrer"
        >
          <button className="cursor-pointer">
            <img src={github} alt="Github button" className="w-10 h-10" />
          </button>
        </a>

        <button className="cursor-pointer">
          <img
            src={mail}
            alt="Email button"
            className="w-10 h-10 relative bottom-1 lg:bottom-auto"
            onClick={() => {
              copyEmail();

              playSoundEffect(startSound);
            }}
          />
        </button>
      </div>
    </div>
  );
};

export default Game;
