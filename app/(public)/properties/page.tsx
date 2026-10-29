import { MapPin } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { Faq } from "@/components/faq";
import { PropertyCarousel } from "@/components/property-carousel";
import { buttonVariants } from "@/components/ui/button";
import { listProperties } from "@/lib/db";
import { formatArea } from "@/lib/utils";
import { Photo } from "@/components/photo";

export const metadata = { title: "Properties" };

export default function PropertiesPage() {
  const listed = listProperties("listed");
  const previous = listProperties("previous");
  const slides = (previous.length ? previous : listed).map((property) => ({
    src: property.image,
    alt: property.title,
    title: property.title,
    location: property.location,
    badge: property.status === "previous" ? (property.period.includes("month") ? "LET" : "SOLD") : undefined,
  }));

  return (
    <>
      <div className="bg-gradient-to-b from-airbanBlue via-white to-white text-black py-40">
        <section className="py-20 text-center px-4">
          <h1 className="text-4xl md:text-5xl font-bold mb-4">Find Your Dream Property</h1>
          <p className="max-w-2xl mx-auto opacity-90">
            Welcome to Airban Homes, where your dream home awaits in the most desirable locations across Ghana and beyond. Explore our handpicked collection of premium properties — each with its own unique story, lifestyle, and investment potential. With options to suit every taste and budget, your perfect home is just a step away.
          </p>
        </section>
      </div>

      <div className="bg-white">
        <section className="max-w-7xl mx-auto px-4 pb-20 space-y-20">
          {listed.map((property, index) => (
            <div key={property.id} className="grid grid-cols-1 md:grid-cols-2 items-center gap-10">
              <div className={`w-full h-full rounded-lg overflow-hidden shadow-lg ${index % 2 ? "md:order-2" : "md:order-1"}`}>
                <Photo src={property.image} alt={property.title} width={900} height={600} sizes="(min-width: 768px) 50vw, 100vw" className="w-full h-[300px] sm:h-[400px] object-cover bg-gray-100 transition-transform duration-500 hover:scale-105" />
              </div>
              <div className={`space-y-4 ${index % 2 ? "md:order-1" : "md:order-2"}`}>
                <h2 className="text-3xl font-bold">{property.title}</h2>
                <div className="flex items-center gap-1 text-gray-700">
                  <MapPin className="w-5 h-5 fill-[#4c5460] text-white" />
                  <span>{property.address}</span>
                </div>
                <div className="flex items-center text-sm font-medium">
                  <Image src="/assets/bed.svg" alt="" width={20} height={20} className="mr-2" />
                  {property.bedrooms}
                </div>
                <div className="flex items-center text-sm font-medium">
                  <Image src="/assets/bath.svg" alt="" width={20} height={20} className="mr-2" />
                  {property.baths} Bathroom{property.baths === 1 ? "" : "s"}
                </div>
                <div className="flex items-center text-sm font-medium">
                  <Image src="/assets/area.svg" alt="" width={20} height={20} className="mr-2" />
                  {formatArea(property.area)}
                </div>
                <Link href={`/properties/${property.id}`} className={buttonVariants()}>
                  View This Property
                </Link>
              </div>
            </div>
          ))}
          {listed.length === 0 && <p className="text-center text-gray-500">No properties are listed right now. Check back soon.</p>}
        </section>

        {slides.length > 0 && (
          <section className="py-10">
            <h2 className="text-3xl font-bold text-center mb-8">Previously Listed Properties</h2>
            <PropertyCarousel slides={slides} />
          </section>
        )}

        <Faq />
      </div>
    </>
  );
}
