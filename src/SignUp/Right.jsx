import React from 'react'
import Img from '../assets/logo-no-background.png'
import { SignupUser } from '../api/Auth-util';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

function Right() {
    const [userData, setUserData] = useState({
        username: "", email:"", password: "", confirmpassword:""
      });

      const navigate = useNavigate();

      const handleLoginSubmit = async(e)=>{
        e.preventDefault();
        // console.log(userData);
       if(validateData()){
      const user = await   SignupUser(userData);
      navigate("/");
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

    const handleInputChange = (e) =>{
        setUserData({...userData, [e.target.name]: e.target.value})
    }

    return (
                // <div className="bg-[#fdebbe] shadow-md rounded-lg p-6">
        <div className="bg-[#e9e2ca] flex items-center justify-center min-h-screen px-4 sm:px-6 lg:px-8">
            <div className="w-full max-w-sm">
                <img className="mx-auto h-32  object-contain mb-8" src={Img} alt="Logo" />
                    <h2 className="text-center 
                    text-3xl font-bold mb-6 pb-4 text-transparent bg-clip-text bg-gradient-to-r from-blue-500 to-cyan-400  font-sans tracking-wide transform transition-transform duration-300 ease-in-out hover:scale-110 custom-text-shadow">
                        Sign up
                    </h2>
                    <form className=" mt-4 space-y-4" onSubmit={handleLoginSubmit}>
                        <div>
                           
                            <input name="username" type="text" required placeholder='username'
                              onChange={handleInputChange} value={userData.username}  className="mt-1 block w-full rounded-md border bg-[#fff] border-gray-300 px-3 py-2 text-sm focus:border-sky-500 focus:outline-none focus:ring-sky-500" />
                        </div>
                        <div>
                           
                            <input name="email" type="email" autoComplete="email" required placeholder='email'
                             onChange={handleInputChange} value={userData.email}   className="mt-1 block w-full rounded-md border bg-[#fff] border-gray-300 px-3 py-2 text-sm focus:border-sky-500 focus:outline-none focus:ring-sky-500" />
                        </div>
                        <div>
                            
                            <input name="password" type="password"  required placeholder='password'
                             onChange={handleInputChange} value={userData.password}   className="mt-1 block w-full rounded-md border bg-[#fff] border-gray-300 px-3 py-2 text-sm focus:border-sky-500 focus:outline-none focus:ring-sky-500" />
                        </div>
                        <div>
                        
                            <input name="confirmpassword" type="password" required placeholder='confirm password'
                             onChange={handleInputChange} value={userData.confirmpassword}   className="mt-1 block w-full rounded-md border bg-[#fff] border-gray-300 px-3 py-2 text-sm focus:border-sky-500 focus:outline-none focus:ring-sky-500" />
                        </div>
                        <div>
                            <button type="submit"
                                className="w-full justify-center rounded-md border border-transparent bg-[#257ba0] py-2 px-4 text-sm font-medium text-white shadow-sm hover:bg-opacity-75 focus:outline-none focus:ring-2 focus:ring-sky-400 focus:ring-offset-2">
                                SignUp
                            </button>
                        </div>
                    </form>
                </div>
            </div>
        // </div>
    )
}

export default Right