import Link from "next/link";
import { listProperties } from "@/lib/db";

export const metadata = { title: "Manage properties" };

export default function AdminPropertiesPage() {
  const properties = listProperties();

  return (
    <div>
      <div className="flex items-center justify-between">
        <h1 className="text-3xl font-semibold">Properties</h1>
        <Link href="/admin/properties/new" className="btn">
          Add property
        </Link>
      </div>
      <ul className="mt-6 divide-y divide-slate-200 overflow-hidden rounded-3xl border border-slate-200 bg-white">
        {properties.map((property) => (
          <li key={property.id} className="flex items-center justify-between gap-4 px-5 py-4">
            <div>
              <p className="font-medium">{property.title}</p>
              <p className="text-sm text-slate-500">
                {property.location} · {property.status}
              </p>
            </div>
            <Link href={`/admin/properties/${property.id}`} className="text-sm font-semibold text-airban">
              Edit
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
}
