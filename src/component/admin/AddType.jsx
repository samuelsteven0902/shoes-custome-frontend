import React, { useEffect, useState } from 'react';
import axios from 'axios';

const AddType = () => {
  const [shoeTypes, setShoeTypes] = useState([]);
  const [selectedOption, setSelectedOption] = useState('');
  const [shoes, setShoes] = useState([]);
  const [newType, setNewType] = useState({
    shoe_id: '',
    shoe_image: '',
    type: 'plain', // default type
  });

  useEffect(() => {
    axios.get(`${import.meta.env.VITE_REACT_APP_API_BASE_URL}/api/shoes-type`)
      .then(response => {
        setShoeTypes(response.data.shoeTypes);
      })
      .catch(error => {
        console.error('Error fetching shoe types:', error);
      });

      axios.get(`${import.meta.env.VITE_REACT_APP_API_BASE_URL}/api/shoes`)
      .then(response => setShoes(response.data.shoes))
      .catch(error => console.error('Error fetching shoes:', error));
  }, []);


  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setNewType(prevType => ({
      ...prevType,
      [name]: value,
    }));
  };

  console.log(newType);

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    setNewType(prevType => ({
      ...prevType,
      shoe_image: file,
    }));
  };

  const handleFormSubmit = (e) => {
    e.preventDefault();

    const formData = new FormData();
    formData.append('shoe_id', newType.shoe_id);
    formData.append('shoe_image', newType.shoe_image);
    formData.append('type', newType.type);

    axios.post(`${import.meta.env.VITE_REACT_APP_API_BASE_URL}/api/shoes-type/create`, formData)
      .then(response => {
        setShoeTypes(prevShoeTypes => [...prevShoeTypes, response.data.Types]);
        setNewType({
          shoe_id: '',
          shoe_image: '',
          type: 'plain',
        });
      })
      .catch(error => {
        console.error('Error creating new shoe type:', error);
      });
  };

  return (
    <div className="container mx-auto my-10 p-5 bg-gray-100 rounded-lg">
      <h1 className="text-2xl font-bold mb-4">Shoe Types</h1>
      
      <ul className="flex flex-wrap -mx-2">
        {shoeTypes.map(shoeType => (
          <li key={shoeType.id} className="w-full md:w-1/2 lg:w-1/3 px-2 mb-4">
            <div className="bg-white p-4 shadow-md rounded-lg">
              <img src={`${import.meta.env.VITE_REACT_APP_API_BASE_URL}/storage/${shoeType.shoe_image}`} alt={`Shoe Type ${shoeType.id}`} className="w-full h-32 object-cover mb-4" />
              <p className="text-lg font-semibold">Type: {shoeType.type}</p>
            </div>
          </li>
        ))}
      </ul>

      <div className="mt-8">
        <h2 className="text-xl font-bold mb-4">Add New Shoe Type</h2>
        <form onSubmit={handleFormSubmit} className="flex flex-col max-w-sm">
          <label className="mb-2">
            Shoe ID:
            <select
        id="dropdown"
        name="shoe_id"
        value={selectedOption}
        onChange={handleInputChange}
      >
        <option value="">Select an option</option>
        {/* Loop melalui opsi dari backend untuk membuat opsi dropdown */}
        {shoes.map(option => (
          <option key={option.id} value={option.id}>
            {option.shoes_name}
          </option>
        ))}
      </select>
      {selectedOption}
            <input type="text" name="shoe_id" value={newType.shoe_id} onChange={handleInputChange} className="border p-2" />
          </label>
          <label className="mb-2">
            Shoe Image:
            <input type="file" name="shoe_image" accept="image/*" onChange={handleImageChange} className="border p-2" />
          </label>
          <label className="mb-2">
            Type:
            <select name="type" value={newType.type} onChange={handleInputChange} className="border p-2">
              <option value="plain">Plain</option>
              <option value="cartoon">Cartoon</option>
            </select>
          </label>
          <button type="submit" className="bg-blue-500 text-white p-2 rounded hover:bg-blue-700">Add Shoe Type</button>
        </form>
      </div>
    </div>
  );
};

export default AddType;
