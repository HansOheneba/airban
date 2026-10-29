"use client";

import Autoplay from "embla-carousel-autoplay";
import useEmblaCarousel from "embla-carousel-react";
import { useCallback, useEffect, useState } from "react";
import { Photo } from "@/components/photo";

const arrowClass =
  "appearance-none bg-transparent touch-manipulation cursor-pointer border-2 border-gray-300 w-14 h-14 z-10 rounded-full text-gray-600 flex items-center justify-center disabled:text-gray-400 hover:bg-gray-50 transition-colors";

function Arrow({ direction, ...props }: { direction: "prev" | "next" } & React.ComponentProps<"button">) {
  const d =
    direction === "prev"
      ? "M355.66 11.354c13.793-13.805 36.208-13.805 50.001 0 13.785 13.804 13.785 36.238 0 50.034L201.22 266l204.442 204.61c13.785 13.805 13.785 36.239 0 50.044-13.793 13.796-36.208 13.796-50.002 0a5994246.277 5994246.277 0 0 0-229.332-229.454 35.065 35.065 0 0 1-10.326-25.126c0-9.2 3.393-18.26 10.326-25.2C172.192 194.973 332.731 34.31 355.66 11.354Z"
      : "M176.34 520.646c-13.793 13.805-36.208 13.805-50.001 0-13.785-13.804-13.785-36.238 0-50.034L330.78 266 126.34 61.391c-13.785-13.805-13.785-36.239 0-50.044 13.793-13.796 36.208-13.796 50.002 0 22.928 22.947 206.395 206.507 229.332 229.454a35.065 35.065 0 0 1 10.326 25.126c0 9.2-3.393 18.26-10.326 25.2-45.865 45.901-206.404 206.564-229.332 229.52Z";
  return (
    <button type="button" className={arrowClass} aria-label={direction === "prev" ? "Previous slide" : "Next slide"} {...props}>
      <svg className="w-[35%] h-[35%]" viewBox="0 0 532 532" aria-hidden="true">
        <path fill="currentColor" d={d} />
      </svg>
    </button>
  );
}

export type Slide = { src: string; alt: string; title?: string; location?: string; badge?: string };

export function PropertyCarousel({ slides }: { slides: Slide[] }) {
  const [emblaRef, emblaApi] = useEmblaCarousel({ loop: true, align: "center" }, [
    Autoplay({ delay: 3000, stopOnInteraction: false, stopOnMouseEnter: true }),
  ]);
  const [selected, setSelected] = useState(0);

  const onSelect = useCallback(() => {
    if (emblaApi) setSelected(emblaApi.selectedScrollSnap());
  }, [emblaApi]);

  useEffect(() => {
    if (!emblaApi) return;
    onSelect();
    emblaApi.on("select", onSelect).on("reInit", onSelect);
    return () => {
      emblaApi.off("select", onSelect).off("reInit", onSelect);
    };
  }, [emblaApi, onSelect]);

  return (
    <div className="w-full">
      <div className="overflow-hidden" ref={emblaRef}>
        <div className="flex touch-pan-y touch-pinch-zoom">
          {slides.map((slide, index) => (
            <div
              key={`${slide.src}-${index}`}
              className={`transform-gpu flex-[0_0_auto] min-w-0 transition-opacity duration-300 ${index === selected ? "opacity-100" : "opacity-60"}`}
            >
              <div className="relative rounded-[1.8rem] h-56 sm:h-80 w-[85vw] max-w-[1000px] overflow-hidden mx-2">
                <Photo className="h-full w-full object-cover object-center bg-gray-100" src={slide.src} alt={slide.alt} width={1000} height={320} sizes="(min-width: 1176px) 1000px, 85vw" />
                {slide.badge && (
                  <span className="absolute top-4 left-4 rounded-full bg-white px-3 py-1 text-xs font-semibold tracking-wide text-airbanBlue shadow">
                    {slide.badge}
                  </span>
                )}
                {slide.title && (
                  <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-black/70 to-transparent px-6 pb-5 pt-12 text-white">
                    <p className="font-semibold">{slide.title}</p>
                    {slide.location && <p className="text-sm text-white/80">{slide.location}</p>}
                  </div>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>
      <div className="flex justify-center gap-5 mt-7 max-w-3xl mx-auto px-4">
        <div className="grid grid-cols-2 gap-2.5 items-center">
          <Arrow direction="prev" onClick={() => emblaApi?.scrollPrev()} />
          <Arrow direction="next" onClick={() => emblaApi?.scrollNext()} />
        </div>
      </div>
    </div>
  );
}
