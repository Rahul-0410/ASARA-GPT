import React from 'react';
import Left from './Left';
import Right from './Right';
import './signup.css'

function SignUp() {
  return (
    <div className="login-bg">
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

export default SignUp;
