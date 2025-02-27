import React from "react";
import { IoIosArrowBack } from "react-icons/io";
import Cart from "@/components/ProductDetail/Cart/Cart";
import CarouselImage from "@/components/ProductDetail/CarouselImage/CarouselImage";
import ProductDetail from "@/components/ProductDetail/ProductDetail";
export type ParamProps = {
  params: Promise<{ id: string }>;
};

export default function Page({ params }: ParamProps) {
  const resolvedParams = React.use(params); // unwrap the promise
  const productId = resolvedParams.id;
  return (
    <section className=" mt-[40px]  ">
      {/* header */}
      <div className="w-[90%] mx-auto flex justify-between items-center">
        <IoIosArrowBack className="text-primary text-[30px]" />
        <Cart />
      </div>
      {/* image section */}
      <CarouselImage />
      {/* product detail */}
      <ProductDetail />
    </section>
  );
}
