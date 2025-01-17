import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom';
import Navbar from '../layout/Navbar';
import logolanding from '../../assets/img/versecustom.png';
import NewJeans from '../../assets/img/colorShoe.png';
import ReactLoading from 'react-loading';
import Sepatu from '../canvas/Sepatu';
import { AllSepatu } from '../constant';
import BgLanding from '../../assets/img/pageTwo.png';



function ColorShoes() {
  const navigate = useNavigate();
  const [shoes, setShoes] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Fetch shoes data from Laravel API when the component mounts
    axios.get(`${import.meta.env.VITE_REACT_APP_API_BASE_URL}/api/shoes`)
      .then(response => {
        setShoes(response.data.shoes)
        setLoading(false);
      })
      .catch(error => {
        console.error('Error fetching shoes:', error);
        setLoading(false); // Make sure to set loading to false in case of an error
      });
  }, []);

  

  const handleClick = (shoe) => {
    navigate("/custom-type",{state:shoe})
  }

  useEffect(() => {
    const handleScroll = () => {
      const scrolled = window.scrollY;
      document.body.style.backgroundPositionY = -(scrolled * 0.3) + 'px';
    };
  
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const containerStyle = {
    backgroundImage: `url(${BgLanding})`,
    zIndex: -1,
    position: 'fixed',
    left: '50%',
    height: '100%',
    width: '100%',
    backgroundSize: 'cover',
  };
  
  
  return (
      <div  className=' bg-gradient-to- from-[rgb(103,175,219)] to-white mx-auto max-w-[450px] pb-8 h-full'>
      <div style={containerStyle} className="absolute top-0 left-0 -translate-x-1/2 w-full  max-w-[450px] h-full bg-blue-200 bg-gradient-to-b from-transparent to-black  via-transparent  pointer-events-none"></div>

<Navbar className={`top-0`} />


<div className=''> 


<div className='z-[1050]'>
<div className='flex flex-col pt-12 justify-items-center items-center z-[1050] ' >
  <img src={logolanding} alt='newjeans' className='w-16 pb-12 z-[1050]' />
  <img src={NewJeans} alt='newjeans' className='z-[1050] w-[90%]' />
</div>



{loading ? (
  // Elemen loading
  <div className='relative w-full h-full flex justify-center items-center '>
      {/* <ReactLoading type='cylon' color='red' height={'20%'} width={'20%'} /> */}
    {/* <img src={loadingImage} className='animate-loadingImage absolute w-full h-full ' alt='img'/> */}
  </div>
) : (
(

<div className='grid grid-cols-1 gap-10 justify-items-center  '>
{AllSepatu.map((shoe,key) => (
    <div
      onClick={() => handleClick(shoe)}
      key={key}
      className="cursor-pointer flex flex-col justify-items-center items-center text-center  transition-all duration-500 px-3 rounded group "
      
    >
      
      {/* <Sepatu warna={shoe.color} /> */}
    <img
      src={`/img/Sepatu/${shoe.color}_Plain.png`}
      alt={shoe.shoes_name}
      className="mt-4 w-60 z-[1050]"
    />
    <p className='flex justify-center text-sm text-white group-hover:animate-bounce transition-all duration-500 font-depixelbreit uppercase outline-4 drop-shadow-[0_1.2px_1.2px_rgba(0,0,0,0.8)]'>{shoe.name}</p>
    </div>
  ))}
</div>

)
)} 
</div>
</div>


<Navbar className={`bottom-0`} />

   </div>
  )
}

export default ColorShoes