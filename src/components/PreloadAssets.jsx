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

const PreloadAssets = () => {
    const assets = [
      IdleComputer, IdlePlayer, DeadComputer, DeadPlayer,
      HurtComputer, HurtPlayer, ShootComputer, ShootPlayer,
      playerRock, playerPaper, playerScissors,
      computerRock, computerPaper, computerScissors,
      soundOn, soundOff, backgroundImage,
      linkedin, github, mail,
      gameMusic, roundWon, roundLost,
      youWinSound, youLoseSound, playerShootSound,
      computerShootSound, clashSound, tieSound,
      startSound
    ];
  
    return (
      <div style={{ display: "none" }}>
        {assets.map((asset, index) => (
          <img key={index} src={asset} alt="Preload" />
        ))}
      </div>
    );
  };
  
  export default PreloadAssets;
