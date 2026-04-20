"use client";

import { useServices } from "@/actions/hooks/service.hooks";
import {
  PREDEFINED_SERVICE_CATEGORIES,
  type IServiceResponse,
} from "@/services/service";
import { Filter } from "lucide-react";
import { useMemo, useState } from "react";

const ALL_SERVICES_FILTER = "All Services";

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

const normalizePointValues = (value: unknown): string[] => {
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
      .filter((item) => item.length > 0);
  }

  if (typeof value === "string" && value.trim().length > 0) {
    return [value.trim()];
  }

  if (
    value &&
    typeof value === "object" &&
    "text" in value &&
    typeof (value as { text?: unknown }).text === "string"
  ) {
    return [(value as { text: string }).text.trim()].filter(
      (item) => item.length > 0,
    );
  }

  return [];
};

const getDescriptionText = (service: IServiceResponse): string => {
  if (typeof service.description === "string" && service.description.trim()) {
    return service.description.trim();
  }

  const legacy = service as IServiceResponse & { subTitle?: unknown };
  if (typeof legacy.subTitle === "string" && legacy.subTitle.trim()) {
    return legacy.subTitle.trim();
  }

  return "";
};

const getPointsText = (service: IServiceResponse): string[] => {
  const pointsFromService = normalizePointValues(service.points);
  if (pointsFromService.length > 0) {
    return pointsFromService;
  }

  const legacy = service as IServiceResponse & { description?: unknown };
  const pointsFromLegacyDescription = Array.isArray(legacy.description)
    ? normalizePointValues(legacy.description)
    : [];

  if (pointsFromLegacyDescription.length > 0) {
    return pointsFromLegacyDescription;
  }

  return normalizePointValues(service.price);
};

const ServiceInfoCard = ({ service }: { service: IServiceResponse }) => {
  const points = getPointsText(service);
  const showPremiumPoint =
    service.isPremiumIncluded &&
    !points.some((point) => /premium|\$0/i.test(point));

  return (
    <article className='flex h-full max-h-70 min-h-70 flex-col rounded-xl border border-[#D4D0C9] bg-white p-6'>
      <h3 className='text-[30px] leading-[1.08] text-[#222222] min-h-15'>
        {getServiceNameText(service)}
      </h3>
      <p className='mt-4 text-sm leading-relaxed text-[#6A6A67]'>
        {getDescriptionText(service)}
      </p>

      <ul className='mt-auto space-y-2 pt-8'>
        {points.map((point, index) => (
          <li
            key={`${service._id || service.id}-point-${index}`}
            className='flex items-start gap-2 text-sm text-[#676764]'>
            <span className='mt-1.5 h-2 w-2 rounded-full bg-[#649B7F] shrink-0' />
            <span>{point}</span>
          </li>
        ))}

        {showPremiumPoint && (
          <li className='flex items-start gap-2 text-sm text-[#676764]'>
            <span className='mt-1.5 h-2 w-2 rounded-full bg-[#649B7F] shrink-0' />
            <span>Included with Farrior Premium Membership ($0)</span>
          </li>
        )}
      </ul>
    </article>
  );
};

export default function ServiceCard() {
  const { data, isLoading, isError, error } = useServices();
  const [activeFilter, setActiveFilter] = useState<string>(ALL_SERVICES_FILTER);

  const services = useMemo(() => sortServices(data?.services ?? []), [data]);

  const categoryOptions = useMemo(() => {
    const categories = new Set<string>();

    services.forEach((service) => {
      categories.add(normalizeCategory(service.category));
    });

    return [ALL_SERVICES_FILTER, ...sortCategoryNames(Array.from(categories))];
  }, [services]);

  const filteredServices = useMemo(() => {
    if (activeFilter === ALL_SERVICES_FILTER) {
      return services;
    }

    return services.filter(
      (service) => normalizeCategory(service.category) === activeFilter,
    );
  }, [services, activeFilter]);

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
    <div className='space-y-8 '>
      <div className='flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between'>
        <h2 className='text-4xl md:text-5xl leading-none text-[#222222]'>
          Services
        </h2>

        <div className='relative w-full sm:w-auto'>
          <Filter className='pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-[#6D6A63]' />
          <select
            value={activeFilter}
            onChange={(event) => setActiveFilter(event.target.value)}
            className='h-10 w-full rounded-md border border-[#CFCBC3] bg-white pl-9 pr-9 text-sm text-[#2D2C2A] outline-none sm:min-w-45'>
            {categoryOptions.map((category) => (
              <option key={category} value={category}>
                {category}
              </option>
            ))}
          </select>
        </div>
      </div>

      {filteredServices.length ? (
        <div className='grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 2xl:grid-cols-4 items-start gap-6'>
          {filteredServices.map((service) => (
            <ServiceInfoCard
              key={service._id || service.id}
              service={service}
            />
          ))}
        </div>
      ) : (
        <div className='text-center py-10 text-gray-600'>
          No services found for this category.
        </div>
      )}
    </div>
  );
}
