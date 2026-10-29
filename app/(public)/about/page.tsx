import Image from "next/image";
import { buttonVariants } from "@/components/ui/button";
import { leaders } from "@/lib/content";

export const metadata = { title: "About Us" };

const values = ["Integrity", "Professionalism", "Reliability"];

export default function AboutPage() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-airbanBlue via-white to-white text-black py-40">
      <section className="py-10">
        <div className="container mx-auto px-4">
          <div className="bg-gradient-to-br from-gray-200 shadow-lg rounded-md p-8 md:p-16 max-w-6xl mx-auto relative">
            <div className="text-left mb-8">
              <h1 className="text-3xl md:text-5xl font-medium mb-4">About Airban Homes</h1>
              <p className="text-sm opacity-90 max-w-2xl">
                Airban Homes is a registered real estate brokerage company, working to narrow the accommodation deficit in the contemporary living market. The firm provides an avenue for sales, purchases and rental of property in Ghana.
              </p>
            </div>
            <Image
              src="/assets/constructor.png"
              alt=""
              width={300}
              height={300}
              priority
              className="absolute right-4 bottom-0 w-36 sm:w-40 md:w-52 lg:w-64 xl:w-72 hidden lg:flex"
            />
          </div>
        </div>
      </section>

      <div className="bg-gradient-to-b from-transparent via-white to-white">
        <section className="py-12 md:py-20 max-w-6xl mx-auto">
          <div className="container mx-auto px-4">
            <div className="flex flex-col-reverse md:flex-row items-center gap-10 md:gap-16">
              <div className="flex-1 w-full mt-8 md:mt-0">
                <Image src="/assets/kitchen.png" alt="Modern kitchen interior" width={500} height={400} className="rounded-lg object-cover shadow-md w-full h-auto" />
              </div>
              <div className="flex-1 w-full">
                <h2 className="text-2xl md:text-3xl font-bold text-gray-900 mb-4">Our Core Values</h2>
                <p className="text-gray-600 mb-6">
                  We are committed to providing exceptional service and upholding the highest standards in all our dealings.
                </p>
                <div className="flex flex-wrap gap-3 mb-6">
                  {values.map((value) => (
                    <span key={value} className="px-4 py-2 border border-airbanBlue font-thin rounded-sm text-sm bg-airbanBlue/10">
                      {value}
                    </span>
                  ))}
                </div>
                <a href="tel:+233302984032" className={buttonVariants({ className: "w-full sm:w-auto" })}>
                  Speak with Agent →
                </a>
              </div>
            </div>
          </div>
        </section>
      </div>

      <section className="bg-gradient-to-r from-[#d1e7ff] to-white py-16 px-6 lg:px-24">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between">
          <div className="px-5">
            <h2 className="text-3xl font-bold text-gray-900 mb-2">Leadership Team</h2>
            <p className="text-gray-600 mb-12 max-w-lg">
              At the heart of our company is a dynamic leadership team driven by a shared vision: to reshape how people engage with real estate. With diverse backgrounds in technology, business, design, and customer experience, our leaders bring innovation, strategy, and empathy to every decision.
            </p>
          </div>
          <div className="flex flex-col gap-12">
            {leaders.map((leader, index) => (
              <div
                key={leader.name}
                className={`flex flex-col md:flex-row ${index % 2 ? "md:flex-row-reverse" : ""} bg-white rounded-xl shadow-sm overflow-hidden items-center gap-6 p-6 sm:p-0`}
              >
                <div className="overflow-hidden flex-shrink-0">
                  <Image src={leader.photo} alt={leader.name} width={180} height={180} className="object-cover w-full h-full rounded-md" />
                </div>
                <div className="text-gray-800 max-w-xl p-5">
                  <h3 className="font-semibold text-lg">{leader.name}</h3>
                  <p className="text-sm text-airbanBlue font-medium mb-2">{leader.role}</p>
                  <p className="text-sm text-gray-600 leading-relaxed">{leader.bio}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="pt-12 md:pt-20 bg-white">
        <div className="container mx-auto px-4 text-center">
          <blockquote className="text-2xl md:text-3xl font-bold text-airbanBlue mb-8 max-w-3xl mx-auto leading-tight">
            &quot;Buying a home right now will be the best opportunity in your Lifetime&quot;
          </blockquote>
          <div className="flex flex-col items-center justify-center gap-4">
            <Image src="/assets/warren.jpg" alt="Warren Buffett" width={150} height={150} className="rounded-full h-20 w-20 border border-airbanBlue object-cover" />
            <p className="font-medium text-gray-500 italic">Warren Buffett</p>
          </div>
        </div>
      </section>
    </div>
  );
}
