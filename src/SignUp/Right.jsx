import React from 'react';
import Img from '../assets/logo-no-background.png';
// import Img from '../assets/Aasra_logo.png';
import { SignupUser } from '../api/Auth-util';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './Right.css';
import toast, { Toaster } from 'react-hot-toast';

function Right() {
    const [userData, setUserData] = useState({
        username: "", email: "", password: "", confirmpassword: ""
    });

    const navigate = useNavigate();

    const handleLoginSubmit = async (e) => {
        e.preventDefault();
        if (validateData()) {
            try {
                const user = await SignupUser(userData);
                toast.success('Account created successfully!');
                navigate("/login"); // Redirect to login after successful signup
            } catch (error) {
                console.error('Signup error:', error);
                toast.error('Failed to create account. Please try again.');
            }
        } else {
            toast.error('Please make sure all fields are correct.');
        }
    };

    const validateData = () => {
        if (userData.password !== userData.confirmpassword) {
            toast.error("Passwords do not match");
            return false;
        }
        return (
            userData.email?.length > 0 &&
            userData.password?.length > 0 &&
            userData.username?.length > 0
        );
    };

    const handleInputChange = (e) => {
        setUserData({ ...userData, [e.target.name]: e.target.value });
    };

    return (
        <div className="left-container">
            <Toaster position="top-center" /> {/* For toast notifications */}
            <img src={Img} width="500px" alt="Logo" />

            <h2 className="signup-heading">Sign up</h2>

            <form className="left-login-form" onSubmit={handleLoginSubmit}>
                <input
                    name="username"
                    type="text"
                    required
                    placeholder="Username"
                    onChange={handleInputChange}
                    value={userData.username}
                    className="left-input-field"
                />

                <input
                    name="email"
                    type="email"
                    autoComplete="email"
                    required
                    placeholder="Email"
                    onChange={handleInputChange}
                    value={userData.email}
                    className="left-input-field"
                />

                <input
                    name="password"
                    type="password"
                    required
                    placeholder="Password"
                    onChange={handleInputChange}
                    value={userData.password}
                    className="left-input-field"
                />

                <input
                    name="confirmpassword"
                    type="password"
                    required
                    placeholder="Confirm Password"
                    onChange={handleInputChange}
                    value={userData.confirmpassword}
                    className="left-input-field"
                />

                <button type="submit" className="left-submit-button">SignUp</button>
            </form>
        </div>
    );
}

export default Right;
