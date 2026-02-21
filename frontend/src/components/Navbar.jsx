import React, { useState, useRef, useEffect } from 'react';

function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const menuRef = useRef(null);

  const toggleMenu = () => setIsOpen(!isOpen);

  // Close the dropdown if user clicks outside of it
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (menuRef.current && !menuRef.current.contains(event.target)) {
        setIsOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  return (
    <nav className='flex justify-between items-center sticky top-0 w-full h-14 bg-blue-200 px-4 z-50'>
      {/* LEFT: LOGO */}
      <div className='bg-red-400 w-40 h-10 flex items-center justify-center font-bold text-xs'>
        WEBSITE LOGO AND NAME
      </div>

      {/* CENTER: DESKTOP BUTTONS */}
      <div className='hidden md:flex justify-around items-center bg-red-500 w-[400px] h-10'>
        <div className="cursor-pointer">Button 1</div>
        <div className="cursor-pointer">Button 2</div>
        <div className="cursor-pointer">Button 3</div>
        <div className="cursor-pointer">Button 4</div>
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

        {/* DROPDOWN MENU  */}
        {isOpen && (
          <div className='absolute right-0 mt-2 w-56 bg-white border border-gray-200 shadow-xl rounded-md overflow-hidden md:hidden animate-in fade-in zoom-in duration-150'>
            {/* User Details Header */}
            <div className='bg-gray-50 p-4 border-b border-gray-100'>
              <p className='font-bold text-sm'>John Doe</p>
              <p className='text-xs text-gray-500'>user@example.com</p>
            </div>

            {/* Links */}
            <div className='flex flex-col py-2'>
              <button className='px-4 py-3 text-left hover:bg-blue-50 text-sm'>Button 1</button>
              <button className='px-4 py-3 text-left hover:bg-blue-50 text-sm'>Button 2</button>
              <button className='px-4 py-3 text-left hover:bg-blue-50 text-sm'>Button 3</button>
              <button className='px-4 py-3 text-left hover:bg-blue-50 text-sm'>Button 4</button>
              <hr className="my-1 border-gray-100" />
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