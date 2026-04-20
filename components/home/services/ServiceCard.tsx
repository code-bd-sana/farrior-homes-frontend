"use client";

import { useServices } from "@/actions/hooks/service.hooks";
import {
  PREDEFINED_SERVICE_CATEGORIES,
  type IServiceResponse,
} from "@/services/service";
import { useEffect, useMemo, useState } from "react";

const ALL_SERVICES_TAB = "All Services";

const normalizeCategory = (category?: string): string => {
  const cleanedCategory = category?.trim();
  if (!cleanedCategory) {
    return "Uncategorized";
  }

  const predefinedMatch = PREDEFINED_SERVICE_CATEGORIES.find(
    (item) => item.toLowerCase() === cleanedCategory.toLowerCase(),
  );

  return predefinedMatch ?? cleanedCategory;
};

const sortCategoryNames = (categories: string[]): string[] => {
  return [...categories].sort((a, b) => {
    const indexA = PREDEFINED_SERVICE_CATEGORIES.findIndex(
      (item) => item.toLowerCase() === a.toLowerCase(),
    );
    const indexB = PREDEFINED_SERVICE_CATEGORIES.findIndex(
      (item) => item.toLowerCase() === b.toLowerCase(),
    );

    const rankA = indexA === -1 ? PREDEFINED_SERVICE_CATEGORIES.length : indexA;
    const rankB = indexB === -1 ? PREDEFINED_SERVICE_CATEGORIES.length : indexB;

    if (rankA !== rankB) {
      return rankA - rankB;
    }

    return a.localeCompare(b);
  });
};

const getCategoryRank = (category: string): number => {
  const index = PREDEFINED_SERVICE_CATEGORIES.findIndex(
    (item) => item.toLowerCase() === category.toLowerCase(),
  );

  return index === -1 ? PREDEFINED_SERVICE_CATEGORIES.length : index;
};

const sortServices = (services: IServiceResponse[]): IServiceResponse[] => {
  return [...services].sort((a, b) => {
    const categoryA = normalizeCategory(a.category);
    const categoryB = normalizeCategory(b.category);

    const categoryDifference =
      getCategoryRank(categoryA) - getCategoryRank(categoryB);

    if (categoryDifference !== 0) {
      return categoryDifference;
    }

    const categoryNameDifference = categoryA.localeCompare(categoryB);
    if (categoryNameDifference !== 0) {
      return categoryNameDifference;
    }

    const orderDifference = (a.order ?? 1) - (b.order ?? 1);
    if (orderDifference !== 0) {
      return orderDifference;
    }

    return (a.name ?? "").localeCompare(b.name ?? "");
  });
};

const getServiceNameText = (service: IServiceResponse): string => {
  const legacy = service as IServiceResponse & { title?: unknown };

  if (typeof service.name === "string" && service.name.trim().length > 0) {
    return service.name.trim();
  }

  if (typeof legacy.title === "string" && legacy.title.trim().length > 0) {
    return legacy.title.trim();
  }

  return "Untitled Service";
};

const getDescriptionText = (value: unknown): string => {
  if (typeof value === "string") {
    return value.trim();
  }

  if (Array.isArray(value)) {
    return value
      .map((item) => {
        if (typeof item === "string") {
          return item.trim();
        }

        if (
          item &&
          typeof item === "object" &&
          "text" in item &&
          typeof (item as { text?: unknown }).text === "string"
        ) {
          return (item as { text: string }).text.trim();
        }

        return "";
      })
      .filter((item) => item.length > 0)
      .join(" ");
  }

  if (
    value &&
    typeof value === "object" &&
    "text" in value &&
    typeof (value as { text?: unknown }).text === "string"
  ) {
    return (value as { text: string }).text.trim();
  }

  return "";
};

const getPriceText = (value: unknown): string => {
  if (typeof value === "string" && value.trim().length > 0) {
    return value.trim();
  }

  return "Price on request";
};

const ServiceInfoCard = ({ service }: { service: IServiceResponse }) => {
  return (
    <article className='flex h-full flex-col rounded-xl border border-[#D6DED9] bg-white p-6 shadow-sm'>
      <h3 className='text-xl font-semibold text-[#1F2937]'>
        {getServiceNameText(service)}
      </h3>
      <p className='mt-3 text-sm leading-relaxed text-[#4B5563]'>
        {getDescriptionText(service.description)}
      </p>

      <div className='mt-auto border-t border-[#E7ECE9] pt-4'>
        <p className='text-2xl font-semibold text-[#2F6E52]'>
          {getPriceText(service.price)}
        </p>
        {service.isPremiumIncluded && (
          <p className='mt-2 text-sm font-medium text-[#2E7D57]'>
            or $0 with Farrior Premium Membership
          </p>
        )}

        <button
          type='button'
          className='mt-4 inline-flex items-center rounded-md border border-[#4D7F68] px-3 py-1.5 text-sm font-medium text-[#2F6E52] transition-colors hover:bg-[#EDF5F0]'>
          Learn More
        </button>
      </div>
    </article>
  );
};

