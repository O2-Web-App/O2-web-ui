import React from 'react'
import Image from 'next/image'
import Link from 'next/link'

interface CardBlogHorizontalProps {
    id: string
    tag: string
    date: string
    view: number
    title: string
    image: string
}

// Function to format date from "2025-02-25T05:20:22.000000Z" to "25 Feb 2025"
const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString("en-GB", {
        day: "2-digit",
        month: "short",
        year: "numeric",
    });
};

const CardBlogHorizontal = ({
    id,
    tag,
    date,
    view,
    title,
    image,
}: CardBlogHorizontalProps) => {
    return (
        <div className="w-full mx-auto py-4">
            <Link href={`/blog/${id}`} className="flex justify-between gap-4 items-start">
                {/* Image */}
                <div className="w-24 h-24 aspect-square rounded-lg overflow-hidden flex-shrink-0">
                    <Image
                        src={image}
                        alt={title}
                        width={1000}
                        height={1000}
                        className="w-full h-full object-cover"
                    />
                </div>

                {/* Content */}
                <div className="flex-1 space-y-1 w-full">
                    <div className="flex justify-between items-center gap-2">
                        <span className="text-sm font-medium bg-gray-200 p-1.5 max-w-32 rounded-lg">{tag}</span>
                    </div>

                    {/* Wrap date & views inside a div and align to end */}
                    <div className="flex justify-end text-xs text-gray-500">
                        <span>{formatDate(date)} • {view} views</span>
                    </div>

                    <h1 className="text-xl font-semibold tracking-tight truncate max-w-[250px]">{title}</h1>
                </div>
            </Link>
        </div>
    )
}

export default CardBlogHorizontal;
