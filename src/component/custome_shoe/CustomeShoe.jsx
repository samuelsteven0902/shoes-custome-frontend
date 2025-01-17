import axios from 'axios'
import * as htmlToImage from 'html-to-image';
import React, { createRef, useCallback, useEffect, useRef, useState } from 'react'
import { useLocation, useNavigate } from 'react-router-dom'
import { BsFillTriangleFill } from 'react-icons/bs';
import {
  Offcanvas,
  Ripple,
  initTE,
  Modal,
} from "tw-elements";
import Navbar from '../layout/Navbar';
import VerseCustom from "../../assets/img/versecustom.png"
// import stiker2 from "../../storage/sticker-images/"
// import stiker3 from "../../storage/sticker-images/"
import html2canvas from 'html2canvas';
import { toPng } from 'html-to-image';
import { createFileName, useScreenshot } from 'use-react-screenshot'

import { StikerSideA,StikerSideB,StikerSideC } from '../constant';


function CustomeShoe() {
  let location = useLocation()
  let navigate = useNavigate()
  const [selectedShoe, setSelectedShoe] = useState(location.state.sizeSelected ? {
    ...location.state.sizeSelected,
    ...location.state.selectedShoe,
    size_id : location.state.sizeSelected.id
    
  }: '');

  const [assetsA, setAssetsA] = useState([]);
  const [assetsB, setAssetsB] = useState([]);
  const [assetsC, setAssetsC] = useState([]);
  const [selectedAssetsA, setSelectedAssetsA] = useState([]);
  const [selectedAssetsB, setSelectedAssetsB] = useState([]);
  const [selectedAssetsC, setSelectedAssetsC] = useState([]);
  const [priceAsset, setPriceAsset] = useState(0);
  const [assetType, setAssetType] = useState("");
  const [sembunyi, setSembunyi] = useState(true);
  const [imageUrl, setImageUrl] = useState(`/img/Sepatu/${selectedShoe?.color}_${selectedShoe.type}.png`);
  const [totalPrice, setTotalPrice] = useState(0);
  const [kelas, setKelas] = useState('');
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const timeoutId = setTimeout(() => {
      setIsLoading(false);
    }, 1000);

    return () => clearTimeout(timeoutId);
  }, []);

  const handleReload = () => {
    setIsLoading(true);

    // Memulai proses loading kembali
    setTimeout(() => {
      setIsLoading(false);
    }, 1000);
  };

  useEffect(() => {
    initTE({ Offcanvas, Ripple, Modal });
    // Fetch assets data from Laravel API when the component mounts
    axios.get(`${import.meta.env.VITE_REACT_APP_API_BASE_URL}/api/assetsA`)
      .then(response => setAssetsA(response.data.SideA))
      .catch(error => console.error(`Error fetching SideA:`, error));

    axios.get(`${import.meta.env.VITE_REACT_APP_API_BASE_URL}/api/assetsB`)
      .then(response => setAssetsB(response.data.SideB))
      .catch(error => console.error(`Error fetching SideB:`, error));

    axios.get(`${import.meta.env.VITE_REACT_APP_API_BASE_URL}/api/assetsC`)
      .then(response => setAssetsC(response.data.SideC))
      .catch(error => console.error(`Error fetching SideC:`, error));
  }, []);

  if (!selectedShoe) {
    navigate('/custome-shoes')
  }

  const countAsset = (stiker) =>{
    return Object.keys(stiker).length
  }


  useEffect(() => {
    // Update the total price whenever selectedShoe or selectedAssets change
    const priceAsset = countAsset(selectedAssetsA) + countAsset(selectedAssetsB) + countAsset(selectedAssetsC);
    let priceIncrement = (selectedAssetsA.name ? 200000 : 0) + (selectedAssetsB.name ? 200000 : 0) + (selectedAssetsC.name ? 200000 : 0);
    
    // Jika priceAsset sama dengan 3, tambahkan diskon sebesar -100000
    if (priceAsset === 6) {
      priceIncrement += -100000;
    }
    
    // setPriceAsset(priceAsset + priceIncrement);
    

  
    if (selectedShoe.type === 'Cartoon') {
      setTotalPrice(selectedShoe.cartoon_price + priceIncrement);
    } else {
      setTotalPrice(selectedShoe.plain_price + priceIncrement);
    }
  }, [selectedShoe, selectedAssetsA, selectedAssetsB, selectedAssetsC]);
  
  


  const handleAssetTypeChange = (newAssetType) => {
    console.log(newAssetType);
    setAssetType(newAssetType);
  };


  const handleAssetClick = (asset) => {
    console.log(asset);
    let priceIncrement = 0;
  
    if (assetType === "A") {
      setSelectedAssetsA(asset);
    } else if (assetType === "B") {
      setSelectedAssetsB(asset);
    } else if (assetType === "C") {
      setSelectedAssetsC(asset);
    }
  
    // Update selectedShoe.price
    setSelectedShoe((prevShoe) => ({
      ...prevShoe,
      price: prevShoe.price + priceIncrement,
    }));
  };


  const hapusAllAssets = () => {
    let priceDecrement = 0;
  
    if (selectedAssetsA.name) {
      setSelectedAssetsA([]);
      priceDecrement += 100000;
    }
  
    if (selectedAssetsB.name) {
      setSelectedAssetsB([]);
      priceDecrement += 100000;
    }
  
    if (selectedAssetsC.name) {
      setSelectedAssetsC([]);
    }
  
    // Update selectedShoe.price
    setSelectedShoe((prevShoe) => ({
      ...prevShoe,
      price: Math.max(prevShoe.price - priceDecrement, 0),
    }));
  };
  

  const getSelectedAssets = () => {
    if (assetType === "A") return StikerSideA;
    if (assetType === "B") return StikerSideB;
    if (assetType === "C") return StikerSideC;
    return [];
  };

  const Whatsapphandle = (e) =>{

    let message = `Anyeong! ✨\nI would like to purchase this bunny! This is my information\nName:\nAdress:\nPrice: Rp. ${formatNumberWithCommas(totalPrice)}\nSize: ${selectedShoe.shoe_size}  ${selectedShoe.gender}`


      let url = `https://api.whatsapp.com/send?phone=6288286179257&text=${encodeURI(message)}&app_absent=0`;
 
      window.open(url);
  }


  const handlePostGiveAway = () =>{
    setKelas("asdsadasdadasdsaa")
    // axios.post(`${import.meta.env.VITE_REACT_APP_API_BASE_URL}/api/shoes/customize/${selectedShoe.id}`,
    // {
    //   id_side_A : selectedAssetsA.id,
    //   id_side_B: selectedAssetsB.id,
    //   id_side_C: selectedAssetsC.id,
    //   size_id : selectedShoe.size_id
    // })
    // .then((res)=>{
    //   console.log(res);
      navigate(`/my-shoe`,{state:{...selectedShoe,
        price:totalPrice,
        SideA:selectedAssetsA,
        SideB:selectedAssetsB,
        SideC:selectedAssetsC,
      }})
    // })
    //   .catch(error => console.error(`Error fetching SideB:`, error));
  }


