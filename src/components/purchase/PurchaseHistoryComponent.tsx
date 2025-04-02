"use client";

import {ArrowLeft} from "lucide-react";
import {useRouter} from "next/navigation";
import {useGetOrdersQuery} from "@/app/redux/service/orderHistory";
import {Order} from "@/app/types/purchaseHistoryType";
import OrderItem from "@/components/Components/OrderHistory";
import dayjs from "dayjs";
import isToday from "dayjs/plugin/isToday";
import isYesterday from "dayjs/plugin/isYesterday";
import "dayjs/locale/km";
import SkeletonPurchaseHistory from "@/components/purchase/SkeletonPurchaseHistory";

dayjs.extend(isToday);
dayjs.extend(isYesterday);

export default function PurchaseHistoryComponent() {

    const {data} = useGetOrdersQuery();
    const orders = data?.data || [];
    const router = useRouter();

    // Group orders based on their creation date
    const todayOrders = orders.filter((order: Order) =>
        dayjs(order.created_at).isToday()
    );
    const yesterdayOrders = orders.filter((order: Order) =>
        dayjs(order.created_at).isYesterday()
    );
    const earlierOrders = orders.filter(
        (order: Order) =>
            !dayjs(order.created_at).isToday() &&
            !dayjs(order.created_at).isYesterday()
    );

    dayjs.locale("km");

    // Group orders by formatted date
    const groupOrdersByDate = (orders: Order[]) => {
        return orders.reduce((groups: Record<string, Order[]>, order) => {
            const date = dayjs(order.created_at).format("DD MMMM YYYY");
            if (!groups[date]) {
                groups[date] = [];
            }
            groups[date].push(order);
            return groups;
        }, {});
    }


    return (

        <section className="max-w-md mx-auto min-h-screen">
            <section className="sticky top-0 z-10 border-b">
                <div className="flex items-center p-4">
                    <ArrowLeft size={24} onClick={() => router.back()}/>
                    <h1 className="flex-1 text-center text-xl font-medium">
                        ប្រវត្តិការទិញ
                    </h1>
                </div>
            </section>


            <div className="px-4 py-2">
                {orders.length === 0 ? (
                    <SkeletonPurchaseHistory/>
                ) : (
                    <>
                        {todayOrders.length > 0 && (
                            <section className={` flex flex-col gap-2 my-5`}>
                                <div className="text-gray-500 text-sm "><span
                                    className="text-lg text-black/70">ថ្ងៃនេះ</span></div>
                                {todayOrders.map((order: Order) => (
                                    <OrderItem key={order.uuid} uuid={order.uuid} order={order}/>
                                ))}
                            </section>
                        )}

                        {yesterdayOrders.length > 0 && (
                            <section className={` flex flex-col gap-2 my-5`}>
                                <div className="text-gray-500 text-sm"><span
                                    className="text-lg text-black/70">ថ្ងៃម្សិលមិញ</span></div>
                                {yesterdayOrders.map((order: Order) => (
                                    <OrderItem key={order.uuid} uuid={order.uuid} order={order}/>
                                ))}
                            </section>
                        )}

                        {earlierOrders.length > 0 && (
                            <>
                                {Object.entries(groupOrdersByDate(earlierOrders)).map(
                                    ([date, orders]) => (
                                        <div key={date} className={` flex flex-col gap-2 my-5`}>
                                            <div className="text-gray-500 text-sm  "><span
                                                className="text-lg text-black/70">{date}</span></div>
                                            {orders.map((order: Order) => (
                                                <OrderItem key={order.uuid} uuid={order.uuid} order={order}/>
                                            ))}
                                        </div>
                                    )
                                )}
                            </>
                        )}
                    </>
                )}
            </div>
        </section>

    )
}