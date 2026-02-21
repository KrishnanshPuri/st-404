import React, { useState, useRef, useEffect } from 'react';
import { NavLink } from 'react-router-dom';

function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const menuRef = useRef(null);

  const toggleMenu = () => setIsOpen(!isOpen);

  // Close the dropdown if user clicks outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (menuRef.current && !menuRef.current.contains(event.target)) {
        setIsOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  // Standard styling for desktop links
  // 'isActive' is provided by NavLink automatically
  const navLinkStyles = ({ isActive }) => 
    `px-3 py-2 transition-colors ${isActive ? 'text-white font-bold underline' : 'text-black hover:opacity-70'}`;

  // Standard styling for mobile dropdown links
  const mobileLinkStyles = ({ isActive }) => 
    `px-4 py-3 text-sm text-left transition-colors ${isActive ? 'bg-blue-100 text-blue-700 font-bold' : 'hover:bg-blue-50 text-gray-700'}`;

  return (
    <nav className='flex justify-between items-center sticky top-0 w-full h-14 bg-blue-200 px-4 z-50'>
      {/* LEFT: LOGO */}
      <NavLink to="/" className='bg-red-400 w-40 h-10 flex items-center justify-center font-bold text-xs'>
        WEBSITE LOGO AND NAME
      </NavLink>

      {/* CENTER: DESKTOP NAVIGATION (Hidden on Mobile) */}
      <div className='hidden md:flex justify-around items-center bg-red-500 w-[400px] h-10'>
        <NavLink to="/page1" className={navLinkStyles}>Button 1</NavLink>
        <NavLink to="/page2" className={navLinkStyles}>Button 2</NavLink>
        <NavLink to="/page3" className={navLinkStyles}>Button 3</NavLink>
        <NavLink to="/page4" className={navLinkStyles}>Button 4</NavLink>
      </div>

      {/* RIGHT: USER INFO & DROPDOWN CONTAINER */}
      <div className='relative' ref={menuRef}>
        <div 
          onClick={toggleMenu} 
          className='bg-red-400 px-4 h-10 flex items-center justify-center cursor-pointer select-none'
        >
          USER INFO 
          <span className={`ml-2 transition-transform md:hidden ${isOpen ? 'rotate-180' : ''}`}>▼</span>
        </div>

        {/* DROPDOWN MENU (Mobile Only) */}
        {isOpen && (
          <div className='absolute right-0 mt-2 w-56 bg-white border border-gray-200 shadow-xl rounded-md overflow-hidden md:hidden'>
            {/* User Details Header */}
            <div className='bg-gray-50 p-4 border-b border-gray-100'>
              <p className='font-bold text-sm'>John Doe</p>
              <p className='text-xs text-gray-500'>user@example.com</p>
            </div>

            {/* Links */}
            <div className='flex flex-col py-2'>
              {/* Note: onClick={toggleMenu} ensures the menu closes after clicking a link */}
              <NavLink to="/page1" onClick={toggleMenu} className={mobileLinkStyles}>Button 1</NavLink>
              <NavLink to="/page2" onClick={toggleMenu} className={mobileLinkStyles}>Button 2</NavLink>
              <NavLink to="/page3" onClick={toggleMenu} className={mobileLinkStyles}>Button 3</NavLink>
              <NavLink to="/page4" onClick={toggleMenu} className={mobileLinkStyles}>Button 4</NavLink>
              
              <hr className="my-1 border-gray-100" />
              
              <NavLink to="/profile" onClick={toggleMenu} className={mobileLinkStyles}>Profile Settings</NavLink>
              <button className='px-4 py-3 text-left hover:bg-red-50 text-sm text-red-600 font-medium'>
                Logout
              </button>
            </div>
          </div>
        )}
      </div>
    </nav>
  );
}

export default Navbar;