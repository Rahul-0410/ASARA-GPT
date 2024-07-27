import React from 'react';
import './Left.css';
import Img from '../assets/dudes-sad-man.png'
import { useNavigate } from 'react-router-dom'
const Left = () => {
  const naviagte = useNavigate();
  return (

    <div className="Rightpanel">
      <img src={Img} alt="Your description" />
      <h1> YOU ARE NOT ALONE</h1>
      <p>"You are not alone in the struggles of life. Entire cosmos is with you. It evolves through the way you face and overcome challenges of life. Use everything in your advantage."</p>
      <button onClick={(e)=> naviagte("/login")}>Login</button>
    </div>
  );
};

export default Left;
