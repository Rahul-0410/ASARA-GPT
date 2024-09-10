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
      your name is aasragpt and avoid emojis and slang your response must be short.
    `;
    
    const result = await model.generateContent(promptWithContext);
    return result.response.text();
  };

  const handleTextToSpeech = async (text) => {
    const video = videoRef.current;
    let voices = [];
  
    // Helper function to get voices with a timeout for browser inconsistency
    const getVoices = () => {
      return new Promise((resolve) => {
        let voices = speechSynthesis.getVoices();
        if (voices.length > 0) {
          resolve(voices);
        } else {
          // Wait for voices to be loaded
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
      // Start video and loop it during speech
      video.play();
      video.loop = true;
  
      // Fetch available voices with a small delay for loading
      voices = await getVoices();
  
      // Prefer female voice: "Microsoft Zira" (local) or fallback to "Microsoft Aria" (online)
      const preferredVoice = voices.find(voice => 
        voice.name === 'Microsoft Zira - English (United States)' || 
        voice.name === 'Microsoft Aria Online (Natural) - English (United States)'
      ) || voices[0]; // Fallback to any available voice
  
      // Create the utterance with the text
      const msg = new SpeechSynthesisUtterance(text);
      msg.voice = preferredVoice;
      msg.lang = 'en-US'; // Ensure the language is set
  
      // Handle when speech starts
      msg.onstart = () => {
        console.log('Speech started');
      };
  
      // Handle when speech ends
      msg.onend = () => {
        console.log('Speech ended');
        video.pause();       // Pause the video after speaking
        video.loop = false;  // Stop looping
        video.currentTime = 0; // Reset video to the beginning
      };
  
      // Handle errors in speech synthesis
      msg.onerror = (event) => {
        console.error('Speech synthesis error:', event);
        video.pause();       // Pause video on error
        video.loop = false;  // Stop looping
        video.currentTime = 0; // Reset video to the beginning
      };
  
      // Speak the utterance
      speechSynthesis.speak(msg);
  
    } catch (error) {
      console.error('Error during text-to-speech:', error);
      video.pause();       // Ensure video pauses in case of any error
      video.loop = false;  // Stop looping
      video.currentTime = 0; // Reset video to the beginning
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
