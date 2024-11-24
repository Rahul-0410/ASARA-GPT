import React, { useState, useContext } from "react";
import logoImage from './images/logo-no-background.png';
import './Left.css';
import { GoogleLogin } from '@react-oauth/google';
import { loginUser, GoogleloginUser } from '../api/Auth-util';
import { AuthContext } from '../AuthContext.jsx';
import { useNavigate } from "react-router-dom";
import toast, { Toaster } from 'react-hot-toast';

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
            
            // Show success toast with a tick icon and trigger login after
            toast.success(
                <div>
                    
                    Login successful!
                </div>,
                { duration: 2000 }
            );
            setTimeout(() => {
                login(); // Trigger login after showing the toast
                if (response.mentalHealthInfo === undefined) {
                    navigate('/questions');
                } else {
                    navigate('/home');
                }
            }, 2000); // Delay login by 2 seconds
        } catch (error) {
            console.error('Login failed:', error);
            toast.error('Invalid credentials');
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
            
            // Show success toast with a tick icon and trigger login after
            toast.success(
                <div>
                    
                    Google login successful!
                </div>,
                { duration: 2000 }
            );
            setTimeout(() => {
                login(); // Trigger login after showing the toast
                if (response.data.mentalHealthInfo === undefined) {
                    navigate('/questions');
                } else {
                    navigate('/home');
                }
            }, 2000); // Delay login by 2 seconds
        } catch (error) {
            console.error('Google login failed:', error);
            toast.error('Google login failed');
        }
    };

    return (
        <div className="left-container">
            {/* Toast with position set to top-center */}
            <Toaster position="top-center" />

            <img src={logoImage} width="600px" alt="Logo" />

            <GoogleLogin 
                onSuccess={credentialResponse => {
                    
                    handleGoogleLoginSuccess(credentialResponse);
                }}
                onError={() => {
                    
                    toast.error('Google login failed');
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
