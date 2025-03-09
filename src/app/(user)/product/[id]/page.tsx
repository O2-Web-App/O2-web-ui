import React from "react";
import { IoIosArrowBack } from "react-icons/io";
import Cart from "@/components/ProductDetail/Cart/Cart";
import CarouselImage from "@/components/ProductDetail/CarouselImage/CarouselImage";
import ProductDetail from "@/components/ProductDetail/ProductDetail";
export type ParamProps = {
  params: { id: string };
};

export default function page({ params }: ParamProps) {
  const productUUID = params.id;
  return (
    <section >
      {/* header */}
      <div className="w-[90%] mx-auto flex justify-between items-center">
        <IoIosArrowBack className="text-primary text-[30px]" />
        <Cart />
      </div>
      {/* image section */}
      <CarouselImage uuid={productUUID} />
      {/* product detail */}
      <ProductDetail uuid={productUUID} />
    </section>
  );
}
