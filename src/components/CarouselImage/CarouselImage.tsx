"use client";
import React from "react";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  type CarouselApi,
} from "@/components/ui/carousel";
import { Card, CardContent } from "../ui/card";
export default function CarouselImage() {
  const [api, setApi] = React.useState<CarouselApi>();
  const [current, setCurrent] = React.useState(0);
  const [count, setCount] = React.useState(0);

  React.useEffect(() => {
    if (!api) {
      return;
    }

    setCount(api.scrollSnapList().length);
    setCurrent(api.selectedScrollSnap() + 1);

    api.on("select", () => {
      setCurrent(api.selectedScrollSnap() + 1);
    });
  }, [api]);

  // mock up data

  const imagesUrl = [
    "https://www.nestle.com/sites/default/files/styles/product_showcase_image/public/nescafe-classic-462-new.png.webp?itok=pf6CYcNM",
    "https://www.nestle.com/sites/default/files/styles/product_showcase_image/public/nescafe-gold-blend-alta-rica-462-new.png.webp?itok=gp7NZN7u",
    "https://www.nestle.com/sites/default/files/styles/product_showcase_image/public/nescafe-gold-new-462-new.png.webp?itok=E18BKwa9",
    "https://www.nestle.com/sites/default/files/styles/product_showcase_image/public/nescafe-gold-caramel-latte-462-new.png.webp?itok=2RkejXtz",
  ];

  return (
    <div className="mx-auto ">
      <Carousel setApi={setApi} className="w-full " opts={{ loop: true }}>
        <CarouselContent className="mt-5">
          {imagesUrl.map((url: string, index: number) => (
            <CarouselItem key={index}>
              <div className="w-full mx-auto">
                <img
                  src={`${url}`}
                  alt=""
                  className="w-full h-full object-cover"
                />
              </div>
            </CarouselItem>
          ))}
        </CarouselContent>
      </Carousel>
      <div className="py-2 text-center text-sm text-muted-foreground">
        Slide {current} of {count}
      </div>
    </div>
  );
}
