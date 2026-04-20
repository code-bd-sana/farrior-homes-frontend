import axiosClient from "@/lib/axiosClient";
import { AxiosError } from "axios";

export const PREDEFINED_SERVICE_CATEGORIES = [
  "Full Service",
  "Investor & Unrepresented Seller Services",
  "Consultations",
  "Rental Services",
  "Residential BPO Services",
  "Commercial BPO Services",
  "Comparative Market Analysis",
] as const;

export interface ICreateService {
  category: string;
  name: string;
  description: string;
  points: string[];
  isPremiumIncluded: boolean;
}

export interface IServiceResponse extends ICreateService {
  _id?: string;
  id?: string;
  // Legacy fields kept optional so old records can still be rendered safely.
  price?: string;
  createdAt: string;
  updatedAt: string;
}

// Pagination metadata from backend
export interface ServicePagination {
  page: number;
  limit: number;
  total: number;
  totalPages: number;
  count?: number;
  hasNextPage?: boolean;
  hasPrevPage?: boolean;
  search?: string;
}

// API response for paginated services

export interface PaginatedServicesResponse {
  services: IServiceResponse[];
  pagination: ServicePagination;
}

// Generic API response type
export interface ApiResponse<T> {
  success: boolean;
  message: string;
  data: T;
}

// API error response type
export interface ApiErrorResponse {
  message?: string;
  success?: boolean;
  errors?: unknown;
}

const formatErrorMessage = (value: unknown): string => {
  if (typeof value === "string") return value;

  if (Array.isArray(value)) {
    return value.map((item) => formatErrorMessage(item)).join(", ");
  }

  if (typeof value === "object" && value !== null) {
    const record = value as Record<string, unknown>;
    const message = record.message ?? record.msg;

    if (typeof message === "string") {
      return message;
    }

    try {
      return JSON.stringify(value);
    } catch {
      return String(value);
    }
  }

  return String(value);
};

const parseValidationErrors = (errors: unknown): string => {
  if (Array.isArray(errors)) {
    return errors
      .map((error, index) => `${index}: ${formatErrorMessage(error)}`)
      .join("; ");
  }

  if (typeof errors === "object" && errors !== null) {
    return Object.entries(errors as Record<string, unknown>)
      .map(([field, messages]) => `${field}: ${formatErrorMessage(messages)}`)
      .join("; ");
  }

  return formatErrorMessage(errors);
};

type ServicePayloadInput = Partial<ICreateService | IServiceResponse>;

const normalizeServicePayload = (
  data: ServicePayloadInput,
): Partial<ICreateService> => {
  const payload: Partial<ICreateService> = {};

  if (typeof data.category === "string") {
    payload.category = data.category.trim();
  }
  if (typeof data.name === "string") {
    payload.name = data.name.trim();
  }
  if (typeof data.description === "string") {
    payload.description = data.description.trim();
  }
  if (Array.isArray(data.points)) {
    payload.points = data.points
      .filter((item): item is string => typeof item === "string")
      .map((item) => item.trim())
      .filter((item) => item.length > 0);
  }
  if (typeof data.isPremiumIncluded === "boolean") {
    payload.isPremiumIncluded = data.isPremiumIncluded;
  }

  return payload;
};

