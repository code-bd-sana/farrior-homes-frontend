"use client";

import Pagination from "@/components/pagination/Pagination";
import { getAllProperties } from "@/lib/propertyData";
import Image from "next/image";
import { useState } from "react";
import { useRouter } from "next/navigation";

const PROPERTIES = getAllProperties().map((property) => ({
  id: property.id,
  image: property.images?.[0] ?? "/banner.png",
  name: property.title,
  address: property.address ?? "N/A",
  bedrooms: property.bedrooms ?? 0,
  bathrooms: property.bathrooms ?? 0,
  squareFeet: property.sqft ?? 0,
  type: property.propertyType ?? "N/A",
  createdAt: property.createdAt ?? "N/A",
}));

const PER_PAGE = 13;

export default function PropertyTable() {
  const router = useRouter();
  const [currentPage, setCurrentPage] = useState(1);

  const totalPages = Math.ceil(PROPERTIES.length / PER_PAGE);
  const paginated = PROPERTIES.slice(
    (currentPage - 1) * PER_PAGE,
    currentPage * PER_PAGE,
  );

  return (
    <div className='bg-white rounded-xl border border-[#D1CEC6]'>
      {/* Page title */}
      <div className='px-6 py-5'>
        <h1 className='text-xl md:text-2xl  border-b border-[#D1CEC6] pb-3 '>
          Property Management
        </h1>
      </div>

      {/* Table */}
      <div className='overflow-x-auto px-5'>
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
            {paginated.map((property) => (
              <tr
                key={property.id}
                className='border border-[#E8E5DD] hover:bg-gray-50 transition-colors'>
                {/* Thumbnail */}
                <td className='px-4 py-3 border border-[#E8E5DD]'>
                  <div className='w-12 h-10 rounded overflow-hidden bg-gray-100 shrink-0'>
                    <Image
                      src={property.image}
                      alt={property.name}
                      width={48}
                      height={40}
                      className='w-full h-full object-cover'
                    />
                  </div>
                </td>

                {/* Name */}
                <td className='px-4 py-3 font-medium text-[#70706C] border border-[#E8E5DD]'>
                  {property.name}
                </td>

                {/* Address */}
                <td className='px-4 py-3 text-[#70706C] border border-[#E8E5DD]'>
                  {property.address}
                </td>

                {/* Bedrooms */}
                <td className='px-4 py-3 text-[#70706C] border border-[#E8E5DD]'>
                  {property.bedrooms}
                </td>

                {/* Bathrooms */}
                <td className='px-4 py-3 text-[#70706C] border border-[#E8E5DD]'>
                  {property.bathrooms}
                </td>

                {/* Square Feet */}
                <td className='px-4 py-3 text-[#70706C] border border-[#E8E5DD]'>
                  {property.squareFeet}
                </td>

                {/* Type badge */}
                <td className='px-4 py-3 text-[#70706C] border border-[#E8E5DD]'>
                  <span className='inline-flex items-center px-3 py-1 rounded-lg border border-[#D1CEC6] text-[12px] text-(--primary-text-color) bg-[#F8FAF9] whitespace-nowrap'>
                    Type: {property.type}
                  </span>
                </td>

                <td className='px-4 py-3 text-[#70706C] border border-[#E8E5DD]'>
                  {property.createdAt}
                </td>

                {/* Action */}
                <td className='px-4 py-3 border border-[#E8E5DD]'>
                  <button
                    onClick={() => router.push(`/properties/${property.id}`)}
                    className='text-sm text-[#1B1B1A] underline underline-offset-2 hover:opacity-70 transition-opacity whitespace-nowrap cursor-pointer'>
                    View Details
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Pagination */}
      <div className='px-4 py-4'>
        <Pagination
          currentPage={currentPage}
          totalPages={totalPages}
          total={PROPERTIES.length}
          perPage={PER_PAGE}
          onPageChange={setCurrentPage}
        />
      </div>
    </div>
  );
}
