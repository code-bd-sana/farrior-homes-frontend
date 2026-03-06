"use client";


import { useSubscriptionMutations } from "@/actions/hooks/subscripiton.hooks";
import React from "react";

interface SubscriptionButtonProps {
  status: "active" | "inactive";
  text: string;
}

const SubscriptionButton: React.FC<SubscriptionButtonProps> = ({
  status,
  text,
}) => {
  const { createMutation, isLoading, isError, error } = useSubscriptionMutations();
  console.log(isLoading, error, 'hlw');

  const handleClick = () => {
   const resp = createMutation.mutate();

  };

  return (
    <div className="w-full">
      <button
        onClick={handleClick}
        disabled={createMutation.isPending}
        className={`w-full mt-4 px-6 py-2 text-xl border border-[#D1CEC6] rounded-md transition-colors duration-200
        ${
          status === "active"
            ? "bg-white text-[#0F3B2A] hover:bg-[#0F3B2A] hover:text-white"
            : "bg-[#0F3B2A] hover:bg-[#226142] text-white"
        }
        ${
          createMutation.isPending
            ? "cursor-not-allowed opacity-70"
            : "cursor-pointer"
        }
        `}
      >
        {isLoading? "Processing..." : text}
      </button>

      {/* Error Message */}
      {createMutation.isError && (
        <p className="text-red-500 text-sm mt-2" role="alert">
          {createMutation.error instanceof Error
            &&  createMutation.error.message  === 'Unauthorized' ? "Please Login First"
            : createMutation.error.message || 'Something went wrong!'}
        </p>
      )}
    </div>
  );
};

export default SubscriptionButton;