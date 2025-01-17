import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { BsFillTriangleFill } from 'react-icons/bs';
import VerseCustom from "../../assets/img/versecustom.png"
import wa from "../../assets/icon/wa.png"
import ig from "../../assets/icon/ig.png"
import { useLocation, useNavigate } from 'react-router-dom';
import Navbar from '../layout/Navbar';
import ReactLoading from 'react-loading';

function CustomSize() {
    let location = useLocation()
    let navigate = useNavigate()
    const [selectedShoe, setSelectedShoe] = useState(location.state );
    const [allSize,setAllSize] = useState([])
    const [loading,setLoading] = useState(true)
    const [genderSelected,setGenderSelected] = useState("MEN")
    const [sizeSelected,setSizeSelected] = useState([])
    const [imageUrl, setImageUrl] = useState(`/img/Sepatu/${location.state?.color}_${location.state?.type}.png`);

    const fetchSize = () =>{
        axios.get(`${import.meta.env.VITE_REACT_APP_API_BASE_URL}/api/sizes`)
      .then(response => {setAllSize(response.data.sizes);setLoading(false)})
      .catch(error => console.error('Error fetching shoes:', error));
    }

    useEffect(()=>{
        fetchSize();
    },[])

console.log(sizeSelected);

    const Whatsapphandle = (e) =>{
  
      let message = `Hi Verse Customs!\nI would like to ask you about the New Jeans collection`
  
  
        let url = `https://api.whatsapp.com/send?phone=6288286179257&text=${encodeURI(message)}&app_absent=0`;
   
        window.open(url);
    }

    const convertPrice = (plainPrice) => {
      if (plainPrice >= 1000) {
        // Konversi nilai menjadi K
        return (plainPrice / 1000) + 'K';
      } else {
        // Jika nilai kurang dari 1 juta, biarkan seperti itu
        return plainPrice.toString();
      }
    };

    function scrollToBottom() {
      // Mengatur scroll ke bagian bawah halaman
      window.scrollTo({
        top: document.body.scrollHeight,
        behavior: 'smooth' // Opsi ini memberikan efek animasi scroll
      });
    }

  return (
    <div className='max-w-[450px]  mx-auto   min-h-screen bg-gradient-to-t from-[#d08dd6] to-white pt-4'>
      <Navbar className={`top-0`} />
      <div className='flex  justify-between p-[21px]'>
            <div>
                <button onClick={()=>navigate("/custom-type",{state:selectedShoe})} className='bg-black hover:bg-white border-2 border-black'>
                    <BsFillTriangleFill size={30}  className='p-2 fill-white hover:fill-black -rotate-90' />
                </button>
            </div>
            <div>
                 <img src={VerseCustom} alt='verse' className='w-20'/>
            </div>
        </div>

        <div className='px-12 font-depixelbreit '>
          <p className='text-sm text-center'>{selectedShoe.shoes_name}</p>
         {sizeSelected.gender === undefined && <p className='text-center pt-4 animate-pulse'>Pick Your Size</p> }
        </div>

        <div className='flex flex-col content-center'>
          <div className='flex justify-center '>
            <img src={imageUrl} alt='shoe' className='w-3/4' />
          </div>
          <div className='flex justify-center'>
            {sizeSelected.gender && 
            <div className='flex flex-wrap justify-center text-lg font-depixelbreit'>
             {/* <p className='pr-4'> Size : {sizeSelected.shoe_size}</p>
              {sizeSelected && selectedShoe.type === "plain" ?
                  <p className="  ">IDR. {convertPrice(sizeSelected.plain_price)}</p>
                  :
                  <p className="  ">{convertPrice(sizeSelected.cartoon_price)}</p>
                  }
                <p className='w-full mx-auto flex justify-center'>Gender : {sizeSelected.gender} </p> */}
            </div>
            }
          </div>
        </div>

        <div className='pb-16'>
          <div className='flex justify-evenly'>
            <button className={`${genderSelected === "MEN" ?'border-white bg-black h-12 hover:bg-gray-500 hover:border-black hover:text-black text-white' : 'border-black bg-white h-12 hover:bg-gray-500 hover:border-white hover:text-white'}  w-36 font-depixelbreit text-[16px] border-2  transition-all duration-300 ease-in-out`} onClick={()=>setGenderSelected('MEN')}>Men</button>
            <button className={`${genderSelected === "WOMEN" ?'border-white bg-black h-12 hover:bg-gray-500 hover:border-black hover:text-black text-white' : 'border-black bg-white h-12 hover:bg-gray-500 hover:border-white hover:text-white'}  w-36 font-depixelbreit text-[16px] border-2  transition-all duration-300 ease-in-out`} onClick={()=>setGenderSelected('WOMEN')}>Women</button>
          </div>

          <div className='flex justify-center mt-12'>
            {/* <div className="grid grid-cols-4 gap-4 font-depixelbreit place-items-center items-center justify-center"> */}
            <div className="flex flex-wrap  font-depixelbreit  items-center justify-center">
              
            {!loading ? allSize.filter((item)=>{
              return item.gender === genderSelected 
            }).map((size,index)=>{
              return(
                <button onClick={()=>setSizeSelected(size)} key={index} className={`${(sizeSelected.shoe_size === size.shoe_size)&&(sizeSelected.gender === size.gender) ?'bg-gray-400' :'bg-white '} m-2  w-[71px] h-[51px] group hover:bg-black hover:text-white text-black border-2 border-black hover:border-white text-center transition-all duration-500 ease-in-out relative`}>
                  <div className='-mt1'>
                     <p className='text-[12px]  '>EU {size.shoe_size}</p>
                  </div>
                  <div className='absolute w-full mt-1'>  
                  {selectedShoe.type === "Plain" ?
                  <p className="  bg-black w-full group-hover:bg-white group-hover:text-black  text-white text-[8px] ">IDR. {convertPrice(size.plain_price)}</p>
                  :
                  <p className="  bg-black  group-hover:bg-white group-hover:text-black  text-white text-[9px] transition-all duration-300 ease-in-out">IDR. {convertPrice(size.cartoon_price)}</p>
                  }
                  </div>
                </button>
              )
            }):
            <div className=' w-full pb-12'>
                <ReactLoading type='bubbles' color='red' /> 
            </div>
            
            }
          </div>
          </div>

          <div className={``}>
            <div className='justify-center flex mt-8 mb-12'>
            <button className='animate-bounce font-depixelbreit flex flex-col items-center' onClick={scrollToBottom}>
              <BsFillTriangleFill size={40} className='p-2 fill-black hover:fill-white rotate-180' />
              <span className='pt-14 font-bold capitalize'>Terms & Condition !</span>
            </button>
            </div>
            <div className='text-[13px] font-depixelbreit text-center px-7'>
              <p className='pb-3'>- All products are MADE TO ORDER.</p>
              <p className='pb-3'>- Price will include base shoe <br/>(Nike Dunk Low Panda).</p>
              <p className='pb-3'>- Price does not include shipping cost. (DKI Jakarta Free shipping)</p>
              <p className='pb-3'>- Price of base shoe will align with the current market resell rates in Indonesia</p>
              <p className='pb-3'>- We accommodate custom orders that involve customers providing the shoes, contact us for further details.</p>
              <p className='pb-3'>- Your order will be shipped within a timeframe of 8 to 20 days, contingent upon shoe availability, waiting list & shipping location.</p>
              <p className='pb-3'>- For International orders, shipping will be within a timeframe of 15 to 30 days.</p>
              <p className='pb-3'>- For further details please contact us below</p>
              
             
              
              
              
              
            </div>

            <div className={`flex justify-center pt-6 `}>
            <button className='flex group justify-evenly items-center  px-1 font-depixelbreit text-[12px] border-2 border-black bg-white h-8 hover:bg-black hover:border-white hover:text-white transition-all duration-300 mr-4' 
              onClick={()=>window.open("https://www.instagram.com/versecustoms?igsh=MTV2dmJuMHpyemdqbA==")}
              >
                <img src={ig} alt='ig' className=' group-hover:hidden'/>  
                <span className='pl-1'>versecustoms</span>
              </button>

            <button className='flex group justify-evenly items-center px-1 font-depixelbreit text-[12px] border-2 border-black bg-white h-8 hover:bg-black hover:border-white hover:text-white transition-all duration-300' 
              onClick={Whatsapphandle}
              >
                <img src={wa} alt='ig' className=' group-hover:hidden'/>  
                <span className='pl-1'>versecustoms</span>
              </button>
            </div>

            {sizeSelected.gender === undefined && <p className='text-center pt-6 animate-pulse text-xl font-depixelklein'>Pick Your Size First</p> }

            <div className={`flex flex-col justify-center items-center  mt-6  ${sizeSelected.gender !== undefined ? '' :'hidden'}`}>

              <button className='w-36 font-depixelbreit text-[16px] border-2 border-black bg-white py-1 hover:bg-black hover:border-white hover:text-white transition-all duration-300' 
              onClick={()=>navigate("/custom-shoe",{state: {sizeSelected , selectedShoe}})}
              >Select</button>
            </div>
          </div>
       

        </div>

        <Navbar className={`bottom-0`} />
    </div>
  )
}

export default CustomSize