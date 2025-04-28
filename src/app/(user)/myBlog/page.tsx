
'use client';

import React, { useState } from "react";
import CardBlogHorizontal from "@/components/Components/CardComponents/CardBlogHorizontal";
import { useGetMyBlogQuery } from "@/app/redux/service/blog";
import { ChevronLeft } from "lucide-react";
import { useRouter } from "next/navigation";
import Lottie from "lottie-react";
import animationData from "../../../../public/assets/no-data.json"

const MyBlogPage = () => {
  const [search,] = useState("")
  const { data, isLoading } = useGetMyBlogQuery({ search });

  const blogs = data?.data.data || [];
  const router = useRouter()
  console.log("blog length:", blogs.length)
  return (
    <div className="max-w-md px-4 mx-auto">
      <div className="flex items-center p-4">
        <ChevronLeft size={24} onClick={() => router.back()} className="cursor-pointer text-primary" />
        <h1 className="flex-1 text-center text-2xl font-meduim">My Blog</h1>
      </div>

      {isLoading ? (
        // Skeleton loader while data is fetching
        [...Array(4)].map((_, index) => (
          <div
            key={index}
            className="w-full h-24 bg-gray-200 animate-pulse mb-4 rounded-lg"
          />
        ))
        // ) : error ? (
        //   <p className="text-red-500">Failed to load blogs.</p>
      ) : blogs.length === 0 ? (
        <div className="grid justify-center py-3">
          <Lottie animationData={animationData} loop={true} className="w-40 h-40 object-none"/>;
          <p className="text-red-500 text-center text-lg">មិនមានទន្និន័យ</p>
        </div>
      ) : (
        blogs.map((blog: any) => (
          <CardBlogHorizontal
            key={blog.uuid}
            id={blog.uuid}
            title={blog.title}
            date={blog.created_at}
            view={blog.views}
            tags={blog.tags || []}
            isBookmarked={blog.is_bookmarked}
            image={
              blog.image?.startsWith("http")
                ? blog.image
                : blog.image
                  ? `${process.env.NEXT_PUBLIC_O2_API_URL}${blog.image}`
                  : "/assets/placeholder.png"
            }
            bookmarks={() =>
              console.log(`Bookmark toggle for ${blog.uuid}`) // replace with your handler if needed
            }
            disabledBookmark={false} // optional, you can make it dynamic
          />
        ))
      )}
    </div>
  );
};

export default MyBlogPage;
