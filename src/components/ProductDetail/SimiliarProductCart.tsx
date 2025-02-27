"use client";
import { useGetProductDetailByUUIDQuery } from "@/app/redux/service/product";
import {
  useCreateWishListProductMutation,
  useDeleteWishListProductMutation,
  useGetAllProductWishlistQuery,
} from "@/app/redux/service/wishlist";
import { SimilarProduct } from "@/app/types/similarProducts";

import { GoHeart } from "react-icons/go";
import { GoHeartFill } from "react-icons/go";
import { toast } from "sonner";
export default function SimiliarProductCart({ uuid }: { uuid: string }) {
  const imageBaseUrl = process.env.NEXT_PUBLIC_O2_API_URL;

  // get product detail
  const productDetailData = useGetProductDetailByUUIDQuery({
    uuid: uuid,
  });

  //get wishlist item
  const wishlistData = useGetAllProductWishlistQuery({});

  // delete item from  wishlist
  const [deleteWishListItem] = useDeleteWishListProductMutation();

  // get wishlist data
  const wishListResult = wishlistData.data?.data;

  // to get data object
  const result = productDetailData?.data?.data.similar_products;

  // add to wishlist
  const [createWishlist] = useCreateWishListProductMutation();

  // function handle toggle change if item is in wishlist or not
  const handleWishlistToggle = async (similarProUUID: string) => {
    const inWishListItem = wishListResult?.find(
      (item: any) => item.product_uuid === similarProUUID
    );

    try {
      if (inWishListItem) {
        const response = await deleteWishListItem({
          wishlist_uuid: inWishListItem.wishlist_uuid,
        });

        if (response.data) {
          toast.success("ផលិតផលត្រូវបានដកចេញពីបញ្ជី", {
            style: {
              background: "#22bb33",
            },
          });
        }
      } else {
        const response = await createWishlist({ product_uuid: similarProUUID });
        if (response.data) {
          toast.success("ការបញ្ចូលទៅកាន់បញ្ជីបានជោគជ័យ", {
            style: {
              background: "#22bb33",
            },
          });
        }
      }
    } catch (error) {
      console.error("Wishlist update failed", error);
    }
  };

  return (
    <div className="flex space-x-3 overflow-x-auto whitespace-nowrap w-full  scrollbar-hide">
      {result?.map((item: SimilarProduct, index: number) => (
        <div
          key={index}
          className="w-[200px] min-w-[150px] bg-primary-light-10 p-2 rounded-lg"
        >
          <img
            src={imageBaseUrl + item.single_image}
            alt={item.name}
            className="object-fill w-full h-[170px] rounded-md"
          />
          <div className="flex justify-between text-body items-center mt-4 ">
            <p className="text-body truncate w-[90%]">{item.name}</p>
            <button onClick={() => handleWishlistToggle(item.uuid)}>
              {wishListResult.some(
                (wishListItem: any) => wishListItem.product_uuid === item.uuid
              ) ? (
                <GoHeartFill className="text-primary" />
              ) : (
                <GoHeart className="text-primary" />
              )}
            </button>
          </div>
        </div>
      ))}
    </div>
  );
}
