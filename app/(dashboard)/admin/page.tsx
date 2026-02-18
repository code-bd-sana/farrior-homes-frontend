const page = () => {
  return (
    <div>
      <h1 className='text-2xl font-semibold text-(--primary-text-color) mb-6'>
        Dashboard
      </h1>

      <div className='grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-4'>
        <div className='bg-white border border-[#D1CEC6] rounded-lg p-5'>
          <p className='text-sm text-gray-500'>Total Users</p>
          <p className='text-3xl font-semibold mt-2'>1,248</p>
        </div>
        <div className='bg-white border border-[#D1CEC6] rounded-lg p-5'>
          <p className='text-sm text-gray-500'>Active Subscriptions</p>
          <p className='text-3xl font-semibold mt-2'>894</p>
        </div>
        <div className='bg-white border border-[#D1CEC6] rounded-lg p-5'>
          <p className='text-sm text-gray-500'>Listed Properties</p>
          <p className='text-3xl font-semibold mt-2'>367</p>
        </div>
        <div className='bg-white border border-[#D1CEC6] rounded-lg p-5'>
          <p className='text-sm text-gray-500'>Open Tickets</p>
          <p className='text-3xl font-semibold mt-2'>27</p>
        </div>
      </div>

      <div className='mt-6 bg-white border border-[#D1CEC6] rounded-lg p-5'>
        <h2 className='text-lg font-semibold mb-2'>Overview</h2>
        <p className='text-gray-600'>
          This is the initial admin dashboard content. Use the sidebar to switch
          to User Management.
        </p>
      </div>
    </div>
  );
};

export default page;
