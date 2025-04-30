"use client";
import React from "react";
import Image from "next/image";
import {MdOutlineShoppingCart} from "react-icons/md";
import {GoStarFill} from "react-icons/go";
import {useGetAllProductWishlistQuery} from "@/app/redux/service/wishlist";
import {WishlistType} from "@/app/types/Wishlist";
import {useDeleteWishListProductMutation} from "@/app/redux/service/wishlist";
import {useCreateAddToCartMutation} from "@/app/redux/service/cart";
import {toast} from "sonner";
import {useCreateAddAllWishListProductMutation} from "@/app/redux/service/cart";
import {MdDelete} from "react-icons/md";
import SkeletonWishListComponent from "@/components/Wishlist/SkeletonWishList.component";
import Lottie from "lottie-react";
import animationData from "@/../public/assets/no-data.json";

export default function Wishlist() {
    const [addToCart] = useCreateAddToCartMutation();
    const [deleteWishListProduct] = useDeleteWishListProductMutation();
    const {data: wishlistData, isLoading} = useGetAllProductWishlistQuery({});
    const result = wishlistData?.data;
    const [addAllItemToCart] = useCreateAddAllWishListProductMutation();
    const imageBaseUrl = process.env.NEXT_PUBLIC_O2_API_URL;

    const handleDeleteWishlistItem = async (wishlist_uuid: string) => {
        try {
            const response = await deleteWishListProduct({wishlist_uuid});
            if (response.data) {
                toast.success("ផលិតផលត្រូវបានដកចេញពីបញ្ជី", {
                    style: {background: "#22bb33"},
                });
            } else {
                toast.success("ផលិតផលដកចេញពីបញ្ជីមិនបានជោគជ័យ", {
                    style: {background: "#22bb33"},
                });
            }
        } catch (error) {
            console.log(error);
        }
    };

    const handleAddToCart = async (product_uuid: string) => {
        try {
            const response = await addToCart({product_uuid, quantity: 1});
            if (response.data) {
                toast.success("ផលិតផលត្រូវបានដាក់ចូលកន្រ្តក", {
                    style: {background: "#22bb33"},
                });
            } else {
                toast.success("ផលិតផលដាក់ចូលកន្រ្តកមិនបានជោគជ័យ", {
                    style: {background: "#22bb33"},
                });
            }
        } catch (error) {
            console.log(error);
        }
    };

    const handleAddAllItemToCart = async () => {
        try {
            const response = await addAllItemToCart({});
            if (response.data) {
                toast.success("ផលិតផលទាំងអស់ត្រូវបានដាក់ចូលកន្រ្តក", {
                    style: {background: "#22bb33"},
                });
            } else {
                toast.success("ផលិតផលដាក់ចូលកន្រ្តកមិនបានជោគជ័យ", {
                    style: {background: "#22bb33"},
                });
            }
        } catch (error) {
            console.log(error);
        }
    };

    return (
        <section>
            {isLoading ? (
                <SkeletonWishListComponent />
            ) : !result || result.length === 0 ? (
                <div className="grid justify-center py-3">
                    <Lottie animationData={animationData} loop={true} className="w-40 h-40 object-none" />
                    <p className="text-red-500 text-center text-lg">មិនមានទន្និន័យ</p>
                </div>
            ) : (
                <section className={`w-full mb-[60px]`}>
                    {result.map((item: WishlistType, index: number) => (
                        <section
                            key={index}
                            className="w-full bg-card_color rounded-[10px] my-5 p-2"
                        >
                            <div className="w-full flex justify-end gap-4">
                                <div
                                    className="relative"
                                    onClick={() => handleAddToCart(item?.product_uuid)}
                                >
                                    <div className="rounded-full h-[30px] w-[30px] bg-primary opacity-20 flex items-center justify-center"></div>
                                    <MdOutlineShoppingCart
                                        className="text-primary absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2"
                                    />
                                </div>
                                <div
                                    className="relative"
                                    onClick={() => handleDeleteWishlistItem(item?.wishlist_uuid)}
                                >
                                    <div className="rounded-full h-[30px] w-[30px] bg-red-600 opacity-10 flex items-center justify-center"></div>
                                    <MdDelete
                                        className="text-red-600 absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2"
                                    />
                                </div>
                            </div>
                            <div className="flex justify-between mt-2">
                                <div className="flex">
                                    <div className="min-h-[80px] min-w-[80px] max-h-[80px] max-w-[80px]">
                                        <Image
                                            src={imageBaseUrl + item?.single_image}
                                            width={100}
                                            height={100}
                                            alt="image"
                                            unoptimized
                                            className="h-full w-full object-cover"
                                        />
                                    </div>
                                    <div className="ml-5">
                                        <p className="text-lg line-clamp-2">{item?.product_name}</p>
                                        <p className="text-body mt-2 text-description">
                                            តម្លៃ{" "}
                                            <span className="text-accent text-base ">${item?.product_price}</span>
                                        </p>
                                    </div>
                                </div>
                                <div className="flex items-end justify-end">
                                    <div className="flex items-center justify-center">
                                        <p className="text-body mr-2">{item?.average_rating}</p>
                                        <GoStarFill className="text-[#FFA629] text-body items-center" />
                                    </div>
                                </div>
                            </div>
                        </section>
                    ))}
                    <div
                        onClick={() => handleAddAllItemToCart()}
                        className="fixed bottom-0 right-0 w-full bg-primary p-4 flex justify-center items-center text-card_color text-body space-x-3 rounded-tr-[10px] rounded-tl-[10px]"
                    >
                        <p>បញ្ចូលទាំងអស់ទៅក្នុងកន្ត្រក</p>
                    </div>
                </section>
            )}
        </section>
    );
}