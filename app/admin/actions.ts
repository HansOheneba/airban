"use server";

import { redirect } from "next/navigation";
import { clearAdminCookie, isAdmin, passwordMatches, setAdminCookie } from "@/lib/auth";
import { deleteDoor, deleteProperty, saveDoor, saveProperty, setEnquiryStatus } from "@/lib/db";
import type { Door, Property } from "@/lib/types";

async function requireAdmin() {
  if (!(await isAdmin())) redirect("/admin/login");
}

function text(formData: FormData, key: string) {
  return String(formData.get(key) || "").trim();
}

function lines(value: string) {
  return value
    .split("\n")
    .map((line) => line.trim())
    .filter(Boolean);
}

export async function login(formData: FormData) {
  if (!passwordMatches(text(formData, "password"))) {
    redirect("/admin/login?error=1");
  }
  await setAdminCookie();
  redirect("/admin");
}

export async function logout() {
  await clearAdminCookie();
  redirect("/admin/login");
}

export async function updateEnquiryStatus(formData: FormData) {
  await requireAdmin();
  const id = Number(formData.get("id"));
  const status = text(formData, "status") === "resolved" ? "resolved" : "pending";
  if (Number.isFinite(id)) setEnquiryStatus(id, status);
  redirect("/admin");
}

export async function savePropertyAction(formData: FormData) {
  await requireAdmin();
  const images = lines(text(formData, "images"));
  const property: Property = {
    id: text(formData, "id"),
    title: text(formData, "title"),
    address: text(formData, "address"),
    location: text(formData, "location"),
    price: text(formData, "price"),
    period: text(formData, "period") || "/month",
    bedrooms: text(formData, "bedrooms"),
    beds: Number(formData.get("beds") || 0),
    baths: Number(formData.get("baths") || 0),
    area: text(formData, "area"),
    description: text(formData, "description"),
    features: lines(text(formData, "features")),
    image: images[0] || "/img/hero-house.png",
    images,
    status: text(formData, "status") === "previous" ? "previous" : "listed",
  };
  if (!property.title || !property.address) redirect("/admin/properties?error=1");
  const id = saveProperty(property);
  redirect(`/admin/properties/${id}?saved=1`);
}

export async function removeProperty(formData: FormData) {
  await requireAdmin();
  deleteProperty(text(formData, "id"));
  redirect("/admin/properties");
}

export async function saveDoorAction(formData: FormData) {
  await requireAdmin();
  const door: Door = {
    id: text(formData, "id"),
    name: text(formData, "name"),
    price: text(formData, "price"),
    type: text(formData, "type") || "Single",
    image: text(formData, "image") || "/img/door2.jpg",
    description: text(formData, "description"),
    stock: Number(formData.get("stock") || 0),
  };
  if (!door.name || !door.price) redirect("/admin/doors?error=1");
  const id = saveDoor(door);
  redirect(`/admin/doors/${id}?saved=1`);
}

export async function removeDoor(formData: FormData) {
  await requireAdmin();
  deleteDoor(text(formData, "id"));
  redirect("/admin/doors");
}
