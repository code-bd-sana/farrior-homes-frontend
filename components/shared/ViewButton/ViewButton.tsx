"use client";

import { useRouter } from "next/navigation";

type ViewButtonProps = {
  label?: string;
  href?: string;
  className?: string;
  icon?: React.ReactNode;
};

export default function ViewButton({
  label = "",
  href = "",
  className = "",
  icon,
}: ViewButtonProps) {
  const router = useRouter();
  return (
    <div>
      <button
        type='button'
        onClick={() => router.push(href)}
        className={` px-6 py-3 bg-(--primary) text-xl text-white rounded-lg hover:bg-(--primary-hover) transition-colors duration-300 cursor-pointer  ${className}`}>
        {icon && (
          <span className='mr-2 '>
            {icon}
          </span>
        )}
        {label}
      </button>
    </div>
  );
}
