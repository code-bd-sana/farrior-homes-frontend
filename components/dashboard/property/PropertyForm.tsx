"use client";
import Image from "next/image";
import { useState } from "react";

const PropertyForm = () => {
  const [thumbnail, setThumbnail] = useState<File | null>(null);
  const [propertyName, setPropertyName] = useState("");
  const [address, setAddress] = useState("");
  const [propertyType, setPropertyType] = useState("");
  const [propertyStatus, setPropertyStatus] = useState("");
  const [overview, setOverview] = useState("");
  const [keyFeatures, setKeyFeatures] = useState("");

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setThumbnail(e.target.files[0]);
    }
  };

  return (
    <div className='mx-auto p-6 bg-white rounded-md shadow-md border border-gray-200'>
      <h1 className='text-2xl font-semibold mb-6'>
        Basic Property Information
      </h1>

      {/* Thumbnail Upload */}
      <div className='mb-6'>
        <div className='border-dashed border-2 border-gray-300 p-6 text-center'>
          <label className='cursor-pointer'>
            <input
              type='file'
              accept='image/png, image/jpeg'
              className='hidden'
              onChange={handleFileChange}
            />
            <div className='text-gray-600'>
              <p>Click to upload thumbnail</p>
              <p className='text-xs'>PNG, JPG up to 10MB</p>
            </div>
          </label>
        </div>
        {/* Display the uploaded thumbnail */}
        {thumbnail && (
          <div className='mt-4 text-center'>
            <Image
              src={URL.createObjectURL(thumbnail)}
              alt='Uploaded Thumbnail'
              className='max-w-50 max-h-50 mx-auto'
            />
          </div>
        )}
      </div>

      {/* Property Form Fields */}
      <div className='grid grid-cols-1 md:grid-cols-2 gap-6'>
        <div className='flex flex-col'>
          <label className='font-semibold text-gray-700 mb-2'>
            Property Name
          </label>
          <input
            type='text'
            className='border border-gray-300 p-3 rounded-md'
            value={propertyName}
            onChange={(e) => setPropertyName(e.target.value)}
            placeholder='Enter product name'
          />
        </div>
        <div className='flex flex-col'>
          <label className='font-semibold text-gray-700 mb-2'>Address</label>
          <input
            type='text'
            className='border border-gray-300 p-3 rounded-md'
            value={address}
            onChange={(e) => setAddress(e.target.value)}
            placeholder='Enter full address'
          />
        </div>
        <div className='flex flex-col'>
          <label className='font-semibold text-gray-700 mb-2'>
            Property Type
          </label>
          <select
            className='border border-gray-300 p-3 rounded-md'
            value={propertyType}
            onChange={(e) => setPropertyType(e.target.value)}>
            <option>Select your property type</option>
            <option>Apartment</option>
            <option>House</option>
            <option>Villa</option>
            {/* Add more property types as needed */}
          </select>
        </div>
        <div className='flex flex-col'>
          <label className='font-semibold text-gray-700 mb-2'>
            Property Status
          </label>
          <select
            className='border border-gray-300 p-3 rounded-md'
            value={propertyStatus}
            onChange={(e) => setPropertyStatus(e.target.value)}>
            <option>Select your property status</option>
            <option>For Sale</option>
            <option>For Rent</option>
            <option>SOLD</option>
          </select>
        </div>
      </div>

      {/* Overview and Key Features */}
      <div className='mt-8'>
        <div className='flex flex-col mb-6'>
          <label className='font-semibold text-gray-700 mb-2'>Overview</label>
          <textarea
            className='border border-gray-300 p-3 rounded-md'
            rows={5}
            value={overview}
            onChange={(e) => setOverview(e.target.value)}
            placeholder='Enter product description'
          />
        </div>
        <div className='flex flex-col'>
          <label className='font-semibold text-gray-700 mb-2'>
            Key Features
          </label>
          <textarea
            className='border border-gray-300 p-3 rounded-md'
            rows={5}
            value={keyFeatures}
            onChange={(e) => setKeyFeatures(e.target.value)}
            placeholder='Enter product description'
          />
        </div>
      </div>
    </div>
  );
};

export default PropertyForm;
