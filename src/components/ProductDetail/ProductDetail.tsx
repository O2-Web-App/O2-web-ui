"use client";
import { decrement, increment } from "@/app/redux/features/counter";
import { useAppDispatch, useAppSelector } from "@/app/redux/hooks";
import { useGetProductDetailByUUIDQuery } from "@/app/redux/service/product";
import { useCreateWishListProductMutation } from "@/app/redux/service/wishlist";
import ReadMoreMotion from "@/components/ReadMoreMotion";
import RatingStar from "@/lib/RatingSwitchCase";
import { FaHeart, FaMinus, FaPlus } from "react-icons/fa";
import { IoCartOutline } from "react-icons/io5";
import { toast } from "sonner";
import SimiliarProductCart from "./SimiliarProductCart";
import { useCreateAddToCartMutation } from "@/app/redux/service/cart";
export default function ProductDetail({ uuid }: { uuid: string }) {
  //global counter state
  const count = useAppSelector((state) => state.counter.value);
  const dispatch = useAppDispatch();

  // add to wishlist api
  const [createWishlist] = useCreateWishListProductMutation();

  // get product  detail api
  const productDetailData = useGetProductDetailByUUIDQuery({
    uuid: uuid,
  });

  // to get data object
  const result = productDetailData?.data?.data;

  // handle add item to wishlist
  const addToWishList = async () => {
    try {
      const response = await createWishlist({ product_uuid: uuid });
      if (response.data) {
        toast.success("ការបញ្ចូលទៅកាន់បញ្ជីបានជោគជ័យ", {
          style: {
            background: "#22bb33",
          },
        });
      } else {
        toast.success("ផលិតផលមាននៅក្នុងបញ្ជីរួចហើយ", {
          style: {
            background: "#bb2124",
          },
        });
      }
    } catch (error) {
      toast.success("ការបញ្ចូលទៅកាន់បញ្ជីមិនបានជោគជ័យ", {
        style: {
          background: "#bb2124",
        },
      });
    }
  };

  // add to cart api
  const [createAddToCart] = useCreateAddToCartMutation();

  // function handle add to cart
  const addToCart = async () => {
    try {
      const response = await createAddToCart({
        product_uuid: result?.uuid,
        quantity: count,
      });
      if (response.data) {
        toast.success("ការបញ្ចូលទៅកាន់កន្ត្រកបានជោគជ័យ", {
          style: {
            background: "#22bb33",
          },
        });
      } else {
        toast.success("ការបញ្ចូលទៅកាន់កន្ត្រកមិនបានជោគជ័យ", {
          style: {
            background: "#bb2124",
          },
        });
      }
    } catch (error) {
      console.log(error);
      toast.error("ការបញ្ចូលទៅកាន់កន្ត្រកមិនបានជោគជ័យ", {
        style: {
          background: "#bb2124",
        },
      });
    }
  };

  return (
    <div className="bg-card_color  p-4 my-5 rounded-tr-[40px] rounded-tl-[40px] overflow-y-auto scrollbar-hide">
      {/* first section */}
      <div className="flex justify-between">
        {/* price */}
        {result?.discounted_price === null ? (
          <div className="flex justify-center items-center ">
            <p className="text-title text-accent pr-2">${result?.price}</p>
          </div>
        ) : (
          <div className="flex justify-center items-center ">
            <p className="text-title text-accent pr-2">
              ${result?.discounted_price}
            </p>
            <p className="text-description text-[16px] line-through">
              ${result?.price}
            </p>
          </div>
        )}

        {/* hearticon add to wishlist */}
        <button onClick={() => addToWishList()} className="relative">
          <div className="rounded-full h-[30px] w-[30px] bg-primary opacity-20 flex items-center justify-center"></div>
          <FaHeart className="text-primary absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2" />
        </button>
      </div>

      {/* title */}
      <p className="text-title my-5">{result?.name}</p>

      {/* rating */}
      <div className="flex space-x-3 text-[#FFA629]">
        <RatingStar rating={result?.average_rating} />
        <p className="text-body text-accent">({result?.average_rating})</p>
      </div>

      {/* description */}
      <ReadMoreMotion text={result?.description || "No Descriptio "} />

      {/* similar product */}
      <p className="text-title my-5">ផលិតផលស្រដៀងគ្នា</p>
      <SimiliarProductCart uuid={uuid} />

      {/* total price */}
      <div className="rounded-lg bg-primary-light-10 my-5 flex justify-between p-4">
        <p className="text-[20px] text-primary">
          ថ្លៃសរុបចំនួន ${result?.price}
        </p>

        {/* increase  or decrease   */}
        <div className=" flex  items-center space-x-3">
          {/* decrease */}
          <button
            onClick={() => dispatch(decrement())}
            className="bg-primary-light-70 h-[30px] w-[30px] rounded-full flex items-center justify-center  "
          >
            <FaMinus className="text-card_color" />
          </button>

          {/* total */}
          <p className="text-body">{count}</p>

          {/*  increase */}
          <button
            onClick={() => dispatch(increment())}
            className="bg-primary h-[30px] w-[30px] rounded-full flex items-center justify-center"
          >
            <FaPlus className="text-card_color" />
          </button>
        </div>
      </div>

      {/* add to cart */}
      <div
        onClick={() => addToCart()}
        className="rounded-lg bg-primary p-4 flex justify-center items-center text-card_color text-body space-x-3 "
      >
        <IoCartOutline className="text-title" />
        <p>បន្ថែមទៅកន្ត្រក</p>
      </div>
    </div>
  );
}
