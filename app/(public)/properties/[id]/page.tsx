import Image from "next/image";
import { notFound } from "next/navigation";
import { PropertyEnquiryForm } from "@/components/enquiry-form";
import { Faq } from "@/components/faq";
import { PropertyGallery } from "@/components/property-gallery";
import { Card, CardContent } from "@/components/ui/card";
import { getProperty } from "@/lib/db";
import { formatArea } from "@/lib/utils";

export async function generateMetadata({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const property = getProperty(id);
  if (!property) notFound();
  return { title: property.title };
}

export default async function PropertyPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const property = getProperty(id);
  if (!property) notFound();

  const images = property.images.length ? property.images : [property.image];

  return (
    <>
      <div className="min-h-screen bg-gradient-to-b from-airbanBlue via-white to-white py-40">
        <div className="max-w-6xl mx-auto p-4 space-y-6">
          <div className="text-white">
            <div className="flex flex-wrap gap-3 items-center">
              <h1 className="text-xl font-medium">{property.title}</h1>
              {property.status === "previous" && (
                <span className="rounded-md bg-white px-3 py-1 text-sm font-semibold text-airbanBlue">
                  {property.period.includes("month") ? "Let" : "Sold"}
                </span>
              )}
              <div className="flex items-center gap-2 bg-transparent px-3 py-1 rounded-md border border-white text-sm">
                <Image src="/assets/mapPin.png" alt="" width={12} height={12} />
                {property.location}
              </div>
            </div>
          </div>

          <PropertyGallery images={images} title={property.title} />

          <div className="grid lg:grid-cols-4 gap-6">
            <div className="lg:col-span-2 space-y-6">
              <div className="mx-auto rounded-lg border p-6 shadow-sm bg-white">
                <h2 className="text-xl font-semibold mb-3">Description</h2>
                <p className="text-gray-700 mb-6">{property.description}</p>
                <div className="grid grid-cols-3 divide-x border-t pt-4 text-sm text-gray-600">
                  <div className="flex flex-col items-start gap-1 p-3">
                    <div className="flex items-center gap-2">
                      <Image src="/assets/bed.svg" alt="" width={20} height={20} className="mb-1" />
                      <span className="text-xs uppercase tracking-wide">Bedrooms</span>
                    </div>
                    <span className="text-lg font-semibold text-gray-900">{property.bedrooms}</span>
                  </div>
                  <div className="flex flex-col items-start gap-1 p-3">
                    <div className="flex items-center gap-2">
                      <Image src="/assets/bath.svg" alt="" width={20} height={20} className="mb-1" />
                      <span className="text-xs uppercase tracking-wide">Bathrooms</span>
                    </div>
                    <span className="text-lg font-semibold text-gray-900">{String(property.baths).padStart(2, "0")}</span>
                  </div>
                  <div className="flex flex-col items-start gap-1 p-3">
                    <div className="flex items-start gap-2">
                      <Image src="/assets/area.svg" alt="" width={20} height={20} className="mb-1" />
                      <span className="text-xs uppercase tracking-wide">Area</span>
                    </div>
                    <span className="text-lg font-semibold text-gray-900">{formatArea(property.area)}</span>
                  </div>
                </div>
              </div>

              <Card>
                <CardContent className="p-6">
                  <h2 className="text-xl font-semibold mb-4">Key Features and Amenities</h2>
                  <div className="space-y-3 px-5 text-sm">
                    {property.features.map((feature) => (
                      <div key={feature} className="flex items-center gap-3">
                        <Image src="/assets/lightning.svg" alt="" width={10} height={20} />
                        <span className="text-gray-700">{feature}</span>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </div>

            <div className="lg:col-span-2">
              <Card>
                <CardContent className="p-6">
                  <h2 className="text-md text-gray-600 font-semibold mb-2">Inquire About {property.title}</h2>
                  <p className="text-gray-600 text-sm mb-6">
                    Interested in this property? Our real estate experts will get back to you with more details, including scheduling a viewing and answering any questions you may have.
                  </p>
                  <PropertyEnquiryForm property={`${property.title}, ${property.location}`} />
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </div>
      <div className="bg-white">
        <Faq />
      </div>
    </>
  );
}
