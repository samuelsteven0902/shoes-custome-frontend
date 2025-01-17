import React, { useEffect, useState } from 'react'
import { useLocation, useNavigate } from 'react-router-dom'
import Navbar from '../layout/Navbar';
import verse from "../../assets/img/logolanding.png";
import trf from "../../assets/img/TRF.png";
import loadingImage from "../../assets/img/loading.png";
import html2canvas from 'html2canvas';

function MyShoe() {
  const location = useLocation();
  const navigate = useNavigate();
  
  const [selectedShoe ,setSelectedShoe] = useState(location.state)

  useEffect(() => {
    downloadImage()
  }, [])

  useEffect(() => {
    if(!selectedShoe.color){
      navigate("/")
    }
  }, [])

  

  

  const downloadImage = () => {
    const table = document.getElementById('customCaptureArea');
  
    html2canvas(table).then(
      function (canvas) {
        const link = document.createElement('a');
        link.download = 'My-Verse-Custome-Shoe.png';
        link.href = canvas.toDataURL('image/png');
        link.click();
      },
      function (error) {
        console.error('html2canvas error:', error);
      }
    );
  };


  const containerStyle = {
    backgroundImage: `url(img/GA/${selectedShoe.color}.jpg)`,
    backgroundSize: 'cover',
    backgroundPosition: 'center',
  };

  return (

    <div style={containerStyle} onClick={downloadImage} id='customCaptureArea' className='mx-auto relative max-w-[450px] h-screen overflow-hidden '>
      <div className='absolute w-2/3 top-[47%] left-1/2 transform -translate-x-1/2 -translate-y-1/2 '>
        <div className='relative '>
        <img
            src={`img/Sepatu/${selectedShoe.color}_${selectedShoe.type}.png`}
            className='w-full z-[1050]'
            alt={selectedShoe.name}
          />
          <div className='w-[10%] absolute left-[27%] bottom-[23%] z-[1060]'>
            {selectedShoe.SideA.name && (
              <img src={`img/Stiker/SideA/${selectedShoe.SideA.name}.png`} className='' />
            )}
          </div>
          <div className='w-[10%] absolute top-[46%] right-[32%] z-[1060] '>
            {selectedShoe.SideB.name && (
              <img src={`img/Stiker/SideB/${selectedShoe.SideB.name}.png`} />
            )}
          </div>
          <div className='w-[20%] absolute right-[8%] bottom-[28%] z-[1060]'>
            {selectedShoe.SideC.name && (
              <img src={`img/Stiker/SideC/${selectedShoe.SideC.name}.png`} />
            )}
          </div>
        </div>
        </div>
   
      
       <div className='absolute left-1/2 -translate-x-1/2  top-[5%]'>
         <div className='flex  justify-evenly  z-[1050]'>
            <div className=' flex'>
              <img src={verse} alt='verse' className='w-36 object-contain bg-auto pr-12' />
            </div>
            <div className=''>
              <img src={trf} alt='verse' className='w-14' />
            </div>
          </div>  
    
       </div>
 
       <div className='absolute left-1/2 -translate-x-1/2 bottom-[10%] w-full'>
        <div className='z-[1050] w-full'>
            <p className='font-depixelbreit text-white text-xl text-center '>{selectedShoe.name}</p>
          </div>
       </div>


 
    </div>
  )
}

export default MyShoe