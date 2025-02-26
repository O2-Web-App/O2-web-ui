import React from "react";
import { FaHeart } from "react-icons/fa";
export default function ProductDetail() {
  return (
    <div className="bg-card_color p-4 my-5 rounded-tr-[40px] rounded-tl-[40px] overflow-auto">
      {/* first section */}
      <div className="flex justify-between">
        {/* price */}
        <div className="flex justify-center items-center ">
          <p className="text-title text-accent pr-2">$4.00</p>
          <p className="text-description text-[16px] line-through">$6.00</p>
        </div>
        {/* hearticon */}
        <div className="relative">
          <div className="rounded-full h-[30px] w-[30px] bg-primary opacity-20 flex items-center justify-center"></div>
          <FaHeart className="text-primary absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2" />
        </div>
      </div>
      {/* title */}
      <p className="text-title">ប៉េងប៉ោះ</p>
    </div>
  );
}
