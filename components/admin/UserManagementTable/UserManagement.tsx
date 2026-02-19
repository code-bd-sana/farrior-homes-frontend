"use client";

import Pagination from "@/components/pagination/Pagination";
import Image from "next/image";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { getAllUsers } from "@/lib/userData";
import type { User } from "@/types/users";

function getSubscriptionStatus(id: number) {
  // deterministic status so UI is consistent across renders
  if (id % 3 === 0) return "Premium";
  if (id % 3 === 1) return "Basic";
  return "Free";
}

const _ALL: User[] = getAllUsers();

const PROPERTIES = _ALL.map((user: User) => ({
  id: user.id,
  image: user.profileImage ?? "/avatar.png",
  profileName: user.name,
  email: user.email ?? "N/A",
  phone: user.phone ?? "N/A",
  address: user.address ?? "N/A",
  subscription: user.subscription ?? getSubscriptionStatus(user.id),
  propertiesOwn: user.propertiesOwn ?? 0,
  propertiesBuy: user.propertiesBuy ?? 0,
  propertiesSell: user.propertiesSell ?? 0,
}));

const PER_PAGE = 9;

export default function UserManagement() {
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
          User Management
        </h1>
      </div>

      {/* Table */}
      <div className='overflow-x-auto px-5'>
        <table className='w-full text-sm text-[#1B1B1A]'>
          <thead>
            <tr className='border border-[#D1CEC6]'>
              <th className='px-4 py-3 text-left font-medium w-28 border border-[#E8E5DD]'>
                Profile
              </th>
              <th className='px-4 py-3 text-left font-medium border border-[#E8E5DD]'>
                Name
              </th>
              <th className='px-4 py-3 text-left font-medium border border-[#E8E5DD]'>
                Email Address
              </th>
              <th className='px-4 py-3 text-left font-medium border border-[#E8E5DD]'>
                Phone
              </th>
              <th className='px-4 py-3 text-left font-medium border border-[#E8E5DD]'>
                Address
              </th>
              <th className='px-4 py-3 text-left font-medium border border-[#E8E5DD]'>
                Subscription
              </th>
              <th className='px-4 py-3 text-left font-medium border border-[#E8E5DD]'>
                Properties Own
              </th>
              <th className='px-4 py-3 text-left font-medium border border-[#E8E5DD]'>
                Properties Buy
              </th>
              <th className='px-4 py-3 text-left font-medium border border-[#E8E5DD]'>
                Properties Sell
              </th>
              <th className='px-4 py-3 text-left font-medium border border-[#E8E5DD]'>
                Action
              </th>
            </tr>
          </thead>
          <tbody className='border border-[#D1CEC6]'>
            {paginated.map((user) => (
              <tr
                key={user.id}
                className='border border-[#E8E5DD] hover:bg-gray-50 transition-colors'>
                {/* Thumbnail */}
                <td className='px-4 py-3 border border-[#E8E5DD]'>
                  <div className='w-12 h-10 rounded overflow-hidden bg-gray-100 shrink-0'>
                    <Image
                      src={user.image}
                      alt={user.profileName}
                      width={48}
                      height={40}
                      className='w-full h-full object-cover'
                    />
                  </div>
                </td>

                {/* Name */}
                <td className='px-4 py-3 font-medium text-[#70706C] border border-[#E8E5DD]'>
                  {user.profileName}
                </td>

                {/* Email */}
                <td className='px-4 py-3 text-[#70706C] border border-[#E8E5DD]'>
                  {user.email}
                </td>

                {/* Phone */}
                <td className='px-4 py-3 text-[#70706C] border border-[#E8E5DD]'>
                  {user.phone}
                </td>

                {/* Address */}
                <td className='px-4 py-3 text-[#70706C] border border-[#E8E5DD]'>
                  {user.address}
                </td>

                {/* Subscription */}
                <td className='px-4 py-3 text-[#70706C] border border-[#E8E5DD]'>
                  <span className='inline-flex items-center px-3 py-1 rounded-lg border border-[#D1CEC6] text-[12px] bg-[#F8FAF9] whitespace-nowrap'>
                    {user.subscription}
                  </span>
                </td>

                {/* Properties Own */}
                <td className='px-4 py-3 text-[#70706C] border border-[#E8E5DD]'>
                  {user.propertiesOwn}
                </td>

                {/* Properties Buy */}
                <td className='px-4 py-3 text-[#70706C] border border-[#E8E5DD]'>
                  {user.propertiesBuy}
                </td>

                {/* Properties Sell */}
                <td className='px-4 py-3 text-[#70706C] border border-[#E8E5DD]'>
                  {user.propertiesSell}
                </td>

                {/* Action */}
                <td className='px-4 py-3 border border-[#E8E5DD]'>
                  <button
                    onClick={() => router.push(`/users/${user.id}`)}
                    className='text-sm text-[#1B1B1A] underline underline-offset-2 hover:opacity-70 transition-opacity whitespace-nowrap cursor-pointer'>
                    View User
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Pagination */}
      <div className='px-4 py-4 border-t border-[#D1CEC6]'>
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
