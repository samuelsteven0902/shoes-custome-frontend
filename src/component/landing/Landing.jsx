import React from 'react'
import { Link } from 'react-router-dom'
import BgLanding from '../../assets/img/pageOne.webp';
import LogoLanding from '../../assets/img/logolanding.png';
import LogoLandingItem from '../../assets/img/versecustom.png';
import Navbar from '../layout/Navbar';

function Landing() {
  const containerStyle = {
    backgroundImage:`url(${BgLanding})`,
    backgroundSize: 'cover',
    backgroundPosition: 'center',
  };
  return (
    <div style={containerStyle} className='bg-white mx-auto relative max-w-screen-lg w-screen h-screen'>
      
      {/* <Navbar className={`top-0 z-[1050]`} /> */}
      {/* <div className="video-background">
        <video autoPlay width={400} muted loop id="video-bg" playsInline className="w-full h-full object-cover">
          <source src="/video/pageOne.mp4" type="video/mp4" />
          Your browser does not support the video tag.
        </video>
      </div> */}
      {/* <div className='flex justify-between'>
        <div className='bg-white w-full text-[16px] p-[10px]   '>
          <p className='uppercase  -mb-2   '>Verse Custom</p>
          <p className='font-inter uppercase '>New Jeans Edition</p>
        </div>
          
      </div> */}
    {/* <div className='bg-gray-100 h-1/2 flex justify-center items-center'>
      <p>ini 3d</p>
    </div> */}
    <div className='absolute flex justify-center left-1/2 top-1/3 -translate-x-1/2  items-center z-[1050]'>
          <img src={LogoLanding} className='w-64  ' />
        </div>

    <div className='fixed bottom-[27%] flex justify-center mx-auto w-full z-[1050] left-1/2 -translate-x-1/2  '>
      <Link to="/custom-shoes" className='bg-white border-2 px-4 py-2 border-black font-[24px] w-[296px] text-center h-[60px] flex items-center justify-center transition-all duration-500 border-2 border-black bg-white h-8 hover:bg-black hover:border-white hover:text-white transition-all duration-300 font-depixelbreit'>
        Pick Your Shoe !!
      </Link>
    </div>
    <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-b from-transparent to-black  via-transparent  pointer-events-none"></div>


    </div>
  )
}

export default Landing