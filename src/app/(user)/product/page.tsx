"use client";
import React from "react";
import { useRouter } from "next/navigation";
export default function Page() {
  const router = useRouter();
  //   just testing router
  return (
    <div>
      <button
        className="bg-blue-600 p-5"
        onClick={() => router.push("/product/123")}
      >Click to test</button>
    </div>
  );
}
