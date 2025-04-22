import React from "react";
import CarouselImage from "@/components/ProductDetail/CarouselImage/CarouselImage";
import ProductDetail from "@/components/ProductDetail/ProductDetail";
import {Metadata, ResolvingMetadata} from "next";
import {DataType} from "@/app/types/ProductDetail";

type ParamProps = {
    params: Promise<{ id: string }>;
};

type ApiResponse = {
    data: DataType;
}

async function getProductMetadata(id: string): Promise<DataType | null> {
    try {
        const res = await fetch(`https://cam-o2-api.shop/api/products/${id}`);
        if (!res.ok) {
            throw new Error(`HTTP error! Status: ${res.status}`);
        }
        const response: ApiResponse = await res.json();
        return response.data;
    } catch (error) {
        console.error("Error fetching product metadata:", error);
        return null;
    }
}

export async function generateMetadata(
    {params}: ParamProps,
    parent: ResolvingMetadata
): Promise<Metadata> {
    const {id} = await params;
    const product = await getProductMetadata(id);

    if (!product) {
        return {title: "Product Not Found"};
    }

    const image = "https://cam-o2-api.shop/" + product.images[0];
    console.log("  IMAGE : " ,image );

    return {
        title: product.name,
        description: product.description,
        openGraph: {
            title: product.name,
            description: product.description,
            images: image,
        },
    };
}



export default async function page({params}: ParamProps) {
    const resolvedParams = await params;
    const productUUID = resolvedParams.id;

    return (
        <section>
            <CarouselImage uuid={productUUID}/>
            <ProductDetail uuid={productUUID}/>
        </section>
    );
}