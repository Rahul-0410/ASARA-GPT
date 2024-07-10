import React, { useState } from "react";
import logoImage from './images/logo-no-background.png';
import './Left.css';
import { GoogleLogin } from '@react-oauth/google';
import { loginUser,GoogleloginUser } from '../api/Auth-util';

function Left() {
    const [userData, setUserData] = useState({
        email: "",
        password: ""
    });

    const handleLogin = async (e) => {
        e.preventDefault();

        try {
            const response = await loginUser(userData);
            console.log('Login success:', response);
           
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
            alert('Google login success:', response);
        } catch (error) {
            console.error('Google login failed:', error);
            alert('GOOGLE LOGIN FAILED');
        }
    };

    return (
        <div className="left-container">
            <img src={logoImage} width="600px" alt="Logo" />
            <h4 className="line"><b>LOGIN USING GOOGLE</b></h4>
            <GoogleLogin
                onSuccess={credentialResponse => {
                    console.log(credentialResponse);
                    handleGoogleLoginSuccess(credentialResponse);
                }}
                onError={() => {
                    console.log('Login Failed');
                }}
            />

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
