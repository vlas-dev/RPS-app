import { useEffect } from "react";

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
import startMusic from "../sounds/theme.mp3";
import keySound from "../sounds/key.mp3";


const PreloadAssets = ({ setIsLoading }) => {
  useEffect(() => {
    const preloadAssets = async () => {
      const images = [
        IdleComputer,
        IdlePlayer,
        DeadComputer,
        DeadPlayer,
        HurtComputer,
        HurtPlayer,
        ShootComputer,
        ShootPlayer,
        playerRock,
        playerPaper,
        playerScissors,
        computerRock,
        computerPaper,
        computerScissors,
        soundOn,
        soundOff,
        backgroundImage,
        linkedin,
        github,
        mail,
      ];

      const sounds = [
        startMusic,
        keySound,
        gameMusic,
        roundWon,
        roundLost,
        youWinSound,
        youLoseSound,
        playerShootSound,
        computerShootSound,
        clashSound,
        tieSound,
        startSound,
      ];

      const imagePromises = images.map((image) =>
        new Promise((resolve, reject) => {
          const img = new Image();
          img.src = image;
          img.onload = resolve;
          img.onerror = reject;
        })
      );

      const soundPromises = sounds.map((sound) =>
        new Promise((resolve, reject) => {
          const audio = new Audio();
          audio.src = sound;
          audio.oncanplaythrough = resolve;
          audio.onerror = reject;
        })
      );

      await Promise.all([...imagePromises, ...soundPromises]);

      // Set loading to false once all assets are loaded
      setIsLoading(false);
    };

    preloadAssets();
  }, [setIsLoading]);

  return null;
};

export default PreloadAssets;
