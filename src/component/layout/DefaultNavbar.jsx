import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom';
import {
    Collapse,
    Dropdown,
    initTE,
  } from "tw-elements";


function DefaultNavbar() {
  const [currentPath, setCurrentPath] = useState('/');
  useEffect(() => {
    initTE({ Collapse, Dropdown });
  }, [])

  useEffect(() => {
    setCurrentPath(window.location.pathname);
  }, []);
  
    return (
        <nav
        className="relative flex w-full flex-nowrap items-center justify-between bg-[#FBFBFB] py-2 text-neutral-500 shadow-lg hover:text-neutral-700 focus:text-neutral-700 dark:bg-neutral-600 lg:flex-wrap lg:justify-start lg:py-4"
        data-te-navbar-ref>
        <div className="flex w-full flex-wrap items-center justify-between px-3">
            <button
            className="block border-0 bg-transparent px-2 text-neutral-500 hover:no-underline hover:shadow-none focus:no-underline focus:shadow-none focus:outline-none focus:ring-0 dark:text-neutral-200 lg:hidden"
            type="button"
            data-te-collapse-init
            data-te-target="#navbarSupportedContent8"
            aria-controls="navbarSupportedContent8"
            aria-expanded="false"
            aria-label="Toggle navigation">
            
            <span className="[&>svg]:w-7">
                <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
                fill="currentColor"
                className="h-7 w-7">
                <path
                    fillRule="evenodd"
                    d="M3 6.75A.75.75 0 013.75 6h16.5a.75.75 0 010 1.5H3.75A.75.75 0 013 6.75zM3 12a.75.75 0 01.75-.75h16.5a.75.75 0 010 1.5H3.75A.75.75 0 013 12zm0 5.25a.75.75 0 01.75-.75h16.5a.75.75 0 010 1.5H3.75a.75.75 0 01-.75-.75z"
                    clipRule="evenodd" />
                </svg>
            </span>
            </button>

            <div
            className="!visible mt-2 hidden flex-grow basis-[100%] items-center justify-center lg:mt-0 lg:!flex lg:basis-auto"
            id="navbarSupportedContent8"
            data-te-collapse-item>
            
            <ul
                className="list-style-none flex flex-col pl-0 lg:mt-1 lg:flex-row"
                data-te-navbar-nav-ref>
                
                <li
                className="my-2 pl-2 lg:my-0 lg:pl-2 lg:pr-1"
                data-te-nav-item-ref>
                  <Link
                      className={
                        "flex items-center border-t-4  hover:border-black transition-all duration-500 " +
                        (currentPath === "/custome-shoes" 
                        ? "px-4 py-2 font-poppins text-teal-500  uppercase tracking-widest text-sm border-black  border-t-4"
                        : "px-4 py-2 font-poppins text-teal-900  uppercase tracking-widest text-sm border-transparent")
                      }
                      to="/"
                    >{" "}
                    Home
                  </Link>
                </li>

                <li
                className="my-2 pl-2 lg:my-0 lg:pl-2 lg:pr-1"
                data-te-nav-item-ref>
                  <Link
                      className={
                        "flex items-center border-t-4  hover:border-black transition-all duration-500 " +
                        (currentPath === "/costume-shoes" 
                        ? "px-4 py-2 font-poppins text-teal-500  uppercase tracking-widest text-sm border-black  border-t-4"
                        : "px-4 py-2 font-poppins text-teal-900  uppercase tracking-widest text-sm border-transparent")
                      }
                      to="/custome-shoes"
                    >{" "}
                    Costume Shoes
                  </Link>
                </li>

                
                <li
                className="mb-4 my-2 pl-2 lg:mb-0 lg:pl-0 lg:pr-1"
                data-te-nav-item-ref
                data-te-dropdown-ref>

                <a
                    className="flex items-center text-neutral-500 transition duration-200 hover:text-neutral-700 hover:ease-in-out focus:text-neutral-700 disabled:text-black/30 motion-reduce:transition-none dark:text-neutral-200 dark:hover:text-neutral-400 dark:focus:text-neutral-400 lg:px-2 [&.active]:text-black/90 dark:[&.active]:text-neutral-400"
                    href="#"
                    type="button"
                    id="dropdownMenuButton2"
                    data-te-dropdown-toggle-ref
                    aria-expanded="false">
                    Lainnya
                    <span className="ml-1 w-2">
                    <svg
                        xmlns="http://www.w3.org/2000/svg"
                        viewBox="0 0 20 20"
                        fill="currentColor"
                        className="h-5 w-5">
                        <path
                        fillRule="evenodd"
                        d="M5.23 7.21a.75.75 0 011.06.02L10 11.168l3.71-3.938a.75.75 0 111.08 1.04l-4.25 4.5a.75.75 0 01-1.08 0l-4.25-4.5a.75.75 0 01.02-1.06z"
                        clipRule="evenodd" />
                    </svg>
                    </span>
                </a>
                <ul
                    className="absolute z-[1000] float-left m-0 hidden min-w-max list-none overflow-hidden rounded-lg border-none bg-white bg-clip-padding text-left text-base shadow-lg dark:bg-neutral-700 [&[data-te-dropdown-show]]:block"
                    aria-labelledby="dropdownMenuButton2"
                    data-te-dropdown-menu-ref>
                    <li>
                    <a
                        className="block w-full whitespace-nowrap bg-transparent px-4 py-2 text-sm font-normal text-neutral-700 hover:bg-neutral-100 active:text-neutral-800 active:no-underline disabled:pointer-events-none disabled:bg-transparent disabled:text-neutral-400 dark:text-neutral-200 dark:hover:bg-neutral-600"
                        href="#"
                        data-te-dropdown-item-ref
                        >Action</a
                    >
                    </li>
                    <li>
                    <a
                        className="block w-full whitespace-nowrap bg-transparent px-4 py-2 text-sm font-normal text-neutral-700 hover:bg-neutral-100 active:text-neutral-800 active:no-underline disabled:pointer-events-none disabled:bg-transparent disabled:text-neutral-400 dark:text-neutral-200 dark:hover:bg-neutral-600"
                        href="#"
                        data-te-dropdown-item-ref
                        >Another action</a
                    >
                    </li>
                    <li>
                    <a
                        className="block w-full whitespace-nowrap bg-transparent px-4 py-2 text-sm font-normal text-neutral-700 hover:bg-neutral-100 active:text-neutral-800 active:no-underline disabled:pointer-events-none disabled:bg-transparent disabled:text-neutral-400 dark:text-neutral-200 dark:hover:bg-neutral-600"
                        href="#"
                        data-te-dropdown-item-ref
                        >Something else here</a
                    >
                    </li>
                </ul>
                </li>
                
              
            </ul>
            </div>
            <ul className='list-style-none '> 
            <li
                className="mb-4 mr-12 my-2 pl-2 lg:mb-0 lg:pl-0 lg:pr-1 "
                data-te-nav-item-ref
                data-te-dropdown-ref>

                <a
                    className="flex items-center text-neutral-500 transition duration-200 hover:text-neutral-700 hover:ease-in-out focus:text-neutral-700 disabled:text-black/30 motion-reduce:transition-none dark:text-neutral-200 dark:hover:text-neutral-400 dark:focus:text-neutral-400 lg:px-2 [&.active]:text-black/90 dark:[&.active]:text-neutral-400"
                    href="#"
                    type="button"
                    id="dropdownMenuButton2"
                    data-te-dropdown-toggle-ref
                    aria-expanded="false">
                    Admin
                    <span className="ml-1 w-2">
                    <svg
                        xmlns="http://www.w3.org/2000/svg"
                        viewBox="0 0 20 20"
                        fill="currentColor"
                        className="h-5 w-5">
                        <path
                        fillRule="evenodd"
                        d="M5.23 7.21a.75.75 0 011.06.02L10 11.168l3.71-3.938a.75.75 0 111.08 1.04l-4.25 4.5a.75.75 0 01-1.08 0l-4.25-4.5a.75.75 0 01.02-1.06z"
                        clipRule="evenodd" />
                    </svg>
                    </span>
                </a>
                <ul
                    className="absolute z-[1000] float-left m-0 hidden min-w-max list-none overflow-hidden rounded-lg border-none bg-white bg-clip-padding text-left text-base shadow-lg dark:bg-neutral-700 [&[data-te-dropdown-show]]:block"
                    aria-labelledby="dropdownMenuButton2"
                    data-te-dropdown-menu-ref>
                    <li>
                    <Link
                      className={
                        "flex items-center border-t-4   hover:border-black transition-all duration-500 " +
                        (currentPath === "/costume-shoes" 
                        ? "px-4 py-2 font-poppins text-teal-500  uppercase tracking-widest text-sm border-black  border-t-4"
                        : "px-4 py-2 font-poppins text-teal-900  uppercase tracking-widest text-sm border-transparent")
                      }
                      to="/dashboard/add-shoes"
                    >{" "}
                    Add Shoes
                  </Link>
                    </li>
                    <li>
                    <Link
                      className={
                        "flex items-center border-t-4   hover:border-black transition-all duration-500 " +
                        (currentPath === "/costume-shoes" 
                        ? "px-4 py-2 font-poppins text-teal-500  uppercase tracking-widest text-sm border-black  border-t-4"
                        : "px-4 py-2 font-poppins text-teal-900  uppercase tracking-widest text-sm border-transparent")
                      }
                      to="/dashboard/add-sticker"
                    >{" "}
                    Add Sticker
                  </Link>
                    </li>
                </ul>
                </li>
            </ul> 
        </div>
        </nav>
  )
}

export default DefaultNavbar