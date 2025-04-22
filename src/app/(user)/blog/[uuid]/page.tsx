import BlogDetailComponent from "@/components/blog/BlogDetailComponent";
import {Metadata, ResolvingMetadata} from "next";
import {Blog} from "@/app/types/BlogType";

type ParamProps = {
    params: Promise<{ uuid: string }>;
};

type ApiResponse = {
    data: Blog;
}

async function getBlogMetadata(uuid: string): Promise<Blog | null> {
    try {
        const res = await fetch(`https://cam-o2-api.shop/api/blogs/${uuid}`);
        if (!res.ok) {
            throw new Error(`HTTP error! Status: ${res.status}`);
        }
        const response: ApiResponse = await res.json();
        return response.data;
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

    if (!blog) {
        return {title: "Blog Not Found"};
    }

    const image = "https://cam-o2-api.shop/" + blog.image;
    const previousImages = (await parent).openGraph?.images || [];
    return {
        title: blog.title,
        openGraph: {
            title: blog.title,
            images: image,
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