export default function ServiceCard() {
  const { data, isLoading, isError, error } = useServices();
  const [activeTab, setActiveTab] = useState<string>(ALL_SERVICES_TAB);

  const services = useMemo(() => sortServices(data?.services ?? []), [data]);

  const tabs = useMemo(
    () => [ALL_SERVICES_TAB, ...PREDEFINED_SERVICE_CATEGORIES],
    [],
  );

  useEffect(() => {
    if (!tabs.includes(activeTab)) {
      setActiveTab(ALL_SERVICES_TAB);
    }
  }, [tabs, activeTab]);

  const groupedServices = useMemo(() => {
    const grouped = new Map<string, IServiceResponse[]>();

    services.forEach((service) => {
      const category = normalizeCategory(service.category);
      if (!grouped.has(category)) {
        grouped.set(category, []);
      }
      grouped.get(category)?.push(service);
    });

    return sortCategoryNames(Array.from(grouped.keys())).map((category) => ({
      category,
      services: sortServices(grouped.get(category) ?? []),
    }));
  }, [services]);

  const filteredServices = useMemo(() => {
    if (activeTab === ALL_SERVICES_TAB) {
      return services;
    }

    return services.filter(
      (service) => normalizeCategory(service.category) === activeTab,
    );
  }, [services, activeTab]);

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
    <div className='space-y-8'>
      <div className='rounded-2xl border border-[#9EC9B2] bg-[#EEF7F1] p-6 md:p-8 shadow-sm'>
        <h2 className='text-xl md:text-2xl font-semibold text-[#264B3A]'>
          THE FARRIOR PREMIUM MEMBERSHIP: $19 / Month
        </h2>
        <p className='mt-2 text-sm md:text-base text-[#365848]'>
          Manage your home like an investment portfolio, not just a place to
          live.
        </p>
        <p className='mt-3 text-sm md:text-base font-medium text-[#2E7D57]'>
          Every Consultation and Audit on this menu is $0 / INCLUDED for Farrior
          Premium Members.
        </p>
      </div>

      <div className='rounded-2xl border border-[#DCE7E0] bg-white p-4 md:p-5 shadow-sm'>
        <div className='flex gap-2 overflow-x-auto pb-1'>
          {tabs.map((tab) => {
            const isActive = tab === activeTab;

            return (
              <button
                key={tab}
                type='button'
                onClick={() => setActiveTab(tab)}
                className={`whitespace-nowrap rounded-full px-4 py-2 text-sm font-medium transition-colors ${
                  isActive
                    ? "bg-[#2F6E52] text-white"
                    : "bg-[#F4F6F4] text-[#3F4B45] hover:bg-[#E8EEEA]"
                }`}>
                {tab}
              </button>
            );
          })}
        </div>
      </div>

      {activeTab === ALL_SERVICES_TAB ? (
        groupedServices.length ? (
          groupedServices.map((group) => (
            <section key={group.category} className='space-y-4'>
              <div className='flex items-center justify-between border-b border-[#E5EAE7] pb-2'>
                <h3 className='text-lg md:text-xl font-semibold text-[#1F2937]'>
                  {group.category}
                </h3>
                <p className='text-sm text-[#6B7280]'>
                  {group.services.length} service
                  {group.services.length > 1 ? "s" : ""}
                </p>
              </div>

              <div className='grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6'>
                {group.services.map((service) => (
                  <ServiceInfoCard
                    key={service._id || service.id}
                    service={service}
                  />
                ))}
              </div>
            </section>
          ))
        ) : (
          <div className='text-center py-10 text-gray-600'>
            No services found.
          </div>
        )
      ) : filteredServices.length ? (
        <div className='grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6'>
          {filteredServices.map((service) => (
            <ServiceInfoCard
              key={service._id || service.id}
              service={service}
            />
          ))}
        </div>
      ) : (
        <div className='text-center py-10 text-gray-600'>
          No services found in this category.
        </div>
      )}
    </div>
  );
}
