export type Property = {
  id: number;
  title: string;
  price: string | number;
  createdAt?: string;
  bedrooms?: number;
  bathrooms?: number;
  sqft?: number;
  area?: string;
  address?: string;
  description?: string;
  images?: string[];
  lat?: number;
  lng?: number;
  features?: string[];
  yearBuilt?: number;
  lot?: string;
  status?: string;
  overview?: string;
  keyFeatures?: string[];
  propertyType?: string;
  interior?: string;
  exterior?: string;
  financial?: {
    taxes?: string;
    hoa?: string;
    lastSold?: string;
  };
  contact?: {
    name?: string;
    company?: string;
    email?: string;
    phone?: string;
  };
};
