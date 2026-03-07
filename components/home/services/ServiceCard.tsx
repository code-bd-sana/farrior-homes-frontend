"use client";

import { useServices } from "@/actions/hooks/service.hooks";
import type { IServiceDescriptionItem } from "@/services/service";

export default function ServiceCard() {
  const { data, isLoading, isError, error } = useServices();
  const services = data?.services || [];

  if (isLoading) {
    return <div className='text-center py-10'>Loading services...</div>;
  }
  if (isError) {
    return (
      <div className='text-center py-10 text-red-500'>
        {error instanceof Error ? error.message : "Failed to load services."}
      </div>
    );
  }
  if (!services.length) {
    return <div className='text-center py-10'>No services found.</div>;
  }

  return (
    <div className='grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 2xl:grid-cols-4 gap-6'>
      {services.map((service) => (
        <div
          key={service._id || service.id}
          className='border border-gray-300 rounded-lg p-6 mb-1 flex flex-col h-full'>
          <h3 className='text-xl font-semibold mb-2'>{service.title}</h3>
          <p className='text-gray-700 mb-2'>{service.subTitle}</p>
          {service.moreSubTitle && (
            <p className='text-gray-500 mb-4'>{service.moreSubTitle}</p>
          )}
          <ul className='list-disc mt-auto list-inside text-gray-600 marker:text-[#619B7F] space-y-1'>
            {service.description?.map(
              (desc: IServiceDescriptionItem, fidx: number) => (
                <li key={desc.id || fidx}>{desc.text}</li>
              ),
            )}
          </ul>
        </div>
      ))}
    </div>
  );
}
