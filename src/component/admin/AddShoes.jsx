// File: AddShoes.jsx

import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Swal from 'sweetalert2';

const AddShoes = () => {
  const [shoes, setShoes] = useState([]);
  const [newShoe, setNewShoe] = useState({
    shoes_name: '',
    shoes_image: null,
    price: '',
  });
  const [selectedShoe, setSelectedShoe] = useState(null);

  useEffect(() => {
    // Fetch shoes data from Laravel API when the component mounts
    axios.get('http://localhost:8000/api/shoes')
      .then(response => setShoes(response.data.shoes))
      .catch(error => console.error('Error fetching shoes:', error));
  }, []);

  const handleFileChange = (e) => {
    setNewShoe({ ...newShoe, shoes_image: e.target.files[0] });
  };

  const handleInputChange = (e) => {
    setNewShoe({ ...newShoe, [e.target.name]: e.target.value });
  };

  const handleCreateShoe = (e) => {
    e.preventDefault()
    const formData = new FormData();
    formData.append('shoes_name', newShoe.shoes_name);
    formData.append('shoes_image', newShoe.shoes_image);
    formData.append('price', newShoe.price);

    axios.post('http://localhost:8000/api/shoes/create', formData)
      .then(response => {
        setShoes([...shoes, response.data.shoe]);
        setNewShoe({ shoes_name: '', shoes_image: null, price: '' });
        Swal.fire({
            title: "The Internet?",
            text: "That thing is still around?",
            icon: "question"
          });
      })
      .catch(error => console.error('Error creating shoe:', error));
  };

  const handleSelectShoe = (shoe) => {
    setSelectedShoe(shoe);
  };

  return (
    <div className="max-w-3xl mx-auto p-4">
    <h1 className="text-3xl font-bold mb-4">Shoes List</h1>
  
    {/* Shoe List */}
    <ul className="pl-4 grid grid-cols-4 gap-4  list-style-none">
      {shoes.map(shoe => (
        <li
          key={shoe.id}
          className="cursor-pointer hover:text-blue-500 bg-gray-100 hover:bg-gray-300 transition-all duration-500 px-3 rounded"
          onClick={() => handleSelectShoe(shoe)}
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
  
    {/* Create Shoe Form */}
    <div className="mt-8 flex flex-col bg-gray-100 p-4">
      <h2 className="text-2xl font-bold mb-4">Create New Shoe</h2>
      <div className='flex'>
        <input
            type="text"
            name="shoes_name"
            placeholder="Shoe Name"
            value={newShoe.shoes_name}
            onChange={handleInputChange}
            className="p-2  border rounded mb-4 mr-4 w-1/3 "
        />
        
        <input
            type="text"
            name="price"
            placeholder="Price"
            value={newShoe.price}
            onChange={handleInputChange}
            className="p-2  border rounded mb-4 w-1/3"
        />
      </div>
      <input
        type="file"
        name="shoes_image"
        onChange={handleFileChange}
        className="mb-2"
      />
      <button
        onClick={handleCreateShoe}
        className="bg-blue-500 text-white p-2 rounded cursor-pointer"
      >
        Create Shoe
      </button>
    </div>
  
    {/* Shoe Detail */}
    {selectedShoe && (
      <div className="mt-8">
        <h2 className="text-2xl font-bold mb-4">Shoe Detail</h2>
        <p><strong>Name:</strong> {selectedShoe.shoes_name}</p>
        <p><strong>Price:</strong> {selectedShoe.price}</p>
        <img
          src={`http://localhost:8000/storage/${selectedShoe.shoes_image}`}
          alt={selectedShoe.shoes_name}
          className="mt-4"
        />
      </div>
    )}
  </div>
  
  );
};

export default AddShoes;
