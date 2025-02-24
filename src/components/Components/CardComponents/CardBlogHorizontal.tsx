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

const CardBlogHorizontal = ({
    id,
    tag,
    date,
    view,
    title,
    image,
}: CardBlogHorizontalProps) => {
    return (
        <div className="w-full mx-auto py-4 ">
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
                <div className="flex-1 space-y-4 w-full ">
                    <div className="flex justify-between items-center gap-2 ">
                        <span className="text-sm font-medium bg-gray-200 p-1.5 max-w-24 rounded-lg">{tag}</span>
                        <span className="text-xs text-gray-500">{date} • {view} views</span>
                    </div>

                    <h1 className="text-xl font-semibold tracking-tight truncate max-w-[200px]">{title}</h1>
                </div>
            </Link>
        </div>
    )
}

export default CardBlogHorizontal
