import React, { useState } from "react";

const HeroImage = "https://gratisography.com/wp-content/uploads/2024/11/gratisography-augmented-reality-800x525.jpg"; 

export default function Signin() {
  const [showLogin, setShowLogin] = useState(false);

  return (
    <div className="flex w-full h-screen overflow-hidden relative bg-black font-sans">
      
      {/* Left Side: Hero Area (Image Background) */}
      <div 
        className={`absolute left-0 top-0 h-full z-20 overflow-hidden transition-[width] duration-[800ms] ease-[cubic-bezier(0.86,0,0.07,1)] ${
          showLogin ? "w-1/2" : "w-full"
        }`}
      >
        <img 
          src={HeroImage} 
          alt="AI Blog Background" 
          className="absolute w-full h-full object-cover z-10" 
        />
        
        {/* Dark overlay */}
        <div className="absolute w-full h-full bg-black/60 z-20 flex flex-col justify-center items-center text-center text-white p-10">
          <h1 className="text-[3.5rem] mb-2.5 font-bold tracking-tight">
            The Future of AI
          </h1>
          <p className="text-[1.2rem] text-gray-300 mb-[30px] max-w-[600px]">
            Insights, news, and deep dives into artificial intelligence.
          </p>
          
          {!showLogin && (
            <button 
              className="px-10 py-4 text-[1.1rem] bg-blue-600 text-white border-none rounded cursor-pointer font-semibold transition-colors duration-300 hover:bg-blue-700"
              onClick={() => setShowLogin(true)}
            >
              Sign In
            </button>
          )}
        </div>
      </div>

      {/* Right Side: Professional Login Panel */}
      <div 
        className={`absolute w-1/2 h-full bg-[#0a0a0a] flex justify-center items-center transition-all duration-[800ms] ease-[cubic-bezier(0.86,0,0.07,1)] z-10 ${
          showLogin ? "right-0" : "-right-1/2"
        }`}
      >
        <div className="w-full max-w-[400px] p-10 text-white flex flex-col">
          <h2 className="text-3xl mb-2">Welcome Back</h2>
          <p className="text-gray-400 mb-[30px] text-[0.95rem]">
            Sign in to continue to your dashboard.
          </p>
          
          <div className="flex flex-col mb-5">
            <label className="text-[0.85rem] text-gray-300 mb-2 uppercase tracking-[0.5px]">
              Email Address
            </label>
            <input 
              type="email" 
              placeholder="you@example.com" 
              className="p-[14px] bg-gray-800 border border-gray-700 rounded text-white text-base transition-colors duration-300 focus:outline-none focus:border-blue-600"
            />
          </div>
          
          <div className="flex flex-col mb-5">
            <label className="text-[0.85rem] text-gray-300 mb-2 uppercase tracking-[0.5px]">
              Password
            </label>
            <input 
              type="password" 
              placeholder="••••••••" 
              className="p-[14px] bg-gray-800 border border-gray-700 rounded text-white text-base transition-colors duration-300 focus:outline-none focus:border-blue-600"
            />
          </div>
          
          <button className="p-[14px] bg-blue-600 text-white border-none rounded text-base font-semibold cursor-pointer mt-2.5 transition-colors duration-300 hover:bg-blue-700">
            Sign In
          </button>
          
          <button 
            className="bg-transparent border-none text-gray-400 mt-5 cursor-pointer text-[0.9rem] transition-colors duration-300 hover:text-white"
            onClick={() => setShowLogin(false)}
          >
            &#8592; Back to Home
          </button>
        </div>
      </div>
    </div>
  );
}