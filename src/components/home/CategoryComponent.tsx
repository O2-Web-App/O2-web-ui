import React from "react";
import SkeletonCategoryProduct from "@/components/home/SkeletonCategoryProduct";
import {useGetAllCategoryServiceQuery} from "@/app/redux/service/product";

type Category = {
    id: number;
    uuid: string;
    title: string;
    description: string;
    image: string;
    created_at: string;
    updated_at: string;
};

export default function CategoryComponent() {
    const {data: response, isLoading} = useGetAllCategoryServiceQuery();

    // Map the API response to match the UI structure
    const categories = response?.data;

    return (
        <section>
            {isLoading ? (
                <SkeletonCategoryProduct/>
            ) : (
                <section className="flex flex-col">
                    <h1 className="text-2xl font-normal">ប្រភេទសេវាកម្ម</h1>
                    <section className="flex gap-3 overflow-auto scrollbar-hide py-4">
                        {categories.map((category: Category) => (
                            <div
                                key={category.id}
                                className="flex items-center max-w-[600px] gap-5 bg-white border-gray-200 border rounded-full px-5 py-2 hover:bg-white hover:transform hover:-translate-y-1 transition-transform duration-200"
                            >
                                <div className="bg-primary/20 p-2 rounded-full flex items-center justify-center">
                                    <div
                                        className="w-[30px] h-[30px] flex items-center justify-center bg-cover bg-center"
                                        style={{
                                            backgroundImage: `url(${"https://cam-o2-api.shop" + category.image})`,
                                        }}
                                    ></div>
                                </div>
                                <div className="flex flex-col">
                                    <p className="whitespace-nowrap text-base">{category.title}</p>
                                    <p className="whitespace-nowrap text-gray-400 text-sm">{category.description}</p>
                                </div>
                            </div>
                        ))}
                    </section>
                </section>
            )}
        </section>
    );
}