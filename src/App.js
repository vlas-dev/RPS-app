import React, { useState, useEffect } from "react";
import Game from "./components/Game";
import StartScreen from "./components/StartScreen";


const App = () => {
  const [gameStarted, setGameStarted] = useState(false);
  const [isMuted, setIsMuted] = useState(false);

  const handleStart = () => {
    setGameStarted(true);
  };

  const toggleMusicMute = () => {
    const newMutedState = !isMuted;
    setIsMuted(newMutedState);
    localStorage.setItem("isMuted", JSON.stringify(newMutedState));
  };

  useEffect(() => {
    const storedMutedState = localStorage.getItem("isMuted");
    if (storedMutedState !== null) {
      setIsMuted(JSON.parse(storedMutedState));
    }
  }, []);

  return (
    <div className="bg-black text-white">
      <div>
        {gameStarted ? (
          <Game isMuted={isMuted} toggleMusicMute={toggleMusicMute} />
        ) : (
          <StartScreen
            isMuted={isMuted}
            toggleMusicMute={toggleMusicMute}
            onStart={handleStart}
          />
        )}
      </div>
    </div>
  );
};

export default App;
