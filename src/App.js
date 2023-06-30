import React from "react";
import Game from "./components/Game";

const App = () => {
  return (
    <div className="min-h-screen bg-[#191a1c] text-white">
      <div className="flex justify-center ">
        <div>
          <h1 className="text-3xl italic pt-10 text-center">
            ROCK PAPER SCISSORS
          </h1>
        </div>
      </div>

      <Game />
    </div>
  );
};

export default App;
