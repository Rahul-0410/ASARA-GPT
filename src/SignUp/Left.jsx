import React from 'react'
import Img from '../assets/dudes-sad-man.png'
import { useNavigate } from 'react-router-dom'

function Left() {
  const naviagte = useNavigate();
  return (
    <div className='bg-[#f2efe4] min-h-screen flex flex-col items-center p-8'>
      <img className="w-[300px] h-[450px] mb-8" src={Img} alt="Sad man" />

      <h1 className="text-3xl font-extrabold text-center uppercase tracking-wide mb-4 text-gray-900 shadow-text">
        YOU ARE NOT ALONE
      </h1>

      <blockquote className="text-lg text-[#808080] italic text-center max-w-md mb-4">
        "You are not alone in the struggles of life. Entire cosmos is with you. It evolves through the way you face and overcome challenges of life. Use everything in your advantage."
      </blockquote>

      <button onClick={(e)=> naviagte("/login")} className="w-1/2 justify-center rounded-md border border-transparent 
      bg-[#257ba0] py-2 px-2 text-sm font-medium text-white shadow-sm hover:bg-opacity-75 focus:outline-none focus:ring-2 focus:ring-sky-400 focus:ring-offset-2">
        Login
      </button>
    </div>
  )
}

export default Left