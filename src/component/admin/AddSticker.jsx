// File: AssetsComponent.jsx

import React, { useState, useEffect } from 'react';
import axios from 'axios';

const AddSticker = () => {
  const [assets, setAssets] = useState([]);
  const [newAsset, setNewAsset] = useState({
    icon_name: '',
    icon_path: null,
  });
  const [selectedAsset, setSelectedAsset] = useState(null);
  const [assetType, setAssetType] = useState({
    name : "SideA",
    type : "A"
  });

  const fetchSticker = () =>{
    axios.get(`http://localhost:8000/api/assets${assetType.type}`)
      .then(response => setAssets(response.data[assetType.name]))
      .catch(error => console.error(`Error fetching ${assetType.type}:`, error));
  }

  useEffect(() => {
    // Fetch assets data from Laravel API when the component mounts
    fetchSticker()
  }, [assetType]);

  const handleFileChange = (e) => {
    setNewAsset({ ...newAsset, icon_path: e.target.files[0] });
  };

  const handleInputChange = (e) => {
    setNewAsset({ ...newAsset, [e.target.name]: e.target.value });
  };

  const handleCreateAsset = (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append('icon_name', newAsset.icon_name);
    formData.append('icon_path', newAsset.icon_path);

    axios.post(`http://localhost:8000/api/assets${assetType.type}/create`, formData)
      .then(response => {
        // setAssets([...assets, response.data[assetType]]);
        setNewAsset({ icon_name: '', icon_path: null });
        fetchSticker()
      })
      .catch(error => console.error(`Error creating ${assetType.type}:`, error));
  };

  const handleSelectAsset = (asset) => {
    setSelectedAsset(asset);
  };
  const handleAssetTypeChange = (newAssetType) => {
    if(newAssetType === "A"){
        setAssetType({
            name : "SideA",
            type : "A"
          });    
    }else if(newAssetType === "B"){
        setAssetType({
            name : "SideB",
            type : "B"
          });
    }else if(newAssetType === "C"){    
        setAssetType({
            name : "SideC",
            type : "C"
          });
    }
  };

  console.log(assets);

  return (
    <div className='max-w-3xl mx-auto p-4'>
      <h1 className="text-3xl font-bold mb-4">{`${assetType.name} List`}</h1>

      {/* Asset List */}
      <ul className="pl-4 grid grid-cols-4 gap-4  list-style-none">
        {assets && assets.map(asset => (
          <li
            key={asset.id}
            className="cursor-pointer hover:text-blue-500 bg-gray-100 hover:bg-gray-300 transition-all duration-500 px-3 rounded"
            onClick={() => handleSelectAsset(asset)}
            >
                <img
            src={`http://localhost:8000/storage/${asset.icon_path}`}
            alt={asset.icon_path}
            className="mt-4 w-44 hover:scale-110  transition-all duration-500"
            />
             <p className='flex justify-center w-full mx-auto pb-2'>
                {asset.icon_name}
            </p>
          </li>
        ))}
      </ul>

      {/* Create Asset Form */}
      <div className="mt-8  flex flex-col bg-gray-100 p-4">
        <h2 className="text-2xl font-bold mb-4">{`Create New ${assetType.name}`}</h2>
        <div className="mt-8">
        <label htmlFor="assetType" className="mr-2">Select Asset Type:</label>
        <select
          id="assetType"
          name="assetType"
          value={assetType.type}
          onChange={(e) => handleAssetTypeChange(e.target.value)}
          className="p-2 border rounded"
        >
          <option value="A">Side A</option>
          <option value="B">Side B</option>
          <option value="C">Side C</option>
        </select>
      </div>
        <input
          type="text"
          name="icon_name"
          placeholder={`${assetType.name} Name`}
          value={newAsset.icon_name}
          onChange={handleInputChange}
          className="p-2 border rounded mb-2"
        />
        <input
          type="file"
          name="icon_path"
          onChange={handleFileChange}
          className="mb-2"
        />
        <button
          onClick={handleCreateAsset}
          className="bg-blue-500 text-white p-2 rounded cursor-pointer"
        >
          Create {assetType.name}
        </button>
      </div>

      {/* Asset Detail */}
      {selectedAsset && (
        <div className="mt-8">
          <h2 className="text-2xl font-bold mb-4">{`${assetType.name} Detail`}</h2>
          <p><strong>Name:</strong> {selectedAsset.icon_name}</p>
          <img
            src={`http://localhost:8000/storage/${selectedAsset.icon_path}`}
            alt={selectedAsset.icon_name}
            className="mt-4"
          />
        </div>
      )}
    </div>
  );
};

export default AddSticker;
