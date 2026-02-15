export default function Location({
  address,
  lat,
  lng,
}: {
  address?: string;
  lat?: number;
  lng?: number;
}) {
  const query = address ? encodeURIComponent(address) : `${lat},${lng}`;
  const embedSrc = `https://www.google.com/maps?q=${query}&output=embed`;
  const mapsUrl = `https://www.google.com/maps/search/?api=1&query=${query}`;

  return (
    <section className='w-full'>
      <div className='rounded-lg overflow-hidden border border-gray-200 shadow-sm'>
        <div className='relative w-full h-64 md:h-150 '>
          <iframe
            title='property-location'
            src={embedSrc}
            className='w-full h-full block'
            loading='lazy'
          />

          {/* subtle pin in center + label */}
          <div className='pointer-events-none absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2'>
            <svg
              width='40'
              height='40'
              viewBox='0 0 24 24'
              fill='none'
              xmlns='http://www.w3.org/2000/svg'>
              <path
                d='M12 2C8.686 2 6 4.686 6 8c0 5.25 6 12 6 12s6-6.75 6-12c0-3.314-2.686-6-6-6z'
                fill='rgba(220,38,38,0.95)'
              />
              <circle cx='12' cy='8' r='2.5' fill='white' />
            </svg>
            {/* label under the pin */}
            <div className='absolute left-1/2 top-[calc(50%+30px)] -translate-x-1/2'>
              <div className='pointer-events-auto bg-white/90 text-xs text-black font-semibold px-2 py-1 rounded shadow'>
                {address ? (
                  <span className='max-w-xs block truncate'>{address}</span>
                ) : lat !== undefined && lng !== undefined ? (
                  <span>{`${lat.toFixed(4)}, ${lng.toFixed(4)}`}</span>
                ) : (
                  <span>Location</span>
                )}
              </div>
            </div>
          </div>
        </div>

        <div className='p-4 bg-white'>
          {address ? (
            <div className='text-sm text-gray-700 mb-2'>{address}</div>
          ) : (
            <div className='text-sm text-gray-500 mb-2'>Coordinates</div>
          )}

          <div className='flex items-center justify-between'>
            <div className='text-xs text-gray-500'>
              {lat !== undefined && lng !== undefined ? (
                <span>
                  {lat.toFixed(4)}, {lng.toFixed(4)}
                </span>
              ) : (
                <span>--</span>
              )}
            </div>

            <a
              href={mapsUrl}
              target='_blank'
              rel='noopener noreferrer'
              className='inline-flex items-center gap-2 text-sm text-(--primary) hover:underline'>
              Open in Google Maps
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}
