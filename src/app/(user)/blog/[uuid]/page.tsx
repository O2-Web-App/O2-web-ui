"use client";

import React, { useState } from "react";
import Image from "next/image";
import { Bookmark, PlayCircle, MessageCircle, X, Send, ThumbsUp } from "lucide-react";
import { useGetAllBlogsQuery } from "@/app/redux/service/blog";
import { BlogPost } from "@/app/types/BlogType";

export type ParamProps = {
    params: {
        uuid: string;
    };
};
interface Reaction {
    id: string;
    emoji: string;
    label: string;
}

interface Comment {
    id: number;
    user: string;
    profile: string;
    text: string;
    time: string;
    reaction: Reaction | null;
}


export default function Page({ params }: ParamProps) {
    const { uuid } = params;

    // Fetch blog data
    const { data, isLoading, error } = useGetAllBlogsQuery();

    // State for comment modal
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [newComment, setNewComment] = useState("");

    if (isLoading) return <div className="p-4">Loading...</div>;
    if (error) return <div className="p-4 text-red-500">Error fetching blog.</div>;

    // Find the blog post by UUID
    const blogDetail = data?.data.data.find((blog: BlogPost) => blog.uuid === uuid);

    if (!blogDetail) {
        return <div className="p-4">Post not found.</div>;
    }

    // Format date
    const formatDate = (dateString: string) => {
        const date = new Date(dateString);
        return date.toLocaleDateString("en-GB", {
            day: "2-digit",
            month: "short",
            year: "numeric",
        });
    };

    // Convert YouTube URL to embeddable format
    const getEmbedUrl = (url: string) => {
        return url.replace("watch?v=", "embed/").split("&")[0];
    };

    // Reaction options
    const REACTIONS = [
        { id: "like", emoji: "👍", label: "Liked" },
        { id: "love", emoji: "❤️", label: "Loved" },
        { id: "haha", emoji: "😂", label: "Haha" },
        { id: "wow", emoji: "😮", label: "Wow" },
        { id: "sad", emoji: "😢", label: "Sad" },
        { id: "angry", emoji: "😡", label: "Angry" },
    ];

    // Comments data
    const [comments, setComments] = useState([
        { id: 1, user: "Srorng Sokcheat", profile: "/user1.jpg", text: "❤️😍", time: "21h", reaction: null },
        { id: 2, user: "Helen Leang", profile: "/user2.jpg", text: "Thank you so much🍀🙏🥰", time: "4h", reaction: null },
    ]);

    // State for reaction popups
    const [activeReactionPopup, setActiveReactionPopup] = useState<number | null>(null);

    // Handle selecting a reaction
    const handleReactionSelect = (commentId: number, reactionId: string) => {
        const reactionFound = REACTIONS.find(r => r.id === reactionId);
        if (!reactionId) return;
        setComments(comments.map((comment) =>
            comment.id === commentId
                ? { ...comment, reaction: REACTIONS.find(r => r.id === reactionId) || null }
                : comment
        ));
        setActiveReactionPopup(null);
    };

    

    // Handle new comment submission
    const handleCommentSubmit = () => {
        if (newComment.trim()) {
            setComments([
                ...comments,
                {
                    id: comments.length + 1,
                    user: "You",
                    profile: "/your-profile.jpg",
                    text: newComment,
                    time: "Just now",
                    reaction: null,
                },
            ]);
            setNewComment("");
        }
    };

    return (
        <article className="pb-20">
            {/* Header Info */}
            <div className="flex justify-between items-start p-4">
                <span className="text-sm text-gray-500">Uncategorized</span>
                <span className="text-sm text-gray-500">
                    {formatDate(blogDetail.created_at)} • {blogDetail.views} views
                </span>
            </div>

            {/* Main Image */}
            <div className="relative w-full aspect-[4/3]">
                <Image src={blogDetail.image || "/placeholder.svg"} alt={blogDetail.title} fill className="object-cover" priority />
            </div>

            {/* Related Videos */}
            <div className="px-4 mt-4">
                <div className="flex gap-3 overflow-x-auto pb-4 scrollbar-hide">
                    {blogDetail.youtube_videos?.map((video: string, index: number) => (
                        <div key={index} className="flex-shrink-0 w-[200px]">
                            <div className="relative aspect-video rounded-xl overflow-hidden mb-2">
                                <iframe src={getEmbedUrl(video)} className="w-full h-full rounded-xl" allowFullScreen />
                            </div>
                            <p className="text-xs line-clamp-2">Video {index + 1}</p>
                        </div>
                    ))}
                </div>
            </div>

            {/* Author & Icons Section */}
            <div className="flex items-center justify-between px-4">
                <div className="flex items-center gap-2">
                    <Image src={blogDetail.admin?.avatar || "/placeholder.svg"} alt={blogDetail.admin?.name || "Author"} width={40} height={40} className="rounded-full object-cover w-10 h-10" />
                    <span className="font-semibold underline">{blogDetail.admin?.name || "Unknown"}</span>
                </div>
                <button className="p-2 hover:text-gray-600 transition" onClick={() => setIsModalOpen(true)}>
                    <MessageCircle className="w-5 h-5" />
                </button>
            </div>

            {/* Comment Modal (Sticky Bottom on Mobile) */}
            {isModalOpen && (
                <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-end z-50">
                    <div className="bg-white w-full md:w-[400px] rounded-t-lg p-6 animate-slide-up">
                        <div className="flex justify-between items-center">
                            <h2 className="text-lg font-semibold">Comments</h2>
                            <button onClick={() => setIsModalOpen(false)}>
                                <X className="w-6 h-6 text-gray-500 hover:text-gray-700" />
                            </button>
                        </div>

                        {comments.map((comment) => (
                            <div key={comment.id} className="flex gap-3 mb-4 relative">
                                <Image src={comment.profile} alt={comment.user} width={40} height={40} className="w-10 h-10 rounded-full object-cover" />

                                <div className="flex-1">
                                    <div className="bg-gray-100 p-3 rounded-2xl">
                                        <span className="font-semibold text-sm">{comment.user}</span>
                                        <p className="text-sm text-gray-800">{comment.text}</p>
                                    </div>

                                    <div className="flex items-center text-xs text-gray-500 gap-4 mt-1">
                                        <div className="relative">
                                            <span className="cursor-pointer hover:underline" onClick={() => setActiveReactionPopup(comment.id)}>
                                                {comment.reaction ? comment.reaction.label : "Like"}
                                            </span>
                                            {activeReactionPopup === comment.id && (
                                                <div className="absolute bottom-6 left-0 bg-white shadow-md rounded-full flex gap-2 px-2 py-1 border">
                                                    {REACTIONS.map((reaction) => (
                                                        <span key={reaction.id} className="cursor-pointer text-xl hover:scale-125 transition-transform" onClick={() => handleReactionSelect(comment.id, reaction.id)}>
                                                            {reaction.emoji}
                                                        </span>
                                                    ))}
                                                </div>
                                            )}
                                        </div>
                                        <span className="cursor-pointer hover:underline">Reply</span>
                                        <span>{comment.time}</span>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            )}
        </article>
    );
}
