import React, { useContext, useState, useEffect } from 'react';
import './home.css';
import Img from "../assets/white-logo-nobackground.png";
import SideBar from './sidebar';
import { Icon } from '@iconify/react/dist/iconify.js';
import { AuthContext } from '../AuthContext';
import { useNavigate, Navigate } from 'react-router-dom';
import SpeechRecognition, { useSpeechRecognition } from 'react-speech-recognition';
import { GoogleGenerativeAI } from "@google/generative-ai";
import { Chat } from '../api/Auth-util';

function Home() {
  const genAI = new GoogleGenerativeAI('AIzaSyA0fVZOqiiv4CZu2K4uZginsJt9K7VoeT8');
  const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });
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

  const handleSendClick =async () => {
    console.log('Input value:', inputValue);
    const result = await model.generateContent(inputValue);
    console.log(result.response.text());
    Chat({question:inputValue,answer:result.response.text()});
    setInputValue('');
    resetTranscript();
  };

  const handleMicClick = () => {
    if (isRecording) {
      stopListening();
      setIsRecording(false);
    } else {
      startListening();
      setIsRecording(true);
    }
  };
  if (!isLoggedIn) {
    return <Navigate to="/login" />;
  }

  return (
    <div className='home'>
      <div className="sidebar">
        <SideBar />
      </div>
      <div className="main">
        <div className='top'>
          <img src={Img} alt="logo" />
        </div>
        <div className='box'>

          
        </div>
        <div className="input">
          <input 
            type="text"
            value={inputValue}
            onKeyDown={(e) => { 
              if (e.key === "Enter") { 
                handleSendClick();
              } 
          }} 
            onChange={handleInputChange}
            placeholder="Message Aasra-GPT"
            className="input-field"
          />
          <Icon icon="material-symbols:send" onClick={handleSendClick}
           />
          <Icon 
            icon="material-symbols:mic-outline" 
            className='mic' 
            onClick={handleMicClick} 
            style={{ color: isRecording ? 'red' : 'white' }}
          />
        </div>
      </div>
    </div>
  );
}

export default Home;
