export type UserAddress = {
  id?: number;
  type?: string;
  isDefault?: boolean;
  line1?: string;
  phone?: string;
};

export type UserProfile = {
  id?: string | number;
  name?: string;
  email?: string;
  phone?: string;
  profileImage?: string;
  websiteLink?: string;
  facebookLink?: string;
  instagramLink?: string;
  twitterLink?: string;
  linkedinLink?: string;
  homeAddress?: string;
  officeAddress?: string;
  homePhone?: string;
  officePhone?: string;
  createdAt?: string;
  updatedAt?: string;
  addresses?: UserAddress[];
  role?: string;
};
