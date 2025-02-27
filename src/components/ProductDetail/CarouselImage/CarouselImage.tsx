"use client";
import React, { useEffect, useState } from "react";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  type CarouselApi,
} from "@/components/ui/carousel";
import { useGetProductDetailByUUIDQuery } from "@/app/redux/service/product";
import { ProductDetail } from "@/app/types/ProductDetail";
import { url } from "inspector";

export default function CarouselImage({ uuid }: { uuid: string }) {
  const [api, setApi] = useState<CarouselApi | null>(null);
  const [current, setCurrent] = useState<number | null>(null);
  const [isMounted, setIsMounted] = useState(false); // ✅ Track hydration

  // get prodcut detail
  const productDetailData = useGetProductDetailByUUIDQuery({
    uuid: uuid,
  });

  const result = productDetailData?.data?.data;

  const imageBaseUrl = process.env.NEXT_PUBLIC_O2_API_URL;

  useEffect(() => {
    setIsMounted(true); // ✅ Ensures the component only renders on the client
  }, []);

  useEffect(() => {
    if (!api) return;

    setCurrent(api.selectedScrollSnap() + 1);

    api.on("select", () => {
      setCurrent(api.selectedScrollSnap() + 1);
    });
  }, [api]);

  // 🔥 **Fix Hydration Mismatch**
  if (!isMounted) {
    return <div className="w-full h-[300px] bg-gray-200 animate-pulse"></div>; // ✅ Placeholder during hydration
  }

  return (
    <div className="mx-auto">
      <Carousel setApi={setApi} className="w-full" opts={{ loop: true }}>
        <CarouselContent className="my-5">
          {result?.images.map((image: string, index: number) => (
            <CarouselItem key={index}>
              <div className="w-full mx-auto">
                <img
                  src={imageBaseUrl + image}
                  alt=""
                  className="w-full h-full object-cover"
                />
              </div>
            </CarouselItem>
          ))}
        </CarouselContent>
      </Carousel>

      {/* dot */}
      <div className="flex w-full justify-center space-x-2">
        {result?.images.map((_ : string,index: number) => (
          <div
            key={index}
            className={`w-3 h-3 rounded-full transition-colors duration-300 ${
              index + 1 === current ? "bg-primary" : "bg-primary opacity-20"
            }`}
          ></div>
        ))}
      </div>
    </div>
  );
}
