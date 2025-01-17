import React from 'react';

function Navbar({ className }) {
  return (
    <div className={`font-depixelbreit z-[1055] max-w-[450px]  w-full bg-[#373737] overflow-x-hidden fixed ${className}`}>
      <p className='text-[16px] text-white animate-marquee whitespace-nowrap'>!!! CHOOSE your bunny !!! CHOOSE your bunny !!! CHOOSE your bunny !!! CHOOSE your bunny !!!</p>
      {/* <p className='text-[16px] text-white animate-marquee2 absolute top-0 whitespace-nowrap'>!!! CHOOSE your bunny !!! CHOOSE your bunny !!!</p> */}
    </div>
  );
}

export default Navbar;
