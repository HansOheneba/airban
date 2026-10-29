import Image from "next/image";
import { DoorCatalog } from "@/components/door-catalog";
import { listDoors } from "@/lib/db";

export const metadata = { title: "Our Doors" };

export default function DoorsPage() {
  const doors = listDoors();

  return (
    <div className="min-h-screen bg-gradient-to-b from-airbanBlue via-white to-white text-black py-40">
      <section className="px-4 sm:px-6">
        <div className="max-w-7xl mx-auto">
          <div className="bg-airbanFooter rounded-3xl p-8 sm:p-12 relative overflow-hidden h-72">
            <div className="absolute left-8 sm:left-12 bottom-10 z-10">
              <h1 className="text-4xl sm:text-5xl font-bold text-white mb-4">Airban Doors</h1>
              <p className="text-lg sm:text-xl text-blue-100">Premium Quality Doors for Every Space</p>
            </div>
            <div className="absolute right-6 sm:right-32 -bottom-32 opacity-40 sm:opacity-100">
              <Image src="/assets/door2.png" alt="Airban Door" width={150} height={150} priority className="rounded-lg shadow-2xl" />
            </div>
          </div>
        </div>
      </section>
      <DoorCatalog doors={doors} />
    </div>
  );
}
