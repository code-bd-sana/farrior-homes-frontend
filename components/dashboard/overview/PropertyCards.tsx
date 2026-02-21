import { FiHome } from "react-icons/fi";

export const PropertyCards = () => {
  return (
    <div>
      {/* Main Div */}
      <div className='grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5'>
        {/* Individual Property Cards */}
        <div className='border-2 border-[#D1CEC6] rounded-sm p-4 h-[150px]'>
          <div className='flex justify-between mb-2'>
            <div className='bg-[#A3C7B3] p-2 rounded-lg w-10 h-10'>
              <FiHome className='text-[#304C3E]' size={24} />
            </div>
            <p className='text-[36px]'>7</p>
          </div>
          <p className='text-[20px]'>Own Property</p>
        </div>
        {/* Individual Property Cards */}
        <div className='border-2 border-[#D1CEC6] rounded-sm p-4 h-[150px]'>
          <div className='flex justify-between mb-2'>
            <div className='bg-[#A3C7B3] p-2 rounded-lg w-10 h-10'>
              <FiHome className='text-[#304C3E]' size={24} />
            </div>
            <p className='text-[36px]'>7</p>
          </div>
          <p className='text-[20px]'>Property Buy</p>
        </div>
        {/* Individual Property Cards */}
        <div className='border-2 border-[#D1CEC6] rounded-sm p-4 h-[150px]'>
          <div className='flex justify-between mb-2'>
            <div className='bg-[#A3C7B3] p-2 rounded-lg w-10 h-10'>
              <FiHome className='text-[#304C3E]' size={24} />
            </div>
            <p className='text-[36px]'>7</p>
          </div>
          <p className='text-[20px]'>Property Sale</p>
        </div>
        {/* Individual Property Cards */}
        <div className='border-2 border-[#D1CEC6] rounded-sm p-4 h-[150px]'>
          <div className='flex justify-between mb-2'>
            <div className='bg-[#A3C7B3] p-2 rounded-lg w-10 h-10'>
              <FiHome className='text-[#304C3E]' size={24} />
            </div>
            <p className='text-[36px]'>7</p>
          </div>
          <p className='text-[20px]'>Property Rent</p>
        </div>
        {/* Individual Property Cards */}
        <div className='border-2 border-[#D1CEC6] rounded-sm p-4 h-[150px]'>
          <div className='flex justify-between mb-2'>
            <div className='bg-[#A3C7B3] p-2 rounded-lg w-10 h-10'>
              <FiHome className='text-[#304C3E]' size={24} />
            </div>
            <p className='text-[36px]'>7</p>
          </div>
          <p className='text-[20px]'>Saved Property</p>
        </div>
        {/* Individual Property Cards */}
        <div className='border-2 border-[#D1CEC6] rounded-sm p-4 h-[150px]'>
          <div className='flex justify-between mb-2'>
            <div className='bg-[#A3C7B3] p-2 rounded-lg w-10 h-10'>
              <FiHome className='text-[#304C3E]' size={24} />
            </div>
            <p className='text-[36px]'>7</p>
          </div>
          <p className='text-[20px]'>Selling Post</p>
        </div>
      </div>
    </div>
  );
};
