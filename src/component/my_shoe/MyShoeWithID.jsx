import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
import {
  Ripple,
  initTE,
  Modal,
} from "tw-elements";
import verse from "../../assets/img/logolanding.png";
import trf from "../../assets/img/TRF.png";
import loadingImage from "../../assets/img/loading.png";
import ReactLoading from 'react-loading';

function MyShoeWithID() {
  const location = useLocation();
  const [myShoe, setMyShoe] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    initTE({  Ripple, Modal });
  }, [])

   
  useEffect(() => {
    initTE({  Ripple, Modal });
    axios
      .get(`${import.meta.env.VITE_REACT_APP_API_BASE_URL}/api/customs/${location.state}`)
      .then((response) => {
        setMyShoe(response.data.combination);
        setLoading(false); // Setelah data dimuat, atur loading menjadi false
      })
      .catch((error) => {
        console.error(`Error fetching MyShoeWithID:`, error);
        setLoading(false); // Atur loading menjadi false jika terjadi kesalahan
      });
  }, [location.state]);

  const backgroundImageUrl = myShoe?.shoe_type?.shoe?.background_image || '';
  const containerStyle = {
    backgroundImage: `url(${import.meta.env.VITE_REACT_APP_API_BASE_URL}/storage/${backgroundImageUrl})`,
    backgroundSize: 'cover',
    backgroundPosition: 'center',
  };

  return (
    <div style={containerStyle} className='m-auto relative max-w-screen-lg h-screen overflow-hidden '>

      {loading ? (
        // Elemen loading
        <div className='relative w-full h-full flex justify-center items-center '>
            {/* <ReactLoading type='cylon' color='red' height={'20%'} width={'20%'} /> */}
          <img src={loadingImage} className='animate-loadingImage absolute  ' alt='img'/>
        </div>
      ) : (
        // Konten yang akan ditampilkan setelah data dimuat
      (
        <div className='flex flex-col justify-center items-center content-center h-full '>
          <div className='flex flexre justify-evenly pb-28 z-[1050]'>
            <img src={verse} alt='verse' className='pr-12' />
            <img src={trf} alt='verse' className='' />
          </div> 
           <div className='flex justify-center relative w-full '>
            <img
              src={`${import.meta.env.VITE_REACT_APP_API_BASE_URL}/storage/${myShoe.shoe_type.shoe_image}`}
              className='w-full z-[1050]'
              alt={myShoe.combination_id}
            />
            <div className='w-10 absolute left-[27%] bottom-[22%] z-[1060]'>
              {myShoe.asset_side_a && (
                <img src={`${import.meta.env.VITE_REACT_APP_API_BASE_URL}/storage/${myShoe.asset_side_a.icon_path}`} className='' />
              )}
            </div>
            <div className='w-10 absolute top-[44%] right-[33%] z-[1060]'>
              {myShoe.asset_side_b && (
                <img src={`${import.meta.env.VITE_REACT_APP_API_BASE_URL}/storage/${myShoe.asset_side_b.icon_path}`} />
              )}
            </div>
            <div className='w-20 absolute right-[27px] bottom-[27%] z-[1060]'>
              {myShoe.asset_side_c && (
                <img src={`${import.meta.env.VITE_REACT_APP_API_BASE_URL}/storage/${myShoe.asset_side_c.icon_path}`} />
              )}
            </div>
          </div>

          <div className='z-[1050]'>
            <p className='font-depixelbreit text-white text-4xl text-center '>{myShoe.shoe_type.shoe.shoes_name}</p>
          </div>

            <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-b from-transparent to-black   pointer-events-none"></div>
          {/* <div className='z-[1050]'>
            <button
            type="button"
            data-te-toggle="modal"
            data-te-target="#exampleModalCenteredScrollable"
            data-te-ripple-init
            className='font-depixelbreit mt-44 text-white animate-pulse text-lg z-[1050]' >Detail</button>
          </div> */}

         </div>


        )
      )}  

      
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
      className="pointer-events-auto relative flex w-full flex-col rounded-md border-none m-8 bg-white bg-clip-padding text-current shadow-lg outline-none dark:bg-neutral-600">
      <div
        className="flex flex-shrink-0 items-center justify-between rounded-t-md border-b-2 border-neutral-100 border-opacity-100 p-4 dark:border-opacity-50">
        <h5
          className="text-xl font-medium leading-normal text-neutral-800 dark:text-neutral-200"
          id="exampleModalCenteredScrollableLabel">
          Detail Sepatu
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
      {loading ? (
        // Elemen loading
        <div className='flex justify-center items-center h-full'>
          <p>Loading...</p>
        </div>
      ) : (
        <div>
              <div className="flex flex-col">
                <div className="overflow-x-auto sm:-mx-6 lg:-mx-8">
                  <div className="inline-block min-w-full py-2 sm:px-6 lg:px-8">
                    <div className="overflow-hidden">
                      <table className="min-w-full text-left text-sm font-light">
                        <tbody>
                          <tr className="border-b dark:border-neutral-500">
                            <td className="whitespace-nowrap px-6 py-4 font-medium">ID</td>
                            <td className="whitespace-nowrap px-6 py-4">{myShoe.combination_id}</td>
                          </tr>
                          <tr className="border-b dark:border-neutral-500">
                            <td className="whitespace-nowrap px-6 py-4 font-medium">Shoe Name</td>
                            <td className="whitespace-nowrap px-6 py-4">{myShoe.shoe_type.shoe.shoes_name}</td>
                          </tr>
                          <tr className="border-b dark:border-neutral-500">
                            <td className="whitespace-nowrap px-6 py-4 font-medium">Price</td>
                            {myShoe.shoe_type.type === 'cartoon'?
                            <td className="whitespace-nowrap px-6 py-4">{myShoe.size.cartoon_price}</td>
                            :
                            <td className="whitespace-nowrap px-6 py-4">{myShoe.size.plain_price}</td>}
                          </tr>
                        </tbody>
                      </table>
                    </div>
                  </div>
                </div>
              </div>
        </div>
      )} 
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
        
    </div>
  );
}

export default MyShoeWithID;
