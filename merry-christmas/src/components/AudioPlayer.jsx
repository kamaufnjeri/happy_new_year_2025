import React, { useEffect, useRef } from 'react';

const AudioPlayer = () => {
  const audioRef = useRef(null);

  const playBackgroundSound = () => {
    const audio = audioRef.current;
    audio.play().then(() => {
        audio.muted = false;
      console.log("Background audio is playing");
    }).catch((error) => {
      console.error("Audio playback failed", error);
    });
  };

  useEffect(() => {
    const handleClick = () => {
      playBackgroundSound();
      document.removeEventListener("mousedown", handleClick);
    };

    document.addEventListener("mousedown", handleClick);

    return () => {
      document.removeEventListener("mousedown", handleClick);
    };
  }, []);

  return (
    <div>
      <audio ref={audioRef}
        autoPlay 
        loop 
        muted
        className='audio'>
        <source src="/assets/jingle_bells.mp3" type="audio/mpeg" />
        Your browser does not support the audio element.
      </audio>
    </div>
  );
};

export default AudioPlayer;
