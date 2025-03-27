import {FaHeart} from "react-icons/fa";
import {GoClock} from "react-icons/go";
import {HiOutlineFire} from "react-icons/hi2";
import React from "react";
import {useGetPreOrderProductQuery} from "@/app/redux/service/product";
import {DataType} from "@/app/types/ProductDetail";
import {useRouter} from "next/navigation";
import {SkeletonProductComponent} from "@/components/home/SkeletonProductComponent";
import CardProductComponent from "@/components/home/CardProductComponent";

export default function PreOrderProductComponent() {
    // Fetch pre-order products using the RTK Query hook
    const {data, isLoading, error} = useGetPreOrderProductQuery();
    const env = process.env.NEXT_PUBLIC_O2_API_URL;
    const router = useRouter();

    // Handle loading and error states
    if (error) return <div>Error loading pre-orders</div>;

    // console.log("  DATA PREORDER : ", data)

    // Extract the products array from the nested data structure
    const preorders = data?.data?.data || [];

    const handleSeeMore = () => {
        router.push('/categories-product/preorder');
    };

    return (
        <section>
            {
                isLoading ? (
                    <SkeletonProductComponent/>
                ) : (
                    <section className="flex flex-col">
                        <div className="flex justify-between items-end">
                            <h1 className="text-2xl font-normal">បញ្ជាទិញផលិតផលជាមុន</h1>
                            <p
                                className="font-light text-primary-light cursor-pointer hover:underline"
                                onClick={handleSeeMore}
                            >
                                មើលបន្ថែម
                            </p>
                        </div>
                        <div className="flex gap-3 overflow-auto scrollbar-hide py-3">
                            {preorders.map((preorder: DataType) => (
                                <CardProductComponent
                                    key={preorder.uuid}
                                    uuid={preorder.uuid}
                                    single_image={preorder.single_image}
                                    name={preorder.name}
                                    discounted_price={preorder.discounted_price}
                                    price={preorder.price}
                                    category_name={preorder.category_name}
                                    created_at={preorder.created_at}
                                />
                            ))}
                        </div>
                    </section>
                )
            }
        </section>
    );
}