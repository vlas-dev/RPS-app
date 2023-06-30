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
<div className="flex justify-center ">
  <div>
    <h1 className="text-3xl italic pt-10 text-center">
      ROCK PAPER SCISSORS: <br /> JUDGEMENT DAY
    </h1>
  </div>
</div>
              

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
