import React, { useState } from "react";

import HeroVideo from "/stock_vid.mp4"
// Replace this with your generated video URL
//const HeroVideo = "7186095255080362849"; 

export default function Signin() {
  const [showPanel, setShowPanel] = useState(false);
  const [isLogin, setIsLogin] = useState(true);

  const toggleAuthMode = () => setIsLogin(!isLogin);

  return (
    <div className="flex w-full h-screen overflow-hidden relative bg-black font-sans">
      
      {/* Left Side: Hero Area (Video Background) */}
      <div 
        className={`absolute left-0 top-0 h-full z-20 overflow-hidden transition-[width] duration-[800ms] ease-[cubic-bezier(0.86,0,0.07,1)] ${
          showPanel ? "w-1/2" : "w-full"
        }`}
      >
        {/* Video Background instead of Image */}
        <video 
          src={HeroVideo} 
          autoPlay 
          loop 
          muted 
          playsInline
          className="absolute w-full h-full object-cover z-10" 
        />
        
        {/* Dark overlay */}
        <div className="absolute w-full h-full bg-black/50 z-20 flex flex-col justify-center items-center text-center text-white p-10">
          <h1 className="text-[3.5rem] mb-2.5 font-bold tracking-tight">
            The Future of AI
          </h1>
          <p className="text-[1.2rem] text-gray-300 mb-7.5 max-w-[600px]">
            Join the ML CLUB community and explore the cutting edge of machine learning.
          </p>
          
          {!showPanel && (
            <div className="flex gap-4">
              <button 
                className="px-10 py-4 text-[1.1rem] bg-blue-600 text-white rounded cursor-pointer font-semibold transition-all hover:bg-blue-700 active:scale-95"
                onClick={() => { setShowPanel(true); setIsLogin(true); }}
              >
                Sign In
              </button>
              <button 
                className="px-10 py-4 text-[1.1rem] bg-zinc-800/80 backdrop-blur-sm border border-zinc-700 text-white rounded cursor-pointer font-semibold transition-all hover:bg-zinc-700 active:scale-95"
                onClick={() => { setShowPanel(true); setIsLogin(false); }}
              >
                Register
              </button>
            </div>
          )}
        </div>
      </div>

      {/* Right Side: Auth Panel (Zinc-950 theme) */}
      <div 
        className={`absolute w-1/2 h-full bg-zinc-950 flex justify-center items-center transition-all duration-[800ms] ease-[cubic-bezier(0.86,0,0.07,1)] z-10 ${
          showPanel ? "right-0" : "-right-1/2"
        }`}
      >
        <div className="w-full max-w-[420px] p-10 text-white flex flex-col">
          <h2 className="text-3xl font-bold mb-2">
            {isLogin ? "Welcome Back" : "Create Account"}
          </h2>
          <p className="text-zinc-400 mb-8 text-[0.95rem]">
            {isLogin 
              ? "Sign in to continue to your ML CLUB dashboard." 
              : "Start your journey with us today."}
          </p>
          
          <div className="space-y-5">
            {!isLogin && (
              <div className="flex flex-col">
                <label className="text-[0.75rem] text-zinc-500 mb-2 uppercase tracking-widest font-bold">
                  Full Name
                </label>
                <input 
                  type="text" 
                  placeholder="Atharv" 
                  className="p-3.5 bg-zinc-900 border border-zinc-800 rounded text-white text-base focus:outline-none focus:border-blue-600 focus:ring-1 focus:ring-blue-600 transition-all"
                />
              </div>
            )}

            <div className="flex flex-col">
              <label className="text-[0.75rem] text-zinc-500 mb-2 uppercase tracking-widest font-bold">
                Email Address
              </label>
              <input 
                type="email" 
                placeholder="you@example.com" 
                className="p-3.5 bg-zinc-900 border border-zinc-800 rounded text-white text-base focus:outline-none focus:border-blue-600 focus:ring-1 focus:ring-blue-600 transition-all"
              />
            </div>
            
            <div className="flex flex-col">
              <label className="text-[0.75rem] text-zinc-500 mb-2 uppercase tracking-widest font-bold">
                Password
              </label>
              <input 
                type="password" 
                placeholder="••••••••" 
                className="p-3.5 bg-zinc-900 border border-zinc-800 rounded text-white text-base focus:outline-none focus:border-blue-600 focus:ring-1 focus:ring-blue-600 transition-all"
              />
            </div>
          </div>
          
          <button className="p-3.5 bg-blue-600 text-white rounded text-base font-bold cursor-pointer mt-8 transition-all hover:bg-blue-700 active:scale-[0.98]">
            {isLogin ? "Sign In" : "Register Now"}
          </button>
          
          <div className="mt-8 flex flex-col items-center gap-4">
            <p className="text-zinc-500 text-sm">
              {isLogin ? "Don't have an account?" : "Already have an account?"}{" "}
              <button 
                onClick={toggleAuthMode}
                className="text-blue-500 font-bold hover:underline bg-transparent border-none p-0"
              >
                {isLogin ? "Sign Up" : "Log In"}
              </button>
            </p>

            <button 
              className="bg-transparent border-none text-zinc-500 cursor-pointer text-[0.9rem] hover:text-white transition-colors"
              onClick={() => setShowPanel(false)}
            >
              ← Back to Overview
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}