import React from 'react'
import Img from '../assets/logo-no-background.png'
import { SignupUser } from '../api/Auth-util';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './Right.css'

function Right() {
    const [userData, setUserData] = useState({
        username: "", email: "", password: "", confirmpassword: ""
    });

    const navigate = useNavigate();

    const handleLoginSubmit = async (e) => {
        e.preventDefault();
        if (validateData()) {
            const user = await SignupUser(userData);
            navigate("/login");
        }
    }

    const validateData = () => {
        return (
            userData.email?.length &&
            userData.password?.length &&
            userData.confirmpassword?.length &&
            userData.username?.length &&
            userData.password === userData.confirmpassword
        );
    };

    const handleInputChange = (e) => {
        setUserData({ ...userData, [e.target.name]: e.target.value })
    }

    return (
        <div className="left-container">
            <img src={Img} width="500px" alt="Logo" />

            <h2 class="signup-heading">
                Sign up
            </h2>



            <form className="left-login-form" onSubmit={handleLoginSubmit}>
                <input
                    name="username"
                    type="text"
                    required
                    placeholder='username'
                    onChange={handleInputChange}
                    value={userData.username}
                    className="left-input-field"
                />


                <input
                    name="email"
                    type="email"
                    autoComplete="email"
                    required
                    placeholder='email'
                    onChange={handleInputChange}
                    value={userData.email}
                    className="left-input-field"
                />


                <input
                    name="password"
                    type="password"
                    required
                    placeholder='password'
                    onChange={handleInputChange}
                    value={userData.password}
                    className="left-input-field"
                />


                <input
                    name="confirmpassword"
                    type="password"
                    required
                    placeholder='confirm password'
                    onChange={handleInputChange}
                    value={userData.confirmpassword}
                    className="left-input-field"
                />

                <button type="submit" className="left-submit-button">SignUp</button>
            </form>
        </div>
    )
}

export default Right