import Link from "next/link";
import { listDoors } from "@/lib/db";

export const metadata = { title: "Manage doors" };

export default function AdminDoorsPage() {
  const doors = listDoors();

  return (
    <div>
      <div className="flex items-center justify-between">
        <h1 className="text-3xl font-semibold">Doors</h1>
        <Link href="/admin/doors/new" className="btn">
          Add door
        </Link>
      </div>
      <ul className="mt-6 divide-y divide-slate-200 overflow-hidden rounded-3xl border border-slate-200 bg-white">
        {doors.map((door) => (
          <li key={door.id} className="flex items-center justify-between gap-4 px-5 py-4">
            <div className="flex items-center gap-3">
              <img src={door.image} alt="" className="h-12 w-12 rounded-lg object-contain bg-slate-50" />
              <div>
                <p className="font-medium">{door.name}</p>
                <p className="text-sm text-slate-500">
                  {door.type} · {door.price} · {door.stock} in stock
                </p>
              </div>
            </div>
            <Link href={`/admin/doors/${door.id}`} className="text-sm font-semibold text-airban">
              Edit
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
}
