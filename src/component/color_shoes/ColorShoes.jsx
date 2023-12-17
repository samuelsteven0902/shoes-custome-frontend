import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom';

function ColorShoes() {
  const navigate = useNavigate();
  const [shoes, setShoes] = useState([]);

  useEffect(() => {
    // Fetch shoes data from Laravel API when the component mounts
    axios.get('http://localhost:8000/api/shoes')
      .then(response => setShoes(response.data.shoes))
      .catch(error => console.error('Error fetching shoes:', error));
  }, []);

  const handleClick = (shoe) => {
    navigate("/custome-shoe",{state:shoe})
  }



  return (
    <div className='mx-auto max-w-screen-lg h-screen pt-5'>
      
    <div>
    <h1 className="text-3xl font-bold mb-4">Shoes List</h1>
  
      {/* Shoe List */}
      <ul className="pl-4 grid grid-cols-4 gap-4  list-style-none">
        {shoes.map(shoe => (
          <li
            key={shoe.id}
            className="cursor-pointer hover:text-blue-500 bg-gray-100 hover:bg-gray-300 transition-all duration-500 px-3 rounded"
            onClick={() => handleClick(shoe)}
          >
          <img
            src={`http://localhost:8000/storage/${shoe.shoes_image}`}
            alt={shoe.shoes_name}
            className="mt-4 w-60"
          />
          <p className='flex justify-center w-full mx-auto'>{shoe.shoes_name}</p>
          </li>
        ))}
      </ul>
    </div>

    </div>
  )
}

export default ColorShoes