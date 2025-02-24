import { CartProps } from "@/app/types/CartItemCount";
import React from "react";
import { MdOutlineShoppingCart } from "react-icons/md";
export default function Cart({ total_cart_items }: CartProps) {
  return (
    <section>
      {total_cart_items === 0 ? (
        <div className=" p-2 rounded-md bg-secondary">
          <MdOutlineShoppingCart className="text-[20px] text-background_color" />
        </div>
      ) : (
        <div className=" p-2 rounded-md  bg-secondary">
          <MdOutlineShoppingCart className="text-[20px] text-background_color" />
          <div className="absolute top-7 right-3 flex items-center justify-center w-6 h-6 rounded-full bg-accent text-background_color text-center">
            {total_cart_items}
          </div>
        </div>
      )}
    </section>
  );
}
