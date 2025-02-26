import React from "react";
import { IoIosArrowBack } from "react-icons/io";
import Cart from "@/components/Cart/Cart";
import CarouselImage from "@/components/CarouselImage/CarouselImage";
import ProductDetail from "@/components/ProductDetail/ProductDetail";
export type ParamProps = {
  params: Promise<{ id: string }>;
};

export default function page({ params }: ParamProps) {
  const resolvedParams = React.use(params); // unwrap the promise
  const productId = resolvedParams.id;
  return (
    <section className="w-[90%] mx-auto mt-[40px]  ">
      {/* header */}
      <div className="w-full flex justify-between items-center">
        <IoIosArrowBack className="text-primary text-[30px]" />
        <Cart />
      </div>
      {/* image section */}
      <CarouselImage />
      <ProductDetail />
    </section>
  );
}
