import Image from "next/image";
import Link from "next/link";
import { buttonVariants } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { articleCovers } from "@/lib/content";
import { listArticles } from "@/lib/db";

export const metadata = { title: "News" };

export default function NewsPage() {
  const articles = listArticles();

  return (
    <div className="bg-gradient-to-b from-airbanBlue via-white to-white text-black py-40">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="text-center">
          <h1 className="text-4xl font-bold text-gray-900 sm:text-5xl">Newsroom</h1>
          <p className="mt-4 text-xl max-w-2xl mx-auto">Stay updated with the latest insights, trends, and stories from our team</p>
        </div>
      </div>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {articles.map((article) => (
            <Card key={article.slug} className="overflow-hidden hover:shadow-lg transition-shadow duration-300 h-full py-0 gap-0">
              <div className="relative h-48 w-full">
                <Image src={articleCovers[article.slug] ?? "/assets/placeholder.png"} alt={article.title} fill sizes="(min-width: 1024px) 33vw, (min-width: 768px) 50vw, 100vw" className="object-cover" />
              </div>
              <div className="p-6 flex-grow">
                <h2 className="text-xl font-semibold text-gray-900 mb-3 line-clamp-2">{article.title}</h2>
                <p className="text-gray-600 text-sm line-clamp-3">{article.excerpt}</p>
              </div>
              <div className="flex items-center p-6 pt-0 mt-auto">
                <Link href={`/news/${article.slug}`} className={buttonVariants({ variant: "outline", className: "w-full" })}>
                  Read More
                </Link>
              </div>
            </Card>
          ))}
        </div>
      </div>
    </div>
  );
}
