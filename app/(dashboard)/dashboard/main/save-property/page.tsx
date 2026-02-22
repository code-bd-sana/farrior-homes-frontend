"use client";

import Card from "@/components/shared/Card/Card";
import { Bath, Bed, Square } from "lucide-react";

import properties from "@/lib/propertyData";

const page = () => {
  return (
    <div>
      <div className='mb-5'>
        <h1 className='text-[36px]'>Save Property</h1>
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
