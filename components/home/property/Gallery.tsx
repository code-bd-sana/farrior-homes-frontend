"use client";

import Image from "next/image";
import { useState } from "react";

type Props = {
  images: string[];
};

export default function Gallery({ images }: Props) {
  const [selected, setSelected] = useState(0);

  if (!images || images.length === 0) return null;

  return (
    <div className='w-full'>
      <div className='relative w-full h-96 md:h-125 rounded-lg overflow-hidden'>
        <Image
          src={images[selected]}
          alt={`Image ${selected + 1}`}
          fill
          sizes='(max-width: 768px) 100vw, 50vw'
          className='object-cover w-full h-full'
          priority={true}
        />
      </div>

      <div className='mt-3 flex gap-2 overflow-x-auto'>
        {images.map((src, idx) => (
          <button
            key={src + idx}
            onClick={() => setSelected(idx)}
            className={`shrink-0 w-20 h-14 md:w-28 md:h-20 rounded-md overflow-hidden border-2 ${
              idx === selected ? "border-(--primary)" : "border-transparent"
            }`}
            aria-label={`View image ${idx + 1}`}>
            <Image
              src={src}
              alt={`Thumb ${idx + 1}`}
              width={280}
              height={180}
              className='object-cover w-full h-full'
            />
          </button>
        ))}
      </div>
    </div>
  );
}
