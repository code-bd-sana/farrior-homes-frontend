"use client";

import { useRouter } from "next/navigation";

type ViewButtonProps = {
  label?: string;
  href?: string;
  className?: string;
};

export default function ViewButton({
  label = "View Properties",
  href = "/properties",
  className = "",
}: ViewButtonProps) {
  const router = useRouter();
  return (
    <div>
      <button
        type='button'
        onClick={() => router.push(href)}
        className={`mt-3 px-6 py-3 bg-(--primary) text-xl text-white rounded-lg hover:bg-(--primary-hover) transition-colors duration-300 cursor-pointer ${className}`}>
        {label}
      </button>
    </div>
  );
}
