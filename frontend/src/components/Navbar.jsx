import React, { useState, useRef, useEffect } from 'react';
import { NavLink } from 'react-router-dom';
import icon from "/mlclub_ico_light.png"

function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const menuRef = useRef(null);

  const toggleMenu = () => setIsOpen(!isOpen);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (menuRef.current && !menuRef.current.contains(event.target)) {
        setIsOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  // Updated Desktop Link Styles: Uses a pseudo-element for the animated underline
  const navLinkStyles = ({ isActive }) => 
    `relative px-4 py-2 transition-all duration-300 ${
      isActive 
        ? 'text-blue-400 font-semibold' 
        : 'text-gray-400 hover:text-blue-300'
    } after:content-[""] after:absolute after:left-0 after:bottom-0 after:h-[2px] after:bg-blue-500 after:transition-all after:duration-300 ${
      isActive ? 'after:w-full' : 'after:w-0 hover:after:w-full'
    }`;

  // Mobile Dropdown Link Styles
  const mobileLinkStyles = ({ isActive }) => 
    `px-4 py-3 text-sm text-left transition-colors ${
      isActive 
        ? 'bg-blue-600 text-white font-bold' 
        : 'text-gray-300 hover:bg-zinc-700 hover:text-blue-400'
    }`;

  return (
    <nav className='flex justify-between items-center sticky top-0 w-full h-16 bg-zinc-900/70 backdrop-blur-2xl border-b border-zinc-800 px-6 z-50'>
      
      {/* LEFT: LOGO */}
      <NavLink to="/" className='flex items-center gap-2'>
        <div className='w-20 h-15 rounded-lg text-white font-black italic'>
            <img src={icon} alt="ML Club" />
        </div>
      </NavLink>

      {/* CENTER: DESKTOP NAVIGATION */}
      <div className='hidden md:flex items-center gap-4'>
        <NavLink to="/page1" className={navLinkStyles}>Dashboard</NavLink>
        <NavLink to="/page2" className={navLinkStyles}>Projects</NavLink>
        <NavLink to="/page3" className={navLinkStyles}>Analytics</NavLink>
        <NavLink to="/page4" className={navLinkStyles}>Teams</NavLink>
      </div>

      {/* RIGHT: USER INFO & DROPDOWN */}
      <div className='relative' ref={menuRef}>
        <div 
          onClick={toggleMenu} 
          className='flex items-center gap-3 bg-zinc-800 border border-zinc-700 px-3 py-1.5 rounded-full cursor-pointer hover:border-blue-500/50 transition-all select-none'
        >
          {/* Avatar Placeholder */}
          <div className='w-7 h-7 bg-blue-500 rounded-full flex items-center justify-center text-white text-xs font-bold'>KP</div>
          <span className='text-gray-200 text-sm font-medium hidden sm:inline'>User Profile</span>
          <span className={`text-[10px] text-gray-500 transition-transform md:hidden ${isOpen ? 'rotate-180' : ''}`}>▼</span>
        </div>

        {/* DROPDOWN MENU */}
        {isOpen && (
          <div className='absolute right-0 mt-3 w-60 bg-zinc-800 border border-zinc-700 shadow-2xl rounded-xl overflow-hidden md:hidden animate-in fade-in slide-in-from-top-2 duration-200'>
            {/* User Details Header */}
            <div className='bg-zinc-900/50 p-4 border-b border-zinc-700'>
              <p className='text-white font-bold text-sm'>John Doe</p>
              <p className='text-xs text-blue-400'>Admin Account</p>
            </div>

            {/* Links */}
            <div className='flex flex-col py-2'>
              <NavLink to="/page1" onClick={toggleMenu} className={mobileLinkStyles}>Dashboard</NavLink>
              <NavLink to="/page2" onClick={toggleMenu} className={mobileLinkStyles}>Projects</NavLink>
              <NavLink to="/page3" onClick={toggleMenu} className={mobileLinkStyles}>Analytics</NavLink>
              <NavLink to="/page4" onClick={toggleMenu} className={mobileLinkStyles}>Teams</NavLink>
              
              <div className='h-px bg-zinc-700 my-2 mx-4'></div>
              
              <NavLink to="/profile" onClick={toggleMenu} className={mobileLinkStyles}>Settings</NavLink>
              <button className='px-4 py-3 text-left text-sm text-red-400 hover:bg-red-500/10 transition-colors font-medium'>
                Sign Out
              </button>
            </div>
          </div>
        )}
      </div>
    </nav>
  );
}

export default Navbar;