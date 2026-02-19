import Pagination from "@/components/pagination/Pagination";
import Image from "next/image";
import Link from "next/link";
import { UniversalTableProps } from "./type";

const UnivarsalTable = ({
  title,
  columns,
  data,
  pagination,
  controls,
  action,
}: UniversalTableProps) => {
  return (
    <div>
      <div className=' border border-[#D1CEC6]  rounded-lg p-8'>
        {/* Title + Sort */}
        <div className='flex justify-between border-b pb-4 border-b-[#D1CEC6] items-center mb-4'>
          {title && <h2 className='text-2xl jost-400 font-bold'>{title}</h2>}

          {controls?.sortBy && controls.sortBy.length > 0 && (
            <select
              value={controls.selectedSort || ""}
              onChange={(e) => controls.onSortChange?.(e.target.value)}
              className='border border-[#D1CEC6] text-[#70706C] px-2 py-1 rounded'>
              {controls.sortBy.map((opt) => (
                <option
                  key={opt.value}
                  value={opt.value}
                  className='text-sm text-[#70706C]'>
                  {opt.label}
                </option>
              ))}
            </select>
          )}
        </div>

        {/* Table */}
        <div className='overflow-x-auto'>
          <table className='w-full border border-[#D1CEC6] p-3 table-auto border-collapse'>
            <thead className='mt-8'>
              <tr className='mt-8'>
                {columns.map((col) => (
                  <th
                    key={col}
                    className='px-4 text-sm font-medium py-2 text-left border border-[#D1CEC6]'>
                    {col}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {data.map((row, rowIdx) => (
                <tr key={rowIdx} className='hover:bg-gray-50'>
                  {Object.keys(row).map((key, colIdx) => {
                    const value = row[key as keyof typeof row];

                    const isImageKey =
                      key.toLowerCase().includes("image") ||
                      key.toLowerCase().includes("profile") ||
                      key.toLowerCase().includes("photo") ||
                      key.toLowerCase().includes("picture") ||
                      key.toLowerCase().includes("avatar") ||
                      key.toLowerCase().includes("img");

                    return (
                      <td
                        key={colIdx}
                        className={`px-4 text-center py-2 border border-[#D1CEC6] ${value == "premium" ? "text-[#619B7F] " : "text-[#70706C] "} `}>
                        {isImageKey ? (
                          <Image
                            src={value}
                            alt={key}
                            className='w-12 h-12 rounded-full object-cover'
                            width={200}
                            height={200}
                          />
                        ) : (
                          <span
                            className={`${value === "premium" || value === "free" ? "bg-[#F1F5F3] py-2 px-6 rounded-2xl" : ""}`}>
                            {value}
                          </span>
                        )}
                      </td>
                    );
                  })}

                  <td className='px-4 underline py-2 border border-[#D1CEC6] text-[#70706C]'>
                    <Link href={action.link}> {action.text}</Link>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Pagination */}
        <Pagination
          currentPage={pagination.currentPage}
          totalPages={pagination.totalPages}
          total={pagination.total}
          perPage={pagination.perPage}
          onPageChange={controls?.onPageChange || (() => {})}
        />
      </div>
    </div>
  );
};

export default UnivarsalTable;
