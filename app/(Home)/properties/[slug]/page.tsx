import Gallery from "@/components/home/property/Gallery";
import Location from "@/components/home/property/Location";
import ViewButton from "@/components/shared/ViewButton/ViewButton";
import { getPropertyById } from "@/lib/propertyData";
import {
  Bath,
  Bed,
  Heart,
  MapPin,
  MessageCircleMore,
  Square,
} from "lucide-react";

type Props = {
  params: { slug: string } | Promise<{ slug: string }>;
};

export default async function page({ params }: Props) {
  const { slug } = await params;
  const id = Number(slug);
  const property = getPropertyById(id);

  if (!property) return <div className='p-8'>Property not found</div>;

  return (
    <div className='md:mx-12.5 px-6 lg:px-8 py-8'>
      <div className='grid grid-cols-1 lg:grid-cols-4 gap-8 border border-[#D1CEC6] p-5 rounded-md '>
        <div className='lg:col-span-2'>
          <Gallery images={property.images ?? []} />
        </div>

        <aside className='lg:col-span-2'>
          <div className=' bg-white rounded-md px-6'>
            {property.contact && (
              <div>
                <div className='flex items-start justify-between gap-4'>
                  <div>
                    <h1 className='text-2xl md:text-4xl font-normal pb-6'>
                      {property.title}
                    </h1>
                    <div className='flex items-center justify-start gap-x-4 text-(--primary-text-color) pb-4'>
                      <p className='text-sm bg-[#F8FAF9] border border-[#D1CEC6] rounded-lg px-2 py-1'>
                        Status: {property?.status ?? "For Sale"}
                      </p>
                      <p className='text-sm bg-[#F8FAF9] border border-[#D1CEC6] rounded-lg px-2 py-1'>
                        Type: {property?.propertyType || "N/A"}
                      </p>
                    </div>
                    {property.address && (
                      <div className='text-sm text-(--primary-text-color) mt-2 flex items-center gap-1  '>
                        <MapPin className='h-5 w-5' />
                        <p>{property.address}</p>
                      </div>
                    )}
                  </div>
                </div>

                <div className='mt-4'>
                  <div className='grid  md:flex gap-4 text-sm text-gray-600 mt-3 p-1'>
                    {property.bedrooms !== undefined && (
                      <div className='flex items-center gap-2'>
                        <Bed className='h-4 w-4 text-(--primary-text-color) ' />
                        <p>{property.bedrooms} Beds</p>
                      </div>
                    )}
                    {property.bathrooms !== undefined && (
                      <div className='flex items-center gap-2'>
                        <Bath className='h-4 w-4 text-(--primary-text-color)' />
                        <p>{property.bathrooms} Baths</p>
                      </div>
                    )}
                    {property.sqft !== undefined && (
                      <div className='flex items-center gap-2'>
                        <Square className='h-4 w-4 text-(--primary-text-color)' />
                        <p>{property.sqft.toLocaleString()} Sqft</p>
                      </div>
                    )}
                    {property.yearBuilt && (
                      <div>
                        <p className='text-(--primary-text-color)'>
                          Year Built:{" "}
                          <span className='text-gray-600'>
                            {property.yearBuilt}
                          </span>
                        </p>
                      </div>
                    )}
                    {property.lot && (
                      <div>
                        <p className='text-(--primary-text-color)'>
                          Lot:{" "}
                          <span className='text-gray-600'>{property.lot}</span>
                        </p>
                      </div>
                    )}
                  </div>

                  <div className='flex gap-4 text-sm text-gray-600 mt-3'></div>

                  {property.overview && (
                    <div className='mt-4'>
                      <h3 className='text-[24px]'>Overview</h3>
                      <p className='text-sm text-gray-700 mt-4'>
                        {property.overview}
                      </p>
                    </div>
                  )}

                  {property.keyFeatures && property.keyFeatures.length > 0 && (
                    <div className='mt-13'>
                      <h3 className='text-[24px]'>Key Features</h3>
                      <ul className='text-sm text-gray-700 mt-4 space-y-1'>
                        {property.keyFeatures.map((k, i) => (
                          <li key={i}>{k}</li>
                        ))}
                      </ul>
                    </div>
                  )}
                  <div className='flex flex-col md:flex-row items-start md:items-center justify-start gap-x-25 gap-y-2 text-(--primary-text-color) pb-4 mt-6'>
                    <div className='text-3xl md:text-5xl text-(--primary-text-color) '>
                      {typeof property.price === "number" ? (
                        <p>
                          Price: $
                          {property.price.toLocaleString("en-US", {
                            minimumFractionDigits: 0,
                          })}
                        </p>
                      ) : (
                        <p>Price: {property.price}</p>
                      )}
                    </div>
                    <div className='flex items-center justify-center text-center gap-x-4'>
                      <ViewButton
                        icon={<MessageCircleMore className='h-5 w-5' />}
                        label='Message'
                        href='/message'
                        className='flex flex-row items-center justify-center'
                      />
                      <div className='border border-[#D1CEC6] rounded-lg p-3'>
                        <Heart className='text-(--primary)' />
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            )}
          </div>
        </aside>
      </div>
      <div>
        <div className='mt-8 bg-white shadow border border-[#D1CEC6] p-5 rounded-lg'>
          <h2 className='text-4xl mb-3 border-b border-[#D1CEC6] pb-2 '>
            More details
          </h2>
          <div>
            <p className='text-2xl'>Interior</p>
            <p className='text-sm text-gray-700 pt-5'>{property.interior}</p>
          </div>
          <div>
            <p className='text-2xl pt-6'>Exterior</p>
            <p className='text-sm text-gray-700 pt-5'>{property.exterior}</p>
          </div>

          {property.financial && (
            <div className='mt-4'>
              <h3 className='text-2xl pb-4'>Financial Info</h3>
              <ul className='text-sm text-gray-700 space-y-1'>
                {property.financial.taxes && (
                  <li>Taxes: {property.financial.taxes}</li>
                )}
                {property.financial.hoa && (
                  <li>HOA: {property.financial.hoa}</li>
                )}
                {property.financial.lastSold && (
                  <li>Last Sold: {property.financial.lastSold}</li>
                )}
              </ul>
            </div>
          )}

          {property.contact && (
            <div className='mt-5  text-sm text-gray-600'>
              <h3 className='text-2xl pb-5 text-(--primary-text-color)'>
                Contact Agent
              </h3>
              <div>{property.contact.name}</div>
              {property.contact.company && (
                <div>{property.contact.company}</div>
              )}
              {property.contact.email && (
                <a className='block ' href={`mailto:${property.contact.email}`}>
                  {property.contact.email}
                </a>
              )}
              {property.contact.phone && (
                <a
                  className='block mt-1'
                  href={`tel:${property.contact.phone}`}>
                  {property.contact.phone}
                </a>
              )}
            </div>
          )}
        </div>

        <div className='mt-8 border border-[#D1CEC6] p-5 rounded-lg'>
          <h2 className='text-4xl mb-3 border-b border-[#D1CEC6] pb-2 '>
            Location
          </h2>
          <Location
            address={property.address}
            lat={property.lat}
            lng={property.lng}
          />
        </div>
      </div>
    </div>
  );
}
