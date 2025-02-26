"use client";
import React from "react";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  type CarouselApi,
} from "@/components/ui/carousel";

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
  ];

  return (
    <div className="mx-auto ">
      <Carousel setApi={setApi} className="w-full " opts={{ loop: true }}>
        <CarouselContent className="my-5">
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

      {/* dot */}
      <div className="flex w-full justify-center space-x-2 ">
        {" "}
        {imagesUrl.map((_, index) => (
          <div
            key={index}
            className={` w-3 h-3  rounded-full transition-colors duration-300 ${
              index + 1 === current ? "bg-primary" : "bg-primary opacity-20"
            }`}
          ></div>
        ))}
      </div>
    </div>
  );
}
