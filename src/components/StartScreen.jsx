import React, { useState, useEffect, useCallback } from "react";
import startSound from "../sounds/start.mp3";
import startMusic from "../sounds/theme.mp3";
import keySound from "../sounds/key.mp3";
import soundOn from "../assets/soundOn.png";
import soundOff from "../assets/soundOff.png";

const StartScreen = ({ isMuted, toggleMusicMute, onStart }) => {
  const playSoundEffect = useCallback(
    (soundFile) => {
      if (!isMuted) {
        const soundEffect = new Audio(soundFile);
        soundEffect.play();
      }
    },
    [isMuted]
  );

  const [displayText, setDisplayText] = useState("");
  const [fullText] = useState(
    " " +
      " " +
      " " +
      " " +
      "The machines rose from the ashes of the nuclear fire. " +
      "\n" +
      "Their war to exterminate mankind had raged on for decades. " +
      "\n" +
      "But the final battle would not be fought in a battlefield. " +
      "\n" +
      "It would be fought here. " +
      "\n" +
      "\n" +
      "In a game of rock paper scissors..."
  );
  const [playClicked, setPlayClicked] = useState(false);

  useEffect(() => {
    if (playClicked) {
      const timer = setInterval(() => {
        if (displayText.length === fullText.length) {
          clearInterval(timer);
        } else {
          const currentCharacter = fullText[displayText.length]; // Get the next character to be displayed
          setDisplayText(fullText.substring(0, displayText.length + 1));

          if (currentCharacter !== " " && currentCharacter !== "\n") {
            playSoundEffect(keySound);
          }
        }
      }, 50);

      return () => {
        clearInterval(timer);
      };
    }
  }, [displayText, fullText, playClicked, playSoundEffect]);

  useEffect(() => {
    let backgroundAudio = new Audio(startMusic);

    if (!isMuted && playClicked) {
      backgroundAudio.play();
    } else {
      backgroundAudio.pause();
      backgroundAudio.currentTime = 0;
    }

    return () => {
      backgroundAudio.pause();
      backgroundAudio.currentTime = 0;
    };
  }, [isMuted, playClicked]);

  return (
    <div className="bg-black h-screen flex flex-col items-center justify-center background-start">
      <div className="flex flex-col items-center m-8">
        {playClicked ? (
          <div>
            <div className="flex justify-center">
              <div>
                <h1 className="text-2xl md:text-3xl italic text-right mb-14">
                  ROCK PAPER SCISSORS: <br /> JUDGEMENT DAY
                </h1>
              </div>
            </div>
            <div className="w-[500px] md:w-[550px] h-[320px] px-10 text-lg md:text-xl">
              <p style={{ whiteSpace: "pre-line" }}>{displayText}</p>
            </div>
            <div className="flex justify-center">
              <button
                className="px-6 py-3 text-3xl border border-white hover:bg-white hover:text-black"
                onClick={() => {
                  onStart();
                  playSoundEffect(startSound);
                }}
              >
                Start
              </button>
            </div>
          </div>
        ) : (
          <div className="mb-32">
            <div className="flex justify-center">
              <h1 className="text-3xl italic text-center mb-20 md:m-14">
                ROCK PAPER SCISSORS: <br /> JUDGEMENT DAY
              </h1>
            </div>
            <div className="text-center">
              <button
                className="px-6 py-3 text-3xl border border-white hover:bg-white hover:text-black"
                onClick={() => {
                  setPlayClicked(true);

                  playSoundEffect(startSound);
                }}
              >
                Play
              </button>
            </div>
          </div>
        )}

        <button
          className="fixed bottom-6 md:bottom-10 right-8 cursor-pointer"
          onClick={toggleMusicMute}
        >
          <img
            src={isMuted ? soundOff : soundOn}
            alt={isMuted ? "Sound Off" : "Sound On"}
            className="w-8 h-8"
          />
        </button>
      </div>
    </div>
  );
};

export default StartScreen;
