"use client";

import { CheckCircle2, Minus, Plus, ShoppingCart, Trash2 } from "lucide-react";
import Link from "next/link";
import { Fragment, useEffect, useState } from "react";
import { Button, buttonVariants } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/field";
import { submitEnquiry } from "@/lib/actions";
import { readCart, writeCart, type CartItem } from "@/lib/cart";
import { formatGhs, priceValue } from "@/lib/utils";
import { Photo } from "@/components/photo";

function deliveryDate() {
  const date = new Date();
  date.setDate(date.getDate() + 5);
  return date.toLocaleDateString("en-GB", { day: "2-digit", month: "short", year: "numeric" });
}

function EmptyCart({ ordered }: { ordered: boolean }) {
  return (
    <div className="flex flex-col items-center justify-center min-h-[60vh] text-center px-4 animate-in fade-in">
      {ordered ? <CheckCircle2 className="w-16 h-16 mb-4 text-green-600" /> : <ShoppingCart className="w-16 h-16 mb-4" />}
      <h2 className="text-2xl sm:text-3xl font-semibold mb-2 text-gray-700">{ordered ? "Order request sent" : "Your cart is empty"}</h2>
      <p className="text-gray-500 mb-6 text-sm sm:text-base max-w-md">
        {ordered ? "Thank you! Our team will call you to confirm your order and arrange delivery." : "Looks like you haven’t added anything yet."}
      </p>
      <Link href="/doors" className={buttonVariants()}>Browse Doors</Link>
    </div>
  );
}

