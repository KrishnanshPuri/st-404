import React, { useState } from 'react';

function Navbar() {
  const [isOpen, setIsOpen] = useState(false);

  const toggleMenu = () => setIsOpen(!isOpen);

  return (
    <>
      <nav className='flex justify-between items-center sticky top-0 w-full h-14 bg-blue-200 px-4 z-50'>
        {/* LEFT: LOGO */}
        <div className='bg-red-400 w-40 h-10 flex items-center justify-center font-bold text-xs text-center'>
          WEBSITE LOGO AND NAME
        </div>

        {/* CENTER: DESKTOP BUTTONS (Hidden on Mobile) */}
        <div className='hidden md:flex justify-around items-center bg-red-500 w-[400px] h-10'>
          <div className="cursor-pointer hover:opacity-80">Button 1</div>
          <div className="cursor-pointer hover:opacity-80">Button 2</div>
          <div className="cursor-pointer hover:opacity-80">Button 3</div>
          <div className="cursor-pointer hover:opacity-80">Button 4</div>
        </div>

        {/* RIGHT: USER INFO / TOGGLE */}
        <div 
          onClick={toggleMenu} 
          className='bg-red-400 w-32 h-10 flex items-center justify-center cursor-pointer hover:bg-red-300 transition-colors'
        >
          USER INFO
        </div>
      </nav>

      {/* MOBILE SIDEBAR OVERLAY */}
      <div className={`fixed inset-0 z-[60] md:hidden transition-all duration-300 ${isOpen ? "visible" : "invisible"}`}>
        {/* Dark Background Tint */}
        <div 
          className={`absolute inset-0 bg-black/50 transition-opacity duration-300 ${isOpen ? "opacity-100" : "opacity-0"}`} 
          onClick={toggleMenu}
        ></div>

        {/* Sidebar Content */}
        <div className={`absolute right-0 top-0 bg-white w-72 h-full shadow-2xl transition-transform duration-300 ease-in-out transform ${isOpen ? "translate-x-0" : "translate-x-full"}`}>
          
          {/* Close Button */}
          <button onClick={toggleMenu} className="p-4 float-right text-gray-600">
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>

          <div className="flex flex-col p-6 pt-12 gap-8">
            {/* User Info inside Sidebar */}
            <div className="bg-red-400 p-4 rounded text-center font-bold">
               USER INFO
               <p className="text-xs font-normal mt-1 opacity-80">Account Settings</p>
            </div>

            {/* Navigation Links inside Sidebar */}
            <div className="flex flex-col gap-4 text-gray-700">
              <div className="p-3 border-b border-gray-100 hover:bg-gray-50 cursor-pointer">Button 1</div>
              <div className="p-3 border-b border-gray-100 hover:bg-gray-50 cursor-pointer">Button 2</div>
              <div className="p-3 border-b border-gray-100 hover:bg-gray-50 cursor-pointer">Button 3</div>
              <div className="p-3 border-b border-gray-100 hover:bg-gray-50 cursor-pointer">Button 4</div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default Navbar;