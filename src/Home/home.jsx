import React, { useContext, useState, useEffect } from 'react';
import './home.css';
import Img from "../assets/white-logo-nobackground.png";
import SideBar from './sidebar';
import { Icon } from '@iconify/react/dist/iconify.js';
import { AuthContext } from '../AuthContext';
import {json, Navigate } from 'react-router-dom';
import SpeechRecognition, { useSpeechRecognition } from 'react-speech-recognition';
import { GoogleGenerativeAI } from "@google/generative-ai";
import { Chat, getChat,getQuestion } from '../api/Auth-util';
import ChatComponent from '../Chat/Chat'; 

function Home() {
  const genAI = new GoogleGenerativeAI('AIzaSyA0fVZOqiiv4CZu2K4uZginsJt9K7VoeT8');
  const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });
  const [inputValue, setInputValue] = useState('');
  const [isRecording, setIsRecording] = useState(false);
  // const nav = useNavigate();
  const { isLoggedIn } = useContext(AuthContext);
  const startListening = () => SpeechRecognition.startListening({ continuous: true });
  const stopListening = () => SpeechRecognition.stopListening();
  const [chats, setChats] = useState([]);
  const [questions,setQuestions]=useState([]);
  const queue=async function(){
    const question=await getQuestion();
    setQuestions(question);
  }
  queue();
  const {
    transcript,
    resetTranscript,
  } = useSpeechRecognition();

  useEffect(() => {
    const fetchChats = async () => {
      const fetchedChats = await getChat();
      setChats(fetchedChats);
    };
    console.log(chats);
    
    fetchChats();
    const interval = setInterval(fetchChats, 1000);

    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    if (isRecording) {
      setInputValue(transcript);
    }
  }, [transcript]);

  const handleInputChange = (event) => {
    setInputValue(event.target.value);
  };

  const handleSendClick = async () => {
    if (!inputValue.trim()) return;

    const previousChats = chats.slice(-2);
    const prompt = `
    user mental state:
    
      "${JSON.stringify(questions)}"
      Previous conversation with you:
      1. "${JSON.stringify(previousChats[0])}"
      2. "${JSON.stringify(previousChats[1])}"

      User's current question: "${inputValue}"

      Please provide a thoughtful and compassionate response, considering both the previous conversation and the user's current input, to address their mental health concerns.
      and give very small responses take it as interactive chat and respond like human your name is aasra gpt
      You are an AI designed to assist users with mental health-related questions and concerns only. If a user asks a question that is not related to mental health, respond with: 'Please enter only mental health-related questions.' Do not answer any other types of queries like math, programming, or general knowledge.
    `;

    const result = await model.generateContent(prompt);
    const aiResponse = result.response.text();

    await Chat({ question: inputValue, answer: aiResponse });
    setInputValue('');
    resetTranscript();

    setChats(prevChats => [...prevChats, { question: inputValue, answer: aiResponse }]);

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
          <ChatComponent chats={chats}   />
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
          <Icon icon="material-symbols:send" onClick={handleSendClick} />
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