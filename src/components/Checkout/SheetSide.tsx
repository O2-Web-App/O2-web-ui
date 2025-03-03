import React from "react";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";

import { IoCartOutline } from "react-icons/io5";
export default function SheetSide() {
  return (
    <div className="rounded-lg bg-primary p-4 flex justify-center items-center text-card_color text-body space-x-3 ">
      <IoCartOutline className="text-title" />
      <p>បន្ថែមទៅកន្ត្រក</p>
    </div>
  );
}
