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
    createdAt: "2025-01-05",
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
    createdAt: "2025-01-15",
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
    createdAt: "2025-02-05",
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
    propertyType: "Family Home",
    yearBuilt: 2019,
    lot: "0.5 Acres",
    status: "For Sale",
    createdAt: "2025-02-08",
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
  {
    id: 5,
    title: "Seaside Luxury Retreat",
    price: 3800000,
    bedrooms: 6,
    bathrooms: 4,
    sqft: 8000,
    area: "8,000 sqft",
    address: "204 Sea View Rd, Malibu, CA 90265",
    description:
      "A grand oceanfront estate with panoramic sea views, expansive living spaces, and luxurious finishes. A perfect retreat for those seeking both comfort and exclusivity.",
    images: [
      "/property.png",
      "/property.png",
      "/property.png",
      "/property.png",
    ],
    propertyType: "Luxury Estate",
    yearBuilt: 2022,
    lot: "1.2 Acres",
    status: "For Sale",
    overview:
      "Luxury oceanfront estate offering breathtaking views, premium finishes, and ample living space.",
    keyFeatures: [
      "6 Bedrooms",
      "4 Baths",
      "Infinity Pool",
      "Home Theater",
      "Private Beach Access",
    ],
    features: [
      "Panoramic Ocean Views",
      "Chef’s Kitchen with Sub-Zero Appliances",
      "Master Suite with Ocean Views",
      "Private Beach Access",
    ],
    interior:
      "Open-concept living with large windows offering stunning views, hardwood floors, and high-end finishes.",
    exterior:
      "Landscaped grounds with a saltwater infinity pool, outdoor kitchen, and private beach access.",
    financial: {
      taxes: "~$45,000/year",
      hoa: "$600/month",
      lastSold: "2022 ($3,100,000)",
    },
    contact: {
      name: "Lisa Roberts",
      company: "Oceanfront Realty",
      email: "lisa@oceanfrontrealty.com",
      phone: "(555) 321-9876",
    },
  },
  {
    id: 6,
    title: "Urban Loft with Stunning Views",
    price: 1299999,
    bedrooms: 2,
    bathrooms: 2,
    sqft: 1500,
    area: "1,500 sqft",
    address: "212 Urban St, Chicago, IL 60601",
    description:
      "Contemporary loft with floor-to-ceiling windows offering stunning city views. Located in a prime urban neighborhood, close to transit and amenities.",
    images: [
      "/property.png",
      "/property.png",
      "/property.png",
      "/property.png",
    ],
    propertyType: "Loft",
    yearBuilt: 2018,
    lot: "N/A",
    status: "For Sale",
    overview:
      "Sleek and modern urban loft with spacious living areas and incredible views of the Chicago skyline.",
    keyFeatures: [
      "2 Bedrooms",
      "2 Bathrooms",
      "Floor-to-Ceiling Windows",
      "Private Balcony",
    ],
    features: [
      "City Views",
      "Private Balcony",
      "High Ceilings",
      "Modern Kitchen with Stainless Steel Appliances",
    ],
    interior:
      "Open-concept floor plan with polished concrete floors and stainless steel appliances.",
    exterior: "Private balcony with views of downtown Chicago.",
    financial: {
      taxes: "~$5,000/year",
      hoa: "$300/month",
      lastSold: "2019 ($1,200,000)",
    },
    contact: {
      name: "City Living Realty",
      company: "Urban Living Brokers",
      email: "info@urbanlivingbrokers.com",
      phone: "(555) 654-3210",
    },
  },
  {
    id: 7,
    title: "Mountain View Chalet",
    price: 450000,
    bedrooms: 3,
    bathrooms: 2,
    sqft: 2100,
    area: "2,100 sqft",
    address: "108 Alpine Rd, Aspen, CO 81611",
    description:
      "Charming chalet with sweeping mountain views, featuring rustic wood beams, a stone fireplace, and an open floor plan. Perfect for mountain enthusiasts.",
    images: [
      "/property.png",
      "/property.png",
      "/property.png",
      "/property.png",
    ],
    propertyType: "Chalet",
    yearBuilt: 2015,
    lot: "0.5 Acres",
    status: "For Sale",
    overview:
      "Rustic mountain retreat offering a serene environment with stunning views and cozy living spaces.",
    keyFeatures: [
      "3 Bedrooms",
      "2 Bathrooms",
      "Stone Fireplace",
      "Mountain Views",
    ],
    features: [
      "Rustic Wood Beams",
      "Large Deck with Mountain Views",
      "Open Floor Plan",
      "Hot Tub",
    ],
    interior:
      "Cozy living area with stone fireplace, updated kitchen, and vaulted ceilings.",
    exterior:
      "Large deck perfect for entertaining with breathtaking mountain views.",
    financial: {
      taxes: "~$3,800/year",
      hoa: "$200/month",
      lastSold: "2017 ($420,000)",
    },
    contact: {
      name: "Aspen Realty",
      company: "Mountain Estates",
      email: "info@mountainestates.com",
      phone: "(555) 789-6543",
    },
  },
  {
    id: 8,
    title: "Lakefront Dream Home",
    price: 3250000,
    bedrooms: 5,
    bathrooms: 4,
    sqft: 6000,
    area: "6,000 sqft",
    address: "158 Lakeview Dr, Lake Tahoe, CA 96150",
    description:
      "An exquisite lakefront property with stunning panoramic views, private dock, and ample living space for family gatherings and entertaining.",
    images: [
      "/property.png",
      "/property.png",
      "/property.png",
      "/property.png",
    ],
    propertyType: "Lakefront Property",
    yearBuilt: 2020,
    lot: "1 Acre",
    status: "For Sale",
    overview:
      "Luxury lakefront estate with unparalleled views and a private dock, perfect for lake enthusiasts.",
    keyFeatures: [
      "5 Bedrooms",
      "4 Bathrooms",
      "Private Dock",
      "Wine Cellar",
      "Home Theater",
    ],
    features: [
      "Private dock",
      "Outdoor kitchen",
      "Chef's kitchen",
      "Wine cellar",
    ],
    interior:
      "Spacious open-plan living with gourmet kitchen, vaulted ceilings, and floor-to-ceiling windows.",
    exterior:
      "Private lakefront access, infinity pool, outdoor kitchen, and landscaped gardens.",
    financial: {
      taxes: "~$30,000/year",
      hoa: "$400/month",
      lastSold: "2021 ($2,800,000)",
    },
    contact: {
      name: "Linda Avery",
      company: "Tahoe Luxury Homes",
      email: "linda@tahoeluxhomes.com",
      phone: "(555) 123-7890",
    },
  },
  {
    id: 9,
    title: "City Penthouse with Views",
    price: 2450000,
    bedrooms: 3,
    bathrooms: 3,
    sqft: 3000,
    area: "3,000 sqft",
    address: "102 Skyline Blvd, San Francisco, CA 94105",
    description:
      "A lavish penthouse with sweeping views of the city skyline, modern finishes, and an expansive open-plan layout, ideal for luxury living in the heart of the city.",
    images: [
      "/property.png",
      "/property.png",
      "/property.png",
      "/property.png",
    ],
    propertyType: "Penthouse",
    yearBuilt: 2018,
    lot: "N/A",
    status: "For Sale",
    overview:
      "A modern and spacious penthouse offering incredible views, luxurious amenities, and premium finishes.",
    keyFeatures: [
      "3 Bedrooms",
      "3 Bathrooms",
      "City Views",
      "Private Terrace",
      "Smart Home Features",
    ],
    features: [
      "Floor-to-ceiling windows",
      "Private terrace with city views",
      "Gourmet kitchen",
      "Smart home system",
    ],
    interior:
      "Modern open-plan living with luxury finishes, high ceilings, and a chef’s kitchen.",
    exterior:
      "Private terrace with panoramic city views, ideal for outdoor entertaining.",
    financial: {
      taxes: "~$15,000/year",
      hoa: "$600/month",
      lastSold: "2019 ($2,200,000)",
    },
    contact: {
      name: "James Wright",
      company: "Skyline Properties",
      email: "james@skylineproperties.com",
      phone: "(555) 321-6543",
    },
  },
  {
    id: 10,
    title: "Beachfront Luxury Villa",
    price: 4500000,
    bedrooms: 7,
    bathrooms: 5,
    sqft: 8000,
    area: "8,000 sqft",
    address: "210 Beach Rd, Malibu, CA 90265",
    description:
      "A magnificent beachfront villa offering ultimate luxury with seven bedrooms, ocean views, and state-of-the-art amenities. A dream home by the sea.",
    images: [
      "/property.png",
      "/property.png",
      "/property.png",
      "/property.png",
    ],
    propertyType: "Beachfront Villa",
    yearBuilt: 2021,
    lot: "1.5 Acres",
    status: "For Sale",
    overview:
      "A spectacular beachfront villa with expansive living spaces, ideal for those seeking luxury and privacy by the ocean.",
    keyFeatures: [
      "7 Bedrooms",
      "5 Bathrooms",
      "Private Beach Access",
      "Infinity Pool",
      "Home Theater",
    ],
    features: [
      "Ocean views",
      "Private beach access",
      "Outdoor living spaces",
      "Smart home technology",
    ],
    interior:
      "Spacious open-plan living with panoramic ocean views, gourmet kitchen, and luxurious finishes.",
    exterior:
      "Infinity pool with ocean views, outdoor kitchen, and private beach access.",
    financial: {
      taxes: "~$45,000/year",
      hoa: "$750/month",
      lastSold: "2021 ($4,000,000)",
    },
    contact: {
      name: "Kelly Jacobs",
      company: "Malibu Beach Realty",
      email: "kelly@malibubeachrealty.com",
      phone: "(555) 987-6543",
    },
  },
  {
    id: 11,
    title: "Mountain Retreat Lodge",
    price: 2100000,
    bedrooms: 6,
    bathrooms: 4,
    sqft: 7000,
    area: "7,000 sqft",
    address: "80 Summit Peak, Aspen, CO 81611",
    description:
      "A cozy lodge with rustic charm, nestled in the mountains, offering serenity, expansive living spaces, and an ideal location for outdoor enthusiasts.",
    images: [
      "/property.png",
      "/property.png",
      "/property.png",
      "/property.png",
    ],
    propertyType: "Mountain Lodge",
    yearBuilt: 2017,
    lot: "2 Acres",
    status: "For Sale",
    overview:
      "Mountain retreat with rustic charm and expansive living areas perfect for families and outdoor lovers.",
    keyFeatures: [
      "6 Bedrooms",
      "4 Bathrooms",
      "Game Room",
      "Hot Tub",
      "Outdoor Fireplace",
    ],
    features: ["Game room", "Large deck", "Mountain views", "Hot tub"],
    interior:
      "Spacious lodge-style living with a grand stone fireplace and a large gourmet kitchen.",
    exterior:
      "Large deck overlooking the mountains, hot tub, and outdoor fireplace for year-round enjoyment.",
    financial: {
      taxes: "~$10,000/year",
      hoa: "$350/month",
      lastSold: "2018 ($2,000,000)",
    },
    contact: {
      name: "Ellen Wallace",
      company: "Aspen Mountain Realty",
      email: "ellen@aspenmountainrealty.com",
      phone: "(555) 321-1234",
    },
  },
  {
    id: 12,
    title: "Exclusive City Mansion",
    price: 8900000,
    bedrooms: 8,
    bathrooms: 7,
    sqft: 12000,
    area: "12,000 sqft",
    address: "500 Noble St, New York, NY 10001",
    description:
      "A palatial mansion in the heart of New York City offering 8 bedrooms, 7 bathrooms, and unmatched luxury with modern finishes and top-tier amenities.",
    images: [
      "/property.png",
      "/property.png",
      "/property.png",
      "/property.png",
    ],
    propertyType: "Mansion",
    yearBuilt: 2020,
    lot: "0.75 Acres",
    status: "For Sale",
    overview:
      "A magnificent city mansion with luxury amenities, ideal for those seeking the finest living experience in New York.",
    keyFeatures: [
      "8 Bedrooms",
      "7 Bathrooms",
      "Private Library",
      "Home Spa",
      "Grand Ballroom",
    ],
    features: ["Private library", "Home theater", "Home spa", "Grand ballroom"],
    interior:
      "Elegant living spaces with high ceilings, gourmet kitchen, and private library.",
    exterior:
      "Landscaped grounds with a grand entrance, private garden, and outdoor pool.",
    financial: {
      taxes: "~$75,000/year",
      hoa: "$1,200/month",
      lastSold: "2021 ($8,200,000)",
    },
    contact: {
      name: "David Harris",
      company: "Harris Realty Group",
      email: "david@harrisrealtygroup.com",
      phone: "(555) 654-3210",
    },
  },
  {
    id: 13,
    title: "Countryside Manor",
    price: 1800000,
    bedrooms: 5,
    bathrooms: 4,
    sqft: 4000,
    area: "4,000 sqft",
    address: "70 Greenhill Rd, Vermont, USA",
    description:
      "A peaceful countryside manor with scenic views, offering luxury, privacy, and modern conveniences amidst lush green surroundings.",
    images: [
      "/property.png",
      "/property.png",
      "/property.png",
      "/property.png",
    ],
    propertyType: "Manor",
    yearBuilt: 2016,
    lot: "3 Acres",
    status: "For Sale",
    overview:
      "Secluded countryside manor offering the perfect balance of modern luxury and natural beauty.",
    keyFeatures: [
      "5 Bedrooms",
      "4 Bathrooms",
      "Private Pond",
      "Home Office",
      "Greenhouse",
    ],
    features: ["Private pond", "Home office", "Greenhouse", "Open-plan living"],
    interior:
      "Large living areas, with a chef’s kitchen, home office, and plenty of natural light.",
    exterior:
      "Landscaped gardens, private pond, and a greenhouse for gardening enthusiasts.",
    financial: {
      taxes: "~$8,500/year",
      hoa: "$200/month",
      lastSold: "2017 ($1,500,000)",
    },
    contact: {
      name: "Grace Matthews",
      company: "Countryside Realty",
      email: "grace@countryside-realty.com",
      phone: "(555) 876-5432",
    },
  },
  {
    id: 14,
    title: "Luxury Ranch Estate",
    price: 7500000,
    bedrooms: 10,
    bathrooms: 8,
    sqft: 15000,
    area: "15,000 sqft",
    address: "100 Ranch Rd, Texas, USA",
    description:
      "An expansive ranch estate offering luxury living in a secluded and private setting with stables, riding trails, and a beautiful main residence.",
    images: [
      "/property.png",
      "/property.png",
      "/property.png",
      "/property.png",
    ],
    propertyType: "Ranch Estate",
    yearBuilt: 2019,
    lot: "50 Acres",
    status: "For Sale",
    overview:
      "A luxurious ranch estate with ample space for equestrian activities, offering ultimate privacy and comfort.",
    keyFeatures: [
      "10 Bedrooms",
      "8 Bathrooms",
      "Equestrian Facilities",
      "Private Riding Trails",
      "Swimming Pool",
    ],
    features: [
      "Equestrian facilities",
      "Private riding trails",
      "Swimming pool",
      "Guest house",
    ],
    interior:
      "Grand living areas, gourmet kitchen, home theater, and large windows offering stunning views of the ranch.",
    exterior:
      "Horse stables, private riding trails, swimming pool, and multiple outdoor living areas.",
    financial: {
      taxes: "~$60,000/year",
      hoa: "$1,500/month",
      lastSold: "2020 ($6,500,000)",
    },
    contact: {
      name: "John Walker",
      company: "Ranch Estates Realty",
      email: "john@ranchestatesrealty.com",
      phone: "(555) 999-8888",
    },
  },

  {
    id: 15,
    title: "Historic Brownstone in the City",
    price: 2250000,
    bedrooms: 4,
    bathrooms: 3,
    sqft: 3500,
    area: "3,500 sqft",
    address: "33 Heritage St, Boston, MA 02108",
    description:
      "A charming historic brownstone located in a prime city neighborhood. Features a perfect blend of vintage charm and modern amenities, ideal for urban living.",
    images: [
      "/property.png",
      "/property.png",
      "/property.png",
      "/property.png",
    ],
    propertyType: "Brownstone",
    yearBuilt: 1915,
    lot: "N/A",
    status: "For Sale",
    overview:
      "Classic brownstone with preserved architectural details, including high ceilings, original moldings, and large windows.",
    keyFeatures: [
      "4 Bedrooms",
      "3 Bathrooms",
      "Private Terrace",
      "Wood-burning Fireplace",
      "Custom Kitchen",
    ],
    features: [
      "Original architectural details",
      "Wood-burning fireplace",
      "Private terrace",
      "Custom chef's kitchen",
    ],
    interior:
      "Spacious and bright living areas with high ceilings, large windows, and a cozy wood-burning fireplace.",
    exterior:
      "Private terrace with city views, perfect for outdoor dining and relaxation.",
    financial: {
      taxes: "~$12,000/year",
      hoa: "$500/month",
      lastSold: "2017 ($2,100,000)",
    },
    contact: {
      name: "Charlotte Green",
      company: "City Brownstone Realty",
      email: "charlotte@citybrownstone.com",
      phone: "(555) 444-5678",
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
