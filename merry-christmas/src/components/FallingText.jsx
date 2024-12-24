import React, { useEffect, useRef, useState } from 'react';
import './FallingText.scss';
import { Message, SNOWFLAKEIMAGE } from '../constants';
import AudioPlayer from './AudioPlayer';
import CreateModal from './CreateModal';
import { useParams } from 'react-router-dom';

const FallingText = () => {
  const firstWord = ['M', 'E', 'R', 'R', 'Y'];
  const secondWord = ['C', 'H', 'R', 'I', 'S', 'T', 'M', 'A', 'S'];
  const [newYearMessage, setNewYearMessage] = useState('');
  const snowFlakesNumbers = 200;
  const [message, setMessage] = useState('');
  const { encodedNames } = useParams();
  const [sender, setSender] = useState('Florence');
  const [receiver, setReceiver] = useState('Friend');
  const [show, setShow] = useState(false);
  const [openModal, setOpenModal] = useState(false);
  const snowContainerRef = useRef(null);


  const decodeNames = (encoded) => {
    const decoded = atob(encoded);
    return decoded.split('_');
  };


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

  const writeNewYearMessage = () => {
    const message = "AND A HAPPY NEW YEAR"
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
    setMessage(Message);

    if (encodedNames) {
      const decoded = decodeNames(encodedNames);

      if (decoded && decoded.length === 2) {
        console.log(decoded);
        setSender(decoded[0]);
        setReceiver(decoded[1]);
      } else {
        setSender('Florence');
        setReceiver('Friend');
      }

    } else {
      setSender('Florence');
      setReceiver('Friend');
    }

    const timer = setTimeout(() => {
      writeNewYearMessage();

      return () => clearTimeout(bodyTimer);
    },
      4500);

    return () => clearTimeout(timer);
  }, []);

  const closeModal = () => {
    setOpenModal(false);
  }

  return (
    <div className="main-container" ref={snowContainerRef}>
      {openModal && <CreateModal
        senderName={receiver}
        closeModal={closeModal}
        openModal={openModal}
      />}
      <div className='sub-container'>
        {show && (
          <><div className="falling-text-box header-text">
            {firstWord.map((letter, index) => (
              <span
                key={index}
                className="falling-text "
                style={{ '--index': index }}
              >
                {letter}
              </span>
            ))}
            <span className="falling-text ">&nbsp;</span>
            {secondWord.map((letter, index) => (
              <span
                key={index + firstWord.length}
                className="falling-text"
                style={{ '--index': index + firstWord.length }}
              >
                {letter}
              </span>
            ))}


          </div>
            <div className='header-text new-year'>

              <span className='header-text'>{newYearMessage}</span>
            </div>
            {(sender && receiver && message) && <div className='message-box'>
              <span className='vistor-greetings'>Dear {receiver}</span>
              <p>{message}</p>
              <div className='end-message'>
                <span>Yours Lovely;</span>
                <p>{sender}</p>
              </div>
              <button className='submit-btn' onClick={() => setOpenModal(true)}>Share</button>
              
            </div>}
          </>
        )}

      </div>



      <AudioPlayer />
    </div>
  );

}

export default FallingText;