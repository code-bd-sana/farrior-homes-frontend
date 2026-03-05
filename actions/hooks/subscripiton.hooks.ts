"use client";

import { CreateSubscripiton } from "@/services/subscription";
import { useMutation, useQueryClient } from "@tanstack/react-query";

export const useSubscriptionMutations = () => {
  const queryClient = useQueryClient();

  // Create / Subscribe
  const createMutation = useMutation({
    mutationFn: CreateSubscripiton,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["subscriptions"] });
    },
  });


  return { createMutation };
};
