"use client";

import { PaginationData, PaginationProps } from "./type";

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

  const pages = [];
  for (let i = start; i <= end; i++) pages.push(i);

  return (
    <div className='flex justify-between items-center mt-4'>
      {total && (
        <div>
          Showing {(currentPage - 1) * perPage + 1} -{" "}
          {Math.min(currentPage * perPage, total)} of {total}
        </div>
      )}

      <div className='flex gap-1'>
        <button
          disabled={currentPage === 1}
          onClick={() => onPageChange(currentPage - 1)}
          className='px-3 py-1 border rounded disabled:opacity-50'>
          Prev
        </button>

        {pages.map((page) => (
          <button
            key={page}
            onClick={() => onPageChange(page)}
            className={`px-3 py-1 border rounded ${
              currentPage === page ? "bg-gray-200 font-bold" : ""
            }`}>
            {page}
          </button>
        ))}

        <button
          disabled={currentPage === totalPages}
          onClick={() => onPageChange(currentPage + 1)}
          className='px-3 py-1 border rounded disabled:opacity-50'>
          Next
        </button>
      </div>
    </div>
  );
}
