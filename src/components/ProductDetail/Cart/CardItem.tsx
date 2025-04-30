"use client";
import Image from "next/image";

import {IoCloseOutline} from "react-icons/io5";

import {
    useGetAllCartQuery,
    useRemoveCartItemMutation,
    useUpdateCartQuantityMutation,
} from "@/app/redux/service/cart";
import {Cart} from "@/app/types/Cart";
import {useRouter} from "next/navigation";
import {FaMinus, FaPlus} from "react-icons/fa";
import animationData from "../../../../public/assets/no-data.json"
import SkeletonCardItemComponent from "@/components/card/SkeletonCardItemComponent";
import Lottie from "lottie-react";

export default function CardItem() {
    const router = useRouter();

    // get all item
    const {data: getAllCart, isLoading} = useGetAllCartQuery({});
    const data = getAllCart?.data?.cart_items;

    console.log("CART ITEM:", data);

    // image base url
    const imageBaseUrl = process.env.NEXT_PUBLIC_O2_API_URL;

    // update cart quantity
    const [updateCartQuantity] = useUpdateCartQuantityMutation({});
    const [removeCartItem] = useRemoveCartItemMutation({});

    const handleIncrease = async (product_uuid: string, newQuantity: number) => {
        const quantity = newQuantity + 1;
        await updateCartQuantity({product_uuid, quantity});
    };

    const handleDecrease = (product_uuid: string, newQuantity: number) => {
        const quantity = newQuantity - 1;
        updateCartQuantity({product_uuid, quantity});
    };

    const handleRemoveCartItem = async (product_uuid: string) => {
        await removeCartItem({product_uuid});
    };

    return (
        <section className="w-full">
            {isLoading ? (
                <SkeletonCardItemComponent/>
            ) : !data || data.length === 0 ? (
                <div className="grid justify-center py-3">
                    <Lottie animationData={animationData} loop={true} className="w-40 h-40 object-none"/>
                    <p className="text-red-500 text-center text-lg">មិនមានទន្និន័យ</p>
                </div>
            ) : (
                <section className="w-full">
                    {data.map((item: Cart, index: number) => {
                        const image = `${imageBaseUrl}${item?.image}`.trim();
                        return (
                            <div key={index} className="w-full flex justify-between px-2 my-5">
                                <div className="flex w-full">
                                    <div
                                        onClick={() => router.push(`/product/${item.uuid}`)}
                                        className="w-[100px] h-[100px] bg-red-400 flex-none"
                                    >
                                        <Image
                                            width={100}
                                            height={100}
                                            className="object-cover w-full h-full"
                                            unoptimized
                                            src={image}
                                            alt={item?.name}
                                        />
                                    </div>
                                    <div className="flex flex-col justify-around ml-5 w-full">
                                        <p className="text-lg text-start w-[160px] line-clamp-2">{item?.name}</p>
                                        {item?.discounted_price === null ? (
                                            <div className="flex">
                                                <p className="text-base text-accent pr-2">${item?.original_price}</p>
                                            </div>
                                        ) : (
                                            <div className="flex">
                                                <p className="text-base text-accent pr-2">${item?.discounted_price}</p>
                                                <p className="text-description text-[16px] line-through">
                                                    ${item?.original_price}
                                                </p>
                                            </div>
                                        )}
                                        <div className="flex items-center space-x-3">
                                            <button
                                                onClick={() => handleDecrease(item?.uuid, item?.quantity)}
                                                className="bg-primary-light-70 h-[25px] w-[25px] rounded-full flex items-center justify-center"
                                            >
                                                <FaMinus className="text-card_color"/>
                                            </button>
                                            <p className="text-body">{item?.quantity}</p>
                                            <button
                                                onClick={() => handleIncrease(item?.uuid, item?.quantity)}
                                                className="bg-primary h-[25px] w-[25px] rounded-full flex items-center justify-center"
                                            >
                                                <FaPlus className="text-card_color"/>
                                            </button>
                                        </div>
                                    </div>
                                </div>
                                <IoCloseOutline
                                    onClick={() => handleRemoveCartItem(item?.uuid)}
                                    className="text-heading text-description mt-2"
                                />
                            </div>
                        );
                    })}
                </section>
            )}
        </section>
    );
}
