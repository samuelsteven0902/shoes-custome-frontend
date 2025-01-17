import React, { useEffect, useState } from 'react'
import { useLocation, useNavigate } from 'react-router-dom';
import VerseCustom from "../../assets/img/versecustom.png"
import { BsFillTriangleFill } from "react-icons/bs";
import Navbar from '../layout/Navbar';


function CustomType() {
    let location = useLocation()
    let navigate = useNavigate()
    const [selectedShoe, setSelectedShoe] = useState(location.state?.name ? {...location.state, type:'Plain'} : '');
    const [selectedType, setSelectedType] = useState('Plain');
    const [imageUrl, setImageUrl] = useState(`/img/Sepatu/${location.state?.color}_${selectedShoe.type}.png`);
//     const initialSelectedType = {
//         ...location.state?.types[0],
//         shoes_name: location.state?.shoes_name || '',
//   };
useEffect(() => {
  if(!selectedShoe){
    navigate("/custom-shoes")
  }
}, [])

  
  
  console.log(selectedShoe);
  return (
    <div className='max-w-[450px]  mx-auto relative  h-screen bg-gradient-to-t from-[#d08dd6] via-white to-white pt-5'>
        <Navbar className={`top-0`} />

        <div className='flex  justify-between p-[21px]'>
            <div>
                <button onClick={()=>navigate("/custom-shoes")} className='bg-black hover:bg-white border-2 border-black'>
                    <BsFillTriangleFill size={30}  className='p-2 fill-white hover:fill-black -rotate-90' />
                </button>
            </div>
            <div>
                 <img src={VerseCustom} alt='verse' className='w-20'/>
            </div>
        </div>

        <div className=' '>
            <div className="flex justify-center font-depixelklein">
                <p>{selectedShoe.name}</p>
            </div>
            <div className='flex justify-center'>
                 <img src={imageUrl} alt='shoe'  className='w-3/4'/>
            </div>
            <div className='flex justify-evenly mt-12'>
                <div>
                    <button className={`${selectedShoe.type !== 'Plain' ?'border-black bg-white  hover:border-white hover:text-white':'text-white border-white bg-black  hover:border-black hover:text-black'} hover:bg-gray-600  w-36 font-depixelbreit text-[16px] border-2  h-12  transition-all duration-100`} onClick={()=>{setSelectedShoe({...selectedShoe,type:"Plain"});setImageUrl(`/img/Sepatu/${location.state?.color}_Plain.png`)}}>Plain</button>
                </div>
                <div >
                    <button className={`${selectedShoe.type !== 'Cartoon' ?'border-black bg-white  hover:border-white hover:text-white':'text-white border-white bg-black  hover:border-black hover:text-black'} hover:bg-gray-600  w-36 font-depixelbreit text-[16px] border-2  h-12  transition-all duration-100`}  onClick={()=>{setSelectedShoe({...selectedShoe,type:"Cartoon"});setImageUrl(`/img/Sepatu/${location.state?.color}_Cartoon.png`)}}>Cartoon</button>
                </div>
            </div>
            <div className='flex justify-center pt-12'>
                <button className='w-36 font-depixelbreit text-[16px] border-2 border-black bg-white h-8 hover:bg-black hover:border-white hover:text-white transition-all duration-300' onClick={()=>navigate("/custom-size",{state:selectedShoe})}>Select</button>
            </div>
        </div>
        <Navbar className={`bottom-0`} />


    </div>
  )
}

export default CustomType