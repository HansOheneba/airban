import { notFound } from "next/navigation";
import { getProperty } from "@/lib/db";
import { removeProperty, savePropertyAction } from "../../../actions";

export const metadata = { title: "Edit property" };

export default async function EditPropertyPage({
  params,
  searchParams,
}: {
  params: Promise<{ id: string }>;
  searchParams: Promise<{ saved?: string }>;
}) {
  const { id } = await params;
  const query = await searchParams;
  const existing = id === "new" ? null : getProperty(id);
  if (id !== "new" && !existing) notFound();

  const property = existing ?? {
    id: "",
    title: "",
    address: "",
    location: "",
    price: "",
    period: "/month",
    bedrooms: "",
    beds: 0,
    baths: 0,
    area: "",
    description: "",
    features: [] as string[],
    image: "",
    images: [] as string[],
    status: "listed" as const,
  };

  return (
    <form action={savePropertyAction} className="grid max-w-3xl gap-4 rounded-3xl bg-white p-6 shadow-sm">
      <h1 className="text-2xl font-semibold">{existing ? "Edit property" : "New property"}</h1>
      {query.saved && <p className="text-sm text-emerald-700">Saved.</p>}
      <input type="hidden" name="id" value={property.id} />
      <label className="grid gap-1 text-sm">
        Title
        <input name="title" required defaultValue={property.title} className="field" />
      </label>
      <div className="grid gap-4 sm:grid-cols-2">
        <label className="grid gap-1 text-sm">
          Address
          <input name="address" required defaultValue={property.address} className="field" />
        </label>
        <label className="grid gap-1 text-sm">
          Location
          <input name="location" defaultValue={property.location} className="field" />
        </label>
      </div>
      <div className="grid gap-4 sm:grid-cols-3">
        <label className="grid gap-1 text-sm">
          Price
          <input name="price" defaultValue={property.price} className="field" />
        </label>
        <label className="grid gap-1 text-sm">
          Period
          <input name="period" defaultValue={property.period} className="field" />
        </label>
        <label className="grid gap-1 text-sm">
          Status
          <select name="status" defaultValue={property.status} className="field">
            <option value="listed">Listed</option>
            <option value="previous">Previously listed</option>
          </select>
        </label>
      </div>
      <label className="grid gap-1 text-sm">
        Bedroom label
        <input name="bedrooms" defaultValue={property.bedrooms} className="field" />
      </label>
      <div className="grid gap-4 sm:grid-cols-3">
        <label className="grid gap-1 text-sm">
          Beds
          <input name="beds" type="number" defaultValue={property.beds} className="field" />
        </label>
        <label className="grid gap-1 text-sm">
          Baths
          <input name="baths" type="number" defaultValue={property.baths} className="field" />
        </label>
        <label className="grid gap-1 text-sm">
          Area
          <input name="area" defaultValue={property.area} className="field" />
        </label>
      </div>
      <label className="grid gap-1 text-sm">
        Description
        <textarea name="description" rows={4} defaultValue={property.description} className="field" />
      </label>
      <label className="grid gap-1 text-sm">
        Features, one per line
        <textarea name="features" rows={5} defaultValue={property.features.join("\n")} className="field" />
      </label>
      <label className="grid gap-1 text-sm">
        Image paths, one per line. The first image is the cover. Example: /img/otumfour1.jpg
        <textarea name="images" rows={4} defaultValue={property.images.join("\n")} className="field" />
      </label>
      <div className="flex items-center justify-between">
        <button className="btn">Save property</button>
        {existing && (
          <button formAction={removeProperty} className="text-sm text-red-600">
            Delete
          </button>
        )}
      </div>
    </form>
  );
}
