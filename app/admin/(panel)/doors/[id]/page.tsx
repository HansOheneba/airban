import { notFound } from "next/navigation";
import { getDoor } from "@/lib/db";
import { DOOR_TYPES } from "@/lib/types";
import { removeDoor, saveDoorAction } from "../../../actions";

export const metadata = { title: "Edit door" };

export default async function EditDoorPage({
  params,
  searchParams,
}: {
  params: Promise<{ id: string }>;
  searchParams: Promise<{ saved?: string }>;
}) {
  const { id } = await params;
  const query = await searchParams;
  const existing = id === "new" ? null : getDoor(id);
  if (id !== "new" && !existing) notFound();

  const door = existing ?? {
    id: "",
    name: "",
    price: "",
    type: "Single",
    image: "/img/door2.jpg",
    description: "",
    stock: 1,
  };

  return (
    <form action={saveDoorAction} className="grid max-w-3xl gap-4 rounded-3xl bg-white p-6 shadow-sm">
      <h1 className="text-2xl font-semibold">{existing ? "Edit door" : "New door"}</h1>
      {query.saved && <p className="text-sm text-emerald-700">Saved.</p>}
      <input type="hidden" name="id" value={door.id} />
      <label className="grid gap-1 text-sm">
        Name
        <input name="name" required defaultValue={door.name} className="field" />
      </label>
      <div className="grid gap-4 sm:grid-cols-3">
        <label className="grid gap-1 text-sm">
          Price
          <input name="price" required defaultValue={door.price} className="field" />
        </label>
        <label className="grid gap-1 text-sm">
          Type
          <select name="type" defaultValue={door.type} className="field">
            {DOOR_TYPES.map((type) => (
              <option key={type}>{type}</option>
            ))}
          </select>
        </label>
        <label className="grid gap-1 text-sm">
          Stock
          <input name="stock" type="number" defaultValue={door.stock} className="field" />
        </label>
      </div>
      <label className="grid gap-1 text-sm">
        Image path
        <input name="image" defaultValue={door.image} className="field" />
      </label>
      <label className="grid gap-1 text-sm">
        Description
        <textarea name="description" rows={4} defaultValue={door.description} className="field" />
      </label>
      <div className="flex items-center justify-between">
        <button className="btn">Save door</button>
        {existing && (
          <button formAction={removeDoor} className="text-sm text-red-600">
            Delete
          </button>
        )}
      </div>
    </form>
  );
}
