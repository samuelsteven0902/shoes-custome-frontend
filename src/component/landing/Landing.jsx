import React from 'react'
import { Link } from 'react-router-dom'

function Landing() {
  return (
    <div className='mx-auto max-w-screen-lg h-screen pt-5'>
      
    <div className='bg-gray-100 h-1/2 flex justify-center items-center'>
      <p>ini 3d</p>
    </div>

    <div className='flex justify-center pt-4'>
      <Link to="/custome-shoes" className=' bg-gradient-to-br from-red-300 to-red-500 px-4 py-2 rounded text-white hover:from-red-400 hover:to-red-300 transition-all duration-500 '>
        Pick Your Shoe !!
      </Link>
    </div>

    </div>
  )
}

export default Landing