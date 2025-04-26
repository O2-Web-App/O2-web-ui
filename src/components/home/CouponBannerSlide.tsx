"use client";

import React from "react";
import {toast} from "sonner";
import {Autoplay, Navigation} from "swiper/modules";
import {Swiper, SwiperSlide} from "swiper/react";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import {useGetCouponBannerProductQuery} from "@/app/redux/service/product";
import SkeletonBannerDiscount from "@/components/home/SkeletonBannerDiscount";
import {Copy} from "lucide-react";
import Image from "next/image";

const CouponBannerSlide: React.FC = () => {
    const {data, isLoading, error} = useGetCouponBannerProductQuery();

    // Handle error state
    if (error) {
        return (
            <section className="w-full rounded-[10px]">
                <div className="w-full h-[180px] rounded-[10px] bg-red-100">
                    Error loading banners
                </div>
            </section>
        );
    }

    // Extract coupons from API response
    const coupons = data?.data || [];

    // Function to handle copying the coupon code
    const handleCopy = (code: string) => {
        navigator.clipboard.writeText(code).then(() => {
            toast.success("បានចម្លងកូដជោគជ័យ!", {
                style: {
                    color: "white",
                    background: "#22bb33",
                    border: "1px solid #22bb33",
                },
            });
        }).catch(() => {
            toast.error("ការចម្លងកូដមិនបានជោគជ័យ!", {
                style: {
                    color: "white",
                    background: "#e0391f",
                    border: "1px solid #e0391f",
                },
            });
        });
    };

    return (
        <section className="w-full">
            {isLoading ? (
                <SkeletonBannerDiscount/>
            ) : (
                coupons.length === 0 ? (
                    <></>
                ) : (
                    <section className="w-full rounded-[10px] mb-10">
                        <div className="w-full rounded-[10px]">
                            <ul className="h-[180px] w-full rounded-[10px]">
                                <Swiper
                                    className="h-full w-full rounded-[10px]"
                                    pagination={{type: "bullets", clickable: true}}
                                    autoplay={true}
                                    loop={true}
                                    modules={[Autoplay, Navigation]}
                                >
                                    {coupons.map((coupon: { uuid: React.Key; image: string; code: string }) => (
                                        <SwiperSlide className="relative" key={coupon.uuid}>
                                            {/* Image component for the banner */}
                                            <Image
                                                className="w-full h-full rounded-[10px] bg-cover"
                                                src={`${process.env.NEXT_PUBLIC_O2_API_URL}${coupon.image}`}
                                                unoptimized
                                                height={100}
                                                width={100} // Adjust width based on your design
                                                alt={`Coupon banner ${coupon.code}`}
                                            />

                                            {/* Overlay with copy button */}
                                            <div className="absolute inset-0 z-50 flex items-center justify-start">
                                                <div
                                                    onClick={() => handleCopy(coupon.code)}
                                                    className="absolute top-2 right-2 flex gap-2 items-center bg-white/30 backdrop-blur-[3px] px-2 py-1 rounded-2xl cursor-pointer"
                                                >
                                                    <p className="text-sm ">Copying a coupon code</p>
                                                    <div
                                                        className="w-auto h-auto text-gray-600 bg-white/60 shadow-md p-2 rounded-full"
                                                        aria-label="Copy link"
                                                    >
                                                        <Copy className="w-4 h-4 text-primary-light"/>
                                                    </div>
                                                </div>
                                            </div>
                                        </SwiperSlide>
                                    ))}
                                </Swiper>
                            </ul>
                        </div>
                    </section>
                )
            )}
        </section>
    );
};

export default CouponBannerSlide;