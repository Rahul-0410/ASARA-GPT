import React, { useContext, useState } from 'react'
import './home.css'
import Img from "../assets/logo-no-background.png"
import SideBar from './sidebar';
import { Icon } from '@iconify/react/dist/iconify.js';
import { AuthContext } from '../AuthContext';
import { useNavigate, Navigate} from 'react-router-dom';

function Home() {
  const [inputValue, setInputValue] = useState('');
  const nav= useNavigate();
  // const [width, getWidth] = useState(window.innerWidth);

  const handleInputChange = (event) => {
    setInputValue(event.target.value);
  };
  const { isLoggedIn } = useContext(AuthContext);
  if (!isLoggedIn) {
    return <Navigate to="/login" />;
}

  const handleSendClick = () => {
   
    console.log('Input value:', inputValue);
   
    setInputValue('');
  };
  // if(width<600){
  // }
  
  return (
    <div className='home'>
      <div className="sidebar">
    <SideBar/>
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
        onChange={handleInputChange}
        placeholder="Message Aasara-GPT"
        className="input-field"
      />
      {/* <button onClick={handleSendClick} className="send-button">
        Send
      </button> */}
      <Icon icon="material-symbols:send" onClick={handleSendClick}/>
      <Icon icon="material-symbols:mic-outline" className='mic'/>

    </div>

      </div>
      
    </div>
  )
}


export default Home;
