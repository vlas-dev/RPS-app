import React, { useState } from "react";
import Game from "./components/Game";
import StartScreen from "./components/StartScreen";
import PreloadAssets from "./components/PreloadAssets";

const App = () => {
  const [gameStarted, setGameStarted] = useState(false);
  const [isMuted, setIsMuted] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  const handleStart = () => {
    setGameStarted(true);
  };

  const toggleMusicMute = () => {
    const newMutedState = !isMuted;
    setIsMuted(newMutedState);
    localStorage.setItem("isMuted", JSON.stringify(newMutedState));
  };

  React.useEffect(() => {
    const storedMutedState = localStorage.getItem("isMuted");
    if (storedMutedState !== null) {
      setIsMuted(JSON.parse(storedMutedState));
    }
  }, []);

  return (
    <div className="bg-black text-white">
      
      <PreloadAssets setIsLoading={setIsLoading} />

      <div>
      {isLoading ? (
       <div className="flex justify-center items-center h-screen text-3xl">
          Loading...
        </div>
        ) : gameStarted ? (
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
