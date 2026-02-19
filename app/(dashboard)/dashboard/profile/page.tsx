export default function UserProfilePage() {
  return (
    <div>
      <h1 className='text-2xl font-semibold mb-6'>Profile Overview</h1>

      <div id='profileOverview' className='mb-8'>
        <h2 className='text-xl font-semibold mb-3 border-b-2 border-gray-300 pb-2'>
          Personal Information
        </h2>
        <div className='space-y-3'>
          <p>
            <strong>Name:</strong> John Doe
          </p>
          <p>
            <strong>Email:</strong> john@example.com
          </p>
          <p>
            <strong>Phone:</strong> +1 (555) 000-0000
          </p>
          <p>
            <strong>Member Since:</strong> January 2024
          </p>
        </div>
      </div>

      <div id='profileAddress'>
        <h2 className='text-xl font-semibold mb-3 border-b-2 border-gray-300 pb-2'>
          Address
        </h2>
        <div className='space-y-3'>
          <p>
            <strong>Street:</strong> 123 Main Street
          </p>
          <p>
            <strong>City:</strong> New York
          </p>
          <p>
            <strong>State:</strong> NY
          </p>
          <p>
            <strong>ZIP Code:</strong> 10001
          </p>
          <p>
            <strong>Country:</strong> United States
          </p>
        </div>
      </div>
    </div>
  );
}
