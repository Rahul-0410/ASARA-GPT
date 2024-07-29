import React, { useContext, useState, useEffect } from 'react';
import './home.css';
import Img from "../assets/logo-no-background.png";
import SideBar from './sidebar';
import { Icon } from '@iconify/react/dist/iconify.js';
import { AuthContext } from '../AuthContext';
import { useNavigate, Navigate } from 'react-router-dom';
import SpeechRecognition, { useSpeechRecognition } from 'react-speech-recognition';

function Home() {
  const [inputValue, setInputValue] = useState('');
  const [isRecording, setIsRecording] = useState(false);
  const nav = useNavigate();
  const { isLoggedIn } = useContext(AuthContext);
  const startListening = () => SpeechRecognition.startListening({ continuous: true });
  const stopListening = () => SpeechRecognition.stopListening();

  const {
    transcript,
    resetTranscript,
  } = useSpeechRecognition();

  useEffect(() => {
    if (isRecording) {
      setInputValue(transcript);
    }
  }, [transcript]);

  const handleInputChange = (event) => {
    setInputValue(event.target.value);
  };

  if (!isLoggedIn) {
    return <Navigate to="/login" />;
  }

  const handleSendClick = () => {
    console.log('Input value:', inputValue);
    setInputValue('');
    resetTranscript();
  };

  const handleMicClick = () => {
    if (isRecording) {
      stopListening();
      resetTranscript();
      setIsRecording(false);
    } else {
      startListening();
      setIsRecording(true);
    }
  };

  return (
    <div className='home'>
      <div className="sidebar">
        <SideBar />
      </div>
      <div className="main">
        <div className='top'>
          <img src={Img} alt="logo" />
        </div>
        <div className='box'></div>
        <div className="input">
          <input 
            type="text"
            value={inputValue}
            onChange={handleInputChange}
            placeholder="Message Aasara-GPT"
            className="input-field"
          />
          <Icon icon="material-symbols:send" onClick={handleSendClick} />
          <Icon 
            icon="material-symbols:mic-outline" 
            className='mic' 
            onClick={handleMicClick} 
            style={{ color: isRecording ? 'red' : 'black' }}
          />
        </div>
      </div>
    </div>
  );
}

export default Home;
