'use client';
import { Plus} from "lucide-react";
import {IoIosArrowBack} from "react-icons/io";
import {Input} from "@/components/ui/input";
import {Tooltip, TooltipContent, TooltipProvider, TooltipTrigger} from "@/components/ui/tooltip";
import CardBlogComponent from "@/components/Components/CardComponents/CardBlogComponent";
import {BlogPost} from "@/app/types/BlogType";
import CardBlog from "@/components/Components/CardComponents/BlogCard";
import React, {useState} from "react";
import {useRouter} from "next/navigation";
import {useAddBookmarkMutation, useGetALLBlogQuery, useGetBlogTopQuery} from "@/app/redux/service/blog";
import {useGetUserQuery} from "@/app/redux/service/user";
import {toast} from "sonner";
import {FiSearch} from "react-icons/fi";
import SkeletonRecommendationBlog from "@/components/blog/SkeletonRecommendationBlog";
import SkeletonGetAllBlog from "@/components/blog/SkeletonGetAllBlog";

export default function BlogComponent() {

    const router = useRouter();
    const [search, setSearch] = useState("");

    const [toggleBookmark] = useAddBookmarkMutation();
    // const { data: tagsData } = useGetALLTagQuery();
    const {data: topBlogs, isLoading: isTopLoading} = useGetBlogTopQuery();
    const {data: allBlogs, isLoading: isAllLoading} = useGetALLBlogQuery({search});
    const {data: userData} = useGetUserQuery();

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

            await toggleBookmark({blog_uuid: uuid}).unwrap();

            toast.success(
                isCurrentlyBookmarked ? "Bookmark removed" : "Bookmark added",
                {
                    style: {
                        color: "white",
                        background: "#22bb33",
                        border: '1px solid #22bb33',
                    },
                }
            );
        } catch (error) {
            toast.error("Failed to toggle bookmark", {
                style: {
                    color: "white",
                    background: "#e0391f",
                    border: '1px solid #e0391f',
                },
            });
            console.log(error)
        }
    };

    const filteredBlog =
        listBlog.filter((blog) => {
            const normalizeString = (str: string) => str.replace(/\s+/g, "").toLowerCase();

            const matchesJobs =
                blog.title.toLowerCase().includes(normalizeString(search)) ||
                blog.content.toLowerCase().includes(normalizeString(search));

            return matchesJobs;
        }) || [];

    return (
        <section className="max-w-md mx-auto">

            {/* Search and Add Button */}
            <section className="flex justify-between items-center my-4 px-4 ">
                <div className="bg-gray-100 rounded-full overflow-hidden p-2">
                    <IoIosArrowBack
                        onClick={() => router.back()}
                        className="cursor-pointer h-[30px] w-[30px] text-primary"
                    />
                </div>
                <div className="relative">
                    <FiSearch className="absolute top-2 left-0 text-gray-400 w-7 h-7 ml-3"/>
                    <Input
                        placeholder="Search Blog ..."
                        value={search}
                        onChange={(e: any) => setSearch(e.target.value)}
                        className="w-64 h-[45px] pl-12 py-2.5 border rounded-2xl focus:border-primary/60 focus:primary/60"
                    />
                </div>
                <TooltipProvider>
                    <Tooltip>
                        <TooltipTrigger asChild>
                            <button
                                onClick={() => router.push("/addBlog")}
                                className="rounded-full bg-primary p-2"
                            >
                                <Plus className="text-white"/>
                            </button>
                        </TooltipTrigger>
                        <TooltipContent side="top">
                            Add Blog
                        </TooltipContent>
                    </Tooltip>
                </TooltipProvider>
            </section>

            {/*Recommendation Blogs */}

            <section className={` w-full `}>
                {
                    isTopLoading ? (
                        <SkeletonRecommendationBlog/>
                    ) : (
                        <section className={`flex flex-col w-full `}>
                            <h2 className="text-3xl px-4 text-semibold">Recommendation</h2>
                            {/* Top Blogs  */}
                            <div
                                className="overflow-x-auto whitespace-nowrap space-x-4 p-4 gap-8 md:gap-14 scrollbar-hide">
                                {topBlogs?.data?.length ? (
                                    topBlogs.data.map((blog: any) => (
                                        <div className="inline-block" key={blog.uuid}>
                                            <CardBlogComponent
                                                id={blog.uuid}
                                                tag={blog.tags || []}
                                                description={blog.title}
                                                image={
                                                    blog?.image &&
                                                    typeof blog.image === "string" &&
                                                    blog.image.startsWith("http")
                                                        ? blog.image
                                                        : blog?.image
                                                            ? `${process.env.NEXT_PUBLIC_O2_API_URL}${blog.image}`
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
                                                bookmarks={() =>
                                                    handleToggleBookmark(blog.uuid, blog.is_bookmarked)
                                                }
                                            />
                                        </div>
                                    ))
                                ) : (
                                    <></>
                                )}
                            </div>

                        </section>
                    )
                }

            </section>


            {/* All Blogs */}
            <section className={` w-full `}>
                {
                    isAllLoading ? (
                        <SkeletonGetAllBlog/>
                    ) : (
                        <section className={` w-full `}>

                            <h2 className="text-3xl px-4 text-semibold">All Blogs</h2>

                            {/* Vertical Blog List */}
                            <div className="p-4">
                                {filteredBlog.length ? (
                                    filteredBlog.map((card: BlogPost) => {
                                        console.log("content:", card.title);
                                        return (
                                            <CardBlog
                                                key={card.uuid}
                                                id={card.uuid}
                                                tags={card.tags}
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
                                            />
                                        );
                                    })
                                ) : (
                                    <p>No blogs found.</p>
                                )}
                            </div>

                        </section>
                    )
                }


            </section>


        </section>
    );
}