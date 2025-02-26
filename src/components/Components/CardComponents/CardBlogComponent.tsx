
import { Bookmark } from 'lucide-react'
import React from 'react'
import Image from 'next/image'
import Link from 'next/link'

interface BlogProp {
    id: string;
    tag: string;
    description: string;
    image: string;
    author: string;
    date: string;
    view: number;
    profile: string;
}

const CardBlogComponent = ({
    id,
    tag,
    description,
    image,
    author,
    date,
    view,
    profile
}: BlogProp) => {
    return (
        <div className="max-w-96 sm:w-64">
            <div className="relative">
                {/* Tag and Bookmark */}
                <div className="absolute top-4 left-4 z-10">
                    <div className="px-4 py-2 bg-white/80 backdrop-blur-sm rounded-lg text-sm">
                        {tag}
                    </div>
                </div>
                <div className="absolute top-4 right-4 z-10">
                    <button className="p-2 bg-white/80 backdrop-blur-sm rounded-lg hover:bg-white/90 transition-colors">
                        <Bookmark className="w-5 h-5" />
                    </button>
                </div>

                {/* Main Image */}
                <Link href={`/blog/${id}`}>
                    <Image
                        src={image}
                        alt="image"
                        width={800}
                        height={400}
                        className="w-full object-cover rounded-2xl"
                    />
                </Link>
            </div>

            <div className="p-4 space-y-4">
                <p className="text-gray-800 text-2xl text-wrap line-camp-2">{description}</p>

                <div className="flex items-center gap-3">
                    <div className="w-12 h-12 rounded-md overflow-hidden bg-gray-100">
                        <Image
                            src={profile}
                            alt="Author avatar"
                            width={48}
                            height={48}
                            className="w-full h-full object-cover"
                        />
                    </div>

                    <div className="flex flex-col sm:items-center gap-1">
                        <div className="flex items-center gap-2">
                            <span className="text-gray-500">By:</span>
                            <span className="font-medium underline text-xl">{author}</span>
                        </div>
                        <div className="justify-end text-gray-500 text-sm">
                            {date} • {view} views
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default CardBlogComponent
