"use client";

import Title from "../../shared/Title/Title";
import Discover from "./Discover";
import ViewButton from "../../shared/ViewButton/ViewButton";

export default function DiscoverProperties() {
  return (
    <div className='text-(--primary-text-color) flex flex-col items-center justify-center text-center my-12 px-2 md:px-0'>
      <Title
        title={"Discover Your Dream Home"}
        subtitle={
          "Browse our hand picked selection of premium properties in the most desirable locations."
        }
        titleClass={"max-w-210 text-3xl md:text-[48px] font-bold"}
        subtitleClass={
          "text-lg! max-w-150 md:text-[24px] mb-6 md:mb-7 max-w-3xl mt-3.25"
        }
      />
      <Discover />

      <ViewButton label='View Properties' href='/properties' />
    </div>
  );
}
