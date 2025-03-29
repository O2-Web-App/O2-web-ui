
"use client";

import React, { useState, useEffect } from "react";
import { toast } from "sonner";
import CardBlogComponent from "@/components/Components/CardComponents/CardBlogComponent";
import Categories from "@/components/Components/CardComponents/CategoryComponent";
import CardBlogHorizontal from "@/components/Components/CardComponents/CardBlogHorizontal";
import { BlogPost } from "@/app/types/BlogType";
import {
    useGetBlogTopQuery,
    useAddBookmarkMutation,
    useGetALLTagQuery,
} from "@/app/redux/service/blog";
import { useGetUserQuery } from "@/app/redux/service/user";
import { useRouter } from "next/navigation";
import { Plus } from "lucide-react";

const getFetchBlog = async (): Promise<BlogPost[]> => {
    try {
        const response = await fetch(`${process.env.NEXT_PUBLIC_O2_API_URL}api/blogs`);
        if (!response.ok) {
            throw new Error(`HTTP error! Status: ${response.status}`);
        }
        const jsonData = await response.json();
        return jsonData?.data.data || [];
    } catch (error) {
        console.error("Error fetching blog data:", error);
        return [];
    }
};

export default function Page() {
    const [blogList, setBlogList] = useState<BlogPost[]>([]);
    const [loading, setLoading] = useState<boolean>(true);

    const [toggleBookmark] = useAddBookmarkMutation();
    const { data: tagsData } = useGetALLTagQuery();
    const { data: topBlogs, isLoading } = useGetBlogTopQuery();
    const { data: userData } = useGetUserQuery();
    const router = useRouter();
    console.log("user data: ", userData);

    // Fetch blogs and set the initial bookmark status
    useEffect(() => {
        const fetchBlogs = async () => {
            setLoading(true);
            const blogs = await getFetchBlog();
            // const getBlog = blogs
            setBlogList(blogs);
            setLoading(false);
        };
        fetchBlogs();
    }, []);
    console.log("blog list : ", blogList)

    // Toggle Bookmark Function
    const handleToggleBookmark = async (uuid: string, isCurrentlyBookmarked: boolean) => {
        try {
            if (userData === undefined) {
                router.push("/login")
            } else {
                await toggleBookmark({ blog_uuid: uuid }).unwrap();

                // Show appropriate toast based on current bookmark status
                if (isCurrentlyBookmarked) {
                    toast.success("Bookmark removed", {
                        style: { color: "white", background: "#22bb33" },
                    });
                } else {
                    toast.success("Bookmark added", {
                        style: { color: "white", background: "#22bb33" },
                    });
                }
            }

        } catch (error) {
            console.error("Error toggling bookmark", error);
            toast.error("Failed to toggle bookmark");
        }
    };

    return (
        <section className="max-w-7xl mx-auto">
            <div className="flex justify-between items-center my-4 px-4 ">
                <input type="text" className="border rounded-2xl p-2 w-10/12" placeholder="Search for blogs" />
                <button onClick={() => router.push('/addBlog')} className="rounded-full bg-primary p-2"><Plus className=""/></button>
            </div>
            <div className="overflow-x-auto whitespace-nowrap space-x-4 p-4 gap-8 md:gap-14 scrollbar-hide">
                {isLoading ? (
                    [...Array(4)].map((_, index) => (
                        <div key={index} className="inline-block w-64 h-40 bg-gray-200 animate-pulse rounded-lg"></div>
                    ))
                ) : topBlogs?.data && topBlogs.data.length > 0 ? (
                    topBlogs.data.map((blog) => (
                        <div className="inline-block" key={blog.uuid}>
                            <CardBlogComponent
                                id={blog.uuid}
                                tag={blog.tags || []}
                                description={blog.title}
                                image={blog?.user?.avatar && typeof blog.user.avatar === "string" && blog.user.avatar.startsWith("http")
                                    ? blog.user.avatar
                                    : blog?.user?.avatar
                                        ? `${process.env.NEXT_PUBLIC_O2_API_URL}${blog.user.avatar}`
                                        : "/assets/placeholder.png"}
                                author={blog.user?.name || "Anonymous"}
                                date={blog.created_at}
                                view={blog.views}
                                profile={blog?.user?.avatar && typeof blog.user.avatar === "string" && blog.user.avatar.startsWith("http")
                                    ? blog.user.avatar
                                    : blog?.user?.avatar
                                        ? `${process.env.NEXT_PUBLIC_O2_API_URL}${blog.user.avatar}`
                                        : "/assets/placeholder.png"
                                }
                                isBookmarked={blog.is_bookmarked}
                                bookmarks={() => handleToggleBookmark(blog.uuid, blog.is_bookmarked)}
                            />
                        </div>
                    ))
                ) : (
                    <p>No blogs available</p>
                )}
            </div>

            <div className="p-4 flex flex-wrap gap-2">
                {tagsData?.tags && tagsData.tags.length > 0 ? (
                    tagsData.tags.map((tag) => <Categories key={tag.uuid} categories={[tag]} />)
                ) : isLoading ? (
                    [...Array(4)].map((_, index) => (
                        <div key={index} className="w-24 h-8 bg-gray-200 animate-pulse rounded-lg"></div>
                    ))
                ) : (
                    <p>No tags found.</p>
                )}
            </div>


            <div className="p-4">
                {loading ? (
                    // Skeleton Loader for Horizontal Blogs
                    [...Array(3)].map((_, index) => (
                        <div key={index} className="w-full h-14 bg-gray-200 animate-pulse mb-4 rounded-xl"></div>
                    ))
                ) : blogList.length > 0 ? (
                    blogList.map((card) => (
                        <CardBlogHorizontal
                            key={card.uuid}
                            id={card.uuid}
                            tags={card.tags}  // Extract tag names
                            date={card.created_at}
                            view={card.views}
                            title={card.title}
                            image={
                                card.image && typeof card.image === "string" && card.image.startsWith("http")
                                    ? card.image
                                    : card.image
                                        ? `${process.env.NEXT_PUBLIC_O2_API_URL}${card.image}`
                                        : "/assets/placeholder.png"
                            }
                            isBookmarked={card.is_bookmarked}
                            bookmarks={() => handleToggleBookmark(card.uuid, card.is_bookmarked)}
                        />
                    ))
                ) : (
                    <p>No blogs found.</p>
                )}
            </div>

        </section>
    );
}
