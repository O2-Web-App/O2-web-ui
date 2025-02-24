
import React from 'react'
import Image from 'next/image'
import { Bookmark, PlayCircle } from 'lucide-react'


export type ParamProps = {
    params: {
        uuid: string
    }
}


export const sliderData = [
    {
        id: 1,
        category: 'Healthy food',
        title: 'Learn how to enjoy healthy meals without spending hours in the kitchen!',
        image: '/assets/healthy-food.jpg',
        author: 'Mason Eduard',
        date: '23 Jan 2025',
        views: 1049,
        profile: '/assets/blog.jpg',
        content:
            'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Vivamus ... (rest of article content)',
        relatedVideos: [
            {
                id: 'vid1',
                title: 'Healthy Breakfast Ideas',
                thumbnail: '/assets/video-thumb1.jpg',
            },
            {
                id: 'vid2',
                title: '5 Easy Meal Preps',
                thumbnail: '/assets/video-thumb2.jpg',
            },
        ],
    },
    {
        id: 2,
        category: 'Travel',
        title: 'Discover lesser-known attractions and explore Europe like a local.',
        image: '/assets/healthy-food.jpg',
        author: 'Alexandra Doe',
        date: '15 Feb 2025',
        views: 876,
        profile: '/assets/blog.jpg',
        content:
            'Let me be real with you all: I hate cooking. Every part of it. I hate grocery shopping, prepping, the actual cooking part, and cleaning up. I get so disappointed when I go through all the effort to try a new recipe, follow the directions perfectly, and what I get is meh But eating healthy is important to me because it helps me feel my best and fuels my athletic performance.In addition to working here at UVA Health, writing about healthcare, I am a certified fitness instructor. For the purposes of this post, I define healthy eating as getting a good mix of lean protein, whole grains, vegetables, and fruit. Here are my tips to eat healthy without cooking — or at least cooking very little.',
        relatedVideos: [],
    },
    // ... add more items with the same structure
]


export default function BlogDetailPage({ params }: ParamProps) {
    const { uuid } = params
    const postId = parseInt(uuid, 10)

    const post = sliderData.find((item) => item.id === postId)

    if (!post) {
        return <div className="p-4">Post not found.</div>
    }

    return (
        <article className="pb-20">
            {/* Header Info */}
            <div className="flex justify-between items-start p-4">
                <span className="text-sm text-gray-500">{post.category}</span>
                <span className="text-sm text-gray-500">
                    {post.date} • {post.views} views
                </span>
            </div>

            {/* Main Image */}
            <div className="relative w-full aspect-[4/3]">
                <Image
                    src={post.image || '/placeholder.svg'}
                    alt={post.title}
                    fill
                    className="object-cover"
                    priority
                />
            </div>

            {/* Related Videos Scroll */}
            <div className="px-4 mt-4">
                <div className="flex gap-3 overflow-x-auto pb-4 scrollbar-hide">
                    {post.relatedVideos?.map((video) => (
                        <div key={video.id} className="flex-shrink-0 w-[120px]">
                            <div className="relative aspect-square rounded-xl overflow-hidden mb-2">
                                <Image
                                    src={video.thumbnail || '/placeholder.svg'}
                                    alt={video.title}
                                    fill
                                    className="object-cover"
                                />
                                <div className="absolute inset-0 flex items-center justify-center">
                                    <PlayCircle className="w-8 h-8 text-white" />
                                </div>
                            </div>
                            <p className="text-xs line-clamp-2">{video.title}</p>
                        </div>
                    ))}
                </div>
            </div>

            {/* Article Content */}
            <div className="px-4 space-y-4">
                <h1 className="text-2xl font-bold mt-4">{post.title}</h1>

                <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2 ">
                        <Image
                            src={post.profile || '/placeholder.svg'}
                            alt={post.author}
                            width={24}
                            height={24}
                            className="rounded-lg object-cover w-16 h-16"
                        />
                        <div className="text-md">
                            <span className="text-gray-500">By: </span>
                            <span className="font-semibold underline">{post.author}</span>
                        </div>
                    </div>
                    <button className="p-2">
                        <Bookmark className="w-5 h-5" />
                    </button>
                </div>

                <p className="text-gray-700">{post.content}</p>
            </div>
        </article>
    )
}
