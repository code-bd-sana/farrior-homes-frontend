"use client";

import React from "react";
import { PaginationProps } from "./type";

export default function Pagination({
  currentPage,
  totalPages,
  total,
  perPage = 10,
  onPageChange,
  maxButtons = 5,
}: PaginationProps) {
  const half = Math.floor(maxButtons / 2);
  let start = Math.max(currentPage - half, 1);
  const end = Math.min(start + maxButtons - 1, totalPages);

  if (end - start + 1 < maxButtons) {
    start = Math.max(end - maxButtons + 1, 1);
  }

  const pages: number[] = [];
  for (let i = start; i <= end; i++) pages.push(i);

  const handlePageChange = (page: number) => {
    if (page < 1 || page > totalPages) return;
    onPageChange(page);
  };

  return (
    <div className='flex flex-col md:flex-row justify-center items-center mt-4 gap-2'>
      <div className='flex gap-1'>
        {/* Prev Button */}
        <button
          disabled={currentPage === 1}
          onClick={() => handlePageChange(currentPage - 1)}
          className='px-3 py-1 cursor-pointer rounded disabled:opacity-50 hover:bg-gray-100'>
          + Previous
        </button>

        {/* Numbered Buttons */}
        {pages.map((page) => (
          <button
            key={page}
            onClick={() => handlePageChange(page)}
            className={`px-3 py-1 cursor-pointer rounded text-[#1B1B1A] font-medium hover:bg-gray-100 ${
              currentPage === page ? "bg-[#E2E8E5] " : ""
            }`}>
            {page}
          </button>
        ))}

        {/* Next Button */}
        <button
          disabled={currentPage === totalPages}
          onClick={() => handlePageChange(currentPage + 1)}
          className='px-3 py-1 text-[#1B1B1A] cursor-pointer rounded disabled:opacity-50 '>
          {" Next   +"}
        </button>
      </div>
    </div>
  );
}
