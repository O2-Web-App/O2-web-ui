"use client";
import { DotLottieReact } from "@lottiefiles/dotlottie-react";
import { useRouter } from "next/navigation";
import { IoChevronBackCircle } from "react-icons/io5";

export default function SuccessPayment() {
  const router = useRouter();

  // const handleGetInvoice = async () => {
  //   try {
  //     const response = await fetch(
  //       `${process.env.NEXT_PUBLIC_O2_API_URL}api/orders/invoice/${orderUUID}`
  //     );
  //   } catch (error) {
  //     console.log(error);
  //   }
  // };

  return (
    <div className="w-full h-screen p-5 ">
      <div
        onClick={() => router.push("/")}
        className="h-[50px] w-[50px] flex flex-col items-start justify-start"
      >
        <IoChevronBackCircle className="h-full w-full text-primary" />
      </div>

      {/* information */}
      <div className="w-full h-full flex flex-col items-center justify-center space-y-5">
        <DotLottieReact
          className=" h-[250px] "
          src="https://lottie.host/75c90a35-060c-4b39-b728-c58ee9f3f3d2/XjiDBninMp.lottie"
          loop
          autoplay
        />
        <div>
          <p className="text-heading text-center pb-5">
            ការបញ្ជាទិញរបស់អ្នកត្រូវបាន ទទួលយក
          </p>
          <p className="text-title text-center text-description">
            ការបញ្ជាទិញរបស់អ្នកបានកំពុងដំណើរការ។សូមអរគុណ
          </p>
        </div>
        <div className="w-full bg-primary p-4 rounded-lg flex justify-center items-center text-card_color text-body space-x-3">
          <p>ទាញយកវិក្កយបត្រ</p>
        </div>
      </div>
    </div>
  );
}
