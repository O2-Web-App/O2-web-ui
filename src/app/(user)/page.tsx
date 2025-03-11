'use client';

import React, {useState} from 'react';
import SplashScreenComponent from "@/components/home/SplashScreenComponent";
import dataSlider from "@/lib/slider_data.json";
import BannerSlide from "@/components/home/BannerSlide";
import {Input} from "@/components/ui/input";
import {FiSearch} from "react-icons/fi";
import CategoryComponent from "@/components/home/CategoryComponent";
import RecommendationComponent from "@/components/home/RecommendationComponent";
import FeedbackSlide from "@/components/home/FeedbackSlide";
import feedback from "@/lib/feedback_data.json";
import {FeedbackDrawerComponent} from "@/components/home/FeedbackDrawerComponent";

export default function Page() {
    const [showSplash, setShowSplash] = useState(true);

    const handleSplashComplete = () => {
        setShowSplash(false);
    };

    return (
        <div className="relative">
            {/* Splash Screen */}
            {showSplash && <SplashScreenComponent onComplete={handleSplashComplete}/>}

            {/* main section */}
            {!showSplash && (
                <section className="flex min-h-screen flex-col px-5 gap-7">

                    {/* Search section*/}
                    <section className=" sticky top-[70px] z-50 bg-background_color py-4">
                        <section className=" relative ">
                            <Input className=" pl-[45px] bg-white rounded-3xl border-gray-100 text-lg h-[45px]"
                                   type="text" placeholder="ស្វែងរកនៅទីនេះ...."/>
                            <FiSearch className=" absolute top-2 left-0 text-gray-400 w-7 h-7 ml-3"/>
                        </section>
                    </section>

                    {/* Banner Slide */}
                    <BannerSlide data={dataSlider}/>

                    {/* Category section*/}
                    <CategoryComponent/>

                    {/* Recommendation section */}
                    <RecommendationComponent/>

                    {/*    Feedback section*/}
                    <section className="flex flex-col">
                        <div className="flex justify-between items-end">
                            <h1 className="text-2xl font-normal">មតិយោបល់របស់អតិថិជន</h1>
                            <FeedbackDrawerComponent/>
                        </div>
                        <div className="flex gap-3 overflow-auto scrollbar-hide py-3">
                            <FeedbackSlide feedback={feedback}/>
                        </div>
                    </section>

                </section>
            )}
        </div>
    )
}