import React, { useState, useEffect } from "react";

const StartScreen = ({ onStart }) => {
  const [displayText, setDisplayText] = useState("");
  const [fullText] = useState(
    "The machines rose from the ashes of the nuclear fire. Their war to exterminate mankind had raged on for decades. But the final battle would not be fought in a battlefield. It would be fought tonight... " +
      "\n" +
      "\n" +
      "In a game of rock paper scissors."
  );

  useEffect(() => {
    const timer = setInterval(() => {
      if (displayText.length === fullText.length) {
        clearInterval(timer);
      } else {
        setDisplayText(fullText.substring(0, displayText.length + 1));
      }
    }, 50);

    return () => {
      clearInterval(timer);
    };
  }, [displayText, fullText]);

  return (
    <div className=" h-screen flex flex-col items-center justify-center background-start">
      <div className="flex justify-center ">
        <div>
          <h1 className="text-3xl italic pt-10 text-center">
            ROCK PAPER SCISSORS: <br /> JUDGEMENT DAY
          </h1>
        </div>
      </div>
      <div className="flex flex-col justify-center py-4"></div>
      <div className="flex flex-col items-center mb-8 mt-8">
        <div className="text-center w-[500px] md:w-[550px] h-[300px] px-10 text-lg md:text-xl">
          <p style={{ whiteSpace: "pre-line" }}>{displayText}</p>
        </div>
        <button
          className="px-6 py-3 text-3xl mt-4 border border-white hover:bg-white hover:text-black transition-colors duration-100"
          onClick={onStart}
        >
          Start
        </button>
      </div>
    </div>
  );
};

export default StartScreen;
