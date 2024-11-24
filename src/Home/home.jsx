import React, { useContext, useState, useEffect } from 'react';
import './home.css';
import Img from "../assets/white-logo-nobackground.png";
import SideBar from './sidebar';
import { Icon } from '@iconify/react/dist/iconify.js';
import { AuthContext } from '../AuthContext';
import {json, Navigate } from 'react-router-dom';
import SpeechRecognition, { useSpeechRecognition } from 'react-speech-recognition';
import { GoogleGenerativeAI } from "@google/generative-ai";
import { Chat, getChat,getQuestion,getprofile } from '../api/Auth-util';
import ChatComponent from '../Chat/Chat'; 

function Home() {
  const genAI = new GoogleGenerativeAI(process.env.REACT_APP_GEMINI_API_KEY);
  const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });
  const [inputValue, setInputValue] = useState('');
  const [isRecording, setIsRecording] = useState(false);
  // const nav = useNavigate();
  const { isLoggedIn } = useContext(AuthContext);
  const startListening = () => SpeechRecognition.startListening({ continuous: true });
  const stopListening = () => SpeechRecognition.stopListening();
  const [chats, setChats] = useState([]);
  const [questions,setQuestions]=useState([]);
  const alet = (message) => {
    alert(message);
  }
  useEffect(() => {
    const fetchQuestions = async () => {
      const question = await getQuestion();
      setQuestions(question);
    };

    fetchQuestions();
    alet("it take some time to get response from aasra gpt pls wait for a while after sending the message");
  }, []); 
  
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
    const profile=await getprofile();

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
       and you will also get question ans of mental helath queries answered by user and will get his profile use them as needed but dont all depend on the question ans
      dont refer about question ans in response it for your understanding only
       User's profile:
      "${JSON.stringify({
        name: profile.username || '',
        email: profile.email || '',
        city: profile.city || '',
        state: profile.state || '',
        country: profile.country || ''
      })}"
      and dont add this Aasra GPT: response pattern 
    `;
    console.log(prompt)
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