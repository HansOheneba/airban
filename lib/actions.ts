"use server";

import { createEnquiry } from "@/lib/db";
import { ENQUIRY_TYPES, type EnquiryState } from "@/lib/types";

function text(formData: FormData, key: string) {
  return String(formData.get(key) || "").trim();
}

export async function submitEnquiry(_prev: EnquiryState, formData: FormData): Promise<EnquiryState> {
  const firstName = text(formData, "first_name");
  const lastName = text(formData, "last_name");
  const email = text(formData, "email");
  const phone = text(formData, "phone");
  const enquiryType = text(formData, "enquiry_type");
  const additionalInfo = text(formData, "additional_info");

  if (!firstName || !lastName || !email || !enquiryType) {
    return { ok: false, message: "Add your name, email, and what the enquiry is about." };
  }
  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
    return { ok: false, message: "Enter a valid email address." };
  }
  if (!ENQUIRY_TYPES.includes(enquiryType as (typeof ENQUIRY_TYPES)[number])) {
    return { ok: false, message: "Choose an enquiry type from the list." };
  }

  createEnquiry({ firstName, lastName, email, phone, enquiryType, additionalInfo });

  return {
    ok: true,
    message: "Thanks for reaching out. Our team will get back to you shortly.",
  };
}

export async function subscribe(email: string) {
  const value = email.trim();
  if (!/\S+@\S+\.\S+/.test(value)) {
    return { ok: false, message: "Please enter a valid email" };
  }
  createEnquiry({
    firstName: "Newsletter",
    lastName: "Subscriber",
    email: value,
    phone: "",
    enquiryType: "General Enquiry",
    additionalInfo: "Joined the Airban community mailing list from the home page.",
  });
  return { ok: true, message: "Thank you for subscribing! We will be in touch soon." };
}
