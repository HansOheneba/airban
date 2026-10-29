import { MessageCircle, Play, User } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { HomeSearch } from "@/components/home-search";
import { PropertyCard } from "@/components/property-card";
import { SubscribeForm } from "@/components/subscribe-form";
import { buttonVariants } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { listProperties } from "@/lib/db";

const features = [
  { icon: "/assets/feature1.png", title: "Property Insurance", lines: ["We offer our customer property", "protection of liability coverage", "and insurance for their better life."] },
  { icon: "/assets/feature2.png", title: "Lowest Commission", lines: ["You no longer have to negotiate", "commissions and haggle with other agents."] },
  { icon: "/assets/feature3.png", title: "Best Price", lines: ["Not sure what you should be charging", "for your property? No need to worry,", "let us do the numbers for you."] },
  { icon: "/assets/feature4.png", title: "Overall Control", lines: ["Get a virtual tour, and schedule visits before", "you rent or buy any properties.", "You get overall control."] },
];

const stories = [
  {
    title: "Optimizing electricity use for business profitability",
    description: "Learn how to reduce your electricity bills and increase profitability through smart energy management.",
    href: "/news/optimizing-electricity-use-for-business-profitability",
    background: "#0C120C",
    text: "text-white",
    badge: "bg-purple-600",
    Icon: Play,
  },
  {
    title: "The Airban Journey",
    description: "Discover how Airban started and our mission to revolutionize the real estate industry.",
    href: "/news/the-airban-journey",
    background: "#FFFFFF",
    text: "text-gray-900",
    body: "text-gray-800",
    badge: "bg-blue-600",
    Icon: User,
  },
  {
    title: "Community Spotlight: Success Stories",
    description: "Join our community and stay updated with the latest news and opportunities from our users.",
    href: "/news",
    background: "#8F95D3",
    text: "text-white",
    badge: "bg-gray-800",
    Icon: MessageCircle,
  },
];

