import React, { useRef, useState, useEffect } from "react";
import "./inter.css";
import SpeechRecognition, { useSpeechRecognition } from 'react-speech-recognition';
import { GoogleGenerativeAI } from "@google/generative-ai";
import { Chat } from '../api/Auth-util';
import { getChat } from '../api/Auth-util';
import { Icon } from '@iconify/react/dist/iconify.js'; 

function Interactive() {
  const genAI = new GoogleGenerativeAI('AIzaSyA0fVZOqiiv4CZu2K4uZginsJt9K7VoeT8');
  const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });
  const videoRef = useRef(null);
  const [prompt, setPrompt] = useState("");
  const [response, setResponse] = useState("");
  const [isRecording, setIsRecording] = useState(false);
  const [chats, setChats] = useState('');
  const { transcript, resetTranscript } = useSpeechRecognition();

  useEffect(() => {
    const interval = setInterval(async () => {
      const call = await getChat();
      setChats(call);
    }, 1000);

    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    if (isRecording) {
      setPrompt(transcript);
    }
  }, [transcript, isRecording]);

  const handleInputChange = (e) => {
    setPrompt(e.target.value);
  };

  const fetchResponse = async () => {
    const previousChats = chats.slice(-2);
    const promptWithContext = `
      Previous conversation:
      1. "${JSON.stringify(previousChats[0])}"
      2. "${JSON.stringify(previousChats[1])}"

      Current question: "${prompt}"

      Provide a thoughtful response as an interactive chat, similar to a human conversation.
    `;
    
    const result = await model.generateContent(promptWithContext);
    return result.response.text();
  };

  const handleTextToSpeech = async (text) => {
    const utterance = new SpeechSynthesisUtterance(text);
  
    const getVoices = () => new Promise((resolve) => {
      if (speechSynthesis.getVoices().length) {
        resolve(speechSynthesis.getVoices());
      } else {
        speechSynthesis.onvoiceschanged = () => resolve(speechSynthesis.getVoices());
      }
    });
  
    try {
      const voices = await getVoices();
      const femaleVoice = voices.find(voice => voice.name.includes('Female') || voice.name.includes('female'));
  
      if (femaleVoice) {
        utterance.voice = femaleVoice;
      }
  
      speechSynthesis.speak(utterance);
  
      utterance.onend = () => {
        videoRef.current.pause();
        videoRef.current.currentTime = 0;
      };
  
      videoRef.current.loop = true;
      videoRef.current.play();
    } catch (error) {
      console.error('Error accessing voices or speaking:', error);
    }
  };
  
  

  const handleSubmit = async () => {
    const apiResponse = await fetchResponse();
    setResponse(apiResponse);   

    handleTextToSpeech(apiResponse); 

    await Chat({ question: prompt, answer: apiResponse });
    setPrompt('');
    resetTranscript(); 
  };

  const handleMicClick = () => {
    if (isRecording) {
      SpeechRecognition.stopListening();
      setIsRecording(false);
    } else {
      SpeechRecognition.startListening({ continuous: true });
      setIsRecording(true);
    }
  };

  return (
    <div className="interactive-container">
      <div className="input-container">
        
        <input
          type="text"
          value={prompt}
          onChange={handleInputChange}
          placeholder="Ask me anything..."
          className="prompt-input"
          onKeyDown={(e) => {
            if (e.key === "Enter") {
              handleSubmit();
            }
          }}
        />
        <Icon
          icon="material-symbols:mic-outline"
          className="mic"
          onClick={handleMicClick}
          style={{ color: isRecording ? 'red' : 'white' }}
        />
      </div>

      <div className="video-container">
        <video
          ref={videoRef}
          className="interactive-video"
          muted={true}
          width="100%"
          height="100%"
          style={{ objectFit: 'cover' }}
        >
          <source src="/Talking Photo.mp4" type="video/mp4" />
          Your browser does not support the video tag.
        </video>
      </div>
    </div>
  );
}

export default Interactive;
