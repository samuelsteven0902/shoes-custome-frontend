// File: AssetsComponent.jsx

import React, { useState, useEffect } from 'react';
import axios from 'axios';
import html2canvas from 'html2canvas';
import VerseCustom from "../../assets/img/versecustom.png"

const AddSticker = () => {
  const [assets, setAssets] = useState([]);
  const [cek, setCek] = useState([]);
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
    axios.get(`${import.meta.env.VITE_REACT_APP_API_BASE_URL}/api/assets${assetType.type}`)
      .then(response => setAssets(response.data[assetType.name]))
      .catch(error => console.error(`Error fetching ${assetType.type}:`, error));
  }

  const cobaCoba = () =>{
    axios.get(`${import.meta.env.VITE_REACT_APP_API_BASE_URL}/api/shoes/detail/1}`)
      .then(response => setCek(response.data.shoe))
      .catch(error => console.error(`Error fetching ${assetType.type}:`, error));
  }

  useEffect(() => {
    // Fetch assets data from Laravel API when the component mounts
    fetchSticker()
    cobaCoba();
  }, [assetType]);

  console.log(cek);

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

    axios.post(`${import.meta.env.VITE_REACT_APP_API_BASE_URL}/api/assets${assetType.type}/create`, formData)
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

  const takeScreenShot = () => {
    html2canvas(document.querySelector("#capture")).then((canvas) => {
        // Convert canvas to base64 data URL
        const dataURL = canvas.toDataURL("image/png");

        // Create a temporary link element
        const link = document.createElement("a");

        // Set the href attribute with the data URL
        link.href = dataURL;

        // Set the download attribute with a desired filename
        link.download = "shoe_design.png";

        // Append the link to the body
        document.body.appendChild(link);

        // Trigger a click on the link to initiate the download
        link.click();

        // Remove the link from the body
        document.body.removeChild(link);
    });
}

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
            src={`${import.meta.env.VITE_REACT_APP_API_BASE_URL}/storage/${asset.icon_path}`}
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
            src={`${import.meta.env.VITE_REACT_APP_API_BASE_URL}/storage/${selectedAsset.icon_path}`}
            alt={selectedAsset.icon_name}
            className="mt-4"
          />
        </div>
      )}

      <div id='capture'>
      <img
            src={`${import.meta.env.VITE_REACT_APP_API_BASE_URL}/storage/${cek.shoes_image}`}
            alt={cek.shoes_image}
            className="mt-4"
          />
      </div>
      <button onClick={()=>takeScreenShot()}> donlot </button>
    </div>
  );
};

export default AddSticker;