export default function HomePage() {
  const properties = listProperties("listed");

  return (
    <div>
      <section className="relative py-12 md:py-0 h-auto md:h-[90vh] bg-[url('/assets/hero.png')] bg-cover bg-center bg-no-repeat w-full px-4 md:px-20">
        <div className="relative z-20 flex flex-col md:justify-center md:items-start justify-center h-auto md:h-full px-4 sm:px-12 max-w-6xl mx-auto">
          <div className="text-left max-w-2xl text-white mb-8">
            <h1 className="text-3xl sm:text-5xl font-bold my-4 sm:mb-6 pt-20 md:pt-0">
              Step into
              <br />
              Distinctive Homes
            </h1>
            <p className="text-sm sm:text-lg mb-6 sm:mb-8 leading-relaxed">
              Explore a curated collection of homes that redefine modern living. <br className="hidden sm:block" />
              Find your perfect space with our intuitive search tools.
            </p>
          </div>
          <div className="w-full sm:max-w-xl">
            <HomeSearch />
          </div>
        </div>
        <Image
          src="/assets/heroHouse.png"
          alt="Modern Airban home"
          width={500}
          height={500}
          priority
          className="absolute bottom-0 right-0 w-[300px] md:w-[400px] lg:w-[500px] z-10 hidden md:block"
        />
      </section>

      <section className="py-24 px-6 sm:px-10 bg-gray-50">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid gap-8 gap-x-20 lg:grid-cols-3 grid-cols-1">
            <div className="lg:order-1 order-1">
              <Card className="bg-airbanBlue text-white h-full relative overflow-hidden border-none">
                <CardContent className="p-8 relative z-10">
                  <h3 className="text-2xl font-bold mb-4">The new way to find your new home</h3>
                  <p className="text-blue-100 mb-6">Find your dream place to live in with more than 10k+ properties listed.</p>
                </CardContent>
                <Image
                  src="/assets/airbanIllustration.png"
                  alt=""
                  width={500}
                  height={300}
                  className="absolute bottom-0 -right-16 w-1/2 sm:w-1/3 md:w-[250px] lg:w-[350px] hidden md:block"
                />
              </Card>
            </div>
            <div className="lg:col-span-2 lg:order-2 order-2">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {features.map((feature) => (
                  <div key={feature.title} className="flex flex-col gap-3">
                    <Image src={feature.icon} alt="" width={60} height={60} />
                    <h4 className="font-semibold mb-2">{feature.title}</h4>
                    <p className="text-gray-600 text-sm">
                      {feature.lines.map((line, index) => (
                        <span key={line}>
                          {index > 0 && <br className="hidden sm:block" />}
                          {index > 0 && " "}
                          {line}
                        </span>
                      ))}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      <div className="flex bg-gradient-to-b from-white to-[#E2F0FF]">
        <section className="py-16 max-w-6xl mx-auto w-full">
          <div className="container mx-auto px-4">
            <div className="text-center mb-12">
              <h2 className="text-3xl font-bold mb-4">Based on your location</h2>
              <p className="text-gray-600">Some of our picked properties near your location.</p>
            </div>
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
              {properties.map((property) => (
                <PropertyCard key={property.id} property={property} />
              ))}
            </div>
            <div className="text-center">
              <Link href="/properties" className={buttonVariants()}>
                Browse more properties
              </Link>
            </div>
          </div>
        </section>
      </div>

      <div className="bg-white">
        <section className="overflow-hidden bg-white max-w-6xl mx-auto">
          <div className="py-20 text-center px-4">
            <h2 className="py-5 font-bold text-4xl">Airban Doors</h2>
            <p className="text-gray-600">
              Behind every door is a story waiting to begin. Let us help you find the perfect place to start your next chapter.
            </p>
          </div>
          <div className="w-full flex justify-center px-6 md:px-16">
            <div className="flex gap-3 w-fit items-center">
              <Image src="/assets/door1.png" alt="Door 1" width={400} height={400} className="w-2/6" />
              <Image src="/assets/door2.png" alt="Door 2" width={200} height={400} className="w-1/6" />
              <Image src="/assets/door3.png" alt="Door 3" width={600} height={400} className="w-3/6" />
            </div>
          </div>
          <div className="flex justify-center py-10">
            <Link href="/doors" className={buttonVariants({ className: "px-7" })}>
              View More
            </Link>
          </div>
        </section>
      </div>

      <div className="bg-airbanBlue">
        <section className="py-16 max-w-6xl mx-auto text-white">
          <div className="container mx-auto px-4">
            <div className="flex flex-col md:flex-row gap-4 justify-between items-start mb-12">
              <div>
                <h2 className="text-3xl font-bold mb-4">Airban Newsroom</h2>
                <h3 className="text-blue-100 md:mb-4">Stories and Interviews</h3>
              </div>
              <p className="text-blue-100 max-w-md">
                Subscribe to learn about new product features, the latest in technology, solutions, and updates.
              </p>
            </div>
            <div className="grid md:grid-cols-3 gap-6">
              {stories.map(({ Icon, ...story }) => (
                <Link key={story.title} href={story.href} className="group">
                  <Card className="border-none h-full transition-transform duration-300 group-hover:-translate-y-1 group-hover:shadow-lg" style={{ backgroundColor: story.background }}>
                    <CardContent className="p-6">
                      <div className="flex items-start mb-4">
                        <div className={`w-10 h-10 ${story.badge} rounded-full flex items-center justify-center mr-3 flex-shrink-0`}>
                          <Icon className="w-5 h-5 text-white" />
                        </div>
                        <div className="flex-1">
                          <h4 className={`font-semibold mb-2 ${story.text}`}>{story.title}</h4>
                        </div>
                      </div>
                      <p className={`text-sm mb-4 ${story.body ?? story.text}`}>{story.description}</p>
                    </CardContent>
                  </Card>
                </Link>
              ))}
            </div>
          </div>
        </section>
      </div>

      <section className="py-24 bg-gray-50">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">Want to be part of our community?</h2>
          <p className="text-gray-600 mb-10 max-w-2xl mx-auto text-base md:text-lg">
            Join a growing network of landowners, buyers, and real estate enthusiasts. Get insights, updates, and opportunities delivered straight to your inbox.
          </p>
          <SubscribeForm />
        </div>
      </section>
    </div>
  );
}
