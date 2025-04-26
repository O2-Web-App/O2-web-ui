'use client';

import React, {useState, useEffect} from 'react';
import {useRouter} from "next/navigation";
import SplashScreenComponent from "@/components/home/SplashScreenComponent";
import {Input} from "@/components/ui/input";
import {FiSearch} from "react-icons/fi";
import CategoryComponent from "@/components/home/CategoryComponent";
import RecommendationComponent from "@/components/home/RecommendationComponent";
import PopularProductComponent from "@/components/home/PopularProductComponent";
import PreOrderProductComponent from "@/components/home/PreOrderProductComponent";
import DiscountProductComponent from "@/components/home/DiscountProductComponent";
import FilterComponent from "@/components/home/FilterComponent";
import FeedbackComponent from "@/components/home/FeedbackComponent";
import DiscountBannerSlide from "@/components/home/BannerSlide";
import CouponBannerSlide from "@/components/home/CouponBannerSlide";
import {useGetUserQuery} from "@/app/redux/service/user";

export default function HomePageComponent() {
    const [showSplash, setShowSplash] = useState(false); // Splash screen state
    const [splashCompleted, setSplashCompleted] = useState(false); // Track splash completion
    const [searchValue, setSearchValue] = useState('');
    const router = useRouter();
    const {data: userData} = useGetUserQuery();

    // Check if splash has been shown on component mount
    useEffect(() => {
        const hasSeenSplash = localStorage.getItem('hasSeenSplash');
        if (!hasSeenSplash) {
            setShowSplash(true); // Show splash only if not seen before
        } else {
            setSplashCompleted(true); // Skip splash and go straight to content
        }
    }, []);

    const handleSplashComplete = () => {
        setShowSplash(false);
        setSplashCompleted(true); // Mark splash as completed to render main content
        localStorage.setItem('hasSeenSplash', 'true'); // Mark splash as seen
    };

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setSearchValue(e.target.value);
    };

    const handleKeyPress = (e: React.KeyboardEvent<HTMLInputElement>) => {
        if (e.key === 'Enter') {
            router.push(`/search&filter/${"s-" + searchValue}`);
        }
    };

    return (
        <section className="relative">
            {/* Splash Screen */}
            {showSplash && <SplashScreenComponent onComplete={handleSplashComplete}/>}

            {/* Main section - Only render after splash is completed */}
            {splashCompleted && (
                <section className="flex min-h-screen flex-col px-5">
                    {/* Search section */}
                    <section className="sticky top-[65px] z-50 bg-background_color py-4">
                        <section className="relative">
                            <Input
                                className="pl-[45px] bg-white rounded-3xl border-gray-100 text-lg h-[45px]"
                                type="text"
                                placeholder="ស្វែងរកនៅទីនេះ...."
                                value={searchValue}
                                onChange={handleInputChange}
                                onKeyPress={handleKeyPress}
                            />
                            <FiSearch className="absolute top-2 left-0 text-gray-400 w-7 h-7 ml-3"/>
                            <FilterComponent/>
                        </section>
                    </section>

                    {/* Discount Banner Slide */}
                    <DiscountBannerSlide/>

                    {/* Category section */}
                    <CategoryComponent/>

                    {/* Recommendation section */}
                    <RecommendationComponent userData={userData}/>

                    {/* Popular section */}
                    <PopularProductComponent userData={userData}/>

                    {/* Order section */}
                    <PreOrderProductComponent userData={userData}/>

                    {/* Coupon Banner Slide */}
                    <CouponBannerSlide/>

                    {/*Discount section*/}
                    <DiscountProductComponent userData={userData} />


                    {/* Feedback section */}
                    <FeedbackComponent/>
                </section>
            )}
        </section>
    );
}