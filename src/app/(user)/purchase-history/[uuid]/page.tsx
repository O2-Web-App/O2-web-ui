"use client";

import React from "react";
import { ChevronLeft } from "lucide-react";
import Image from "next/image";
import { useParams } from "next/navigation";
import { useGetOrdersByUuidQuery } from "@/app/redux/service/orderHistory";
import { OrderItem } from "@/app/types/purchaseHistoryType";
import { useRouter } from "next/navigation";
import Loading from "@/components/Components/Loading";

export default function OrderDetail() {
  const params = useParams();
  const uuid = params?.uuid as string;

  const { data, error, isLoading } = useGetOrdersByUuidQuery({ uuid });
  const router = useRouter();

  if (isLoading) {
    return <div className="flex justify-center items-center h-screen"><Loading /></div>;
  }

  if (error) {
    return <div>Error fetching order details.</div>;
  }

  const order = data?.data;
  const products = order?.items || [];

  return (
    <div className="p-2.5 min-h-screen">
      {/* Header Section */}
      <div className="flex items-center p-3 py-4 border-b">
        <ChevronLeft size={24} onClick={() => router.back()} className="cursor-pointer text-primary" />
        <h1 className="flex-1 text-center text-2xl font-meduim">ព័ត៌មាននៃការបញ្ជាទិញ</h1>
      </div>

      {/* Order Info */}
      <div className="mt-5 text-sm text-gray-600 px-2 border-b pb-4">
        <p className="text-lg">កូដបញ្ជា #: <span className="text-black font-medium text-lg pb-3">{order?.order_code}</span></p>
        <p className="text-lg">ទីតាំង: <span className="text-black font-medium text-lg">{order?.delivery_method}</span></p>
      </div>

      {/* Product List */}
      <div className="mt-5 space-y-4">
        {products?.map((item: OrderItem) => (
          <div key={item?.product_uuid} className="flex justify-between items-center p-2 rounded-lg ">
            <div className="flex gap-5 items-center">
              <Image src={
                item.image?.startsWith("http")
                  ? item.image
                  : item.image
                    ? `${process.env.NEXT_PUBLIC_O2_API_URL}${item.image}`
                    : "/assets/placeholder.png"
              }
                alt={item?.product_name} width={50} height={50} className="rounded-full object-over w-14 h-14" />
              <div className="items-center">
                <div>
                  <p className="text-black font-medium w-[200px]">{item?.product_name}</p>
                  <p className="text-gray-500 text-sm">{item?.quantity}, Price</p>
                </div>
              </div>
              <div className="flex justify-end gap-2">
                <span className="text-gray-500">X {item.quantity}</span>
                <p className="text-black font-meduim">
                  ${item?.discounted_price}
                </p>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Summary Section */}
      <div className="mt-6 border-t pt-4 space-y-4 text-sm px-2">
        <div className="flex justify-between">
          <p className="text-lg">ការដឹកជញ្ជូន:</p>
          <p className="text-black text-lg">${order?.delivery_fee || 0}</p>
        </div>
        <div className="flex justify-between ">
          <p className="text-lg">បញ្ចុះតម្លៃ:</p>
          <p className="text-black text-lg">${order?.total_discount || 0}</p>
        </div>
        <div className="flex justify-between font-semibold">
          <p className="text-lg">តម្លៃសរុប:</p>
          <p className="text-primary text-lg">${order?.total_price || 0}</p>
        </div>
      </div>

    </div>
  );
}
