"use client";

import React from "react";
import {toast} from "sonner"; // Import toast library

// Swiper components, modules and styles
import {Autoplay, Navigation} from "swiper/modules";
import {Swiper, SwiperSlide} from "swiper/react";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import {useGetCouponBannerProductQuery} from "@/app/redux/service/product";
import SkeletonBannerDiscount from "@/components/home/SkeletonBannerDiscount";
import {Copy} from "lucide-react";

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
        <section>
            {isLoading ? (
                <SkeletonBannerDiscount/>
            ) : (
                <section className={`w-full`}>
                    {coupons.length === 0 ? (
                        <></>
                    ) : (
                        <section className="w-full rounded-[10px] mb-10">
                            <div className="w-full rounded-[10px]">
                                <ul className="h-[180px] w-full rounded-[10px]">
                                    <Swiper
                                        className={`h-full w-full rounded-[10px]`}
                                        pagination={{type: "bullets", clickable: true}}
                                        autoplay={true}
                                        loop={true}
                                        modules={[Autoplay, Navigation]}
                                    >
                                        {coupons.map((coupon: {
                                            uuid: React.Key;
                                            image: string;
                                            code: string;
                                        }) => (
                                            <SwiperSlide className={`relative`} key={coupon.uuid}>
                                                <div
                                                    className="h-full w-full absolute left-0 top-0"
                                                    style={{
                                                        background: `url(${process.env.NEXT_PUBLIC_O2_API_URL + coupon.image}) center center / cover scroll no-repeat`,
                                                    }}
                                                ></div>
                                                <div
                                                    className="h-full w-full absolute left-0 top-0 bg-black opacity-20"></div>
                                                <div className="relative z-10 h-full flex items-center justify-start">
                                                    <div
                                                        onClick={() => handleCopy(coupon.code)}
                                                        className="absolute top-2 right-2 flex gap-2 items-center bg-white/30 backdrop-blur-[3px] px-2 py-1 rounded-2xl ">
                                                        <p className={` `}> Copying a coupon code </p>
                                                        <div
                                                            className="w-auto h-auto  text-gray-600 bg-background_color opacity-60 shadow-md p-2 rounded-full"
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
                    )}
                </section>
            )}
        </section>
    );
};

export default CouponBannerSlide;