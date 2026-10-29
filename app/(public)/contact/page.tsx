import { Clock, MapPin, Phone, Send } from "lucide-react";
import Image from "next/image";
import { EnquiryForm } from "@/components/enquiry-form";
import { Card, CardContent } from "@/components/ui/card";
import { ENQUIRY_TYPES } from "@/lib/types";

export const metadata = { title: "Contact Us" };

const phoneLink = "text-gray-600 hover:text-airbanBlue transition-colors duration-200 hover:underline";

export default async function ContactPage({
  searchParams,
}: {
  searchParams: Promise<{ type?: string; note?: string }>;
}) {
  const params = await searchParams;
  const defaultType = ENQUIRY_TYPES.includes(params.type as (typeof ENQUIRY_TYPES)[number]) ? params.type : "";

  return (
    <div className="min-h-screen bg-gradient-to-b from-airbanBlue via-white to-white text-black py-40">
      <section>
        <div className="container mx-auto px-4">
          <div className="bg-gradient-to-br from-gray-200 shadow-lg rounded-md p-8 md:p-16 max-w-6xl mx-auto relative">
            <div className="text-left mb-8 relative z-10">
              <h1 className="text-xl md:text-3xl font-semibold mb-4">Get in Touch with Airban Homes</h1>
              <p className="text-xs opacity-90 max-w-md">
                Welcome to Airban Homes&apos; Contact Us page. We&apos;re here to assist you with any inquiries, requests, or feedback you may have. Whether you&apos;re looking to buy or sell a property, explore investment opportunities, or simply want to connect, we&apos;re just a message away. Reach out to us, and let&apos;s start a conversation.
              </p>
            </div>
            <Image
              src="/assets/contactHero.png"
              alt=""
              width={500}
              height={500}
              priority
              className="absolute right-0 bottom-0 hidden md:block md:h-[300px] lg:h-[400px] w-auto"
            />
          </div>
        </div>
      </section>

      <div className="grid lg:grid-cols-4 gap-6 mx-auto max-w-6xl py-20 px-4">
        <div className="lg:col-span-2">
          <Card>
            <CardContent className="p-6">
              <EnquiryForm defaultType={defaultType} defaultNote={params.note ?? ""} />
            </CardContent>
          </Card>
        </div>

        <div className="lg:col-span-2 space-y-6">
          <div className="max-w-md space-y-6 text-gray-700 p-4 sm:p-10">
            <div>
              <h2 className="text-2xl font-semibold text-black">Schedule a Property Tour</h2>
              <p className="mt-2 text-sm text-gray-600">
                Experience your dream home in person. Contact us to arrange a private viewing tailored to your schedule.
              </p>
            </div>
            <hr className="border-gray-400" />
            <div className="space-y-4 text-sm">
              <div className="flex items-start gap-3">
                <Send className="w-5 h-5 text-black mt-0.5" />
                <div>
                  <p className="font-medium text-gray-800">Email</p>
                  <a href="mailto:info@myairbanhomes.com" className={phoneLink}>info@myairbanhomes.com</a>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <Phone className="w-5 h-5 text-black mt-0.5" />
                <div>
                  <p className="font-medium text-gray-800">Phone</p>
                  <a href="tel:+233302984032" className={phoneLink}>(+233) 30 298 4032</a>
                  <br />
                  <a href="tel:+233540689387" className={phoneLink}>(+233) 54 068 9387</a>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <MapPin className="w-5 h-5 text-black mt-0.5" />
                <div>
                  <p className="font-medium text-gray-800">Office Address</p>
                  <p className="text-gray-600">Jacob Ave, Accra</p>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <Clock className="w-5 h-5 text-black mt-0.5" />
                <div>
                  <p className="font-medium text-gray-800">Office Hours</p>
                  <p className="text-gray-600">Mon – Sat: 8:00 AM – 6:00 PM</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <section className="mt-16">
        <div className="container mx-auto px-4">
          <h2 className="text-2xl md:text-3xl font-semibold mb-6 text-center pb-5">Where you can find us</h2>
          <div className="flex justify-center w-full">
            <div className="relative w-full overflow-hidden rounded-lg aspect-[16/9] max-h-[600px]">
              <iframe
                title="Airban Homes Location"
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3970.2639896381047!2d-0.11532962416217363!3d5.674924432440614!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f150.1!3m3!1m2!1s0xfdf83ee5646fb2d%3A0x8f0ab5784572d649!2sAirban%20Homes!5e0!3m2!1sen!2sgh!4v1753087679744!5m2!1sen!2sgh"
                className="absolute inset-0 h-full w-full border-0 grayscale"
                loading="lazy"
                referrerPolicy="no-referrer"
                allowFullScreen
              />
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
