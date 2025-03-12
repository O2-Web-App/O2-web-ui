import { FaHeart } from "react-icons/fa";
import { GoClock } from "react-icons/go";
import { HiOutlineFire } from "react-icons/hi2";
import React from "react";
import { useGetRecommendationProductQuery} from "@/app/redux/service/product";
import {DataType} from "@/app/types/ProductDetail";
import {useRouter} from "next/navigation";

export default function RecommendationComponent() {
    // Fetch recommended products using the RTK Query hook
    const { data, isLoading, error } = useGetRecommendationProductQuery();
    const env = process.env.NEXT_PUBLIC_O2_API_URL;
    const router = useRouter();

    // Handle loading and error states
    if (isLoading) return <div>Loading recommendations...</div>;
    if (error) return <div>Error loading recommendations</div>;

    console.log("  DATA : " , data)

    // Extract the products array from the nested data structure
    const recommendations = data?.data?.data || [];

    return (
        <section className="flex flex-col">
            <div className="flex justify-between items-end">
                <h1 className="text-2xl font-normal">ត្រូវបានណែនាំសម្រាប់អ្នក</h1>
                <p className="font-light text-primary-light cursor-pointer hover:underline">មើលបន្ថែម</p>
            </div>
            <div className="flex gap-3 overflow-auto scrollbar-hide py-3">
                {recommendations.map((recommendation: DataType) => (
                    <div
                        key={recommendation.uuid}
                        onClick={() => router.push(`/product/${recommendation.uuid}`)}
                        className="relative min-w-[290px] h-[240px] rounded-xl bg-white p-3 cursor-pointer hover:shadow-sm hover:transform hover:-translate-y-1 transition-transform duration-200"
                    >
                        <div
                            className="rounded-xl w-full h-[60%] flex items-center justify-center bg-cover bg-center"
                            style={{
                                backgroundImage: `url(${env+recommendation.single_image})`
                            }}
                        />
                        <div
                            className="absolute top-5 right-5 bg-white flex justify-center items-center rounded-[6px] w-7 h-7"
                        >
                            <FaHeart className="w-5 h-5 text-primary-light" />
                        </div>
                        <div className="flex flex-col gap-1 justify-start">
                            <p className="text-base font-light mt-2">{recommendation.name}</p>
                            <div className="flex justify-start items-center gap-1">
                                <p className="font-light text-gray-500 text-sm">
                                    ${recommendation.discounted_price || recommendation.price}
                                </p>
                                <span className="w-1 h-1 rounded-full bg-accent"></span>
                                <p className="font-light text-gray-500 text-sm">{recommendation.category_name}</p>
                            </div>
                            <div className="flex items-center gap-2">
                                <div className="flex justify-start items-center gap-1">
                                    <GoClock className="text-gray-500 w-[14px] h-[14px]" />
                                    <p className="font-light text-gray-500 text-sm">
                                        {new Date(recommendation.created_at).toLocaleDateString()}
                                    </p>
                                </div>
                                <span className="w-1 h-1 rounded-full bg-primary"></span>
                                <div className="flex justify-start items-center gap-1">
                                    <HiOutlineFire className="text-gray-500 w-[14px] h-[14px]" />
                                    <p className="font-light text-gray-500 text-sm">បានលក់</p>
                                    <p className="font-light text-gray-500 text-sm">{recommendation.stock}</p>
                                </div>
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        </section>
    );
}