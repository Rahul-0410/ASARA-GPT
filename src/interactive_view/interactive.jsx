import React, { useRef, useState, useEffect } from "react";
import "./inter.css";
import SpeechRecognition, { useSpeechRecognition } from 'react-speech-recognition';
import { GoogleGenerativeAI } from "@google/generative-ai";
import { Chat } from '../api/Auth-util';
import { getChat } from '../api/Auth-util';
import { Icon } from '@iconify/react/dist/iconify.js'; 
import toast, { Toaster } from 'react-hot-toast';

function Interactive() {
  const genAI = new GoogleGenerativeAI(process.env.REACT_APP_GEMINI_API_KEY);
  const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });
  const videoRef = useRef(null);
  const [prompt, setPrompt] = useState("");
  const [response, setResponse] = useState("");
  const [isRecording, setIsRecording] = useState(false);
  const [chats, setChats] = useState('');
  const { transcript, resetTranscript } = useSpeechRecognition();
  const [isDesktop, setIsDesktop] = useState(true); // For checking device

  // Check if the screen is desktop or mobile
  useEffect(() => {
    const checkScreenWidth = () => {
      if (window.innerWidth < 768) { // 768px is a common breakpoint for mobile
        setIsDesktop(false);
        toast.error("This feature is only compatible on desktop devices.");
      } else {
        setIsDesktop(true);
      }
    };

    checkScreenWidth(); // Initial check on component mount

    // Add an event listener for window resizing
    window.addEventListener("resize", checkScreenWidth);

    // Clean up event listener on unmount
    return () => {
      window.removeEventListener("resize", checkScreenWidth);
    };
  }, []);

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
      Your name is aasragpt and avoid emojis and slang, your response must be short.
    `;
    
    const result = await model.generateContent(promptWithContext);
    return result.response.text();
  };

  const handleTextToSpeech = async (text) => {
    const video = videoRef.current;
    let voices = [];
  
    const getVoices = () => {
      return new Promise((resolve) => {
        let voices = speechSynthesis.getVoices();
        if (voices.length > 0) {
          resolve(voices);
        } else {
          const interval = setInterval(() => {
            voices = speechSynthesis.getVoices();
            if (voices.length > 0) {
              clearInterval(interval);
              resolve(voices);
            }
          }, 200);
        }
      });
    };
  
    try {
      video.play();
      video.loop = true;
  
      voices = await getVoices();
  
      const preferredVoice = voices.find(voice => 
        voice.name === 'Microsoft Zira - English (United States)' || 
        voice.name === 'Microsoft Aria Online (Natural) - English (United States)'
      ) || voices[0];
  
      const msg = new SpeechSynthesisUtterance(text);
      msg.voice = preferredVoice;
      msg.lang = 'en-US';
  
      msg.onstart = () => {
        console.log('Speech started');
      };
  
      msg.onend = () => {
        console.log('Speech ended');
        video.pause();
        video.loop = false;
        video.currentTime = 0;
      };
  
      msg.onerror = (event) => {
        console.error('Speech synthesis error:', event);
        video.pause();
        video.loop = false;
        video.currentTime = 0;
      };
  
      speechSynthesis.speak(msg);
  
    } catch (error) {
      console.error('Error during text-to-speech:', error);
      video.pause();
      video.loop = false;
      video.currentTime = 0;
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
      <Toaster />
      {isDesktop ? (
        <>
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
        </>
      ) : (
        <p>This feature is only available on desktop devices.</p>
      )}
    </div>
  );
}

export default Interactive;
