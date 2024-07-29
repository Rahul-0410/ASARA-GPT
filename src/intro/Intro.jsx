import React from "react";
import { useNavigate } from "react-router-dom";
import './Intro.css';
import img from "../assets/logo-no-background.png"
import img2 from "../assets/ai-talkingbot.png"
import img3 from "../assets/pic-person-nature.jpeg"
import sanchitImg from "../assets/sanchit.jpeg" 
import rahulImg from "../assets/rahul.jpeg"
import hamzaImg from "../assets/hamza.jpeg"
import chiragImg from "../assets/chirag.jpeg" 
function Intro() {

    const navigate = useNavigate();
    return (
        <>
        <nav className="intro-nav">
            <div className="nav-logo">
                <img src={img} alt="" />
            </div>
            <div className="nav-links">
            <a href="/login">Login</a>
            <a href="/signup">Sign Up</a>
            <a href="#feedback">Feedback</a>
            </div>
        </nav>
        <div className="intro-content">
            <div className="intro-context-text">
            <h1><b>AASRA-GPT</b></h1>
            <p>Welcome to Aasra GPT, your AI-powered mental health companion designed to support you through 
life's challenges. At Aasra GPT, we are committed to providing a compassionate and innovative 
approach to mental health support, focusing on helping individuals experiencing depression and 
anxiety to find happiness and healing. </p>
            <button onClick={() => navigate('/home')}>Get Started</button>
            </div>
            <div className="intro-content-image">
                <img src={img2} alt="" />
            </div>
        </div>
        <div className="intro-mission">
            <h1><b>OUR MISSION</b></h1>
            <p><b>Our mission is to leverage advanced AI technology to offer accessible, personalized mental health 
support. We aim to create a safe and supportive environment where users can explore their feelings, 
receive guidance, and develop coping strategies to improve their mental well-being. </b><br/>
We envision a world where mental health support is readily available and stigma-free. By harnessing 
the power of AI, we strive to make a positive impact on society, helping individuals lead happier and 
healthier lives. Our ultimate goal is to integrate AI support seamlessly into everyday life, making 
mental health care more accessible, affordable, and effective for everyone. 
</p>
<img src={img3} alt="nature" />
        </div>
        <div className="intro-last">
            <div className="intro-ourteam">
            <h2>Our Team</h2>
                <div className="team-member">
                    <img src={sanchitImg} alt="Sanchit Bajaj" />
                    <p>Sanchit Bajaj<br/>(Web Developer)<br/>Sanchitbajaj2003@gmail.com</p>
                </div>
                <div className="team-member">
                    <img src={chiragImg} alt="Chirag Gaba" />
                    <p>Chirag Gaba<br/>(AI/ML)<br/>chiraggaba064@gmail.com</p>
                </div>
                <div className="team-member">
                    <img src={rahulImg} alt="Rahul" />
                    <p>Rahul<br/>(Web Developer)<br/>rgs786999@gmail.com</p>
                </div>
            </div> 
        <div id="feedback" className="feedback-form">
            <h2><b>Feedback_form</b></h2>
            <form action="https://api.web3forms.com/submit" method="post">
                <div className="form-group">
                <input type="hidden" name="access_key" value="1a562657-bc02-4007-bc9a-c4ada2a53918"/>
                    <label htmlFor="name">Name:</label>
                    <input type="text" id="name" name="name" required />
                </div>
                <div className="form-group">
                    <label htmlFor="email">Email:</label>
                    <input type="email" id="email" name="email" required />
                </div>
                <div className="form-group">
                    <label htmlFor="feedback">Feedback:</label>
                    <textarea id="feedback" name="feedback" rows="4" required></textarea>
                </div>
                <button type="submit">Submit</button>
            </form>
        </div>
        </div>
                    <div className="intro-footer">
                <p>© 2024 Asara GPT. All rights reserved.</p>
            </div>
       
        </>
    );
}

export default Intro;
