"use client";
import Image from "next/image";
import { useState } from "react";

const PropertyDetailsForm = () => {
  const [bedrooms, setBedrooms] = useState("");
  const [bathrooms, setBathrooms] = useState("");
  const [squareFeet, setSquareFeet] = useState("");
  const [price, setPrice] = useState("");
  const [lotArea, setLotArea] = useState("");
  const [yearBuilt, setYearBuilt] = useState("");
  const [moreDetails, setMoreDetails] = useState("");
  const [photos, setPhotos] = useState<File[]>([]);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      setPhotos(Array.from(e.target.files));
    }
  };

  return (
    <div className='mx-auto p-6 bg-white rounded-md shadow-md border border-gray-200 mt-5'>
      <h1 className='text-2xl font-semibold mb-6'>Details</h1>

      {/* Property Details Fields */}
      <div className='grid grid-cols-1 md:grid-cols-2 gap-6'>
        <div className='flex flex-col'>
          <label className='font-semibold text-gray-700 mb-2'>Bedrooms</label>
          <select
            className='border border-gray-300 p-3 rounded-md'
            value={bedrooms}
            onChange={(e) => setBedrooms(e.target.value)}>
            <option>Select number of bedrooms</option>
            <option>1</option>
            <option>2</option>
            <option>3</option>
            <option>4+</option>
          </select>
        </div>
        <div className='flex flex-col'>
          <label className='font-semibold text-gray-700 mb-2'>Bathrooms</label>
          <select
            className='border border-gray-300 p-3 rounded-md'
            value={bathrooms}
            onChange={(e) => setBathrooms(e.target.value)}>
            <option>Select number of bathrooms</option>
            <option>1</option>
            <option>2</option>
            <option>3</option>
            <option>4+</option>
          </select>
        </div>
        <div className='flex flex-col'>
          <label className='font-semibold text-gray-700 mb-2'>
            Square Feet
          </label>
          <input
            type='text'
            className='border border-gray-300 p-3 rounded-md'
            value={squareFeet}
            onChange={(e) => setSquareFeet(e.target.value)}
            placeholder='Enter your area square feet'
          />
        </div>
        <div className='flex flex-col'>
          <label className='font-semibold text-gray-700 mb-2'>Price</label>
          <input
            type='text'
            className='border border-gray-300 p-3 rounded-md'
            value={price}
            onChange={(e) => setPrice(e.target.value)}
            placeholder='Enter property price'
          />
        </div>
        <div className='flex flex-col'>
          <label className='font-semibold text-gray-700 mb-2'>Lot</label>
          <input
            type='text'
            className='border border-gray-300 p-3 rounded-md'
            value={lotArea}
            onChange={(e) => setLotArea(e.target.value)}
            placeholder='Enter your lot area'
          />
        </div>
        <div className='flex flex-col'>
          <label className='font-semibold text-gray-700 mb-2'>Year Built</label>
          <input
            type='text'
            className='border border-gray-300 p-3 rounded-md'
            value={yearBuilt}
            onChange={(e) => setYearBuilt(e.target.value)}
            placeholder='dd/mm/yyyy'
          />
        </div>
      </div>

      {/* More Details */}
      <div className='mt-8'>
        <div className='flex flex-col mb-6'>
          <label className='font-semibold text-gray-700 mb-2'>
            More Details
          </label>
          <textarea
            className='border border-gray-300 p-3 rounded-md'
            rows={5}
            value={moreDetails}
            onChange={(e) => setMoreDetails(e.target.value)}
            placeholder='Enter product description'
          />
        </div>
      </div>

      {/* File Upload for Multiple Photos */}
      <div className='mb-6'>
        <div className='border-dashed border-2 border-gray-300 p-6 text-center'>
          <label className='cursor-pointer'>
            <input
              type='file'
              accept='image/png, image/jpeg'
              multiple
              className='hidden'
              onChange={handleFileChange}
            />
            <div className='text-gray-600'>
              <p>Click to upload multiple photos</p>
              <p className='text-xs'>PNG, JPG up to 10MB</p>
            </div>
          </label>
        </div>
        {photos.length > 0 && (
          <div className='mt-4 text-center'>
            <p className='font-semibold text-gray-700'>Uploaded Photos:</p>
            <div className='grid grid-cols-3 gap-4'>
              {photos.map((photo, index) => (
                <Image
                  key={index}
                  src={URL.createObjectURL(photo)}
                  alt={`Uploaded thumbnail ${index + 1}`}
                  className='max-w-25 max-h-25 mx-auto rounded-md'
                />
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default PropertyDetailsForm;
