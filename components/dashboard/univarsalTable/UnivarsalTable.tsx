import Pagination from "@/components/pagination/Pagination";
import { UniversalTableProps } from "./type";

const UnivarsalTable = ({
  title,
  columns,
  data,
  pagination,
  controls,
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
                    className='px-4 text-sm font-[500] py-2 text-left border border-[#D1CEC6]'>
                    {col}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {data.map((row, idx) => (
                <tr key={idx} className='hover:bg-gray-50 '>
                  {columns.map((col) => {
                    // col er value ke lower case kore data object theke fetch kora
                    const key = col.charAt(0).toLowerCase() + col.slice(1);
                    return (
                      <td
                        key={col}
                        className='px-4 py-2 border border-[#D1CEC6] text-[#70706C]'>
                        {row[key as keyof typeof row] ?? "-"}
                      </td>
                    );
                  })}
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
