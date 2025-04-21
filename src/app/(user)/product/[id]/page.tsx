import React from "react";
import CarouselImage from "@/components/ProductDetail/CarouselImage/CarouselImage";
import ProductDetail from "@/components/ProductDetail/ProductDetail";
import {Metadata, ResolvingMetadata} from "next";
import {DataType} from "@/app/types/ProductDetail";

type ParamProps = {
    params: Promise<{ id: string }>;
};

async function getProductMetadata(id: string): Promise<DataType | null> {
    try {
        const res = await fetch(`http://167.172.69.43/api/products/${id}`);
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
    const {id} = await params;
    const product = await getProductMetadata(id);

    if (!product) {
        return {title: "Product Not Found"};
    }

    const previousImages = (await parent).openGraph?.images || [];
    return {
        title: product.name,
        description: product.description,
        openGraph: {
            title: product.name,
            description: product.description,
            images:
                [
                    product.single_image
                ],
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