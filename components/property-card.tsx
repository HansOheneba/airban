"use client";

import { Bath, Bed, Heart, MapPin, Square } from "lucide-react";
import Link from "next/link";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import type { Property } from "@/lib/types";
import { formatArea } from "@/lib/utils";
import { Photo } from "@/components/photo";

export function PropertyCard({ property }: { property: Property }) {
  const [saved, setSaved] = useState(false);

  return (
    <Link href={`/properties/${property.id}`} className="block group">
      <Card className="overflow-hidden hover:shadow-lg transition-shadow py-0 gap-0 h-full group-hover:ring-2 group-hover:ring-airbanBlue">
        <div className="relative">
          <Photo src={property.image} alt={property.title} width={600} height={400} sizes="(min-width: 1024px) 360px, (min-width: 768px) 50vw, 100vw" className="w-full h-48 object-cover bg-gray-100" />
          <Button
            variant="ghost"
            size="icon"
            className="absolute top-3 right-3 bg-white/80 hover:bg-white"
            aria-label={saved ? "Unsave property" : "Save property"}
            aria-pressed={saved}
            onClick={(event) => {
              event.preventDefault();
              event.stopPropagation();
              setSaved((value) => !value);
            }}
          >
            <Heart className={`w-4 h-4 ${saved ? "fill-red-500 text-red-500" : ""}`} />
          </Button>
        </div>
        <CardContent className="p-4">
          <h3 className="font-semibold mb-1">{property.title}</h3>
          <p className="text-gray-600 text-sm mb-3 flex items-center">
            <MapPin className="w-3 h-3 mr-1" />
            {property.address}
          </p>
          <div className="flex flex-wrap items-center gap-x-4 gap-y-1 text-sm text-gray-600">
            <div className="flex items-center">
              <Bed className="w-4 h-4 mr-1" />
              {property.bedrooms}
            </div>
            <div className="flex items-center">
              <Bath className="w-4 h-4 mr-1" />
              {property.baths}
            </div>
            <div className="flex items-center">
              <Square className="w-4 h-4 mr-1" />
              {formatArea(property.area)}
            </div>
          </div>
        </CardContent>
      </Card>
    </Link>
  );
}
