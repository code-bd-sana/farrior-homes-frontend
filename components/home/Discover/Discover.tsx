"use client";

import Card from "@/components/shared/Card/Card";
import { Bath, Bed, Square } from "lucide-react";

import properties from "@/lib/propertyData";

const Discover = () => {
  const recentProperties = [...properties]
    .sort(
      (a, b) =>
        new Date(b.createdAt ?? 0).getTime() -
        new Date(a.createdAt ?? 0).getTime(),
    )
    .slice(0, 4);

  return (
    <section className='py-8'>
      <div className='md:mx-12.5 px-6 lg:px-8'>
        <div className='grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6'>
          {recentProperties.map((p) => (
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
    </section>
  );
};

export default Discover;
