import React from 'react';
import Left from './Left';
import Right from './Right';
import './signup.css'

function SignIn() {
  return (
    <div className="signin-bg">
      <div className="signin-container">
        <div className="signin-left">
          <Left />
        </div>
        <div className="signin-right">
          <Right />
        </div>
      </div>
    </div>
  );
}

export default SignIn;