export default function CartPage() {
  const [items, setItems] = useState<CartItem[] | null>(null);
  const [checkingOut, setCheckingOut] = useState(false);
  const [pending, setPending] = useState(false);
  const [error, setError] = useState("");
  const [ordered, setOrdered] = useState(false);

  useEffect(() => {
    const sync = () => setItems(readCart());
    sync();
    window.addEventListener("storage", sync);
    window.addEventListener("cartUpdated", sync);
    return () => {
      window.removeEventListener("storage", sync);
      window.removeEventListener("cartUpdated", sync);
    };
  }, []);

  if (items === null) return <main className="min-h-screen bg-gradient-to-b from-airbanBlue via-white to-white" />;

  const setQuantity = (index: number, quantity: number) => {
    if (quantity < 1) return;
    writeCart(items.map((item, i) => (i === index ? { ...item, quantity } : item)));
  };
  const remove = (index: number) => writeCart(items.filter((_, i) => i !== index));
  const total = items.reduce((sum, item) => sum + priceValue(item.price) * item.quantity, 0);

  async function placeOrder(formData: FormData) {
    if (!items) return;
    setPending(true);
    setError("");
    const lines = items.map((item) => `${item.name} (${item.orientation || "any"}) × ${item.quantity} — ${formatGhs(priceValue(item.price) * item.quantity)}`);
    formData.set("enquiry_type", "Door quote");
    formData.set("additional_info", [...lines, `Total: ${formatGhs(total)}`].join("\n"));
    const result = await submitEnquiry({ ok: false, message: "" }, formData);
    setPending(false);
    if (!result.ok) {
      setError(result.message);
      return;
    }
    writeCart([]);
    setOrdered(true);
    window.scrollTo({ top: 0, behavior: "smooth" });
  }

  if (items.length === 0) {
    return (
      <main className="min-h-screen bg-gradient-to-b from-airbanBlue via-white to-white text-black py-40">
        <EmptyCart ordered={ordered} />
      </main>
    );
  }

  return (
    <main className="min-h-screen bg-gradient-to-b from-airbanBlue via-white to-white text-black py-40">
      <div className="max-w-7xl mx-auto p-6">
        <div className="grid lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2">
            <div className="mb-6 text-white">
              <h1 className="text-2xl font-semibold">Cart</h1>
              <p className="text-sm mt-1 opacity-90">
                {items.length} ITEM{items.length !== 1 ? "S" : ""}
              </p>
            </div>
            <div className="space-y-6 rounded-xl bg-white/90 p-2 shadow-sm">
              {items.map((item, index) => (
                <Fragment key={`${item.id}-${item.orientation}`}>
                  <div className="flex gap-4 p-4">
                    <div className="w-20 h-24 flex-shrink-0 relative">
                      <Photo src={item.image} alt={item.name} width={80} height={96} className="h-full w-full object-contain" />
                    </div>
                    <div className="flex-1">
                      <h3 className="font-medium text-gray-900 mb-2">{item.name}</h3>
                      {item.orientation && (
                        <div className="space-y-1 text-sm text-gray-600 mb-4">
                          <span className="font-medium">Orientation:</span> <span className="capitalize">{item.orientation}</span>
                        </div>
                      )}
                      <div className="flex flex-wrap items-center justify-start gap-2">
                        <div className="flex items-center border bg-white">
                          <Button variant="ghost" size="sm" className="h-8 w-8 p-0" onClick={() => setQuantity(index, item.quantity - 1)} disabled={item.quantity <= 1} aria-label="Decrease quantity">
                            <Minus className="h-4 w-4" />
                          </Button>
                          <span className="px-3 py-1 text-sm">{item.quantity}</span>
                          <Button variant="ghost" size="sm" className="h-8 w-8 p-0" onClick={() => setQuantity(index, item.quantity + 1)} aria-label="Increase quantity">
                            <Plus className="h-4 w-4" />
                          </Button>
                        </div>
                        <Button variant="ghost" className="text-red-500 hover:text-red-700 text-sm" onClick={() => remove(index)}>
                          <Trash2 className="h-4 w-4 mr-1" />
                          Remove
                        </Button>
                      </div>
                    </div>
                    <div className="text-right">
                      <p className="font-semibold text-gray-900">
                        {formatGhs(priceValue(item.price))}
                        {item.quantity > 1 && <span className="block text-sm font-normal text-gray-600">x {item.quantity}</span>}
                      </p>
                    </div>
                  </div>
                  {index < items.length - 1 && <hr className="border-t border-gray-300 my-2" />}
                </Fragment>
              ))}
            </div>
            <div className="mt-6 text-xs text-gray-500 italic">* Free installation and delivery available within Accra.</div>
          </div>

          <div className="lg:col-span-1">
            <Card className="rounded-none lg:sticky lg:top-28">
              <CardContent className="p-6">
                <h2 className="text-lg font-semibold mb-4">Order Summary</h2>
                <div className="space-y-3 mb-4">
                  <div className="flex justify-between text-sm"><span>Sub Total</span><span>{formatGhs(total)}</span></div>
                  <div className="flex justify-between text-sm"><span>Discount</span><span>GHS 0.00</span></div>
                  <div className="flex justify-between text-sm"><span>Installation</span><span className="text-airbanBlue">Free</span></div>
                </div>
                <hr />
                <div className="flex justify-between font-semibold text-base my-4"><span>TOTAL</span><span>{formatGhs(total)}</span></div>
                <div className="mb-6">
                  <p className="text-sm text-gray-600 mb-1">Estimated Delivery by</p>
                  <p className="font-medium">{deliveryDate()}</p>
                </div>

                {checkingOut ? (
                  <form action={placeOrder} className="space-y-3 animate-in fade-in slide-in-from-top-2">
                    <p className="text-sm font-medium">Your details</p>
                    <div className="grid grid-cols-2 gap-2">
                      <Input name="first_name" placeholder="First name" required autoComplete="given-name" />
                      <Input name="last_name" placeholder="Last name" required autoComplete="family-name" />
                    </div>
                    <Input name="email" type="email" placeholder="Email" required autoComplete="email" />
                    <Input name="phone" type="tel" placeholder="Phone" required autoComplete="tel" />
                    {error && <p className="text-sm text-red-500" role="alert">{error}</p>}
                    <Button type="submit" className="w-full" disabled={pending}>{pending ? "Sending..." : "Place Order Request"}</Button>
                    <button type="button" className="w-full text-xs text-gray-500 hover:underline" onClick={() => setCheckingOut(false)}>Cancel</button>
                  </form>
                ) : (
                  <Button className="w-full" onClick={() => setCheckingOut(true)}>Proceed to Checkout</Button>
                )}
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </main>
  );
}