const normalizeDescriptionValue = (value: unknown): string => {
  if (typeof value === "string") {
    return value.trim();
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

const normalizePointsValue = (value: unknown): string[] => {
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

const normalizeServiceResponse = (service: unknown): IServiceResponse => {
  const raw = (service ?? {}) as Record<string, unknown>;

  const category =
    typeof raw.category === "string" && raw.category.trim().length > 0
      ? raw.category.trim()
      : PREDEFINED_SERVICE_CATEGORIES[0];

  const name =
    typeof raw.name === "string" && raw.name.trim().length > 0
      ? raw.name.trim()
      : typeof raw.title === "string" && raw.title.trim().length > 0
        ? raw.title.trim()
        : "Untitled Service";

  const descriptionFromLegacy =
    typeof raw.subTitle === "string" ? raw.subTitle.trim() : "";

  const pointsFromRaw = normalizePointsValue(raw.points);
  const pointsFromLegacyDescription = Array.isArray(raw.description)
    ? normalizePointsValue(raw.description)
    : [];
  const pointsFromPrice = normalizePointsValue(raw.price);

  const points =
    pointsFromRaw.length > 0
      ? pointsFromRaw
      : pointsFromLegacyDescription.length > 0
        ? pointsFromLegacyDescription
        : pointsFromPrice;

  const description =
    (typeof raw.description === "string"
      ? normalizeDescriptionValue(raw.description)
      : "") || descriptionFromLegacy;

  const legacyPrice =
    typeof raw.price === "string" && raw.price.trim().length > 0
      ? raw.price.trim()
      : undefined;

  return {
    _id: typeof raw._id === "string" ? raw._id : undefined,
    id: typeof raw.id === "string" ? raw.id : undefined,
    category,
    name,
    description,
    points,
    isPremiumIncluded:
      typeof raw.isPremiumIncluded === "boolean"
        ? raw.isPremiumIncluded
        : false,
    price: legacyPrice,
    createdAt: typeof raw.createdAt === "string" ? raw.createdAt : "",
    updatedAt: typeof raw.updatedAt === "string" ? raw.updatedAt : "",
  };
};

/**
 * Create a new service by sending a POST request to the backend API with proper error handling and logging.
 *
 * @param serviceData - The data for the new service to be created.
 * @returns The created service data from the API response.
 * @throws An error if the request fails, with detailed logging of the error response.
 */

export async function createService(
  serviceData: ICreateService,
): Promise<IServiceResponse> {
  try {
    const payload = normalizeServicePayload(serviceData) as ICreateService;

    const response = await axiosClient.post<ApiResponse<IServiceResponse>>(
      "/service/create",
      {
        ...payload,
        points: payload.points ?? [],
        isPremiumIncluded: payload.isPremiumIncluded ?? false,
      },
    );
    return normalizeServiceResponse(response.data.data);
  } catch (error) {
    const axiosError = error as AxiosError<ApiErrorResponse>;
    const errorData = axiosError.response?.data as ApiErrorResponse | undefined;

    console.warn("Create service error:", {
      message: axiosError.message,
      response: errorData,
      status: axiosError.response?.status,
    });

    // handle validation errors from the API if available
    if (errorData?.errors) {
      const validationErrors = parseValidationErrors(errorData.errors);
      throw new Error(`Validation failed: ${validationErrors}`);
    }

    // handle http errors with message from API or fallback to generic message
    if (axiosError.response?.status === 401) {
      throw new Error(
        errorData?.message ||
          "Unauthorized. Please log in to create a service.",
      );
    }
    if (axiosError.response?.status === 403) {
      throw new Error(
        errorData?.message ||
          "Forbidden. You do not have permission to create a service.",
      );
    }
    if (axiosError.response?.status === 500) {
      throw new Error(
        errorData?.message || "Server error. Please try again later.",
      );
    }
    if (axiosError.response?.status === 400) {
      throw new Error(
        errorData?.message ||
          "Bad request. Please check your input and try again.",
      );
    }

    throw new Error(
      errorData?.message || axiosError.message || "Failed to create service.",
    );
  }
}

/**
 * Get service by Id with proper error handling and logging
 *
 * @param id - The ID of the service to retrieve
 * @returns The service data from the API response
 * @throws An error if the request fails, with detailed logging of the error response
 */

export async function getServiceById(id: string): Promise<IServiceResponse> {
  try {
    const response = await axiosClient.get<ApiResponse<IServiceResponse>>(
      `/service/${id}`,
    );
    return normalizeServiceResponse(response.data.data);
  } catch (error) {
    const axiosError = error as AxiosError<ApiErrorResponse>;
    const errorData = axiosError.response?.data as ApiErrorResponse | undefined;
    console.warn("Get service by ID error:", {
      message: axiosError.message,
      response: errorData,
      status: axiosError.response?.status,
    });
    throw new Error(
      errorData?.message || axiosError.message || "Failed to get service.",
    );
  }
}

/**
 * Get All services with proper error handling and logging
 *
 * @returns The array of services data from the API response
 * @throws An error if the request fails, with detailed logging of the error response
 */

export async function getAllServices(): Promise<PaginatedServicesResponse> {
  try {
    const response = await axiosClient.get<
      ApiResponse<{
        services: IServiceResponse[];
        pagination: ServicePagination;
      }>
    >("/service/many", {
      params: {
        page: 1,
        limit: 100,
      },
    });

    const normalizedServices = Array.isArray(response.data.data?.services)
      ? response.data.data.services.map((service) =>
          normalizeServiceResponse(service),
        )
      : [];

    return {
      ...response.data.data,
      services: normalizedServices,
    };
  } catch (error) {
    const axiosError = error as AxiosError<ApiErrorResponse>;
    const errorData = axiosError.response?.data as ApiErrorResponse | undefined;
    console.warn("Get all services error:", {
      message: axiosError.message,
      response: errorData,
      status: axiosError.response?.status,
    });
    throw new Error(
      errorData?.message || axiosError.message || "Failed to get services.",
    );
  }
}

/**
 * Update service by Id with proper error handling and logging
 *
 * @param id - The ID of the service to update
 * @param serviceData - The updated data for the service
 * @returns The updated service data from the API response
 * @throws An error if the request fails, with detailed logging of the error response
 */
export async function updateServiceById(
  id: string,
  serviceData: Partial<ICreateService>,
): Promise<IServiceResponse> {
  try {
    const payload = normalizeServicePayload(serviceData);

    const response = await axiosClient.patch<ApiResponse<IServiceResponse>>(
      `/service/${id}`,
      payload,
    );

    return normalizeServiceResponse(response.data.data);
  } catch (error) {
    const axiosError = error as AxiosError<ApiErrorResponse>;
    const errorData = axiosError.response?.data as ApiErrorResponse | undefined;
    console.warn("Update service error:", {
      message: axiosError.message,
      response: errorData,
      status: axiosError.response?.status,
    });
    throw new Error(
      errorData?.message || axiosError.message || "Failed to update service.",
    );
  }
}

/**
 * Delete service by Id with proper error handling and logging
 *
 * @param id - The ID of the service to delete
 * @returns A success message from the API response
 * @throws An error if the request fails, with detailed logging of the error response
 */
export async function deleteServiceById(id: string): Promise<string> {
  try {
    const response = await axiosClient.delete<ApiResponse<null>>(
      `/service/${id}`,
    );
    return response.data.message;
  } catch (error) {
    const axiosError = error as AxiosError<ApiErrorResponse>;
    const errorData = axiosError.response?.data as ApiErrorResponse | undefined;
    console.warn("Delete service error:", {
      message: axiosError.message,
      response: errorData,
      status: axiosError.response?.status,
    });
    throw new Error(
      errorData?.message || axiosError.message || "Failed to delete service.",
    );
  }
}
