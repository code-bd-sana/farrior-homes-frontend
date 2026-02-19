export type User = {
  id: number;
  profileImage?: string;
  name: string;
  email?: string;
  phone?: string;
  company?: string;
  address?: string;
  subscription?: "Free" | "Basic" | "Premium" | string;
  propertiesOwn?: number;
  propertiesBuy?: number;
  propertiesSell?: number;
  createdAt?: string;
  // legacy / optional fields
  meta?: Record<string, unknown>;
};
