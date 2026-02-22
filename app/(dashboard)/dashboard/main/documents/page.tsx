"use client";

import React, { useState } from "react";

const FileUploadComponent = () => {
  const [selectedProperty, setSelectedProperty] = useState("");
  const [file, setFile] = useState<File | null>(null);

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.files) {
      setFile(event.target.files[0]);
    }
  };

  return (
    <div className='p-6 border border-[#D1CEC6] rounded-md shadow-md'>
      <h3 className='text-[22px] border-b border-[#D1CEC6] font-semibold mb-4'>
        Document
      </h3>

      <div className='mb-4'>
        <label
          htmlFor='property-select'
          className='block text-sm font-medium text-gray-700'>
          Select Property
        </label>
        <select
          id='property-select'
          value={selectedProperty}
          onChange={(e) => setSelectedProperty(e.target.value)}
          className='mt-1 block w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#619B7F]'>
          <option value=''>Select your property</option>
          <option value='property1'>Property 1</option>
          <option value='property2'>Property 2</option>
          <option value='property3'>Property 3</option>
        </select>
      </div>

      <div
        className='border-dashed border-2 border-gray-300 p-6 flex items-center justify-center'
        style={{ minHeight: "150px" }}>
        <div className='text-center'>
          <input
            type='file'
            accept='image/png, image/jpeg'
            onChange={handleFileChange}
            className='hidden'
            id='file-input'
          />
          <label htmlFor='file-input' className='cursor-pointer'>
            <div className='text-[#619B7F] font-semibold'>
              Click to upload document
            </div>
            <div className='text-xs text-gray-500'>PNG, JPG up to 10MB</div>
          </label>
          {file && (
            <div className='mt-4 text-sm text-green-500'>
              File Selected: {file.name}
            </div>
          )}
        </div>
      </div>

      <div className='mt-4 flex justify-end space-x-4'>
        <button className='px-4 py-2 text-sm font-medium text-gray-700 bg-gray-200 rounded-md hover:bg-gray-300 cursor-pointer'>
          Cancel
        </button>
        <button className='px-4 py-2 text-sm font-medium text-white bg-[#619B7F] rounded-md cursor-pointer'>
          Done
        </button>
      </div>
    </div>
  );
};

export default FileUploadComponent;
