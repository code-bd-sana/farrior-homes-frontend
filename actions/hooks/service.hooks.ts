"use client";

import {
  useQuery,
  useMutation,
  useQueryClient,
  UseQueryOptions,
  UseMutationOptions,
} from "@tanstack/react-query";
import {
  createService,
  getServiceById,
  updateServiceById,
  deleteServiceById,
  getAllServices,
  ICreateService,
  IServiceResponse,
  PaginatedServicesResponse,
} from "@/services/service";

// Query keys for react-query
export const serviceKeys = {
  all: ["services"] as const,
  lists: () => [...serviceKeys.all, "list"] as const,
  list: (filters?: string) => [...serviceKeys.lists(), filters] as const,
  details: () => [...serviceKeys.all, "detail"] as const,
  detail: (id: string) => [...serviceKeys.details(), id] as const,
};

// =========================
// QUERIES (public)
// =========================

export const useServices = (
  options?: Omit<
    UseQueryOptions<PaginatedServicesResponse>,
    "queryKey" | "queryFn"
  >,
) =>
  useQuery<PaginatedServicesResponse>({
    queryKey: serviceKeys.lists(),
    queryFn: async () => {
      const res = await getAllServices();
      return res;
    },
    staleTime: 1000 * 60 * 5, // 5 minutes
    ...options,
  });

export const useGetServiceById = (id?: string) =>
  useQuery<IServiceResponse, Error>({
    queryKey: ["service", id],
    queryFn: async () => {
      if (!id) {
        throw new Error("No service id provided");
      }
      const res = await getServiceById(id);
      return res;
    },
    enabled: !!id,
    staleTime: 60 * 1000,
    retry: 1,
  });

// =========================
// ADMIN QUERIES (if needed)
// =========================
// Add admin-specific queries if you have paginated/admin endpoints

// =========================
// MUTATIONS (admin only)
// =========================

export const useCreateServiceMutation = (
  options?: UseMutationOptions<IServiceResponse, Error, ICreateService>,
) => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: createService,
    onSuccess: (data, variables, context, mutation) => {
      queryClient.invalidateQueries({ queryKey: serviceKeys.lists() });
      if (options?.onSuccess)
        options.onSuccess(data, variables, context, mutation);
    },
    onError: (error, variables, context, mutation) => {
      if (options?.onError)
        options.onError(error, variables, context, mutation);
    },
    ...options,
  });
};

export const useUpdateServiceMutation = (
  options?: UseMutationOptions<
    IServiceResponse,
    Error,
    { id: string; data: Partial<ICreateService> }
  >,
) => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async ({ id, data }) => {
      const res = await updateServiceById(id, data);
      return res;
    },
    onSuccess: (data, variables, context, mutation) => {
      queryClient.invalidateQueries({
        queryKey: serviceKeys.detail(variables.id),
      });
      queryClient.invalidateQueries({ queryKey: serviceKeys.lists() });
      if (options?.onSuccess)
        options.onSuccess(data, variables, context, mutation);
    },
    onError: (error, variables, context, mutation) => {
      if (options?.onError)
        options.onError(error, variables, context, mutation);
    },
    ...options,
  });
};

export const useDeleteServiceMutation = (
  options?: UseMutationOptions<string, Error, string>,
) => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async (id: string) => {
      const res = await deleteServiceById(id);
      return res;
    },
    onSuccess: (data, id, context, mutation) => {
      queryClient.invalidateQueries({ queryKey: serviceKeys.lists() });
      queryClient.removeQueries({ queryKey: serviceKeys.detail(id) });
      if (options?.onSuccess) options.onSuccess(data, id, context, mutation);
    },
    onError: (error, variables, context, mutation) => {
      if (options?.onError)
        options.onError(error, variables, context, mutation);
    },
    ...options,
  });
};

// =============
// COMBINED HOOK
// =============

export const useService = () => {
  const queryClient = useQueryClient();

  const servicesQuery = useServices();
  const createMutation = useCreateServiceMutation();
  const updateMutation = useUpdateServiceMutation();
  const deleteMutation = useDeleteServiceMutation();

  return {
    // Queries
    services: servicesQuery.data,
    isLoading: servicesQuery.isLoading,
    isError: servicesQuery.isError,
    error: servicesQuery.error,

    // Mutations (admin only)
    create: createMutation,
    update: updateMutation,
    delete: deleteMutation,

    // Utilities
    refetchAll: () =>
      queryClient.invalidateQueries({ queryKey: serviceKeys.all }),
    clearCache: () => queryClient.removeQueries({ queryKey: serviceKeys.all }),

    // Individual query/mutation states
    queries: {
      services: servicesQuery,
    },
    mutations: {
      create: createMutation,
      update: updateMutation,
      delete: deleteMutation,
    },
  };
};
