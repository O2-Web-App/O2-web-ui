import React from "react";

const categories = [
    {id: 1, name: "ទាំងអស់", imageUrl: "/category/vegatable.png"},
    {id: 2, name: "Vegetable", imageUrl: "/category/vegatable.png"},
    {id: 3, name: "បញ្ចុះតម្លៃ 50%", imageUrl: "/category/vegatable.png"},
    {id: 4, name: "ទាំងអស់", imageUrl: "/category/vegatable.png"},
    {id: 5, name: "ទាំងអស់", imageUrl: "/category/vegatable.png"},
    {id: 6, name: "ទាំងអស់", imageUrl: "/category/vegatable.png"},
];


export default function categoryComponent() {
    return (
        <section className="flex flex-col ">
            <h1 className="text-2xl font-normal">ប្រភេទសេវាកម្ម</h1>
            <section className="flex gap-3 overflow-auto scrollbar-hide py-3">
                {categories.map((category) => (
                    <div key={category.id}
                         className=" flex items-center gap-2 bg-primary/10 py-[6px] border-gray-200 border rounded-3xl px-3 cursor-pointer hover:bg-primary/20 hover:transform hover:-translate-y-1 transition-transform duration-200">
                        <div
                            className="rounded-full w-7 h-7 flex items-center justify-center bg-cover bg-center"
                            style={{
                                backgroundImage: `url(${category.imageUrl})`,
                                border: "1px solid #559F34"
                            }}
                        >
                        </div>
                        <p className="whitespace-nowrap">{category.name}</p>
                    </div>
                ))}
            </section>
        </section>
    )
}