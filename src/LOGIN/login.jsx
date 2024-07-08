import React from "react";
import Left from "./left";
import Right from "./right";
import './login.css';  // Ensure the CSS file is correctly imported

function Login() {
    return (
        <div  className="login-bg">
        <div className="login-container">
            <div className="login-left">
                <Left />
            </div>
            <div className="login-right">
                <Right />
            </div>
        </div>
        </div>
    );
}

export default Login;
