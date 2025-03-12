import React from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, Navigation } from "swiper/modules";

type Feedback = {
    id: number;
    userName: string;
    description: string;
    userProfile: string;
    rate: number;
    days: number;
};

type FeedbackSliderProps = {
    feedback: Feedback[];
};

const FeedbackSlide: React.FC<FeedbackSliderProps> = ({ feedback }) => {
    return (
        <section className="w-full rounded-[10px]">
            <div className="w-full rounded-[10px]">
                <ul className="h-[180px] w-full rounded-[10px]">
                    <Swiper
                        className="h-full w-full rounded-[10px]"
                        pagination={{ type: "bullets", clickable: true }}
                        autoplay={true}
                        loop={true}
                        modules={[Autoplay, Navigation]}
                    >
                        {feedback.map(({ id, userProfile, userName ,description }) => (
                            <SwiperSlide key={id}>
                                <div className="flex gap-2">
                                    <div
                                        className="rounded-full w-10 h-10 flex items-center justify-center bg-cover bg-center"
                                        style={{
                                            backgroundImage: `url(${userProfile})`,
                                            border: "1px solid #559F34"
                                        }}
                                    ></div>
                                    <div className="flex flex-col gap-2">
                                        <h1 className="text-base font-light">{userName}</h1>
                                        {/*<div className="flex gap-2 items-center">*/}
                                        {/*    <div className="flex gap-1">*/}
                                        {/*        {[...Array(5)].map((_, i) => (*/}
                                        {/*            <FaStar*/}
                                        {/*                key={i}*/}
                                        {/*                className={i < rate ? "text-amber-500 w-3 h-3" : "text-gray-400 w-3 h-3"}*/}
                                        {/*            />*/}
                                        {/*        ))}*/}
                                        {/*    </div>*/}
                                        {/*    <hr className="w-[2px] h-4 bg-blue-300" />*/}
                                        {/*    <p className="text-sm font-light text-gray-500">{days} ថ្ងៃមុន</p>*/}
                                        {/*</div>*/}
                                        <p className="text-sm font-light lowercase">{description}</p>
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

export default FeedbackSlide;