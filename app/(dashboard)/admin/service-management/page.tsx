"use client";

import {
  useCreateServiceMutation,
  useDeleteServiceMutation,
  useServices,
  useUpdateServiceMutation,
} from "@/actions/hooks/service.hooks";
import {
  PREDEFINED_SERVICE_CATEGORIES,
  type ICreateService,
  type IServiceResponse,
} from "@/services/service";
import { useMemo, useState } from "react";
import { FiTrash2, FiX } from "react-icons/fi";
import { toast } from "sonner";

const ADD_NEW_CATEGORY_VALUE = "__add_new_category__";
const MAX_POINTS = 10;

const isPredefinedCategory = (value: string): boolean =>
  PREDEFINED_SERVICE_CATEGORIES.some(
    (item) => item.toLowerCase() === value.toLowerCase(),
  );

const sortServicesWithinCategory = (
  services: IServiceResponse[],
): IServiceResponse[] => {
  return [...services].sort((a, b) =>
    (a.name ?? "").localeCompare(b.name ?? ""),
  );
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

const ServiceModal = ({
  isOpen,
  onClose,
  mode,
  initialService,
  availableCategories,
  onSubmit,
  isSubmitting,
  onDelete,
  isDeleting,
}: {
  isOpen: boolean;
  onClose: () => void;
  mode: "add" | "edit";
  initialService?: IServiceResponse | null;
  availableCategories: string[];
  onSubmit: (payload: ICreateService) => Promise<void>;
  isSubmitting: boolean;
  onDelete?: (service: IServiceResponse) => Promise<void>;
  isDeleting?: boolean;
}) => {
  const defaultCategory =
    mode === "edit" && initialService
      ? (initialService.category ?? "")
      : (availableCategories[0] ?? PREDEFINED_SERVICE_CATEGORIES[0]);

  const categoryExists = availableCategories.some(
    (category) => category.toLowerCase() === defaultCategory.toLowerCase(),
  );

  const [selectedCategory, setSelectedCategory] = useState(
    categoryExists ? defaultCategory : ADD_NEW_CATEGORY_VALUE,
  );
  const [customCategory, setCustomCategory] = useState(
    categoryExists ? "" : defaultCategory,
  );

  const [serviceName, setServiceName] = useState(
    mode === "edit" && initialService ? getServiceNameText(initialService) : "",
  );
  const [fullDescription, setFullDescription] = useState(
    mode === "edit" && initialService
      ? getDescriptionText(initialService.description)
      : "",
  );
  const [points, setPoints] = useState<string[]>(
    mode === "edit" && initialService ? getPointsText(initialService) : [""],
  );
  const [isPremiumIncluded, setIsPremiumIncluded] = useState(
    mode === "edit" && initialService
      ? Boolean(initialService.isPremiumIncluded)
      : false,
  );

  const handleCategoryChange = (value: string) => {
    setSelectedCategory(value);
    if (value !== ADD_NEW_CATEGORY_VALUE) {
      setCustomCategory("");
    }
  };

  const updatePoint = (index: number, value: string) => {
    setPoints((prev) =>
      prev.map((point, currentIndex) =>
        currentIndex === index ? value : point,
      ),
    );
  };

  const addPoint = () => {
    setPoints((prev) => (prev.length >= MAX_POINTS ? prev : [...prev, ""]));
  };

  const removePoint = (index: number) => {
    setPoints((prev) => {
      const next = prev.filter((_, currentIndex) => currentIndex !== index);
      return next.length > 0 ? next : [""];
    });
  };

  const handleDone = async () => {
    const cleanCategory =
      selectedCategory === ADD_NEW_CATEGORY_VALUE
        ? customCategory.trim()
        : selectedCategory.trim();
    const cleanServiceName = serviceName.trim();
    const cleanDescription = fullDescription.trim();
    const cleanPoints = points
      .map((point) => point.trim())
      .filter((point) => point.length > 0);

    if (!cleanCategory) {
      toast.warning("Category is required.");
      return;
    }
    if (!cleanServiceName) {
      toast.warning("Service name is required.");
      return;
    }
    if (!cleanDescription) {
      toast.warning("Full description is required.");
      return;
    }
    if (cleanPoints.length === 0) {
      toast.warning("Add at least one price point.");
      return;
    }

    await onSubmit({
      category: cleanCategory,
      name: cleanServiceName,
      description: cleanDescription,
      points: cleanPoints,
      isPremiumIncluded,
    });

    onClose();
  };

  const handleDelete = async () => {
    if (!initialService || !onDelete) return;

    const shouldDelete = window.confirm(
      `Delete service "${getServiceNameText(initialService)}"? This action cannot be undone.`,
    );
    if (!shouldDelete) return;

    await onDelete(initialService);
    onClose();
  };

  if (!isOpen) return null;

  return (
    <div className='fixed inset-0 z-50 flex items-center justify-center bg-black/40'>
      <div className='bg-white rounded-xl border-2 border-[#D1CEC6] w-full max-w-2xl mx-4 shadow-xl'>
        <div className='flex items-center justify-between px-6 py-5 border-b border-[#D1CEC6]'>
          <h2 className='text-2xl font-semibold text-gray-800'>
            {mode === "add" ? "Add" : "Edit"} Service
          </h2>
          <div className='flex items-center gap-2'>
            {mode === "edit" && onDelete && (
              <button
                onClick={() => void handleDelete()}
                disabled={isDeleting}
                className='flex items-center gap-1 px-3 py-1.5 text-sm border border-red-200 text-red-600 rounded-lg hover:bg-red-50 disabled:opacity-60'>
                <FiTrash2 size={16} />
                {isDeleting ? "Deleting..." : "Delete"}
              </button>
            )}
            <button
              onClick={onClose}
              className='text-gray-400 hover:text-gray-600'>
              <FiX size={22} />
            </button>
          </div>
        </div>

        <div className='px-6 py-5 space-y-5'>
          <div>
            <label className='block text-sm text-gray-600 mb-2'>Category</label>
            <select
              value={selectedCategory}
              onChange={(e) => handleCategoryChange(e.target.value)}
              className='w-full border border-[#D1CEC6] rounded-lg px-4 py-2.5 text-sm text-gray-700 placeholder-gray-400 focus:outline-none focus:border-[#4A90B8]'>
              {availableCategories.map((category) => (
                <option key={category} value={category}>
                  {category}
                </option>
              ))}
              <option value={ADD_NEW_CATEGORY_VALUE}>Add New Category</option>
            </select>
            {selectedCategory === ADD_NEW_CATEGORY_VALUE && (
              <input
                type='text'
                value={customCategory}
                onChange={(e) => setCustomCategory(e.target.value)}
                placeholder='Type new category name'
                className='w-full mt-3 border border-[#D1CEC6] rounded-lg px-4 py-2.5 text-sm text-gray-700 placeholder-gray-400 focus:outline-none focus:border-[#4A90B8]'
              />
            )}
          </div>

          <div>
            <label className='block text-sm text-gray-600 mb-2'>
              Service Name
            </label>
            <input
              type='text'
              value={serviceName}
              onChange={(e) => setServiceName(e.target.value)}
              placeholder='Enter service name'
              className='w-full border border-[#D1CEC6] rounded-lg px-4 py-2.5 text-sm text-gray-700 placeholder-gray-400 focus:outline-none focus:border-[#4A90B8]'
            />
          </div>

          <div>
            <label className='block text-sm text-gray-600 mb-2'>
              Full Description
            </label>
            <textarea
              value={fullDescription}
              onChange={(e) => setFullDescription(e.target.value)}
              rows={5}
              placeholder='Enter full service description'
              className='w-full border border-[#D1CEC6] rounded-lg px-4 py-2.5 text-sm text-gray-700 placeholder-gray-400 focus:outline-none focus:border-[#4A90B8]'
            />
          </div>

          <div>
            <div className='mb-2 flex items-center justify-between'>
              <label className='block text-sm text-gray-600'>
                Price Points
              </label>
              <button
                type='button'
                onClick={addPoint}
                disabled={points.length >= MAX_POINTS}
                className='text-sm text-[#5F8E7E] disabled:opacity-40'>
                + Add Price Point
              </button>
            </div>

            <div className='space-y-2'>
              {points.map((point, index) => (
                <div key={index} className='flex gap-2'>
                  <input
                    type='text'
                    value={point}
                    onChange={(e) => updatePoint(index, e.target.value)}
                    placeholder={
                      index === 0
                        ? "2% (Retail Rate for Farrior Premium Member )"
                        : `Price point ${index + 1}`
                    }
                    className='w-full border border-[#D1CEC6] rounded-lg px-4 py-2.5 text-sm text-gray-700 placeholder-gray-400 focus:outline-none focus:border-[#4A90B8]'
                  />
                  <button
                    type='button'
                    onClick={() => removePoint(index)}
                    className='px-3 rounded-lg border border-[#D1CEC6] text-gray-500 hover:bg-gray-50'>
                    <FiX size={16} />
                  </button>
                </div>
              ))}
            </div>
          </div>

          <div className='flex items-center gap-3 border border-[#D1CEC6] rounded-lg px-4 py-3'>
            <label className='flex items-center gap-3 text-sm text-gray-700'>
              <input
                type='checkbox'
                checked={isPremiumIncluded}
                onChange={(e) => setIsPremiumIncluded(e.target.checked)}
                className='h-4 w-4 rounded border-[#D1CEC6] text-[#5F8E7E] focus:ring-[#5F8E7E]'
              />
              Included with Farrior Premium Membership ($0)
            </label>
          </div>
        </div>

        <div className='flex justify-end gap-3 px-6 py-4 border-t border-[#D1CEC6]'>
          <button
            onClick={onClose}
            className='px-5 py-2 rounded-lg border border-[#D1CEC6] text-gray-600 text-sm hover:bg-gray-50'>
            Cancel
          </button>
          <button
            onClick={() => void handleDone()}
            disabled={isSubmitting}
            className='px-5 py-2 rounded-lg bg-[#5F8E7E] text-white text-sm hover:bg-[#4e7a6c] disabled:opacity-60'>
            {isSubmitting ? "Saving..." : "Done"}
          </button>
        </div>
      </div>
    </div>
  );
};

const Page = () => {
  const [modalMode, setModalMode] = useState<"add" | "edit" | null>(null);
  const [selectedService, setSelectedService] =
    useState<IServiceResponse | null>(null);

  const { data, isLoading, isError, error } = useServices();
  const createServiceMutation = useCreateServiceMutation();
  const updateServiceMutation = useUpdateServiceMutation();
  const deleteServiceMutation = useDeleteServiceMutation();

  const services = useMemo(
    () => sortServicesWithinCategory(data?.services ?? []),
    [data],
  );

  const availableCategories = useMemo(() => {
    const categoryMap = new Map<string, string>();

    PREDEFINED_SERVICE_CATEGORIES.forEach((category) => {
      categoryMap.set(category.toLowerCase(), category);
    });

    services.forEach((service) => {
      const category = service.category?.trim();
      if (!category) return;

      const normalizedKey = category.toLowerCase();
      if (!categoryMap.has(normalizedKey)) {
        categoryMap.set(normalizedKey, category);
      }
    });

    const customCategories = Array.from(categoryMap.entries())
      .filter(([key]) => !isPredefinedCategory(key))
      .map(([, value]) => value)
      .sort((a, b) => a.localeCompare(b));

    return [...PREDEFINED_SERVICE_CATEGORIES, ...customCategories];
  }, [services]);

  const groupedServices = useMemo(() => {
    const groups = new Map<string, IServiceResponse[]>();

    services.forEach((service) => {
      const category = service.category?.trim() || "Uncategorized";
      if (!groups.has(category)) {
        groups.set(category, []);
      }
      groups.get(category)?.push(service);
    });

    return Array.from(groups.entries())
      .sort((a, b) => {
        const [categoryA] = a;
        const [categoryB] = b;

        const predefinedIndexA = PREDEFINED_SERVICE_CATEGORIES.findIndex(
          (item) => item.toLowerCase() === categoryA.toLowerCase(),
        );
        const predefinedIndexB = PREDEFINED_SERVICE_CATEGORIES.findIndex(
          (item) => item.toLowerCase() === categoryB.toLowerCase(),
        );

        const rankA =
          predefinedIndexA === -1
            ? PREDEFINED_SERVICE_CATEGORIES.length
            : predefinedIndexA;
        const rankB =
          predefinedIndexB === -1
            ? PREDEFINED_SERVICE_CATEGORIES.length
            : predefinedIndexB;

        if (rankA !== rankB) {
          return rankA - rankB;
        }

        return categoryA.localeCompare(categoryB);
      })
      .map(([category, categoryServices]) => ({
        category,
        services: sortServicesWithinCategory(categoryServices),
      }));
  }, [services]);

  const openAddModal = () => {
    setSelectedService(null);
    setModalMode("add");
  };

  const openEditModal = (service: IServiceResponse) => {
    setSelectedService(service);
    setModalMode("edit");
  };

  const closeModal = () => {
    setModalMode(null);
    setSelectedService(null);
  };

  const handleSubmit = async (payload: ICreateService) => {
    if (modalMode === "edit" && selectedService) {
      const id = selectedService._id || selectedService.id;
      if (!id) {
        toast.warning("Service id is missing.");
        return;
      }

      await updateServiceMutation.mutateAsync({
        id,
        data: payload,
      });
      return;
    }

    await createServiceMutation.mutateAsync(payload);
  };

  const handleDelete = async (service: IServiceResponse) => {
    const id = service._id || service.id;
    if (!id) {
      toast.warning("Service id is missing.");
      return;
    }

    await deleteServiceMutation.mutateAsync(id);
  };

  const isSubmitting =
    createServiceMutation.isPending || updateServiceMutation.isPending;

  return (
    <div className='bg-white rounded-xl border border-[#D1CEC6]'>
      <div className='px-6 py-5'>
        <div className='flex md:flex-row flex-col items-center justify-between border-b border-[#D1CEC6] pb-3'>
          <div className='text-xl md:text-2xl mb-3 md:mb-0 text-center md:text-start'>
            Service Management
          </div>
          <div className='flex flex-row gap-2 '>
            <button
              onClick={openAddModal}
              className='px-6 py-2.5 bg-(--primary) text-base text-white rounded-lg hover:bg-(--primary-hover) transition-colors'>
              + Add Service
            </button>
          </div>
        </div>
      </div>

      <div className='p-6'>
        {isLoading && (
          <div className='text-center py-8'>Loading services...</div>
        )}

        {isError && (
          <div className='text-center py-8 text-red-600'>
            {error instanceof Error
              ? error.message
              : "Failed to load services."}
          </div>
        )}

        {!isLoading && !isError && groupedServices.length === 0 && (
          <div className='text-center py-8 text-gray-600'>
            No services found.
          </div>
        )}

        {!isLoading &&
          !isError &&
          groupedServices.map((group) => (
            <div key={group.category} className='mb-10 last:mb-0'>
              <div className='flex items-center justify-between border-b border-[#E4E1DA] pb-3 mb-5'>
                <h3 className='text-xl md:text-2xl font-semibold text-gray-800'>
                  {group.category}
                </h3>
                <p className='text-sm text-gray-500'>
                  {group.services.length} service
                  {group.services.length > 1 ? "s" : ""}
                </p>
              </div>

              <div className='grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6'>
                {group.services.map((service) => (
                  <div
                    onClick={() => openEditModal(service)}
                    key={service._id || service.id}
                    className='border border-gray-300 rounded-lg p-6 flex flex-col h-full cursor-pointer hover:border-[#5F8E7E] transition-colors'>
                    <h4 className='text-2xl font-medium text-gray-900 mb-2'>
                      {getServiceNameText(service)}
                    </h4>
                    <p className='text-sm text-[#70706C] leading-relaxed mb-4'>
                      {getDescriptionText(service.description)}
                    </p>

                    <div className='mt-auto pt-4'>
                      <ul className='space-y-2'>
                        {getPointsText(service).map((point, index) => (
                          <li
                            key={`${service._id || service.id}-point-${index}`}
                            className='flex items-start gap-2 text-sm text-[#5F5F5F]'>
                            <span className='mt-2 h-2 w-2 rounded-full bg-[#619B7F] shrink-0' />
                            <span>{point}</span>
                          </li>
                        ))}

                        {service.isPremiumIncluded &&
                          !getPointsText(service).some((point) =>
                            /premium|\$0/i.test(point),
                          ) && (
                            <li className='flex items-start gap-2 text-sm text-[#5F5F5F]'>
                              <span className='mt-2 h-2 w-2 rounded-full bg-[#619B7F] shrink-0' />
                              <span>
                                Included with Farrior Premium Membership ($0)
                              </span>
                            </li>
                          )}
                      </ul>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          ))}
      </div>

      {modalMode && (
        <ServiceModal
          isOpen={true}
          onClose={closeModal}
          mode={modalMode}
          initialService={selectedService}
          availableCategories={availableCategories}
          onSubmit={handleSubmit}
          isSubmitting={isSubmitting}
          onDelete={modalMode === "edit" ? handleDelete : undefined}
          isDeleting={deleteServiceMutation.isPending}
        />
      )}
    </div>
  );
};

export default Page;
