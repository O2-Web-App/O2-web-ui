"use client";
import { useAppSelector } from "@/app/redux/hooks";
import { MdOutlineShoppingCart } from "react-icons/md";
export default function Cart() {
  const total_cart_items = useAppSelector((state) => state.counter.value);
  return (
    <section>
      <div className="relative p-2 rounded-md bg-secondary">
        {" "}
        {/* ✅ Add `relative` positioning */}
        <MdOutlineShoppingCart className="text-[20px] text-background_color" />
        {/* ✅ Show item count only when greater than 0 */}
        {total_cart_items > 0 && (
          <div className="absolute -top-2 -right-2 flex items-center justify-center w-6 h-6 rounded-full bg-accent text-background_color text-center">
            {total_cart_items}
          </div>
        )}
      </div>
    </section>
  );
}
