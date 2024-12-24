import React, { useEffect, useRef, useState } from 'react'
import './CreateModal.scss';
import { SNOWFLAKEIMAGE, myWebsiteUrl } from '../constants';


const CreateModal = ({ closeModal, openModal, senderName }) => {
  const [formData, setFormData] = useState({
    receiver: "",
    sender: ""
  });
  const [url, setUrl] = useState('');
  const [WhatsAppLink, setWhatsAppLink] = useState('');
  const snowContainerRef = useRef(null);
  const snowFlakesNumbers = 200;


 
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

  const generateUrl = (sender, receiver) => {
    const encodedNames = btoa(`${sender}_${receiver}`);
    const generatedUrl = `${myWebsiteUrl}${encodedNames}`;

    return generatedUrl;
  };

  const generateWhatsAppLink = (sender, receiver, url) => {
    const message = `
    *Merry Christmas* ${receiver}!

    From: *${sender}* 

    Check out your special message here: ${url}

    Share the holiday spirit!
  `;
    const encodedMessage = encodeURIComponent(message);

    setWhatsAppLink(`https://wa.me/?text=${encodedMessage}`);

  };
  const handleSubmit = (e) => {
    e.preventDefault();

    const newUrl = generateUrl(formData.sender, formData.receiver);
    generateWhatsAppLink(formData.sender, formData.receiver, newUrl);
    setUrl(newUrl);
    setFormData({ sender: '', receiver: '' })
  };



  useEffect(() => {
    if (openModal) {
      console.log(senderName);
      setFormData((prev) => ({
        ...prev,
        sender: senderName
      }))
    }
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };


  return (
    <div className='modal' ref={snowContainerRef}>
      <form onSubmit={handleSubmit} className='form-container'>
        <button className='close-btn' type='button' onClick={closeModal}>&times;</button>

        <h1>Share with a friend</h1>
        <span>
          <label htmlFor="sender">Your Name</label>
          <input type="text"
            name="sender" id="sender"
            placeholder='Enter your name'
            required
            value={formData.sender}
            onChange={(e) => handleChange(e)}
          />
        </span>
        <span>
          <label htmlFor="receiver">Receiver Name</label>
          <input type="text" name="receiver"
            id="receiver" placeholder='Enter name of receiver'
            value={formData.receiver}
            required
            onChange={(e) => handleChange(e)}
          />
        </span>

        <button type="submit" className='share-btn' >Share</button>

        {(url && WhatsAppLink) && (
          <div  className='url-box'>
            <h2>Share url below with friend:</h2>
            <p>{url}</p>
           <br />
            <a href={WhatsAppLink} target="_blank" rel="noopener noreferrer" className='whatsapp-btn'>
              Share Merry Christmas Link via WhatsApp
            </a>
          </div>
        )}
      </form>
    </div>
  )
}

export default CreateModal
