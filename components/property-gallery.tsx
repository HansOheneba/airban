"use client";

import { ChevronLeft, ChevronRight, X } from "lucide-react";
import { useEffect, useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Photo } from "@/components/photo";

export function PropertyGallery({ images, title }: { images: string[]; title: string }) {
  const [active, setActive] = useState(0);
  const [zoomed, setZoomed] = useState(false);
  const count = images.length;
  const go = (step: number) => setActive((index) => (index + step + count) % count);

  useEffect(() => {
    if (!zoomed) return;
    const onKey = (event: KeyboardEvent) => {
      if (event.key === "Escape") setZoomed(false);
      if (event.key === "ArrowRight") setActive((index) => (index + 1) % count);
      if (event.key === "ArrowLeft") setActive((index) => (index - 1 + count) % count);
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [zoomed, count]);

  return (
    <Card className="bg-transparent border-none shadow-none">
      <CardContent className="p-4">
        <div className="flex justify-center gap-2 mb-4 overflow-x-auto pb-2">
          {images.map((image, index) => (
            <button
              key={image}
              type="button"
              onClick={() => setActive(index)}
              aria-label={`Show image ${index + 1}`}
              className={`flex-shrink-0 w-20 h-20 rounded-lg overflow-hidden border-2 transition-colors ${index === active ? "border-blue-500" : "border-gray-200"}`}
            >
              <Photo src={image} alt={`Property thumbnail ${index + 1}`} width={80} height={80} className="w-full h-full object-cover bg-white/20" />
            </button>
          ))}
        </div>

        <div className="flex justify-center items-center relative h-64 sm:h-80 mb-4">
          {count > 1 && (
            <button type="button" onClick={() => go(-1)} className="absolute left-2 top-1/2 -translate-y-1/2 bg-black/30 hover:bg-black/70 text-white p-2 rounded-full transition-colors z-10" aria-label="Previous image">
              <ChevronLeft className="w-5 h-5" />
            </button>
          )}
          <button type="button" className="cursor-zoom-in h-full" onClick={() => setZoomed(true)} aria-label="Enlarge image">
            <Photo key={images[active]} src={images[active]} alt={`${title}, view ${active + 1}`} width={1200} height={800} priority sizes="(min-width: 1152px) 600px, 100vw" className="object-cover rounded-lg mx-auto h-full w-auto aspect-[3/2] bg-white/20 animate-in fade-in duration-300" />
          </button>
          {count > 1 && (
            <button type="button" onClick={() => go(1)} className="absolute right-2 top-1/2 -translate-y-1/2 bg-black/30 hover:bg-black/70 text-white p-2 rounded-full transition-colors z-10" aria-label="Next image">
              <ChevronRight className="w-5 h-5" />
            </button>
          )}
        </div>

        <div className="flex justify-center gap-2 mt-4">
          {images.map((image, index) => (
            <button
              key={image}
              type="button"
              onClick={() => setActive(index)}
              aria-label={`Go to image ${index + 1}`}
              className={`w-3 h-3 rounded-full transition-colors ${index === active ? "bg-airbanBlue" : "bg-gray-300"}`}
            />
          ))}
        </div>
      </CardContent>

      {zoomed && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/90 p-4 animate-in fade-in" onClick={() => setZoomed(false)} role="dialog" aria-modal="true" aria-label={title}>
          <button type="button" className="absolute right-4 top-4 rounded-full p-2 text-white hover:bg-white/10" aria-label="Close">
            <X className="h-6 w-6" />
          </button>
          <Photo src={images[active]} alt={title} width={1600} height={1067} sizes="100vw" className="max-h-full max-w-full w-auto h-auto rounded-lg object-contain cursor-zoom-out" />
        </div>
      )}
    </Card>
  );
}
