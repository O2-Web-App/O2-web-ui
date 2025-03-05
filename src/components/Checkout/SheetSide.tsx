"use client";
import {
  Sheet,
  SheetContent,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { FaCheckSquare } from "react-icons/fa";
import { useState } from "react";
import ConfirmationStep from "../Stepper/ConfirmationStep";
import Stepper from "../Stepper/InformationStep";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "../ui/alert-dialog";

import { useGetAllCartQuery } from "@/app/redux/service/cart";
import PaymentStep from "../Stepper/PaymentStep";
import { Cart } from "@/app/types/Cart";
import ProvinceSelect from "./ProvinceSelect";
import Image from "next/image";
import { useCreateOrderMutation } from "@/app/redux/service/order";
import { useAppSelector } from "@/app/redux/hooks";
import { toast } from "sonner";
import { paymentFunction } from "@/lib/payment";
import { QRCodeCanvas } from "qrcode.react";
import { Coupon } from "@/app/types/Coupon";

export default function SheetSide() {
  const [result, setResult] = useState<{ data?: Coupon }>({});

  const responseDataCoupon = result?.data;

  // payment function
  const payment = paymentFunction(responseDataCoupon?.total_price);

  // coupon code
  const [inputCoupon, setInputCoupon] = useState("");

  // open alertdilog payment
  const [open, setOpen] = useState(false);

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setInputCoupon(event.target.value);
  };

  // get all item
  const getAllCart = useGetAllCartQuery({});
  const data = getAllCart?.data?.data?.cart_items;

  // to open second modal
  const [secondSheetOpen, setSecondSheetOpen] = useState(false);

  // to open third modal
  const [thirdSheetOpen, setThirdSheetOpen] = useState(false);

  // check if use read the policy
  const [isRead, setIsRead] = useState(false);

  // image base url
  const imageBaseUrl = process.env.NEXT_PUBLIC_O2_API_URL;

  // select province from redux
  const province = useAppSelector((state) => state.province);

  const [createOrder] = useCreateOrderMutation();

  // handle calulate coupon
  const handleCoupon = async () => {
    try {
      const response = await createOrder({
        province_uuid: province,
        coupon_code: inputCoupon,
      });
      if (response.data) {
        setOpen(true);
        setResult(response.data);
        toast.success("ការបញ្ចូលគូប៉ុងបានជោគជ័យ", {
          style: {
            background: "#22bb33",
          },
        });
      } else {
        toast.success("ការបញ្ចូលគូប៉ុងបានមិនបានជោគជ័យ", {
          style: {
            background: "#bb2124",
          },
        });
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <>
      {/* Information_step */}
      <Sheet>
        <SheetTrigger>
          <div className="w-full bg-primary p-4 flex justify-center items-center text-card_color text-body space-x-3">
            <p>បន្តទៅ Checkout</p>
          </div>
        </SheetTrigger>
        <SheetContent
          className="bg-card_color  rounded-tr-[45px] rounded-tl-[45px] "
          side={"bottom"}
        >
          <SheetTitle className="mb-5 text-title">
            សូមបំពេញទម្រង់ខាងក្រោម
          </SheetTitle>

          {/* stepper */}
          <Stepper />

          {/* form */}
          <div className="w-full max-w-md mx-auto py-5">
            <div className="space-y-4">
              <div className="space-y-2">
                <label className="block text-sm font-medium text-gray-700">
                  អាសយដ្ឋានបច្ចុប្បន្ន
                </label>
                <ProvinceSelect />
              </div>

              <div className="space-y-2">
                <label className="block text-sm font-medium text-gray-700">
                  Google Map Url
                </label>
                <input
                  name="mapUrl"
                  placeholder="https://maps.app.goo.gl/DxfRABb9k29WElpu6"
                  className="w-full p-2 text-gray-400 border-none ring-0 focus:ring-0 focus:outline-none bg-white rounded-none"
                  style={{
                    boxShadow: "none",
                    border: "1px solid  #0494FC",
                    borderRadius: "10px",
                  }}
                />
              </div>

              <div className="space-y-2">
                <label className="block text-sm font-medium text-gray-700">
                  លេខទូរស័ព្ទ
                </label>
                <input
                  name="phone"
                  placeholder="072 72 67 89"
                  className="w-full p-2 text-gray-400 border-none ring-0 focus:ring-0 focus:outline-none bg-white rounded-none"
                  style={{
                    boxShadow: "none",
                    border: "1px solid  #0494FC",
                    borderRadius: "10px",
                  }}
                />
              </div>

              <div className="space-y-2">
                <label className="block text-sm font-medium text-gray-700">
                  អ៊ីមែល
                </label>
                <input
                  name="email"
                  type="email"
                  placeholder="Example@gmail.com"
                  className="w-full p-2 text-gray-400 border-none ring-0 focus:ring-0 focus:outline-none bg-white rounded-none"
                  style={{
                    boxShadow: "none",
                    border: "1px solid  #0494FC",
                    borderRadius: "10px",
                  }}
                />
              </div>

              <div className="space-y-2">
                <label className="block text-sm font-medium text-gray-700">
                  មតិយោបល់
                </label>
                <textarea
                  name="comment"
                  placeholder="Remake For Our Delivery"
                  className="w-full p-2 text-gray-400 border-none ring-0 focus:ring-0 focus:outline-none bg-white rounded-none"
                  style={{
                    boxShadow: "none",
                    border: "1px solid  #0494FC",
                    borderRadius: "10px",
                    minHeight: "80px",
                  }}
                />
              </div>
            </div>
          </div>

          {/* button next */}
          <div
            onClick={() => setSecondSheetOpen(true)}
            className="w-full bg-primary p-4 rounded-lg flex justify-center items-center text-card_color text-body space-x-3"
          >
            <p>បន្តទៅមុខ</p>
          </div>
        </SheetContent>
      </Sheet>

      {/* confirmation_step*/}
      <Sheet open={secondSheetOpen} onOpenChange={setSecondSheetOpen}>
        <SheetContent
          className="bg-card_color h-[704px] flex flex-col justify-between  rounded-tr-[45px] rounded-tl-[45px] "
          side={"bottom"}
        >
          <SheetTitle className="mb-5 text-title">ការបញ្ជាក់</SheetTitle>

          {/* confirmation_step */}
          <ConfirmationStep />

          {/* information */}

          {/* អាស័យដ្ឋានបច្ចុប្បន្ន */}
          <div>
            <p className="text-body text-description py-2">
              អាស័យដ្ឋានបច្ចុប្បន្ន
            </p>
            <p className="text-body ">109 Ung Png St, 55Eg3, Phnom Penh</p>
          </div>

          {/* Google Map Url */}
          <div className=" w-[90%]">
            <p className="text-body text-description py-2">Google Map Url</p>
            <p className="text-body break-words">https://maps.app.goo.gl/</p>
          </div>

          {/* លេខទូរស័ព្ទ */}
          <div>
            <p className="text-body text-description py-2">លេខទូរស័ព្ទ</p>
            <p className="text-body ">072 72 67 89</p>
          </div>

          {/* អុីមែល */}
          <div>
            <p className="text-body text-description py-2">អុីមែល</p>
            <p className="text-body ">kdey@gmail.com</p>
          </div>

          {/* ចំណាំ */}
          <div className="">
            <p className="text-body text-description py-2">ចំណាំ</p>
            <p className="text-body ">
              I hope i get my order fast as fast you can
            </p>
          </div>

          {/* ​check box */}
          <div className="flex ">
            {isRead ? (
              <FaCheckSquare className="text-primary h-6 w-6 " />
            ) : (
              <div className="h-6 w-6 rounded-md border-[1.5px] border-description"></div>
            )}
            <p className="mx-3">
              ខ្ញុំបានអាន និងទទួលយក{" "}
              <AlertDialog>
                <AlertDialogTrigger className="text-accent">
                  សេចក្តីថ្លែងការឯកជនភាព
                </AlertDialogTrigger>
                <AlertDialogContent className="bg-card_color w-[90%] rounded-[10px] ">
                  <AlertDialogHeader>
                    <AlertDialogTitle className="text-title text-start">
                      គោលការណ៍ឯកជនភាព
                    </AlertDialogTitle>
                    <AlertDialogDescription className="text-body text-start text-description">
                      យើងនឹងមិនសងប្រាក់វិញសម្រាប់អ្វីដែលពួកគេបានទិញផលិតផលរបស់យើងទេ
                      ហើយផលិតផលនឹងដឹកជញ្ជូនក្នុងរយៈពេល 1 ឬ 2
                      ម៉ោងបន្ទាប់ពីការទូទាត់ជោគជ័យ។
                    </AlertDialogDescription>
                  </AlertDialogHeader>
                  <AlertDialogFooter className="items-end">
                    <AlertDialogAction
                      onClick={() => setIsRead(true)}
                      className="bg-secondary w-min text-background_color "
                    >
                      យល់ព្រម
                    </AlertDialogAction>
                  </AlertDialogFooter>
                </AlertDialogContent>
              </AlertDialog>
            </p>
          </div>

          <SheetTrigger className="w-full">
            <div
              onClick={(e) => {
                e.stopPropagation();
                if (isRead) {
                  setThirdSheetOpen(true);
                }
              }}
              className={`w-full p-4 rounded-lg flex justify-center items-center text-card_color text-body space-x-3
      ${
        isRead
          ? "bg-primary cursor-pointer"
          : "bg-primary-light-70  disabled:cursor-not-allowed"
      }`}
            >
              <p>បន្តទៅមុខ</p>
            </div>
          </SheetTrigger>
        </SheetContent>
      </Sheet>

      {/* payment_step */}
      <Sheet open={thirdSheetOpen} onOpenChange={setThirdSheetOpen}>
        <SheetContent
          className="bg-card_color rounded-tr-[45px] rounded-tl-[45px] overflow-y-auto "
          side={"bottom"}
        >
          <SheetTitle>
            <p className="text-title mb-5">ការទូតទាត់</p>
          </SheetTitle>

          <PaymentStep />
          <p className="text-body text-description my-5">
            សេចក្តីសង្ខេបនៃការបញ្ជាទិញ
          </p>

          {data?.map((item: Cart, index: number) => {
            const image = `${imageBaseUrl}${item?.image}`.trim();
            return (
              <div key={index} className="flex border-t-2 border-b-2 p-3 ">
                <div className="h-[80px] w-[80px] rounded-full mr-3">
                  <Image
                    src={image}
                    width={100}
                    height={100}
                    alt=""
                    className="object-cover w-full h-full rounded-full"
                  />
                </div>

                {/* product information */}
                <div className=" p-3 flex flex-col justify-start items-start">
                  {/* title product */}
                  <p className="text-title mb-3">{item?.name}</p>

                  {/* price */}
                  <div className="">
                    {item?.discounted_price === null ? (
                      <div className="flex justify-center items-center ">
                        <p className="text-title text-accent pr-2">
                          ${item?.original_price}
                        </p>
                      </div>
                    ) : (
                      <div className="flex justify-center items-center ">
                        <p className="text-title text-accent pr-2">
                          ${item?.discounted_price}
                        </p>
                        <p className="text-description text-[16px] line-through">
                          ${item?.original_price}
                        </p>
                      </div>
                    )}
                  </div>
                </div>
              </div>
            );
          })}

          <div className="space-y-2 my-5">
            <label className="block text-body font-medium text-gray-700">
              លេខកូដការដូរ
            </label>
            <input
              name="mapUrl"
              placeholder="e.g. FIRSTORDER"
              value={inputCoupon} // Controlled input
              onChange={handleChange} // Update state on change
              className="w-full p-2 text-gray-400 border-none ring-0 focus:ring-0 focus:outline-none bg-white rounded-none"
              style={{
                boxShadow: "none",
                border: "1px solid #0494FC",
                borderRadius: "10px",
              }}
            />
          </div>
          <div
            onClick={() => handleCoupon()}
            className="my-5  w-full bg-primary p-4 rounded-lg flex justify-center items-center text-card_color text-body space-x-3"
          >
            <p>បន្តទៅមុខ</p>
            <AlertDialog open={open} onOpenChange={setOpen}>
              <AlertDialogContent className="bg-card_color w-[90%] rounded-[10px] ">
                <AlertDialogHeader>
                  <AlertDialogTitle className="text-[30px] text-start">
                    សេចក្តីសង្ខេបសរុប
                  </AlertDialogTitle>
                  <div className="w-full flex flex-col items-start justify-start">
                    {/* Coupon Discount */}
                    <div className="flex my-3">
                      <p className="text-title mr-3">ការបញ្ចុះតម្លៃគូប៉ុង : </p>
                      <p className="text-title text-accent">
                        {responseDataCoupon?.coupon_discount}$
                      </p>
                    </div>

                    {/* Delivery Fee */}
                    <div className="flex my-3">
                      <p className="text-title mr-3">ថ្លៃដឹកជញ្ជូន : </p>
                      <p className="text-title text-accent">
                        {responseDataCoupon?.delivery_fee}$
                      </p>
                    </div>

                    {/* Total Price */}
                    <div className="flex my-3">
                      <p className="text-title mr-3">ថ្លៃសរុប : </p>
                      <p className="text-title text-accent">
                        {responseDataCoupon?.total_price}$
                      </p>
                    </div>

                    {/* QR Code Centered */}
                    <div className="w-full flex justify-center mt-4">
                      <QRCodeCanvas value={payment?.data.qr} size={200} />
                    </div>
                  </div>
                </AlertDialogHeader>
              </AlertDialogContent>
            </AlertDialog>
          </div>
        </SheetContent>
      </Sheet>
    </>
  );
}
