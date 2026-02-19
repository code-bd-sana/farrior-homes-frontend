"use client";
import PropertyFilter from "@/components/home/property/PropertyFilter";
import Card from "@/components/shared/Card/Card";
import properties from "@/lib/propertyData";
import { Bath, Bed, Square } from "lucide-react";
export default function Properties() {
  return (
    <div className='flex justify-center m-5 gap-6'>
      {/* Sidebar Filter Section */}
      <div>
        <PropertyFilter />
      </div>
      {/* Properties Grid Section */}
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
}
