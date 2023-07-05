import React, { useState } from 'react';
import Game from './components/Game';
import StartScreen from './components/StartScreen';

const App = () => {
  const [gameStarted, setGameStarted] = useState(false);

  const handleStart = () => {
    setGameStarted(true);
  };

  return (
    <div className=" bg-[#4e5d7c] text-white">

              

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
