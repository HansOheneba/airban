import { ArrowLeft } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { buttonVariants } from "@/components/ui/button";
import { articleCovers } from "@/lib/content";
import { getArticle } from "@/lib/db";

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const article = getArticle(slug);
  if (!article) notFound();
  return { title: article.title, description: article.excerpt };
}

const prose =
  "[&>h2]:text-2xl [&>h2]:font-semibold [&>h2]:text-gray-900 [&>h2]:mt-6 [&>h2]:mb-3 [&>p]:text-gray-700 [&>p]:leading-relaxed [&>p]:mb-4";

function BackLink() {
  return (
    <Link href="/news" className={buttonVariants({ variant: "ghost", className: "gap-2 px-0 hover:bg-transparent hover:underline" })}>
      <ArrowLeft className="h-4 w-4" />
      Back to Newsroom
    </Link>
  );
}

export default async function ArticlePage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const article = getArticle(slug);
  if (!article) notFound();

  const blocks = article.body.split("\n\n").filter(Boolean);

  return (
    <div className="bg-gradient-to-b from-airbanBlue to-gray-50 text-black pt-40 pb-10">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-4 text-white [&_a]:text-white">
        <BackLink />
      </div>
      <div className="bg-white">
        <article className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <header className="mb-8">
            <h1 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-6 leading-tight">{article.title}</h1>
            <div className="relative h-64 md:h-96 w-full mb-8 rounded-lg overflow-hidden">
              <Image src={articleCovers[article.slug] ?? "/assets/placeholder.png"} alt={article.title} fill priority sizes="(min-width: 896px) 896px, 100vw" className="object-cover" />
            </div>
          </header>
          <div className={prose}>
            {blocks.map((block) =>
              block.startsWith("## ") ? <h2 key={block}>{block.slice(3)}</h2> : <p key={block}>{block}</p>,
            )}
          </div>
          <footer className="mt-12 pt-8 border-t border-gray-200">
            <div className="flex flex-wrap gap-4 justify-between items-center">
              <BackLink />
              <div className="text-sm text-gray-500">Published on {article.publishedOn}</div>
            </div>
          </footer>
        </article>
      </div>
    </div>
  );
}
