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
import { getChat } from '../api/Auth-util';

function Home() {
  const genAI = new GoogleGenerativeAI('AIzaSyA0fVZOqiiv4CZu2K4uZginsJt9K7VoeT8');
  const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });
  const [inputValue, setInputValue] = useState('');
  const [isRecording, setIsRecording] = useState(false);
  const nav = useNavigate();
  const { isLoggedIn } = useContext(AuthContext);
  const startListening = () => SpeechRecognition.startListening({ continuous: true });
  const stopListening = () => SpeechRecognition.stopListening();
  const [chats, setChats] = useState('');

  useEffect(() => {
    const interval = setInterval(async () => {
      const call = await getChat();
      setChats(call);
    }, 1000); 
  

    return () => clearInterval(interval);
  }, []); 
  
  
  
  
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
    const previousChats = chats.slice(-2);
    console.log(previousChats)
    const prompt = `
      Previous conversation with you:
      1. "${JSON.stringify(previousChats[0])}"
      2. "${JSON.stringify(previousChats[1])}"

      User's current question: "${inputValue}"

      Please provide a thoughtful and compassionate response, considering both the previous conversation and the user's current input, to address their mental health concerns.
      and give very small responses take ii as interactive chat and respnse like human
      `;
    console.log('Input value:', prompt);
    const result = await model.generateContent(prompt);
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
