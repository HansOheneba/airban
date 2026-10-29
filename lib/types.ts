export type Property = {
  id: string;
  title: string;
  address: string;
  location: string;
  price: string;
  period: string;
  bedrooms: string;
  beds: number;
  baths: number;
  area: string;
  description: string;
  features: string[];
  image: string;
  images: string[];
  status: "listed" | "previous";
};

export type Door = {
  id: string;
  name: string;
  price: string;
  type: string;
  image: string;
  description: string;
  stock: number;
};

export type Enquiry = {
  id: number;
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  enquiryType: string;
  additionalInfo: string;
  status: "pending" | "resolved";
  createdAt: string;
};

export type Article = {
  slug: string;
  title: string;
  excerpt: string;
  publishedOn: string;
  body: string;
};

export type EnquiryState = {
  ok: boolean;
  message: string;
};

export const ENQUIRY_TYPES = [
  "Buying a Property",
  "Selling a Property",
  "Renting a Property",
  "Investment Opportunities",
  "Door quote",
  "General Enquiry",
  "Support/Assistance",
  "Feedback",
] as const;

export const DOOR_TYPES = ["Single", "Single Wide", "One and Half", "Double"] as const;
