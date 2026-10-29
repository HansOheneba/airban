"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { Button, buttonVariants } from "@/components/ui/button";

const locations = ["Spintex, Accra", "East Legon", "Dzorwulu"];
const prices = ["GH₵ 100k - 200k", "GH₵ 200k - 500k", "GH₵ 500k+"];
const sellTypes = ["House", "Land"];

const selectClass =
  "w-full p-1 bg-transparent border border-slate-300 rounded-md focus:outline-none focus:ring-1 focus:ring-blue-400 text-black font-semibold";

function tabClass(active: boolean, corner: string) {
  return `px-4 sm:px-8 py-2 bg-white ${corner} transition-all duration-200 ${
    active ? "border-blue-400 border-b-4 text-blue-800" : "border-gray-300 border-b-2 hover:border-gray-400"
  }`;
}

export function HomeSearch() {
  const router = useRouter();
  const [mode, setMode] = useState<"buy" | "sell">("buy");
  const [sellType, setSellType] = useState(sellTypes[0]);
  const [confirming, setConfirming] = useState(false);

  return (
    <div className="w-full px-4 sm:px-0 max-w-4xl mx-auto">
      <div className="flex w-full sm:w-fit text-black font-semibold text-sm" role="tablist">
        <button type="button" role="tab" aria-selected={mode === "buy"} onClick={() => setMode("buy")} className={tabClass(mode === "buy", "rounded-tl-md")}>
          Buy
        </button>
        <button type="button" role="tab" aria-selected={mode === "sell"} onClick={() => setMode("sell")} className={tabClass(mode === "sell", "rounded-tr-md")}>
          Sell
        </button>
      </div>

      <div className="flex flex-col sm:flex-row flex-wrap items-stretch bg-white text-black text-sm rounded-b-md sm:rounded-tr-md shadow-sm border border-t-0 border-slate-200 p-3">
        <div className="flex flex-col sm:flex-row flex-wrap sm:flex-1 divide-y sm:divide-y-0 sm:divide-x divide-slate-200">
          {mode === "buy" ? (
            <>
              <div className="px-3 py-2 sm:py-0 flex-1">
                <label htmlFor="search-location" className="block text-slate-500 mb-1 text-xs">Location</label>
                <select id="search-location" className={selectClass}>
                  {locations.map((option) => <option key={option}>{option}</option>)}
                </select>
              </div>
              <div className="px-3 py-2 sm:py-0 flex-1">
                <label htmlFor="search-price" className="block text-slate-500 mb-1 text-xs">Price Range</label>
                <select id="search-price" className={selectClass}>
                  {prices.map((option) => <option key={option}>{option}</option>)}
                </select>
              </div>
            </>
          ) : (
            <div className="px-3 py-2 sm:py-0 flex-1">
              <label htmlFor="search-sell" className="block text-slate-500 mb-1 text-xs">What are you selling?</label>
              <select id="search-sell" value={sellType} onChange={(event) => setSellType(event.target.value)} className={selectClass}>
                {sellTypes.map((option) => <option key={option}>{option}</option>)}
              </select>
            </div>
          )}
        </div>
        <div className="border-t sm:border-t-0 sm:border-l border-slate-200 w-full sm:w-auto">
          <div className="p-4 sm:px-6 flex items-center h-full justify-center">
            {mode === "buy" ? (
              <Link href="/properties" className={buttonVariants()}>Browse Properties</Link>
            ) : (
              <Button onClick={() => setConfirming(true)}>List Property</Button>
            )}
          </div>
        </div>
      </div>

      {confirming && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/30 backdrop-blur-sm animate-in fade-in" onClick={() => setConfirming(false)}>
          <div role="dialog" aria-modal="true" aria-labelledby="list-title" className="mx-4 max-w-md rounded-lg bg-white p-6 shadow-lg animate-in zoom-in-95" onClick={(event) => event.stopPropagation()}>
            <h3 id="list-title" className="mb-4 text-lg font-semibold text-gray-900">Property Listing Form</h3>
            <p className="mb-6 text-gray-600">
              You are about to be redirected to a form to fill in the details of your {sellType.toLowerCase()}.
            </p>
            <div className="flex justify-end gap-3">
              <Button variant="outline" onClick={() => setConfirming(false)}>Cancel</Button>
              <Button
                onClick={() =>
                  router.push(`/contact?type=${encodeURIComponent("Selling a Property")}&note=${encodeURIComponent(`I'd like to list my ${sellType.toLowerCase()} with Airban Homes.`)}`)
                }
              >
                Continue
              </Button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
