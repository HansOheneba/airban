"use client";

import Link from "next/link";
import { useMemo, useState } from "react";
import { buttonVariants } from "@/components/ui/button";
import type { Door } from "@/lib/types";
import { DOOR_TYPES } from "@/lib/types";
import { formatGhs, priceValue } from "@/lib/utils";
import { Photo } from "@/components/photo";

export function DoorCatalog({ doors }: { doors: Door[] }) {
  const [type, setType] = useState("All");
  const visible = useMemo(() => (type === "All" ? doors : doors.filter((door) => door.type === type)), [doors, type]);

  return (
    <section className="py-16 px-6">
      <div className="max-w-7xl mx-auto">
        <div className="flex flex-wrap gap-4 justify-between items-center mb-12">
          <h2 className="text-3xl font-bold text-gray-900">Product In-stock</h2>
          <select
            value={type}
            onChange={(event) => setType(event.target.value)}
            className="rounded-md border border-gray-200 bg-white px-3 py-2 text-sm"
            aria-label="Filter by door type"
          >
            <option value="All">All</option>
            {DOOR_TYPES.map((option) => <option key={option} value={option}>{option}</option>)}
          </select>
        </div>

        {visible.length === 0 ? (
          <p className="text-gray-500">No {type.toLowerCase()} doors in stock right now.</p>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 justify-items-center sm:justify-items-start">
            {visible.map((door) => (
              <div key={door.id} className="w-64 h-80 bg-white rounded-xl shadow-md overflow-hidden border flex flex-col transition-shadow hover:shadow-lg animate-in fade-in">
                <div className="relative bg-airbanBlue/10 h-40 flex justify-center items-center p-4">
                  <Photo
                    src={door.image}
                    alt={door.name}
                    width={150}
                    height={150}
                    sizes="150px"
                    className={`object-contain max-h-full w-auto rounded-sm ${door.stock > 0 ? "" : "opacity-60 grayscale-[40%]"}`}
                  />
                  {door.stock === 0 && (
                    <span className="absolute top-3 left-3 rounded-full bg-gray-900/80 px-2.5 py-1 text-[11px] font-medium text-white">
                      Out of stock
                    </span>
                  )}
                  {door.stock > 0 && door.stock <= 2 && (
                    <span className="absolute top-3 left-3 rounded-full bg-amber-500 px-2.5 py-1 text-[11px] font-medium text-white">
                      Only {door.stock} left
                    </span>
                  )}
                </div>
                <div className="flex-1 px-4 py-3 space-y-2 flex flex-col justify-around">
                  <div>
                    <h2 className="text-gray-800 text-sm font-medium line-clamp-2">{door.name}</h2>
                    <div className="flex justify-between items-center mt-1">
                      <p className="text-sm text-gray-500">{door.type}</p>
                      <p className="text-sm font-semibold text-airbanBlue">{formatGhs(priceValue(door.price))}</p>
                    </div>
                  </div>
                  <Link href={`/doors/${door.id}`} className={buttonVariants({ className: "w-full mt-2" })}>
                    View Details
                  </Link>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </section>
  );
}
