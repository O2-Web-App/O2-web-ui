import React from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, Navigation } from "swiper/modules";
import { useGetFeedbackQuery } from "@/app/redux/service/product";
import Image from "next/image";

type Feedback = {
    id: string;
    userName: string;
    description: string;
    userProfile: string;
    created_at: string;
};

const FeedbackSlide: React.FC = () => {
    const { data, error, isLoading } = useGetFeedbackQuery();
    const env = process.env.NEXT_PUBLIC_O2_API_URL;

    if (isLoading) return <div>Loading...</div>;
    if (error) return <div>Error loading feedback</div>;

    // Function to calculate and format time difference
    const getTimeAgo = (createdAt: string): string => {
        const now = new Date();
        const createdDate = new Date(createdAt);
        const diffMs = now.getTime() - createdDate.getTime();

        const minutes = Math.floor(diffMs / (1000 * 60));
        const hours = Math.floor(diffMs / (1000 * 60 * 60));
        const days = Math.floor(diffMs / (1000 * 60 * 60 * 24));
        const years = Math.floor(diffMs / (1000 * 60 * 60 * 24 * 365));

        if (years > 0) {
            return `${years} ឆ្នាំមុន`; // years ago
        } else if (days > 0) {
            return `${days} ថ្ងៃមុន`; // days ago
        } else if (hours > 0) {
            return `${hours} ម៉ោងមុន`; // hours ago
        } else {
            return `${minutes} នាទីមុន`; // minutes ago
        }
    };

    const feedback: Feedback[] = data?.data.map((item: any) => ({
        id: item.uuid,
        userName: item.username,
        description: item.message,
        userProfile: item.avatar,
        created_at: item.created_at,
    })) || [];

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
                        {feedback.map(
                            ({ id, userProfile, userName, description, created_at }: Feedback) => (
                                <SwiperSlide key={id}>
                                    <div className="flex gap-3">
                                        <Image
                                            className="w-[40px] h-[40px] rounded-full bg-cover border border-primary"
                                            width={100}
                                            height={100}
                                            unoptimized
                                            src={`${env}${userProfile}`}
                                            alt={userName}
                                        />
                                        <div className="flex flex-col gap-2">
                                            <div className={` flex flex-col`}>
                                                <h1 className="text-base font-medium uppercase">{userName}</h1>
                                                <p className="text-sm font-light text-gray-500">
                                                    ផ្តល់មតិកែលម្អ {getTimeAgo(created_at)}
                                                </p>
                                            </div>
                                            <p className="text-sm font-light lowercase">{description}</p>
                                        </div>
                                    </div>
                                </SwiperSlide>
                            )
                        )}
                    </Swiper>
                </ul>
            </div>
        </section>
    );
};

export default FeedbackSlide;