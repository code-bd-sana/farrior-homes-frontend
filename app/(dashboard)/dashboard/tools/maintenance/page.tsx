"use client";

import Pagination from "@/components/pagination/Pagination";
import { useRouter } from "next/navigation";
import { useState } from "react";

const DEMO_DATA = [
  {
    id: 1,
    profileName: "Swimming Pool",
    email: "03 Month, 29 Days",
    phone: "Lorem ipsum dolor sit amet",
    address: "Need to clean",
    subscription: "Pending",
    propertiesOwn: "Buy new",
    propertiesBuy: "Done",
    propertiesSell: "Done",
  },
  {
    id: 2,
    profileName: "Fan",
    email: "03 Month, 29 Days",
    phone: "Lorem ipsum dolor sit amet",
    address: "Need to clean",
    subscription: "Pending",
    propertiesOwn: "Need to maintain",
    propertiesBuy: "Done",
    propertiesSell: "Done",
  },
  {
    id: 3,
    profileName: "Clean AC",
    email: "03 Month, 29 Days",
    phone: "Lorem ipsum dolor sit amet",
    address: "Need to clean",
    subscription: "Pending",
    propertiesOwn: "Buy new",
    propertiesBuy: "Done",
    propertiesSell: "Pending",
  },
  {
    id: 4,
    profileName: "Repair Heater",
    email: "03 Month, 29 Days",
    phone: "Lorem ipsum dolor sit amet",
    address: "Need to clean",
    subscription: "Pending",
    propertiesOwn: "Need to maintain",
    propertiesBuy: "Done",
    propertiesSell: "Pending",
  },
  {
    id: 5,
    profileName: "Color",
    email: "03 Month, 29 Days",
    phone: "Lorem ipsum dolor sit amet",
    address: "Need to clean",
    subscription: "Pending",
    propertiesOwn: "Buy new",
    propertiesBuy: "Done",
    propertiesSell: "Pending",
  },
  {
    id: 6,
    profileName: "Main Door",
    email: "03 Month, 29 Days",
    phone: "Lorem ipsum dolor sit amet",
    address: "Need to clean",
    subscription: "Pending",
    propertiesOwn: "Buy new",
    propertiesBuy: "Done",
    propertiesSell: "Done",
  },
  {
    id: 7,
    profileName: "House Renovation",
    email: "03 Month, 29 Days",
    phone: "Lorem ipsum dolor sit amet",
    address: "Need to clean",
    subscription: "Pending",
    propertiesOwn: "Buy new",
    propertiesBuy: "Done",
    propertiesSell: "Done",
  },
  {
    id: 8,
    profileName: "Clean Garden",
    email: "03 Month, 29 Days",
    phone: "Lorem ipsum dolor sit amet",
    address: "Need to clean",
    subscription: "Pending",
    propertiesOwn: "Buy new",
    propertiesBuy: "Done",
    propertiesSell: "Pending",
  },
];

const PER_PAGE = 9;

export default function MaintenanceManagement() {
  const router = useRouter();
  const [currentPage, setCurrentPage] = useState(1);

  const totalPages = Math.ceil(DEMO_DATA.length / PER_PAGE);
  const paginated = DEMO_DATA.slice(
    (currentPage - 1) * PER_PAGE,
    currentPage * PER_PAGE,
  );

  return (
    <div className='bg-white rounded-xl border border-[#D1CEC6]'>
      {/* Page title */}
      <div className='px-6 py-5'>
        <h1 className='text-xl md:text-2xl border-b border-[#D1CEC6] pb-3'>
          Maintenance List
        </h1>
      </div>

      {/* Table */}
      <div className='overflow-x-auto px-5'>
        <table className='w-full text-sm text-left'>
          <thead>
            <tr className='border border-[#D1CEC6]'>
              <th className='px-4 py-3 text-left font-medium w-28 border border-[#E8E5DD]'>
                Amenities
              </th>
              <th className='px-4 py-3 text-left font-medium border border-[#E8E5DD]'>
                Remind Time
              </th>
              <th className='px-4 py-3 text-left font-medium border border-[#E8E5DD]'>
                Task Description
              </th>
              <th className='px-4 py-3 text-left font-medium border border-[#E8E5DD]'>
                Task
              </th>
              <th className='px-4 py-3 text-left font-medium border border-[#E8E5DD]'>
                Status
              </th>
            </tr>
          </thead>
          <tbody className='border border-[#D1CEC6]'>
            {paginated.map((item) => (
              <tr key={item.id} className='hover:bg-gray-50 transition-colors'>
                <td className='px-4 py-3 text-[#70706C] border border-[#E8E5DD]'>
                  {item.profileName}
                </td>
                <td className='px-4 py-3 text-[#70706C] border border-[#E8E5DD]'>
                  {item.email}
                </td>
                <td className='px-4 py-3 text-[#70706C] border border-[#E8E5DD]'>
                  {item.phone}
                </td>
                <td className='px-4 py-3 text-[#70706C] border border-[#E8E5DD]'>
                  <button className='bg-[#F8FAF9] p-1.5 text-black border border-[#E8E5DD] rounded-2xl'>
                    {item.address}
                  </button>
                </td>
                <td className='px-4 py-3 text-[#70706C] border border-[#E8E5DD]'>
                  <span
                    className={`inline-flex items-center px-3 py-1 rounded-2xl text-[12px] whitespace-nowrap bg-[#FFF6ED] ${
                      item.subscription === "Pending"
                        ? " text-[#EA6A2F]"
                        : "text-(--primary-text-color) border-[#D1CEC6]"
                    }`}>
                    {item.subscription}
                  </span>
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
          total={DEMO_DATA.length}
          perPage={PER_PAGE}
          onPageChange={setCurrentPage}
        />
      </div>
    </div>
  );
}
