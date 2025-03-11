"use client";

import React from "react";

// Swiper components, modules and styles
import {
    Autoplay, Navigation,
    // Pagination
} from "swiper/modules";
import {Swiper, SwiperSlide} from "swiper/react";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";

// Our custom button component
// import SliderButtons from "@/components/home/SliderButton";
import {Button} from "@/components/ui/button";

type Slide = {
    id: number;
    title: string;
    tagline: string;
    image: string;
    buttons: ButtonProps[];
}

type ButtonProps = {
    id: number;
    text: string;
    link: string;
    type: string;
}

type DemoSliderProps = {
    data: Slide[];
}



const BannerSlide: React.FC<DemoSliderProps> = ({data}) => {
    return (
        <section className="w-full rounded-[10px]">
            <div className=" w-full rounded-[10px]">
                <ul className="h-[180px] w-full rounded-[10px]">
                    <Swiper
                        className={`h-full w-full rounded-[10px]`}
                        // navigation
                        pagination={{type: "bullets", clickable: true}}
                        autoplay={true}
                        loop={true}
                        modules={[Autoplay, Navigation]}
                    >
                        {data.map(
                            (
                                {
                                    id,
                                    image,
                                    // tagline,
                                    // title,
                                    // buttons
                                }) => (
                                <SwiperSlide key={id}>
                                    <div
                                        className="h-full w-full absolute left-0 top-0"
                                        style={{
                                            background: `url(${image}) center center / cover scroll no-repeat`,
                                        }}
                                    ></div>
                                    <div className="h-full w-full absolute left-0 top-0 bg-black opacity-20"></div>
                                    <div className="relative z-10 h-full flex items-center justify-start">
                                        <div className=" flex flex-col gap-2 pl-10">
                                            <p className="text-white text-5xl font-bold">20%<span
                                                className=" text-lg "> OFF</span></p>
                                            <p className="text-sm text-white">
                                                on your first purchase
                                            </p>
                                            <Button
                                                className=" border bg-background border-dashed border-white text-white text-sm">
                                                Use code : FIRSTORDER
                                            </Button>
                                            {/*{buttons.length > 0 ? (*/}
                                            {/*    <p className=" bg-gray-800 inline-block px-9 py-2 rounded-full text-white mt-10 lg:mt-20">*/}
                                            {/*        <SliderButtons buttons={buttons} />*/}
                                            {/*    </p>*/}
                                            {/*) : null}*/}
                                        </div>
                                    </div>
                                </SwiperSlide>
                            ))}
                    </Swiper>
                </ul>
            </div>
        </section>
    );
};



export default BannerSlide;
