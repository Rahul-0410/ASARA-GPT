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
        return <Navigate to="/login" />;
    }else{
    const questions = [
        "I feel sad/ empty",
        "I am excessively tired or fatigued",
        "I struggle in social situations and feel isolated",
        "I get irritable with people and myself.",
        "My sleep pattern is disturbed (too little or too much)",
        "My appetite has changed or I have no appetite",
        "I do not feel confident enough to do simple tasks",
        "I can't concentrate on things very well",
        "Poor memory / forgetfulness",
        "I find it hard to talk about feelings",
        "I feel guility for no reason"
    ];

    const handleNextQuestion = () => {
        setAnswers(prevAnswers => [
            ...prevAnswers,
            { question: questions[currentQuestion], answer: answer }
        ]);

        setSlideIn(false);
        console.log(answers);
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
                <div className="options">
                <label>
                    <input
                        type="checkbox"
                        value="never"
                        checked={answer === "never"}
                        onChange={() => setAnswer("never")}
                    />
                    <span> Never</span>
                </label>
                <label className="sometimes">
                    <input
                        type="checkbox"
                        value="sometimes"
                        checked={answer === "sometimes"}
                        onChange={() => setAnswer("sometimes")}
                    />
                    <span>Sometimes</span> 
                </label>
                <label>
                    <input
                        type="checkbox"
                        value="always"
                        checked={answer === "always"}
                        onChange={() => setAnswer("always")}
                    />
                    <span>Always</span> 
                </label>
                </div>
                <button className="que-btn" onClick={handleNextQuestion}>Next</button>
               
            </div>
            <footer style={{ color: 'red'}}>
                    <p>© 2024 Asara GPT BY Rahul. All rights reserved.</p>
                </footer> 
        </div>  
        </>
        
    );
};}

export default Questions;
