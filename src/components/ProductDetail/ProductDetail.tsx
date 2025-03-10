"use client";
import { useCreateAddToCartMutation } from "@/app/redux/service/cart";
import { useGetProductDetailByUUIDQuery } from "@/app/redux/service/product";
import { useCreateWishListProductMutation } from "@/app/redux/service/wishlist";
import { FeedbackType } from "@/app/types/Feedback";
import ReadMoreMotion from "@/components/ReadMoreMotion";
import RatingStar from "@/lib/RatingSwitchCase";
import { FaHeart } from "react-icons/fa";
import { IoCartOutline } from "react-icons/io5";
import { toast } from "sonner";
import FeedbackCard from "../FeedbackCard/FeedbackCard";
import SimiliarProductCart from "./SimiliarProductCart";

import {
  Carousel,
  CarouselContent,
  CarouselItem,
  type CarouselApi,
} from "@/components/ui/carousel";
import Autoplay from "embla-carousel-autoplay";
import { useState } from "react";
import StarRating from "../StarRating/StarRating";
import {
  Sheet,
  SheetClose,
  SheetContent,
  SheetTitle,
  SheetTrigger,
} from "../ui/sheet";
import { useCreateUserFeedbackProductQueryMutation } from "@/app/redux/service/product";
export default function ProductDetail({ uuid }: { uuid: string }) {
  const [carouselApi, setCarouselApi] = useState<CarouselApi | null>(null);

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
        quantity: 1,
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

  // state when feedback
  const [isFeedbackOpen, setIsFeedbackOpen] = useState<boolean>(false);

  // rating star
  const [userRating, setUserRating] = useState<number>(0);
  const [comment, setComment] = useState<string>("");

  // handle comment
  const handleCommentChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setComment(e.target.value);
  };

  // create user feedback on product
  const [createUserFeedback] = useCreateUserFeedbackProductQueryMutation();

  // handle user feedback on product
  const handleUserFeedback = async () => {
    try {
      const response = await createUserFeedback({
        product_uuid: result?.uuid,
        rating: userRating,
        comment: comment,
      });
      if (response.data) {
        setIsFeedbackOpen(false);
        toast.success("ការបញ្ចេញមតិជោគជ័យ", {
          style: {
            background: "#22bb33",
          },
        });
      } else {
        toast.success("ការបញ្ចេញមតិមិនជោគជ័យ", {
          style: {
            background: "#bb2124",
          },
        });
      }
    } catch (error) {
      toast.success("ការបញ្ចេញមតិមិនជោគជ័យ", {
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

      {/* user feedback on product */}
      <div className="flex justify-between items-center w-full mt-5 text-center">
        <p className="text-title ">មតិយោបល់របស់អតិថិជន</p>
        <Sheet open={isFeedbackOpen} onOpenChange={setIsFeedbackOpen}>
          <SheetTrigger>
            <div className="rounded-[10px] p-2 w-max-full bg-accent">
              <p className="text-body text-center text-card_color">
                ផ្តល់យោបល់
              </p>
            </div>
          </SheetTrigger>
          <SheetContent
            className="bg-card_color rounded-tr[40px] rounded-tl-[40px] p-5"
            side={"bottom"}
          >
            <SheetTitle className="text-title ">
              យើងចូលចិត្តមតិកែលម្អរបស់អ្នក!
            </SheetTitle>
            <p className="text-body text-description my-3">
              {" "}
              មតិកែលម្អរបស់អ្នកជួយយើងកែលម្អវេទិការបស់យើង។ តើអ្នកគិតយ៉ាងណាដែរ?
            </p>
            <StarRating onChange={setUserRating} />
            <textarea
              className="w-full my-3 p-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
              placeholder="មតិកែលម្អរបស់អ្នកមានតម្លៃសម្រាប់យើង"
              value={comment}
              onChange={handleCommentChange}
              rows={4}
            />

            <div className="w-full flex justify-end">
              <SheetClose className="border-[1px]  text-font_description border-primary p-3 rounded-lg mr-4">
                បោះបង់
              </SheetClose>
              <div
                onClick={() => handleUserFeedback()}
                className="p-3 text-font_description bg-primary rounded-lg text-card_color"
              >
                បញ្ជូនមតិកែលម្អ
              </div>
            </div>
          </SheetContent>
        </Sheet>
      </div>
      <div className="w-full">
        <Carousel
          setApi={setCarouselApi}
          className="w-full"
          plugins={[Autoplay({ delay: 3000 })]}
          opts={{ loop: true }}
        >
          <CarouselContent className="flex">
            {result?.feedbacks.map((feedback: FeedbackType, index: number) => (
              <CarouselItem key={index} className="min-w-full ">
                <FeedbackCard
                  user={feedback.user}
                  rating={feedback.rating}
                  created_at={feedback.created_at}
                  comment={feedback.comment}
                />
              </CarouselItem>
            ))}
          </CarouselContent>
        </Carousel>
      </div>

      {/* add to cart */}
      <div
        onClick={() => addToCart()}
        className="rounded-lg mt-5 bg-primary p-4 flex justify-center items-center text-card_color text-body space-x-3 "
      >
        <IoCartOutline className="text-title" />
        <p>បន្ថែមទៅកន្ត្រក</p>
      </div>
    </div>
  );
}
