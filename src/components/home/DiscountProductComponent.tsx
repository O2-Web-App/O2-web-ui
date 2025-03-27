import {FaHeart} from "react-icons/fa";
import {GoClock} from "react-icons/go";
import {HiOutlineFire} from "react-icons/hi2";
import React from "react";
import {useGetDiscountProductQuery} from "@/app/redux/service/product";
import {DataType} from "@/app/types/ProductDetail";
import {useRouter} from "next/navigation";
import {SkeletonProductComponent} from "@/components/home/SkeletonProductComponent";

export default function DiscountProductComponent() {
    // Fetch discount products using the RTK Query hook
    const {data, isLoading, error} = useGetDiscountProductQuery();
    const env = process.env.NEXT_PUBLIC_O2_API_URL;
    const router = useRouter();

    // Handle loading and error states
    if (error) return <div>Error loading discounts</div>;

    // Extract the products array from the nested data structure
    const discounts = data?.data || [];

    // Function to calculate time difference with Khmer language
    const getTimeDifference = (createdAt: string) => {
        const now = new Date();
        const createdDate = new Date(createdAt);
        const diffMs = now.getTime() - createdDate.getTime();

        const minutes = Math.floor(diffMs / (1000 * 60));
        const hours = Math.floor(diffMs / (1000 * 60 * 60));
        const days = Math.floor(diffMs / (1000 * 60 * 60 * 24));
        const months = Math.floor(diffMs / (1000 * 60 * 60 * 24 * 30.44));
        const years = Math.floor(diffMs / (1000 * 60 * 60 * 24 * 365.25));

        if (years > 0) return `${years} ឆ្នាំមុន`; // "years ago"
        if (months > 0) return `${months} ខែមុន`; // "months ago"
        if (days > 0) return `${days} ថ្ងៃមុន`; // "days ago"
        if (hours > 0) return `${hours} ម៉ោងមុន`; // "hours ago"
        if (minutes > 0) return `${minutes} នាទីមុន`; // "minutes ago"
        return 'ឥឡូវនេះ'; // "Just now"
    };

    const handleSeeMore = () => {
        router.push('/categories-product/discount');
    };

    return (
        <section>
            {isLoading ? (
                <SkeletonProductComponent/>
            ) : (
                <section className="flex flex-col">
                    <div className="flex justify-between items-end">
                        <h1 className="text-2xl font-normal">ប្រម៉ូសិន និងការបញ្ចុះតម្លៃ</h1>
                        <p
                            className="font-light text-primary-light cursor-pointer hover:underline"
                            onClick={handleSeeMore}
                        >
                            មើលបន្ថែម
                        </p></div>
                    <div className="flex flex-col gap-3 overflow-auto scrollbar-hide py-3">
                        {discounts.map((discount: DataType) => (
                            <div
                                key={discount.uuid}
                                onClick={() => router.push(`/product/${discount.uuid}`)}
                                className="relative max-w-[450px] h-[300px] rounded-xl bg-white p-3 cursor-pointer hover:shadow-sm hover:transform hover:-translate-y-1 transition-transform duration-200"
                            >
                                <div
                                    className="rounded-xl w-full h-[65%] flex items-center justify-center bg-cover bg-center"
                                    style={{
                                        backgroundImage: `url(${env}${discount.single_image})` // Fixed URL concatenation
                                    }}
                                />
                                <div
                                    className="absolute top-5 left-5 bg-primary flex justify-center items-center rounded-[6px] w-auto h-7 px-3 py-2"
                                >
                                    <p className="text-white">បញ្ចុះតម្លៃ {discount.discounted_price}%</p>
                                </div>
                                <div
                                    className="absolute top-5 right-5 bg-white flex justify-center items-center rounded-[6px] w-7 h-7"
                                >
                                    <FaHeart className="w-5 h-5 text-primary-light"/>
                                </div>
                                <div className="flex flex-col gap-1 justify-start">
                                    <p className="text-base font-light mt-2">{discount.name}</p>
                                    <div className="flex justify-start items-center gap-1">
                                        <p className="font-light text-gray-500 text-sm">
                                            ${discount.price}
                                        </p>
                                        <span className="w-1 h-1 rounded-full bg-accent"></span>
                                        <p className="font-light text-gray-500 text-sm">{discount.category_name}</p>
                                    </div>
                                    <div className="flex items-center gap-2">
                                        <div className="flex justify-start items-center gap-1">
                                            <GoClock className="text-gray-500 w-[14px] h-[14px]"/>
                                            <p className="font-light text-gray-500 text-sm">
                                                {getTimeDifference(discount.created_at)}
                                            </p>
                                        </div>
                                        <span className="w-1 h-1 rounded-full bg-primary"></span>
                                        <div className="flex justify-start items-center gap-1">
                                            <HiOutlineFire className="text-gray-500 w-[14px] h-[14px]"/>
                                            <p className="font-light text-gray-500 text-sm">បានលក់</p>
                                            <p className="font-light text-gray-500 text-sm">{discount.stock}</p>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                </section>
            )}
        </section>
    );
}