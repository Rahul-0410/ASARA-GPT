import React, { useState } from "react";
import './qscree.css';
import { Navigate,useNavigate } from "react-router-dom";
import {questionsanssave} from "../api/Auth-util.js"
import { useContext } from "react";
import { AuthContext } from "../AuthContext";

const Questions = () => {
    const [currentQuestion, setCurrentQuestion] = useState(0);
    const [slideIn, setSlideIn] = useState(true);
    const [answers, setAnswers] = useState([]);
    const [answer, setAnswer] = useState(0);
    const { isLoggedIn } = useContext(AuthContext);
    const nav=useNavigate()

    if (!isLoggedIn) {
        return <Navigate to="/" />;
    }else{
    const questions = [
        "Have You Any Anxiety From Previous or Past Experiences",
        "Have You Some Stress from Your Past Experiences",
        "Are You Happy in Your Life",
        "Have You Some Kind of Experiences that When You think You got it into the Depression State",
        "How often do you feel lonely?",
        "How would you rate your overall energy level?",
        "Do you have any physical health conditions that contribute to your mental well-being?",
        "Have you sought any professional help for your mental health in the past?",
        "Do you have difficulty concentrating on your work or daily tasks?"
    ];

    const handleNextQuestion = () => {
        setAnswers(prevAnswers => [
            ...prevAnswers,
            { question: questions[currentQuestion], answer: parseInt(answer) }
        ]);

        setSlideIn(false);
        setTimeout(() => {
            if (currentQuestion === questions.length - 1) {
                saveAnswers();
                alert("You have answered all the questions. Your answers have been saved.");
            } else {
                setCurrentQuestion(prev => prev + 1);
                setAnswer(0); 
                setSlideIn(true);
            }
        }, 300);
    };

    const saveAnswers = () => {
        console.log(answers);
        questionsanssave(answers);
        nav('/home');
        
    };

    return (
        <>
        <div className="qback">
     <div className="typing-container">
        <h1 className="typing-text"><i>*Help our AI to know you by answering these questions!</i></h1>
    </div>
            <div className={`qbox ${slideIn ? 'slide-in' : 'slide-out'}`}>
                <h1>{questions[currentQuestion]}</h1>
                <input
                    type="range"
                    min="0"
                    max="10"
                    value={answer}
                    onChange={(e) => setAnswer(e.target.value)}
                />
                <p>Your answer: {answer}</p>
                <button onClick={handleNextQuestion}>Next</button>
            </div>
            <footer style={{ color: 'red'}}>
                    <p>© 2024 Asara GPT. All rights reserved.</p>
                </footer>
        </div>  
        </>
        
    );
};}

export default Questions;
