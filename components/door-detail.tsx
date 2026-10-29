"use client";

import { ChevronLeft, ChevronRight, Minus, Plus } from "lucide-react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { Button, buttonVariants } from "@/components/ui/button";
import { addToCart } from "@/lib/cart";
import type { Door } from "@/lib/types";
import { formatGhs, priceValue, toast } from "@/lib/utils";
import { Photo } from "@/components/photo";

const orientations = ["left", "right"];

export function DoorDetail({ door }: { door: Door }) {
  const router = useRouter();
  const images = [door.image || "/assets/placeholder.png"];
  const [active, setActive] = useState(0);
  const [quantity, setQuantity] = useState(1);
  const [orientation, setOrientation] = useState<string | null>(null);
  const [buying, setBuying] = useState(false);
  const inStock = door.stock > 0;
  const ready = orientation !== null && inStock;

  function add() {
    if (!orientation) return;
    addToCart({ id: door.id, name: door.name, price: door.price, image: door.image, orientation }, quantity);
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-airbanBlue via-white to-white text-black py-40">
      <div className="max-w-7xl mx-auto">
        <div className="flex justify-between items-center mb-8 px-5">
          <div className="text-sm text-white font-semibold flex items-center">
            <Link href="/doors" className="hover:underline">Our Doors</Link>
            <span className="mx-2">/</span>
            <span>{door.name}</span>
          </div>
          {images.length > 1 && (
            <div className="flex flex-col items-center gap-4">
              <div className="flex items-center gap-2 text-white">
                <span className="text-2xl font-bold">{String(active + 1).padStart(2, "0")}</span>
                <span>/</span>
                <span>{String(images.length).padStart(2, "0")}</span>
              </div>
              <div className="flex justify-center items-center gap-2 ml-4">
                <button className="p-2 hover:bg-airbanBlue/20 rounded" onClick={() => setActive((i) => (i - 1 + images.length) % images.length)} aria-label="Previous image">
                  <ChevronLeft className="w-5 h-5 text-white" />
                </button>
                <button className="p-2 hover:bg-airbanBlue/20 rounded" onClick={() => setActive((i) => (i + 1) % images.length)} aria-label="Next image">
                  <ChevronRight className="w-5 h-5 text-white" />
                </button>
              </div>
            </div>
          )}
        </div>

        <div className="grid lg:grid-cols-2 gap-12 items-start p-5">
          <div className="flex flex-col justify-between h-full space-y-6">
            <div className="space-y-10">
              <div className="space-y-2">
                <h1 className="text-4xl font-bold text-gray-900 mb-2">{door.name}</h1>
                <p className="text-gray-600 text-sm">{door.type} Door</p>
                <div className="flex flex-wrap items-center gap-3">
                  <p className="text-2xl font-semibold text-airbanBlue">{formatGhs(priceValue(door.price))}</p>
                  {inStock ? (
                    <span className="rounded-full bg-green-50 px-2.5 py-1 text-xs font-medium text-green-700">In stock</span>
                  ) : (
                    <span className="rounded-full bg-gray-100 px-2.5 py-1 text-xs font-medium text-gray-700">Out of stock</span>
                  )}
                </div>
              </div>
              <p className="text-gray-600 leading-relaxed">{door.description}</p>

              {inStock && (
                <>
                  <div className="space-y-2">
                    <h3 className="text-sm font-medium text-gray-700">Select Orientation</h3>
                    <div className="flex gap-2">
                      {orientations.map((option) => (
                        <button
                          key={option}
                          type="button"
                          aria-pressed={orientation === option}
                          onClick={() => setOrientation(option)}
                          className={`border rounded px-4 py-2 text-sm transition-colors ${
                            orientation === option ? "border-airbanBlue bg-airbanBlue/10 text-airbanBlue" : "border-gray-300 text-gray-700 hover:border-blue-400"
                          }`}
                        >
                          {option.charAt(0).toUpperCase() + option.slice(1)}
                        </button>
                      ))}
                    </div>
                  </div>

                  <div className="flex flex-col gap-2">
                    <h3 className="text-sm font-medium text-gray-700">Quantity</h3>
                    <div className="flex items-center border border-gray-300 rounded w-fit bg-white">
                      <button type="button" className="p-2 hover:bg-gray-100 disabled:text-gray-300" onClick={() => setQuantity((q) => Math.max(1, q - 1))} disabled={quantity <= 1} aria-label="Decrease quantity">
                        <Minus className="w-4 h-4" />
                      </button>
                      <span className="w-16 text-center" aria-live="polite">{quantity}</span>
                      <button
                        type="button"
                        className="p-2 hover:bg-gray-100 disabled:bg-gray-100 disabled:text-gray-300"
                        onClick={() => setQuantity((q) => (q < door.stock ? q + 1 : (toast("Maximum quantity reached"), q)))}
                        disabled={quantity >= door.stock}
                        aria-label="Increase quantity"
                      >
                        <Plus className="w-4 h-4" />
                      </button>
                    </div>
                    <p className="text-xs text-gray-500">{door.stock <= 2 ? `Only ${door.stock} left` : `${door.stock} in stock`}</p>
                  </div>
                </>
              )}
            </div>

            <div className="space-y-4 mt-12">
              {inStock ? (
                <>
                  <div className="flex items-center gap-4">
                    <Button
                      variant="outline"
                      className="w-32"
                      disabled={!ready || buying}
                      onClick={() => {
                        add();
                        toast("Added to cart!");
                      }}
                    >
                      Add to Cart
                    </Button>
                    <Button
                      className="w-32"
                      disabled={!ready || buying}
                      onClick={() => {
                        setBuying(true);
                        add();
                        router.push("/cart");
                      }}
                    >
                      {buying ? "Processing..." : "Buy Now"}
                    </Button>
                  </div>
                  {!orientation && <p className="text-xs text-airbanBlue">Select an orientation to continue.</p>}
                </>
              ) : (
                <div className="rounded-lg border border-gray-200 bg-white p-5 space-y-3">
                  <p className="font-medium text-gray-900">Currently out of stock</p>
                  <p className="text-sm text-gray-600">
                    This door is made in batches. Leave your details and we&apos;ll let you know as soon as the next batch is ready, usually within 3–4 weeks.
                  </p>
                  <Link
                    href={`/contact?type=${encodeURIComponent("Door quote")}&note=${encodeURIComponent(`Please let me know when the ${door.name} is back in stock.`)}`}
                    className={buttonVariants({ className: "w-fit" })}
                  >
                    Notify me when available
                  </Link>
                </div>
              )}
              <p className="text-xs text-gray-500">*All doors come with free delivery and installation in Accra</p>
            </div>
          </div>

          <div className="space-y-4 lg:min-h-[520px]">
            <div className="rounded-lg p-8 flex justify-center items-center h-[320px] sm:h-[420px]">
              <Photo key={images[active]} src={images[active]} alt={door.name} width={500} height={500} priority className="object-contain h-full max-h-full w-auto animate-in fade-in duration-300" />
            </div>
            {images.length > 1 && (
              <div className="flex gap-3 justify-center">
                {images.map((image, index) => (
                  <button
                    key={image}
                    type="button"
                    className={`w-16 h-20 border ${index === active ? "border-blue-500" : "border-gray-300"} rounded overflow-hidden`}
                    onClick={() => setActive(index)}
                    aria-label={`Select image ${index + 1}`}
                  >
                    <Photo src={image} alt="" width={64} height={80} className="w-full h-full object-cover" />
                  </button>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
