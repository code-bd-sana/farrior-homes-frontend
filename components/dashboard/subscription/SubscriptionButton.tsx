'use client'
import { useSubscriptionMutations } from '@/actions/hooks/subscripiton.hooks';
import React from 'react';

interface SubscriptionButtonProps {
  status: 'active' | 'inactive';
  text: string;
}

const SubscriptionButton: React.FC<SubscriptionButtonProps> = ({ status, text }) => {
  const { createMutation } = useSubscriptionMutations(); 

  const handleClick = () => {
  
      const resp =createMutation.mutate(); // send plan as payload
 
      console.log(resp, 'Subscription');
  
  };

  return (
    <button
      onClick={handleClick}
      className={`w-full mt-4 px-6 py-2 text-xl border border-[#D1CEC6] cursor-pointer rounded-md ${
        status === "active"
          ? "bg-white text-(--primary) hover:bg-(--primary) hover:text-white"
          : "bg-(--primary) hover:bg-[#226142] text-white"
      } transition-colors duration-200`}
    >
      {text}
    </button>
  );
};

export default SubscriptionButton;