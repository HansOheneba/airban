import Image from "next/image";
import Link from "next/link";
import { buttonVariants } from "@/components/ui/button";

export function NotFoundContent() {
  return (
    <div className="min-h-[70vh] flex flex-col items-center justify-center bg-gradient-to-b from-gray-900 via-gray-800 to-gray-900 px-4 pt-28 pb-16">
      <div className="flex flex-col items-center">
        <div className="bg-white rounded-full p-6 shadow-lg mb-6 flex items-center justify-center">
          <Image src="/assets/brokenHome.png" alt="" width={120} height={120} unoptimized />
        </div>
        <h1 className="text-3xl font-bold mb-2 text-white">Ooops!</h1>
        <p className="text-gray-300 mb-6 text-center max-w-md">
          Page Not Found, The page you are looking for has either been moved, or is being worked on.
        </p>
        <Link href="/home" className={buttonVariants()}>
          Go Back Home
        </Link>
      </div>
    </div>
  );
}
