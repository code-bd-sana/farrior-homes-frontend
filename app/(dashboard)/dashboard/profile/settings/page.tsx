export default function UserProfileSettingsPage() {
  return (
    <div>
      <h1 className='text-2xl font-semibold mb-6'>Settings</h1>

      <div id='notifications' className='mb-8'>
        <h2 className='text-xl font-semibold mb-3 border-b-2 border-gray-300 pb-2'>
          Notification Settings
        </h2>
        <div className='space-y-3'>
          <label className='flex items-center gap-2'>
            <input
              type='checkbox'
              defaultChecked
              style={{ accentColor: "var(--primary)" }}
            />
            Email Notifications
          </label>
          <label className='flex items-center gap-2'>
            <input
              type='checkbox'
              defaultChecked
              style={{ accentColor: "var(--primary)" }}
            />
            SMS Alerts
          </label>
          <label className='flex items-center gap-2'>
            <input type='checkbox' style={{ accentColor: "var(--primary)" }} />
            Push Notifications
          </label>
        </div>
      </div>

      <div id='security'>
        <h2 className='text-xl font-semibold mb-3 border-b-2 border-gray-300 pb-2'>
          Security Settings
        </h2>
        <div className='space-y-3'>
          <button
            className='px-4 py-2 text-white rounded'
            style={{ backgroundColor: "var(--primary)" }}>
            Change Password
          </button>
          <p>
            <strong>Last Login:</strong> Today at 2:30 PM
          </p>
          <label className='flex items-center gap-2'>
            <input
              type='checkbox'
              defaultChecked
              style={{ accentColor: "var(--primary)" }}
            />
            Two-Factor Authentication
          </label>
        </div>
      </div>
    </div>
  );
}
