import { Property } from "@/types/properties";

const properties: Property[] = [
  {
    id: 1,
    title: "Cozy 3BR in Oak Lawn",
    price: 350000,
    bedrooms: 3,
    bathrooms: 2,
    sqft: 1850,
    area: "1,850 sqft",
    address: "Middle Badda, Dhaka, Bangladesh",
    description:
      "A beautifully maintained home with open-plan living, modern kitchen, and a private backyard. Ideal for families looking for comfort and convenience.",
    images: ["/property.png", "/banner.png", "/property.png", "/banner.png"],
    propertyType: "Single Family",
    overview:
      "Well-appointed single family home in a quiet neighborhood, close to schools and parks. Open living spaces and a large backyard make this an ideal family home.",
    keyFeatures: [
      "3 Bedrooms",
      "2 Bathrooms",
      "Large Backyard",
      "2-Car Garage",
      "Central heating",
    ],
    features: ["Central heating", "2-car garage", "Large backyard"],
    lat: 41.7617,
    lng: -87.6756,
    yearBuilt: 1998,
    lot: "0.18 Acres",
    status: "For Sale",
    interior:
      "Open plan living with updated kitchen and hardwood floors throughout.",
    exterior: "Private fenced backyard with patio and mature landscaping.",
    financial: {
      taxes: "~$4,200/year",
      hoa: "$350/month (landscaping, security, community pool)",
      lastSold: "2018 ($320,000)",
    },
    contact: {
      name: "Sarah Agent",
      company: "Oak Realty",
      email: "sarah@oakrealty.com",
      phone: "(555) 123-4567",
    },
  },
  {
    id: 2,
    title: "Modern Condo near Downtown",
    price: 275000,
    bedrooms: 2,
    bathrooms: 2,
    sqft: 1100,
    area: "1,100 sqft",
    address: "45 River Rd, Chicago",
    description:
      "Contemporary condo with rooftop access and great city views. Low maintenance living close to transit and amenities.",
    images: ["/property.png", "/property.png"],
    propertyType: "Condo",
    overview:
      "City-side condo with modern finishes and convenient transit access.",
    keyFeatures: ["2 Bedrooms", "2 Bathrooms", "Rooftop Access", "Gym"],
    features: ["Rooftop access", "Gym", "Secure entry"],
    lat: 41.8781,
    lng: -87.6298,
    yearBuilt: 2012,
    lot: "N/A",
    status: "For Sale",
    interior:
      "Open concept living with floor-to-ceiling windows and modern kitchen.",
    exterior: "Secure building with rooftop terrace and city views.",
    financial: {
      taxes: "~$3,100/year",
      hoa: "$250/month",
      lastSold: "2019 ($240,000)",
    },
    contact: {
      name: "Downtown Realty",
      company: "City Brokers",
      email: "info@citybrokers.com",
      phone: "(555) 987-6543",
    },
  },
  {
    id: 3,
    title: "Spacious Family Home",
    price: 520000,
    bedrooms: 4,
    bathrooms: 3,
    sqft: 2600,
    area: "2,600 sqft",
    address: "78 Park Ave, Suburbia",
    description:
      "Large family home with updated kitchen, finished basement and an expansive garden. Great school district.",
    images: ["/property.png", "/property.png", "/property.png"],
    propertyType: "Family Home",
    overview:
      "Generous living spaces and updated amenities make this home ideal for growing families.",
    keyFeatures: [
      "4 Bedrooms",
      "3 Bathrooms",
      "Finished Basement",
      "Large Lot",
    ],
    features: ["Finished basement", "Updated kitchen", "Close to schools"],
    lat: 41.9,
    lng: -87.7,
    yearBuilt: 2005,
    lot: "0.4 Acres",
    status: "For Sale",
    interior: "Spacious kitchen with island, family room and formal dining.",
    exterior: "Large yard with deck and garden space.",
    financial: {
      taxes: "~$5,800/year",
      hoa: "$0",
      lastSold: "2016 ($430,000)",
    },
    contact: {
      name: "Family Homes Co.",
      company: "Suburb Realty",
      email: "hello@suburbrealty.com",
      phone: "(555) 222-3333",
    },
  },
  {
    id: 4,
    title: "Modern Luxury Villa",
    price: 1649999,
    bedrooms: 5,
    bathrooms: 3,
    sqft: 5000,
    area: "5,000 sqft",
    address: "2715 Ash Dr, San Jose, CA 95125",
    description:
      "A stunning modern villa in prestigious Ash Drive, featuring clean lines, premium finishes, and an open-concept layout. Perfect blend of luxury and comfort with smart home features and resort-style outdoor living.",
    images: [
      "/property.png",
      "/property.png",
      "/property.png",
      "/property.png",
    ],
    lat: 37.3352,
    lng: -121.8811,
    propertyType: "Luxury Villa",
    yearBuilt: 2019,
    lot: "0.5 Acres",
    status: "For Sale",
    overview:
      "A stunning modern villa in prestigious Ash Drive, featuring clean lines, premium finishes, and an open-concept layout.",
    keyFeatures: [
      "5 Bedrooms",
      "3 Baths",
      "Gourmet Kitchen",
      "Smart Home System",
      "Heated floors",
      "3-Car Garage with EV charging",
      "Solar panels",
    ],
    features: [
      "Gourmet Kitchen with quartz counters & wine fridge",
      "Master Suite with spa bathroom & walk-in closet",
      "Smart Home System & heated floors",
      "3-Car Garage with EV charging",
      "Solar panels",
    ],
    interior:
      "Open great room with floor-to-ceiling windows. Chef's kitchen with island seating. Luxurious master suite includes sitting area.",
    exterior:
      "Landscaped yard with saltwater infinity pool, built-in BBQ, fire pit, and seating areas. Fully fenced with mature trees for privacy.",
    financial: {
      taxes: "~$18,500/year",
      hoa: "$350/month",
      lastSold: "2020 ($1,350,000)",
    },
    contact: {
      name: "Michael Farrior",
      company: "Farrior Homes",
      email: "michaelfarrior@farriorthomes.com",
      phone: "(708) 953-1795",
    },
  },
];

export function getAllProperties() {
  return properties;
}

export function getPropertyById(id: number) {
  return properties.find((p) => p.id === id) ?? null;
}

export default properties;
