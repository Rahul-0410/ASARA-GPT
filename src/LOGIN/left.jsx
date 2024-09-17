import React, { useState, useContext } from "react";
import logoImage from './images/logo-no-background.png';
// import logoImage from '../assets/Aasra_logo.png';
import './Left.css';
import { GoogleLogin } from '@react-oauth/google';
import { loginUser, GoogleloginUser } from '../api/Auth-util';
import { AuthContext } from '../AuthContext.jsx';
import { useNavigate } from "react-router-dom";

function Left() {
    const [userData, setUserData] = useState({
        email: "",
        password: ""
    });
    const { login } = useContext(AuthContext);
    const navigate = useNavigate();

    const handleLogin = async (e) => {
        e.preventDefault();

        try {
            const response = await loginUser(userData);
            console.log('Login success:', response);
            login();
            if (response.mentalHealthInfo === undefined) {
                navigate('/questions');
            } else {
                navigate('/home');
            }
        } catch (error) {
            console.error('Login failed:', error);
            alert('INVALID CREDENTIAL');
        }
    };

    const handleChange = (e) => {
        const { name, value } = e.target;
        setUserData(prevState => ({
            ...prevState,
            [name]: value
        }));
    };

    const handleGoogleLoginSuccess = async (credentialResponse) => {
        try {
            const response = await GoogleloginUser(credentialResponse.credential);
            console.log('Google login success:', response);
            login();
            if (response.data.mentalHealthInfo === undefined) {
                navigate('/questions');
            } else {
                navigate('/home');
            }
        } catch (error) {
            console.error('Google login failed:', error);
            alert('GOOGLE LOGIN FAILED');
        }
    };

    return (
        <div className="left-container">
            <img src={logoImage} width="600px" alt="Logo" />
        
            <GoogleLogin 
                onSuccess={credentialResponse => {
                    console.log(credentialResponse);
                    handleGoogleLoginSuccess(credentialResponse);
                }}
                onError={() => {
                    console.log('Login Failed');
                }}
            />
            
           
            <h4 className="line">----------<b>OR</b>----------</h4>

            <form className="left-login-form" onSubmit={handleLogin}>
                <input
                    type="email"
                    name="email"
                    placeholder="Email"
                    className="left-input-field"
                    value={userData.email}
                    onChange={handleChange}
                />
                <input
                    type="password"
                    name="password"
                    placeholder="Password"
                    className="left-input-field"
                    value={userData.password}
                    onChange={handleChange}
                />
                <button type="submit" className="left-submit-button">LOGIN</button>
            </form>
        </div>
    );
}

export default Left;
