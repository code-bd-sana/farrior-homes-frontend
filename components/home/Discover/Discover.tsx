"use client";

import Card from "@/components/shared/Card/Card";
import { Bath, Bed, Square } from "lucide-react";

const sampleProperties = [
  {
    id: 1,
    imageUrl: "/property.png",
    title: "Cozy 3BR in Oak Lawn",
    address: "123 Main St, Oak Lawn",
    beds: 3,
    baths: 2,
    sqft: 1850,
    icon: Bed,
    price: 350000,
    date: "Aug 15, 2024",
  },
  {
    id: 2,
    imageUrl: "/property.png",
    title: "Modern Condo near Downtown",
    address: "45 River Rd, Chicago",
    beds: 2,
    baths: 2,
    sqft: 1100,
    icon: Bath,
    price: 275000,
    date: "Aug 10, 2024",
  },
  {
    id: 3,
    imageUrl: "/property.png",
    title: "Spacious Family Home",
    address: "78 Park Ave, Suburbia",
    beds: 4,
    baths: 3,
    sqft: 2600,
    icon: Square,
    price: 520000,
    date: "Aug 5, 2024",
  },
  {
    id: 4,
    imageUrl: "/property.png",
    title: "Luxury Waterfront Villa",
    address: "100 Lakeview Dr, Lakeside",
    beds: 5,
    baths: 4,
    sqft: 2600,
    price: 520000,
    date: "Aug 1, 2024",
  },
];

const Discover = () => {
  return (
    <section className='py-8'>
      <div className='md:mx-12.5 px-6 lg:px-8'>
        <div className='grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-x-6'>
          {sampleProperties.map((p) => (
            <Card
              id={p.id}
              key={p.id}
              imageUrl={p.imageUrl}
              badge='For Sale'
              title={p.title}
              subtitle={p.address}
              meta={[
                { label: "Beds", value: p.beds, icon: Bed },
                { label: "Baths", value: p.baths, icon: Bath },
                { label: "Sqft", value: p.sqft.toLocaleString(), icon: Square },
              ]}
              // date={p.date}
              // dateIcon={Calendar}
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
