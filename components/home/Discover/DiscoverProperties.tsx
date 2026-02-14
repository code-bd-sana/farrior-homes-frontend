"use client";

import { useRouter } from "next/navigation";
import Title from "../../shared/Title/Title";
import Discover from "./Discover";

export default function DiscoverProperties() {
  const router = useRouter();
  return (
    <div className='text-(--primary-text-color) flex flex-col items-center justify-center text-center my-12'>
      <Title
        title={"Discover Your Dream Home"}
        subtitle={
          "Browse our hand picked selection of premium properties in the most desirable locations."
        }
        titleClass={"max-w-210 text-4xl md:text-[48px] font-bold"}
        subtitleClass={
          "text-lg max-w-150 text-xl md:text-[24px] mb-6 md:mb-7 max-w-3xl mt-3.25"
        }
      />
      <Discover />

      {/* View Properties button, redirect to properties page */}
      <button
        type='button'
        onClick={() => router.push("/properties")}
        className='mt-3 px-6 py-3 bg-(--primary) text-xl text-white rounded-lg hover:bg-(--primary-hover) transition-colors duration-300 cursor-pointer'>
        View Properties
      </button>
    </div>
  );
}
