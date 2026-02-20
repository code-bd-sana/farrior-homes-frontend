import Image from "next/image";
import Link from "next/link";
import { getAllProperties } from "@/lib/propertyData";

export default function RecentCreatedProperties() {
  const recentProperties = [...getAllProperties()]
    .sort(
      (a, b) =>
        new Date(b.createdAt ?? 0).getTime() -
        new Date(a.createdAt ?? 0).getTime(),
    )
    .slice(0, 9);

  return (
    <div className='mt-6 border border-[#D1CEC6] rounded-lg p-5'>
      <p className='text-xl md:text-2xl border-b border-[#D1CEC6] pb-3 mb-4'>
        Recently Created Properties
      </p>

      <div className='overflow-x-auto'>
        <table className='w-full text-sm text-[#1B1B1A]'>
          <thead>
            <tr className='border border-[#D1CEC6]'>
              <th className='px-4 py-3 text-left font-medium w-20 border border-[#E8E5DD]'>
                Property
              </th>
              <th className='px-4 py-3 text-left font-medium border border-[#E8E5DD]'>
                Property Name
              </th>
              <th className='px-4 py-3 text-left font-medium border border-[#E8E5DD]'>
                Address
              </th>
              <th className='px-4 py-3 text-left font-medium border border-[#E8E5DD]'>
                Bed rooms
              </th>
              <th className='px-4 py-3 text-left font-medium border border-[#E8E5DD]'>
                Bathroom
              </th>
              <th className='px-4 py-3 text-left font-medium border border-[#E8E5DD]'>
                Square Feet
              </th>
              <th className='px-4 py-3 text-left font-medium border border-[#E8E5DD]'>
                Type
              </th>
              <th className='px-4 py-3 text-left font-medium border border-[#E8E5DD]'>
                Created At
              </th>
              <th className='px-4 py-3 text-left font-medium border border-[#E8E5DD]'>
                Action
              </th>
            </tr>
          </thead>
          <tbody className='border border-[#D1CEC6]'>
            {recentProperties.map((property) => (
              <tr
                key={property.id}
                className='border border-[#E8E5DD] hover:bg-gray-50 transition-colors'>
                <td className='px-4 py-3 border border-[#E8E5DD]'>
                  <div className='w-12 h-10 rounded overflow-hidden bg-gray-100 shrink-0'>
                    <Image
                      src={property.images?.[0] ?? "/banner.png"}
                      alt={property.title}
                      width={48}
                      height={40}
                      className='w-full h-full object-cover'
                    />
                  </div>
                </td>

                <td className='px-4 py-3 font-medium text-[#70706C] border border-[#E8E5DD]'>
                  {property.title}
                </td>

                <td className='px-4 py-3 text-[#70706C] border border-[#E8E5DD]'>
                  {property.address ?? "N/A"}
                </td>

                <td className='px-4 py-3 text-[#70706C] border border-[#E8E5DD]'>
                  {property.bedrooms ?? 0}
                </td>

                <td className='px-4 py-3 text-[#70706C] border border-[#E8E5DD]'>
                  {property.bathrooms ?? 0}
                </td>

                <td className='px-4 py-3 text-[#70706C] border border-[#E8E5DD]'>
                  {property.sqft ?? 0}
                </td>

                <td className='px-4 py-3 text-[#70706C] border border-[#E8E5DD]'>
                  <span className='inline-flex items-center px-3 py-1 rounded-lg border border-[#D1CEC6] text-[12px] text-(--primary-text-color) bg-[#F8FAF9] whitespace-nowrap'>
                    Type: {property.propertyType ?? "N/A"}
                  </span>
                </td>

                <td className='px-4 py-3 border border-[#E8E5DD] text-[#70706C]'>
                  {property.createdAt ?? "N/A"}
                </td>
                <td className='px-4 py-3 border border-[#E8E5DD]'>
                  <Link
                    href={`/properties/${property.id}`}
                    className='text-sm text-[#1B1B1A] underline underline-offset-2 hover:opacity-70 transition-opacity whitespace-nowrap'>
                    View Details
                  </Link>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
