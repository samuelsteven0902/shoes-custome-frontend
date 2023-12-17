import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { useLocation, useNavigate } from 'react-router-dom'

function CustomeShoe() {
  let location = useLocation()
  let navigate = useNavigate()
  const selectedShoe = location.state
  console.log(selectedShoe);

  const [assetsA, setAssetsA] = useState([]);
  const [assetsB, setAssetsB] = useState([]);
  const [assetsC, setAssetsC] = useState([]);
  const [selectedAssetsA, setSelectedAssetsA] = useState([]);
  const [selectedAssetsB, setSelectedAssetsB] = useState([]);
  const [selectedAssetsC, setSelectedAssetsC] = useState([]);
  const [assetType, setAssetType] = useState("");

  useEffect(() => {
    // Fetch assets data from Laravel API when the component mounts
    axios.get(`http://localhost:8000/api/assetsA`)
      .then(response => setAssetsA(response.data.SideA))
      .catch(error => console.error(`Error fetching SideA:`, error));

    axios.get(`http://localhost:8000/api/assetsB`)
      .then(response => setAssetsB(response.data.SideB))
      .catch(error => console.error(`Error fetching SideB:`, error));

    axios.get(`http://localhost:8000/api/assetsC`)
      .then(response => setAssetsC(response.data.SideC))
      .catch(error => console.error(`Error fetching SideC:`, error));
  }, []);

  if (!selectedShoe) {
    navigate('/custome-shoes')
  }

  const handleAssetClick = (asset) => {
    if (assetType === "A") {
      setSelectedAssetsA(asset);
    } else if (assetType === "B") {
      setSelectedAssetsB(asset);
    } else if (assetType === "C") {
      setSelectedAssetsC(asset);
    }
  };
  
  console.log({selectedAssetsA,selectedAssetsB,selectedAssetsC});
  console.log(selectedAssetsA.length > 0 );

  const handleAssetTypeChange = (newAssetType) => {
    console.log(newAssetType);
    setAssetType(newAssetType);
  };

  const getSelectedAssets = () => {
    if (assetType === "A") return assetsA;
    if (assetType === "B") return assetsB;
    if (assetType === "C") return assetsC;
    return [];
  };

  return (
    <div className='max-w-3xl mx-auto p-4 h-screen'>
      <div className='h-full flex justify-center flex-wrap'>
        <div className='flex justify-center relative h-[300px]'>
          <img src={`http://localhost:8000/storage/${selectedShoe.shoes_image}`} className='' alt={selectedShoe.shoes_name} />
          <button className='absolute w-1/3 left-0 h-full z-30 ' onClick={() => handleAssetTypeChange("A")}></button>
          <button className='absolute w-1/3 h-full z-30 ' onClick={() => handleAssetTypeChange("B")}></button>
          <button className='absolute w-1/3 right-0 h-full z-30 ' onClick={() => handleAssetTypeChange("C")}></button>
          <div className='w-12 absolute left-[26%] bottom-[19%]'>
            {selectedAssetsA.icon_path  && <img src={`http://localhost:8000/storage/${selectedAssetsA.icon_path}`} />}
          </div>
          <div className='w-12 absolute top-[45%] right-[30%]'>
          {selectedAssetsB.icon_path && <img src={`http://localhost:8000/storage/${selectedAssetsB.icon_path}`} />}
          </div>
          <div className='w-20 absolute right-[20px] bottom-[20%]'>
          {selectedAssetsC.icon_path && <img src={`http://localhost:8000/storage/${selectedAssetsC.icon_path}`} />}
          </div>
        </div>
        <div className='w-full flex justify-center'>
          {assetType === '' && <p>Pilih Bagian sepatu yang ingin di Custome </p>}
          <ul className="pl-4 grid grid-cols-4 gap-4  list-style-none">
            {getSelectedAssets().map(asset => (
              <li
                key={asset.id}
                className="cursor-pointer hover:text-blue-500 bg-gray-100 hover:bg-gray-300 transition-all duration-500 px-3 rounded"
                onClick={() => handleAssetClick(asset)}
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
        </div>
      </div>
    </div>
  )
}

export default CustomeShoe
