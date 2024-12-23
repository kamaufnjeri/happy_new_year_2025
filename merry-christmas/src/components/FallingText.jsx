import React, { useEffect, useRef, useState } from 'react';
import './FallingText.scss';
import { SNOWFLAKEIMAGE } from '../constants';
import { useLocation } from 'react-router-dom';
import AudioPlayer from './AudioPlayer';


const FallingText = () => {
  const firstWord = ['M', 'E', 'R', 'R', 'Y'];
  const secondWord = ['C', 'H', 'R', 'I', 'S', 'T', 'M', 'A', 'S'];
  const [newYearMessage, setNewYearMessage] = useState('');
  const [bodyMessage, setBodyMessage] = useState('');
  const [greetings, setGreetings] = useState();
  const location = useLocation();
  const snowFlakesNumbers = 200;


  const snowContainerRef = useRef(null);

  useEffect(() => {
    const snowContainer = snowContainerRef.current;

    for (let i = 0; i < snowFlakesNumbers; i++) {
      const snowflake = document.createElement('img');
      snowflake.src = SNOWFLAKEIMAGE;
      snowflake.classList.add('snow-flake');

      snowflake.style.left = `${Math.random() * 100}vw`;

      const fallDuration = Math.random() * 3 + 2;
      snowflake.style.animationDuration = `${fallDuration}s, ${fallDuration / 2}s`;

      const size = Math.random() * 20 + 10;
      snowflake.style.width = `${size}px`;
      snowflake.style.height = `${size}px`;

      snowContainer.appendChild(snowflake);
    }
  }, []);



  const [show, setShow] = useState(false);

  const getGreetings = () => {
    const params = new URLSearchParams(location.search);
    const nameParams = params.get('name')
    
  
  

    if (nameParams) {
      const updatedName = nameParams.replace(/_/g, ' ') 
      .replace(/\b\w/g, char => char.toUpperCase()); 
      setGreetings(`Dear ${updatedName}!`)

    } else {
      setGreetings('Dear Friend!')
    }
    setBodyMessage("May this festive season bring you joy, peace, and the warmth of God's blessings. As we step into the new year, may it be filled with happiness, prosperity, and the fulfillment of your dreams. May God's love guide you, and may this year be your best one yet, full of hope, grace, and new beginnings. Here's to a blessed year ahead, full of growth, peace, and success in all that you do.");
  }

  const writeNewYearMessage = () => {
    const message = "and a Happy New Year"
    let index = 0;
    const typeLetterByLetter = () => {
      if (index < message.length) {
        setNewYearMessage((prev) => prev + message[index - 1]);
        index++;
        setTimeout(typeLetterByLetter, 100);
      }
    };

    typeLetterByLetter();

    return () => clearTimeout(typeLetterByLetter);
  }



  useEffect(() => {
    setShow(true);
    const timer = setTimeout(() => {
      writeNewYearMessage();

      return () => clearTimeout(bodyTimer);
    },
      4500);
    getGreetings();
    return () => clearTimeout(timer);
  }, []);

  return (
    <div className="main-container" ref={snowContainerRef}>

      <div className='sub-container'>
        {show && (
          <><div className="falling-text-box">
            {firstWord.map((letter, index) => (
              <span
                key={index}
                className="falling-text header-text"
                style={{ '--index': index }}
              >
                {letter}
              </span>
            ))}
            <span className="falling-text header-text">&nbsp;</span>
            {secondWord.map((letter, index) => (
              <span
                key={index + firstWord.length}
                className="falling-text header-text"
                style={{ '--index': index + firstWord.length }}
              >
                {letter}
              </span>
            ))}


          </div>
            <div>
              <span className='header-text new-year-text'>{newYearMessage}</span>
            </div>
            <div className='message-box'>
              <span className='vistor-greetings'>{greetings}</span>
              <p>{bodyMessage}</p>
              <div className='end-message'>
                <span>Yours Lovely;</span>
                <p>Florence</p>
              </div>
            </div>
          </>
        )}


      </div>

      <video autoPlay loop muted className='dancing-santa'>
        <source src="/assets/dancing_santa.webm" type="video/webm" />
        Your browser does not support the video tag.
      </video>
      <AudioPlayer/>
    </div>
  );

}

export default FallingText;