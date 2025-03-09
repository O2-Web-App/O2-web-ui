
"use client";

import React, { useState, useEffect } from "react";
import CardBlogComponent from "@/components/Components/CardComponents/CardBlogComponent";
import Categories from "@/components/Components/CardComponents/CategoryComponent";
import CardBlogHorizontal from "@/components/Components/CardComponents/CardBlogHorizontal";
import { BlogPost, BlogResponse } from "@/app/types/BlogType";

const categoriesList = ["All", "Business", "Technology", "Healthy Food", "Education"];

const sliderData = [
  {
    id: "1",
    tag: "Healthy food",
    description: "Learn how to enjoy healthy meals without spending hours in the kitchen!",
    image: "/assets/healthy-food.jpg",
    author: "Mason Eduard",
    date: "23 Jan 2025",
    view: 1049,
    profile: "/assets/blog.jpg",
  },
  {
    id: "2",
    tag: "Travel",
    description: "Discover lesser-known attractions and explore Europe like a local.",
    image: "/assets/healthy-food.jpg",
    author: "Alexandra Doe",
    date: "15 Feb 2025",
    view: 876,
    profile: "/assets/blog.jpg",
  },
];

const getFetchBlog = async (): Promise<BlogPost[]> => {
  try {
    const response = await fetch("http://178.128.115.99/api/blogs");
    if (!response.ok) {
      throw new Error(`HTTP error! Status: ${response.status}`);
    }
    const jsonData = await response.json();

    // Ensure we are correctly accessing the nested data structure
    const blogs = jsonData?.data?.data || [];
    console.log("data: ", blogs);
    return blogs;
  } catch (error) {
    console.error("Error fetching blog data:", error);
    return []; // Return an empty array in case of error
  }
};

export default function Page() {
  const [blogList, setBlogList] = useState<BlogPost[]>([]);
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    const fetchBlogs = async () => {
      setLoading(true);
      const blogs = await getFetchBlog();
      // const data = 
      setBlogList(blogs);
      setLoading(false);
    };
    fetchBlogs();
  }, []);

  return (
    <section className="max-w-7xl mx-auto">
      <div className="overflow-x-auto whitespace-nowrap space-x-4 p-4 gap-8 md:gap-14">
        {sliderData.map((card) => (
          <div className="inline-block" key={card.id}>
            <CardBlogComponent {...card} />
          </div>
        ))}
      </div>
      <div className="p-4">
        <Categories categories={categoriesList} />
      </div>
      <div className="p-4">
        {loading ? (
          <p>Loading blogs...</p>
        ) : blogList.length > 0 ? (
          blogList.map((card) => (
            <CardBlogHorizontal
              key={card.uuid}
              id={card.uuid}
              tag={"Food"}
              date={card.created_at}
              view={card.views}
              title={card.title}
              image={card.image}
            />
          ))
        ) : (
          <p>No blogs found.</p>
        )}
      </div>
    </section>
  );
}
