import React, { useState } from 'react';
import Game from './components/Game';
import StartScreen from './components/StartScreen';

const App = () => {
  const [gameStarted, setGameStarted] = useState(false);

  const handleStart = () => {
    setGameStarted(true);
  };

  return (
    <div className="min-h-screen bg-[#191a1c] text-white">

              

      <div>
        {gameStarted ? (
          <Game />
        ) : (
          <StartScreen onStart={handleStart} />
        )}
      </div>
    </div>
  );
};

export default App;