console.log(selectedShoe);

  const canvasRef = useRef(null);

  

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

  const formatNumberWithCommas = (number) => {
    return number.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
  };

  


  
  return (
    <div className='max-w-[450px] mx-auto font-depixelklein h-full bg-gradient-to-t from-[#d08dd6] via-white to-white py-4 pb-8 min-h-screen relative  '>
      <Navbar className={`top-0`} />
      <div className='flex  justify-between p-[21px]'>
            <div>
                <button onClick={()=>navigate("/custom-size",{state:{color:selectedShoe.color,name:selectedShoe.name,type:selectedShoe.type}})} className='bg-black hover:bg-white border-2 border-black'>
                    <BsFillTriangleFill size={30}  className='p-2 fill-white hover:fill-black -rotate-90' />
                </button>
            </div>
            <div>
                 <img src={VerseCustom} alt='verse' className='w-20'/>
            </div>
        </div>

      <p className='w-full text-center font-depixelbreit animate-pulse'>{assetType ? `Side ${assetType} `: "Choose the side"}</p>


      
      <div className='mx-4 '>
        <div className='relative'>
        <div ref={canvasRef} id='customCaptureArea' className='flex justify-center relative w-full download-container' >
          <img src={imageUrl} className='w-full z-[1050]' alt={selectedShoe.shoes_name} />
          <button className='absolute left-[26%] bottom-[24%] w-12 z-[1070]  ' type="button"
                data-te-offcanvas-toggle
                data-te-target="#offcanvasBottom"
                aria-controls="offcanvasBottom"
                data-te-ripple-init
                data-te-ripple-color="light"
                 onClick={() => handleAssetTypeChange("A")}></button>
          <button className='absolute top-[44%] w-12  right-[33%]  z-[1070] ' 
                type="button"
                data-te-offcanvas-toggle
                data-te-target="#offcanvasBottom"
                aria-controls="offcanvasBottom"
                data-te-ripple-init
                data-te-ripple-color="light"
                onClick={() => handleAssetTypeChange("B")}></button>
          <button className='absolute right-[15%] w-12  bottom-[29%]  z-[1070] '
                type="button"
                data-te-offcanvas-toggle
                data-te-target="#offcanvasBottom"
                aria-controls="offcanvasBottom"
                data-te-ripple-init
                data-te-ripple-color="light"
                onClick={() => handleAssetTypeChange("C")}></button>
          <div className='w-[10%] absolute left-[27%] bottom-[23%] z-[1060]'>
          
            {selectedAssetsA.name  && <img src={`img/Stiker/SideA/${selectedAssetsA.name}.png`} className=''/>}
          </div>
          <div className='w-[10%] absolute top-[46%] right-[32%] z-[1060] '>
          {selectedAssetsB.name && <img src={`img/Stiker/SideB/${selectedAssetsB.name}.png`} />}
          </div>
          <div className='w-[20%] absolute right-[8%] bottom-[28%] z-[1060]'>
          {selectedAssetsC.name && <img src={`img/Stiker/SideC/${selectedAssetsC.name}.png`}  />}
          </div>
        </div>
          {!selectedAssetsA.name  && <span className={`absolute pl-4 items-center pb-2 animate-pulse  left-[27%] bottom-[23%] z-[1070] `}>A</span>}
          {!selectedAssetsB.name  && <span className={`absolute pl-4 items-center pb-2 animate-pulse  top-[49%] right-[35%] z-[1070] `}>B</span>}
          {!selectedAssetsC.name  && <span className={`absolute pl-4 items-center pb-2 animate-pulse  right-[20%] bottom-[26%] z-[1070] `}>C</span>}
        </div>
       

        <div className='text-left w-full my-4'>
          <p className='font-depixelbreit text-left font-bold'>Estimate Price</p>
          {selectedShoe.type !== 'Plain' ? 
            <p className='font-depixelbreit text-left'>Rp {formatNumberWithCommas(totalPrice)}</p> :
            <p className='font-depixelbreit text-left'>
              Rp {formatNumberWithCommas(totalPrice)}
            </p>
          }
          <p></p>
        </div>

        
        <div className='w-full  justify-center font-depixelklein'>
              <div className='justify-items-center grid grid-cols-3 gap-4'>
                <button  className="  uppercase leading-normal  transition duration-150 ease-in-out w-full   "
                type="button"
                data-te-offcanvas-toggle
                data-te-target="#offcanvasBottom"
                aria-controls="offcanvasBottom"
                data-te-ripple-init
                data-te-ripple-color="light"
                onClick={() => handleAssetTypeChange("A")}
                >
                  <p className='text-base'>
                    Side A
                  </p>
                  <div className={`  bg-opacity-50 inline-block  border-2 border-black h-24 w-full  rounded-2xl ${selectedAssetsA.name ?'bg-black':'bg-gray-100'} `}>
                     {selectedAssetsA.name  ? <div className=' rounded-2x h-full flex justify-center items-center'>
                      <img src={`img/Stiker/SideA/${selectedAssetsA.name}.png`} className='w-20'/>
                    </div> : <p className='text-sm h-full flex justify-center items-center animate-pulse'>Click Me !</p>}
                  </div>
                </button>
                <button  className="  uppercase leading-normal  transition duration-150 ease-in-out w-full   "
                type="button"
                data-te-offcanvas-toggle
                data-te-target="#offcanvasBottom"
                aria-controls="offcanvasBottom"
                data-te-ripple-init
                data-te-ripple-color="light"
                onClick={() => handleAssetTypeChange("B")}
                >
                  <p className='text-base'>
                    Side B
                  </p>
                  <div className={` w-full bg-opacity-50 inline-block  border-2 border-black h-24  rounded-2xl ${selectedAssetsB.name ?'bg-black':'bg-gray-100'} `}>
                     {selectedAssetsB.name  ? <div className=' rounded-2xl h-full flex justify-center items-center'>
                      <img src={`img/Stiker/SideA/${selectedAssetsB.name}.png`} className='w-20 '/>
                    </div>: <p className='text-sm h-full flex justify-center items-center animate-pulse w-full'>Click Me !</p>}
                  </div>
                </button>
                <button  className="  uppercase leading-normal  transition duration-150 ease-in-out w-full   "
                type="button"
                data-te-offcanvas-toggle
                data-te-target="#offcanvasBottom"
                aria-controls="offcanvasBottom"
                data-te-ripple-init
                data-te-ripple-color="light"
                onClick={() => handleAssetTypeChange("C")}
                >
                  <p className='text-base'>
                    Side C
                  </p>
                  <div className={` w-full 
 bg-opacity-50 inline-block  border-2 border-black h-24   rounded-2xl ${selectedAssetsC.name ?'bg-black':'bg-gray-100'} `}>
                    {selectedAssetsC.name  ?  <div className=' rounded-2xl h-full flex justify-center items-center'>
                      <img src={`img/Stiker/SideC/${selectedAssetsC.name}.png`} className='w-11/12 '/>
                    </div>: <p className='text-sm h-full flex justify-center items-center animate-pulse'>Click Me !</p>}
                  </div>
                </button>
                
        </div>
        </div>

        <div className='flex justify-center mt-4'>
        {
          (selectedAssetsA.name || selectedAssetsB.name || selectedAssetsC.name) && (
            <button className='px-4 py-2 bg-red-500 border-2 text-base border-white shadow-xl text-white hover:border-red-500 hover:text-red-500 hover:bg-white transition-all duration-300 ease-in-out font-depixelklein' onClick={() => hapusAllAssets()}>
              Remove All
            </button>
          )
        }
        </div>
        <canvas ref={canvasRef} id="customCaptureArea" style={{ display: "none" }} />

        <div className='flex justify-evenly mt-12'>
          <div>
            <button onClick={handlePostGiveAway} className='w-36 font-depixelbreit text-[16px] border-2 border-black bg-white h-12 hover:bg-black hover:border-white hover:text-white transition-all duration-300'>
              Give Away
            </button>
          </div>
          <div>
            <button
             type="button"
             data-te-toggle="modal"
             data-te-target="#exampleModalCenteredScrollable"
             data-te-ripple-init
             onClick={downloadImage} 
             className='w-36 font-depixelbreit text-[16px] border-2 border-black bg-white h-12 hover:bg-black hover:border-white hover:text-white transition-all duration-300'>
              Payment
            </button>
          </div>
        </div>

{/* Modal */}
        <div
  data-te-modal-init
  className="fixed left-0 top-0 z-[1180] hidden  h-full w-full overflow-y-auto overflow-x-hidden outline-none"
  id="exampleModalCenteredScrollable"
  tabIndex="-1"
  aria-labelledby="exampleModalCenteredScrollableLabel"
  aria-modal="true"
  role="dialog"
  onClick={handleReload}
  >
  <div
    data-te-modal-dialog-ref
    className="pointer-events-none relative  flex min-h-[calc(100%-1rem)] w-auto translate-y-[-50px] items-center opacity-0 transition-all duration-300 ease-in-out min-[576px]:mx-auto min-[576px]:mt-7 min-[576px]:min-h-[calc(100%-3.5rem)] min-[576px]:max-w-[300px]">
    <div
      className="pointer-events-auto relative flex w-full flex-col  border-none m-8 bg-white bg-clip-padding text-current shadow-lg outline-none dark:bg-neutral-600" onClick={()=>setIsLoading(true)}>
      <div
        className="flex flex-shrink-0 items-center justify-between -md border-b-2 border-neutral-100 border-opacity-100 p-4 dark:border-opacity-50">
        {/* <h5
          className="text-xl font-medium leading-normal text-neutral-800 dark:text-neutral-200"
          id="exampleModalCenteredScrollableLabel">
          Detail Sepatu
        </h5> */}
       
      </div>

      <div className="relative p-4 flex justify-center">
     
        <div>
              <div className="flex flex-col">
                <div className="overflow-x-auto sm:-mx-6 lg:-mx-8">
                  <div className="inline-block min-w-full py-2 sm:px-6 lg:px-8">
                    <div className="overflow-hidden">
                      <table className="min-w-full text-left text-sm font-light">
                        <tbody>
                        {isLoading ? (
        <div>
          {/* Tampilan loading bisa diganti dengan spinner atau pesan loading */}
          <p>Loading...</p>
        </div>
      ) : (
        <div>
            <button
                          type="button"
                          onClick={Whatsapphandle} 
                          className='w-36 font-depixelbreit text-[16px] border-2 border-black bg-white h-12 hover:bg-black hover:border-white hover:text-white transition-all duration-300'>
                            Continue to Payment
                          </button>
        </div>
      )}
                      
                        </tbody>
                      </table>
                    </div>
                  </div>
                </div>
              </div>
        </div>
   
        {/* <br /><br /><br /><br /><br /><br /><br /><br /><br /><br /> */}
      </div>

     
    </div>
  </div>
  </div>


{/* OFF CANVAS */}
<div
  className="invisible fixed bottom-0 left-0 right-0 max-w-[450px] mx-auto z-[1045] flex h-1/3 max-h-full  translate-y-full flex-col border-none bg-white bg-clip-padding text-neutral-700 shadow-sm outline-none transition duration-300 ease-in-out dark:bg-neutral-800 dark:text-neutral-200 [&[data-te-offcanvas-show]]:transform-none"
  tabIndex="-1"
  id="offcanvasBottom"
  aria-labelledby="offcanvasBottomLabel"
  data-te-offcanvas-init>
  <div className="flex items-center justify-between p-4 font-depixelklein">
    <h5
      className="mb-0 font-semibold leading-normal "
      id="offcanvasBottomLabel">
      Side {assetType}
    </h5> 
    {/* {selectedAssetsA.icon_path &&<button onClick={()=>setSelectedAssetsA([])}>Hapus</button> }
    {selectedAssetsB.icon_path &&<button onClick={()=>setSelectedAssetsB([])}>Hapus</button> }
    {selectedAssetsC.icon_path &&<button onClick={()=>setSelectedAssetsC([])}>Hapus</button> } */}
    {
      assetType === "A" && selectedAssetsA.name ? (
        <button onClick={() => setSelectedAssetsA([])} className='text-red-600 text-lg'>Remove</button>
      ) : assetType === "B" && selectedAssetsB.name ? (
        <button onClick={() => setSelectedAssetsB([])} className='text-red-600 text-lg'>Remove</button>
      ) : assetType === "C" && selectedAssetsC.name? (
        <button onClick={() => setSelectedAssetsC([])} className='text-red-600 text-lg'>Remove</button>
      ) : (
        ''
      )
    }

    <button
      type="button"
      className="box-content rounded-none border-none opacity-50 hover:no-underline hover:opacity-75 focus:opacity-100 focus:shadow-none focus:outline-none"
      data-te-offcanvas-dismiss>
      <span
        className="w-[1em] focus:opacity-100 disabled:pointer-events-none disabled:select-none disabled:opacity-25 [&.disabled]:pointer-events-none [&.disabled]:select-none [&.disabled]:opacity-25">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          strokeWidth="1.5"
          stroke="currentColor"
          className="h-6 w-6">
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M6 18L18 6M6 6l12 12" />
        </svg>
      </span>
    </button>
  </div>

  {/* ISI DARI OFFCANVAS */}
  <div className="small flex-grow overflow-y-auto p-4 max-w-[450px] mx-auto">
  <ul className="pl-4 grid grid-cols-3 gap-4  list-style-none">
            {getSelectedAssets().map(asset =>{
            return (
              <li
                key={asset.id}
                className="cursor-pointer hover:text-gray-500 "
                onClick={() => handleAssetClick(asset)}
              >
                <div className='bg-black bg-opacity-50 hover:bg-gray-500 transition-all duration-500 px-3 rounded h-20 w-20  items-center justify-center m-auto flex flex-col'>
                <img
                  src={`img/Stiker/Side${assetType}/${asset.name}.png`}
                  alt={asset.icon_path}
                  className=" w-full hover:scale-110  transition-all duration-500 "
                />
                </div>
                <p className='flex justify-center w-full text-xs mx-auto pb-2 pt-2 text-center text-black'>
                  {asset.nama}
                </p>
              </li>
            )})}
          </ul>
  </div>
</div>

{/* Modal */}
<div
  data-te-modal-init
  className="fixed left-0 top-0 z-[1055] hidden  h-full w-full overflow-y-auto overflow-x-hidden outline-none"
  id="exampleModalCenteredScrollable"
  tabIndex="-1"
  aria-labelledby="exampleModalCenteredScrollableLabel"
  aria-modal="true"
  role="dialog">
  <div
    data-te-modal-dialog-ref
    className="pointer-events-none relative  flex min-h-[calc(100%-1rem)] w-auto translate-y-[-50px] items-center opacity-0 transition-all duration-300 ease-in-out min-[576px]:mx-auto min-[576px]:mt-7 min-[576px]:min-h-[calc(100%-3.5rem)] min-[576px]:max-w-[500px]">
    <div
      className="pointer-events-auto relative flex w-full flex-col border-none m-8 bg-white bg-clip-padding text-current shadow-lg outline-none dark:bg-neutral-600">
      <div
        className="flex flex-shrink-0 items-center justify-between border-b-2 border-neutral-100 border-opacity-100 p-4 dark:border-opacity-50">
        <h5
          className="text-xl font-medium leading-normal text-neutral-800 dark:text-neutral-200"
          id="exampleModalCenteredScrollableLabel">
          Tutorial bos
        </h5>
        <button
          type="button"
          className="box-content rounded-none border-none hover:no-underline hover:opacity-75 focus:opacity-100 focus:shadow-none focus:outline-none"
          data-te-modal-dismiss
          aria-label="Close">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth="1.5"
            stroke="currentColor"
            className="h-6 w-6">
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M6 18L18 6M6 6l12 12" />
          </svg>
        </button>
      </div>

      <div className="relative p-4">
        <p>
          ini Video ya beb
        </p>
        {/* <br /><br /><br /><br /><br /><br /><br /><br /><br /><br /> */}
      </div>

      <div
        className="flex flex-shrink-0 flex-wrap items-center justify-end rounded-b-md border-t-2 border-neutral-100 border-opacity-100 p-4 dark:border-opacity-50">
        <button
          type="button"
          className="inline-block rounded bg-primary-100 px-6 pb-2 pt-2.5 text-xs font-medium uppercase leading-normal text-primary-700 transition duration-150 ease-in-out hover:bg-primary-accent-100 focus:bg-primary-accent-100 focus:outline-none focus:ring-0 active:bg-primary-accent-200"
          data-te-modal-dismiss
          data-te-ripple-init
          data-te-ripple-color="light">
          Close
        </button>
      </div>
    </div>
  </div>
  </div>
        {/* <CarouselSticker /> */}
      </div>
      <Navbar className={`bottom-0`} />
    </div>
  )
}

export default CustomeShoe
