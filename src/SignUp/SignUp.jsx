// import React from 'react'
// import Left from './Left'
// import Right from './Right'

// function SignUp() {
//   return (
//     <div className="flex justify-between">
//       <Left/>
//       <Right/>
//     </div>
//   )
// }

// export default SignUp
import React from 'react';
import Left from './Left';
import Right from './Right';

function SignUp() {
  return (
    <div className="flex justify-center items-center min-h-screen bg-[#fdebbe]">
      <div className="  p-6 w-full max-w-7xl min-h-fit">
        <div className="flex justify-between h-full border border-gray-300 rounded-lg overflow-hidden">
          <div className="w-2/5 h-full">
            <Left />
          </div>
          <div className="w-3/5 h-full border-l border-gray-300">
            <Right />
          </div>
        </div>
      </div>
    </div>
  );
}

export default SignUp;
