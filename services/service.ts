import axiosClient from "@/lib/axiosClient";
import { AxiosError } from "axios";

// API request and response types for Service entity

export interface ICreateService {
  title: string;
  subTitle: string;
  moreSubTitle?: string;
  description: Array<{
    id?: string;
    text: string;
  }>;
}

// API response type for a single service

export interface IServiceDescriptionItem {
  id?: string;
  text: string;
  createdAt?: string;
  updatedAt?: string;
}

export interface IServiceResponse {
  _id?: string;
  id?: string;
  title: string;
  subTitle: string;
  moreSubTitle?: string;
  description: IServiceDescriptionItem[];
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

type DescriptionInput =
  | string
  | IServiceDescriptionItem
  | ICreateService["description"][number];

type ServiceFormInput = {
  title?: string;
  subTitle?: string;
  moreSubTitle?: string;
  description?: DescriptionInput[];
};

export const toFormData = (data: ServiceFormInput): FormData => {
  const formData = new FormData();

  if (typeof data.title === "string") {
    formData.append("title", data.title);
  }
  if (typeof data.subTitle === "string") {
    formData.append("subTitle", data.subTitle);
  }
  if (typeof data.moreSubTitle === "string") {
    formData.append("moreSubTitle", data.moreSubTitle);
  }

  if (Array.isArray(data.description)) {
    data.description.forEach((desc, index) => {
      const text = typeof desc === "string" ? desc : desc?.text;
      if (typeof text === "string" && text.trim().length > 0) {
        formData.append(`description[${index}][text]`, text.trim());

        if (typeof desc === "object" && desc?.id) {
          formData.append(`description[${index}][id]`, desc.id);
        }
      }
    });
  }

  return formData;
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
    const response = await axiosClient.post<ApiResponse<IServiceResponse>>(
      "/service/create",
      serviceData,
    );
    return response.data.data;
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
    return response.data.data;
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
    const response =
      await axiosClient.get<
        ApiResponse<{
          services: IServiceResponse[];
          pagination: ServicePagination;
        }>
      >("/service/many");
    return response.data.data;
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
  serviceData: Partial<ICreateService | IServiceResponse>,
): Promise<IServiceResponse> {
  try {
    const payload = {
      title: serviceData.title,
      subTitle: serviceData.subTitle,
      moreSubTitle: serviceData.moreSubTitle,
      description: Array.isArray(serviceData.description)
        ? (serviceData.description as DescriptionInput[])
        : undefined,
    };

    const response = await axiosClient.patch<ApiResponse<IServiceResponse>>(
      `/service/${id}`,
      payload,
    );

    return response.data.data;
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
