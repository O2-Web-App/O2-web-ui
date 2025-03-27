"use client";

import React from "react";
import { toast } from "sonner";
import { useRouter } from "next/navigation";
import { Plus } from "lucide-react";

import CardBlogComponent from "@/components/Components/CardComponents/CardBlogComponent";
import Categories from "@/components/Components/CardComponents/CategoryComponent";
import CardBlogHorizontal from "@/components/Components/CardComponents/CardBlogHorizontal";

import {
    useGetBlogTopQuery,
    useAddBookmarkMutation,
    useGetALLTagQuery,
    useGetALLBlogQuery,
} from "@/app/redux/service/blog";
import { useGetUserQuery } from "@/app/redux/service/user";
import { BlogPost } from "@/app/types/BlogType";

export default function Page() {
    const router = useRouter();

    const [toggleBookmark] = useAddBookmarkMutation();
    const { data: tagsData } = useGetALLTagQuery();
    const { data: topBlogs, isLoading: isTopLoading } = useGetBlogTopQuery();
    const { data: allBlogs, isLoading: isAllLoading } = useGetALLBlogQuery();
    const { data: userData } = useGetUserQuery();

    const listBlog = allBlogs?.data?.data || [];

    const handleToggleBookmark = async (
        uuid: string,
        isCurrentlyBookmarked: boolean
    ) => {
        try {
            if (!userData) {
                router.push("/login");
                return;
            }

            await toggleBookmark({ blog_uuid: uuid }).unwrap();

            toast.success(
                isCurrentlyBookmarked ? "Bookmark removed" : "Bookmark added",
                {
                    style: { color: "white", background: "#22bb33" },
                }
            );
        } catch (error) {
            console.error("Error toggling bookmark", error);
            toast.error("Failed to toggle bookmark");
        }
    };

    return (
        <section className="max-w-7xl mx-auto">
            {/* Search and Add Button */}
            <div className="flex justify-between items-center my-4 px-4">
                <input
                    type="text"
                    className="border rounded-2xl p-2 w-10/12"
                    placeholder="Search for blogs"
                />
                <button
                    onClick={() => router.push("/addBlog")}
                    className="rounded-full bg-primary p-2"
                >
                    <Plus className="text-white" />
                </button>
            </div>

            {/* Top Blogs - Horizontal Scroll Cards */}
            <div className="overflow-x-auto whitespace-nowrap space-x-4 p-4 gap-8 md:gap-14 scrollbar-hide">
                {isTopLoading ? (
                    [...Array(4)].map((_, index) => (
                        <div
                            key={index}
                            className="inline-block w-64 h-40 bg-gray-200 animate-pulse rounded-lg"
                        ></div>
                    ))
                ) : topBlogs?.data?.length ? (
                    topBlogs.data.map((blog: any) => (

                        <div className="inline-block" key={blog.uuid}>
                            <CardBlogComponent
                                id={blog.uuid}
                                tag={blog.tags || []}
                                description={blog.title}
                                image={
                                    blog?.user?.avatar &&
                                        typeof blog.user.avatar === "string" &&
                                        blog.user.avatar.startsWith("http")
                                        ? blog.user.avatar
                                        : blog?.user?.avatar
                                            ? `${process.env.NEXT_PUBLIC_O2_API_URL}${blog.user.avatar}`
                                            : "/assets/placeholder.png"
                                }
                                author={blog.user?.name || "Anonymous"}
                                date={blog.created_at}
                                view={blog.views}
                                profile={
                                    blog?.user?.avatar &&
                                        typeof blog.user.avatar === "string" &&
                                        blog.user.avatar.startsWith("http")
                                        ? blog.user.avatar
                                        : blog?.user?.avatar
                                            ? `${process.env.NEXT_PUBLIC_O2_API_URL}${blog.user.avatar}`
                                            : "/assets/placeholder.png"
                                }
                                isBookmarked={blog.is_bookmarked}
                                bookmarks={() => {
                                    console.log("bookmark:", blog.is_bookmarked)
                                    handleToggleBookmark(blog.uuid, blog.is_bookmarked)
                                }

                                }
                            />
                        </div>
                    ))
                ) : (
                    <p>No blogs available</p>
                )}
            </div>

            {/* Tags Section */}
            <div className="p-4 flex flex-wrap gap-2">
                {tagsData?.tags?.length ? (
                    tagsData.tags.map((tag: any) => (
                        <Categories key={tag.uuid} categories={[tag]} />
                    ))
                ) : isTopLoading ? (
                    [...Array(4)].map((_, index) => (
                        <div
                            key={index}
                            className="w-24 h-8 bg-gray-200 animate-pulse rounded-lg"
                        ></div>
                    ))
                ) : (
                    <p>No tags found.</p>
                )}
            </div>

            {/* Vertical Blog List */}
            <div className="p-4">
                {isAllLoading ? (
                    [...Array(3)].map((_, index) => (
                        <div
                            key={index}
                            className="w-full h-14 bg-gray-200 animate-pulse mb-4 rounded-xl"
                        ></div>
                    ))
                ) : listBlog.length ? (
                    listBlog.map((card: BlogPost) => (
                        <CardBlogHorizontal
                          key={card.uuid}
                          id={card.uuid}
                          tags={card.tags}
                          date={card.created_at}
                          view={card.views}
                          title={card.title}
                          image={
                            card.image &&
                            typeof card.image === "string" &&
                            card.image.startsWith("http")
                              ? card.image
                              : card.image
                              ? `${process.env.NEXT_PUBLIC_O2_API_URL}${card.image}`
                              : "/assets/placeholder.png"
                          }
                          isBookmarked={card.is_bookmarked}
                          bookmarks={() =>
                          {
                                console.log("bookmark in crad horizontal:", card.is_bookmarked)
                                handleToggleBookmark(card.uuid, card.is_bookmarked)
                          }
                          }
                        />

                        // <CardBlogHorizontal
                        //     id={card.uuid}
                        //     title={card.title}
                        //     date={card.created_at}
                        //     view={card.views}
                        //     tags={card.tags}
                        //     image={card.image}
                        //     isBookmarked={card.is_bookmarked}
                        //     bookmarks={() => handleToggleBookmark(card.uuid, card.is_bookmarked)}
                        //     // disabledBookmark={bookmarkLoading} // Optional loading state
                        // />

                    ))
                ) : (
                    <p>No blogs found.</p>
                )}
            </div>
        </section>
    );
}
