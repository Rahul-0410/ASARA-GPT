import React from "react";
import logoImage from './images/logo-no-background.png'; 
import './Left.css'; 
import { GoogleLogin } from '@react-oauth/google';

function Left() {
    return (
        <div className="left-container">
            <img src={logoImage} height="90px" alt="Logo" /> 
            <h4 className="line">LOGIN USING GOOGLE </h4> 
            <GoogleLogin
  onSuccess={credentialResponse => {
    console.log(credentialResponse);
  }}
  onError={() => {
    console.log('Login Failed');
  }}
/>
                  
            <form className="left-login-form">
                <input type="text" name="username" placeholder="Username" className="left-input-field" />
                <input type="password" name="password" placeholder="Password" className="left-input-field" />
                <button className="left-submit-button">LOGIN</button>
            </form>
        </div>
    );
}

export default Left;
