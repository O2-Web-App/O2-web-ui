import BlogDetailComponent from "@/components/blog/BlogDetailComponent";
import {Metadata, ResolvingMetadata} from "next";
import {Blog} from "@/app/types/BlogType";

type ParamProps = {
    params: Promise<{ uuid: string }>;
};

async function getBlogMetadata(uuid: string): Promise<Blog | null> {
    try {
        const res = await fetch(`https://cam-o2-api.shop/api/blogs/${uuid}`);
        if (!res.ok) {
            throw new Error(`HTTP error! Status: ${res.status}`);
        }
        const data = await res.json();
        return data;
    } catch (error) {
        return null;
    }
}

export async function generateMetadata(
    {params}: ParamProps,
    parent: ResolvingMetadata
): Promise<Metadata> {
    const {uuid} = await params;
    const blog = await getBlogMetadata(uuid);
    console.log(blog);

    if (!blog) {
        return {title: "Blog Not Found"};
    }

    const previousImages = (await parent).openGraph?.images || [];
    return {
        title: blog.title,
        openGraph: {
            title: blog.title,
            images: [blog.image],
        },
    };
}

export default async function Page({params}: ParamProps) {
    const resolvedParams = await params;
    const blogUUID = resolvedParams.uuid;
    return (
        <BlogDetailComponent uuid={blogUUID}/>
    );
}