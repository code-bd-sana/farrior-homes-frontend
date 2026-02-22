"use client";

import Card from "@/components/shared/Card/Card";
import { Bath, Bed, Plus, Square } from "lucide-react";

import properties from "@/lib/propertyData";
import Link from "next/link";

const page = () => {
  return (
    <div>
      <div className='flex justify-between mb-5'>
        <h1 className='text-[36px]'>Own Property</h1>
        <Link href='/dashboard/main/add-property'>
          <button className='flex justify-center items-center text-white w-[154px] h-[36px] p-2 rounded-sm cursor-pointer bg-[#619B7F]'>
            <Plus size={16} /> Add Property
          </button>
        </Link>
      </div>

      <div>
        <div className='grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6'>
          {properties.map((p) => (
            <Card
              id={p.id}
              key={p.id}
              imageUrl={p.images?.[0] ?? "/property.png"}
              badge={p.status ?? "For Sale"}
              title={p.title}
              subtitle={p.address}
              meta={[
                { label: "Beds", value: p.bedrooms, icon: Bed },
                { label: "Baths", value: p.bathrooms, icon: Bath },
                {
                  label: "Sqft",
                  value: p.sqft?.toLocaleString(),
                  icon: Square,
                },
              ]}
              price={p.price}
              type={"property"}
              primaryActionLabel='View Details'
            />
          ))}
        </div>
      </div>
    </div>
  );
};

export default page;
