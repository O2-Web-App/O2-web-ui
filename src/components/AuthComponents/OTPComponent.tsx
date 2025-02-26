// 'use client';
// import React, { useState, useEffect } from "react";
// import OTPValidation from "@/components/AuthComponents/OTPValidation";
// import { IoCloseSharp } from "react-icons/io5";
// import Button from "./ButtonComponentForAuth";
// import { useVerifyCodeRegisterMutation, useResendVerifyCodeRegisterMutation } from "@/redux/service/auth";
// import { useAppSelector } from "@/redux/hooks";
// import { useRouter } from "next/navigation";
// import { toast, ToastContainer } from "react-toastify";
// import "react-toastify/dist/ReactToastify.css";
// import Image from 'next/image';
// import Link from 'next/link';

// function OTPComponent() {
//   // Fetch the email from Redux state (assuming Redux is used) and store it in a variable.
//   const [currentLocale, setCurrentLocale] = useState<string>('km');
//   const email = useAppSelector((state) => state.verify.email);
//   const [otp, setOtp] = useState(""); // Store OTP
//   const [isLoading, setIsLoading] = useState(false);
//   const [resending, setResending] = useState(false); // Track resend state
//   const [timer, setTimer] = useState(90); // Countdown timer
//   const [verifyCodeRegister] = useVerifyCodeRegisterMutation(); // Use the mutation hook
//   const [resendCode] = useResendVerifyCodeRegisterMutation(); // Mutation hook for resending code
//   const router = useRouter();
//    useEffect(() => {
//               const savedLanguage = localStorage.getItem('language');
//               if (savedLanguage) {
//                 setCurrentLocale(savedLanguage);
//               }
//         }, []);
//   // Start countdown timer
//   useEffect(() => {
//     let countdown: NodeJS.Timeout;
//     if (timer > 0) {
//       countdown = setTimeout(() => setTimer((prev) => prev - 1), 1000);
//     }
//     return () => clearTimeout(countdown);
//   }, [timer]);

//   // Redirect if email is missing
//   useEffect(() => {
//     console.log("Email from Redux:", email);
//     if (!email) {
//       toast.error("Email is missing. Redirecting to registration.");
//       setTimeout(() => {
//         router.push(`/${currentLocale}/register`);
//         // router.push("/register");
//       }, 3000);
//     }
//   }, [email, router]);

//   const handleOTPComplete = (otpValue: string) => {
//     setOtp(otpValue); // Store OTP when fully entered
//     console.log("OTP Entered:", otpValue);
//   };

//   const handleSubmit = async () => {
//     if (!email) {
//       toast.error("Email is missing. Redirecting to registration.");
//       router.push(`/${currentLocale}/register`);
//       return;
//     }

//     console.log("Payload sent to API:", { email, verification_code: otp });

//     setIsLoading(true);
//     try {
//       const response = await verifyCodeRegister({ email, verification_code: otp }).unwrap();
//       toast.success("OTP Verified Successfully!");
//       console.log("Verification Response:", response);
//       setTimeout(() => {
//         router.push(`/${currentLocale}/login`);
//         // router.push("/login"); // Redirect to login page
//       }, 3000);
//     } catch (error) {
//       console.error("Verification Error:", error);
//       toast.error("Failed to verify OTP. Please try again.");
//     } finally {
//       setIsLoading(false);
//     }
//   };

//   const handleResendCode = async () => {
//     if (!email) {
//       toast.error("Email is missing. Redirecting to registration.");
//       router.push(`/${currentLocale}/register`);
//       return;
//     }
//     console.log("Resend Code Request:", { email });
//     setResending(true); // Set resend state to true
//     try {
//       const response = await resendCode({ email }).unwrap();
//       toast.success("Verification code resent successfully!");
//       console.log("Resend Code Response:", response);
//       setTimer(60); // Reset the timer
//     } catch (error) {
//       console.error("Resend Code Error:", error);
//       toast.error("Failed to resend verification code. Please try again.");
//     } finally {
//       setResending(false); // Stop loading
//     }
//   };
//   const handleClose = () => {
//     router.push(`/${currentLocale}/register`);
//   };
  

//   return (
//     <section className="w-full h-screen flex justify-center items-center">
//       <div className="m-auto border-1 md:border border-slate-100 rounded-xl py-7">
//         <div className="px-6 sm:px-8 md:px-6 xl:px-10">
//           <div className="flex justify-between items-center">
//             <Link href="/">
//              <Image src="/auth/logoFile.jpg" width={1000} height={1000} alt="Logo Image"
//                                     className="w-20 md:w-24" />
//             </Link>
//             <button
//               className="text-2xl text-gray-500 hover:text-gray-700"
//               onClick={() => handleClose()}
//             >
//               <IoCloseSharp />
//             </button>
//           </div>
//           <div className="h-fit w-fit pt-9 pb-5">
//             <h1 className="text-2xl md:text-3xl font-bold text-primary">ផ្ទៀងផ្ទាត់លេខកូដសម្ងាត់</h1>
//             <p className="pt-4 text-slate-500">
//             យើងបានផ្ញើលេខកូដ 6 ខ្ទង់ទៅកាន់អ៊ីមែលរបស់អ្នក។​ អ្នកមានពេល <span className="font-bold text-primary">{` ${timer}s`}</span> វិនាទី
             
//             </p>
//             <div className="mt-6">
//               <OTPValidation length={6} onComplete={handleOTPComplete} />
//               <div className="text-right mt-3 ">
             
//                <button
//                   className="text-sm text-primary hover:underline font-bold"
//                   onClick={handleResendCode}
//                   disabled={resending}
//                 >
//                   {resending ? "កំពុងផ្ញើរលេខសម្ងាត់ទៅអ្នក..." : "ផ្ញើរលេខកូដសម្ងាត់ម្តងទៀត"}
//                 </button>
//               </div>
//             </div>

//             {/* Submit Button */}
//             <div className="mt-6">
//               <Button
//                 type="submit"
//                 text="ផ្ទៀងផ្ទាត់"
//                 onClick={handleSubmit}
//                 isLoading={isLoading}
//                 className="w-full bg-primary hover:bg-primary text-white font-medium border-collapse"
//               />
//             </div>
//           </div>
//         </div>
//       </div>
//       <ToastContainer />
//     </section>
//   );
// }

// export default OTPComponent;


'use client';
import React, { useState, useEffect } from "react";
import OTPValidation from "@/components/AuthComponents/OTPValidation";
import { IoCloseSharp } from "react-icons/io5";
import Button from "./ButtonComponentForAuth";
import { useVerifyCodeRegisterMutation, useResendVerifyCodeRegisterMutation } from "@/redux/service/auth";
import { useAppSelector } from "@/redux/hooks";
import { useRouter } from "next/navigation";
// import { toast, ToastContainer } from "react-toastify";
// import "react-toastify/dist/ReactToastify.css";
import Image from 'next/image';
import Link from 'next/link';
import { useTranslations } from "next-intl";
import { useToast } from "@/hooks/use-toast";

function OTPComponent() {
    const t = useTranslations()
  const [currentLocale, setCurrentLocale] = useState<string>('km');
  const emailFromRedux = useAppSelector((state) => state.verify.email);
  const [email, setEmail] = useState<string | null>(null);
  const [otp, setOtp] = useState(""); // Store OTP
  const [isLoading, setIsLoading] = useState(false);
  const [resending, setResending] = useState(false); // Track resend state
  const [timer, setTimer] = useState(90); // Countdown timer
  const [verifyCodeRegister] = useVerifyCodeRegisterMutation(); // Use the mutation hook
  const [resendCode] = useResendVerifyCodeRegisterMutation(); // Mutation hook for resending code
  const {toast}=useToast()
  const router = useRouter();

  useEffect(() => {
    const savedLanguage = localStorage.getItem('language');
    if (savedLanguage) {
      setCurrentLocale(savedLanguage);
    }
  }, []);

  // Retrieve email from Redux or localStorage
  useEffect(() => {
    if (emailFromRedux) {
      setEmail(emailFromRedux);
      localStorage.setItem('verificationEmail', emailFromRedux);
    } else {
      const savedEmail = localStorage.getItem('verificationEmail');
      if (savedEmail) {
        setEmail(savedEmail);
      } else {
        toast({
          title: ("Email is missing. Redirecting to registration."),
          description: "Your action was not completed.",
          variant: "error", // Use "destructive" for error messages
          duration: 3000,
        })
        // toast.error("Email is missing. Redirecting to registration.");
        setTimeout(() => {
          router.push(`/${currentLocale}/register`);
        }, 3000);
      }
    }
  }, [emailFromRedux, router, currentLocale]);

  // Start countdown timer
  useEffect(() => {
    let countdown: NodeJS.Timeout;
    if (timer > 0) {
      countdown = setTimeout(() => setTimer((prev) => prev - 1), 1000);
    }
    return () => clearTimeout(countdown);
  }, [timer]);

  const handleOTPComplete = (otpValue: string) => {
    setOtp(otpValue); // Store OTP when fully entered
    console.log("OTP Entered:", otpValue);
  };

  // const handleSubmit = async () => {
  //   if (!email) {
  //     toast.error("Email is missing. Redirecting to registration.");
  //     router.push(`/${currentLocale}/register`);
  //     return;
  //   }

  //   setIsLoading(true);
  //   try {
  //     const response = await verifyCodeRegister({ email, verification_code: otp }).unwrap();
  //     toast.success("OTP Verified Successfully!");
  //     setTimeout(() => {
  //       router.push(`/${currentLocale}/login`);
  //     }, 3000);
  //   } catch (error) {
  //     console.error("Verification Error:", error);
  //     toast.error("Failed to verify OTP. Please try again.");
  //   } finally {
  //     setIsLoading(false);
  //   }
  // };
  
  const handleSubmit = async () => {
    if (!email) {
      toast({
        title: ("Email is missing. Redirecting to registration."),
        description: "Your action was not completed.",
        variant: "error", // Use "destructive" for error messages
        duration: 3000,
      })

      // toast.error("Email is missing. Redirecting to registration.");
      router.push(`/${currentLocale}/register`);
      return;
    }
  
    setIsLoading(true);
    try {
       verifyCodeRegister({ email, verification_code: otp }).unwrap();
      // toast.success("OTP Verified Successfully!");
      toast({
        title: ("OTP Verified Successfully!"),
        description: "Your action was completed.",
        variant: "success", // Use "destructive" for error messages
        duration: 3000,
      })
  
      // Remove verification email from localStorage after successful verification
      localStorage.removeItem("verificationEmail");
  
      setTimeout(() => {
        router.push(`/${currentLocale}/login`);
      }, 3000);
    } catch (error) {
      console.error("Verification Error:", error);
      toast({
        title: ("Failed to verify OTP. Please try again."),
        description: "Your action was not completed.",
        variant: "error", // Use "destructive" for error messages
        duration: 3000,
      })
      // toast.error("Failed to verify OTP. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };
  
  const handleResendCode = async () => {
    if (!email) {
      // toast.error("Email is missing. Redirecting to registration.");
      toast({
        title: ("Email is missing. Redirecting to registration."),
        description: "Your action was not completed.",
        variant: "error", // Use "destructive" for error messages
        duration: 3000,
      })
      router.push(`/${currentLocale}/register`);
      return;
    }

    setResending(true); // Set resend state to true
    try {
        resendCode({ email }).unwrap();
        toast({
          title: ("OTP Verified Successfully!"),
          description: "Your action was completed.",
          variant: "success", // Use "destructive" for error messages
          duration: 3000,
        })
      // toast.success("Verification code resent successfully!");
         // Optionally, remove email from localStorage if you want a fresh start
      localStorage.removeItem("verificationEmail");

      setTimer(60); // Reset the timer
    } catch (error) {
      console.error("Resend Code Error:", error);
      // toast.error("Failed to resend verification code. Please try again.");
      toast({
        title: ("Failed to resend verification code. Please try again."),
        description: "Your action was not completed.",
        variant: "error", // Use "destructive" for error messages
        duration: 3000,
      })
    } finally {
      setResending(false); // Stop loading
    }
  };

  const handleClose = () => {
    router.push(`/${currentLocale}/register`);
  };

  return (
    <section className="w-full h-screen flex justify-center items-center">
      <div className="m-auto border-1 md:border border-slate-100 rounded-xl py-7">
        <div className="px-6 sm:px-8 md:px-6 xl:px-10">
          <div className="flex justify-between items-center">
            <Link href={`/${currentLocale}/`}>
              <Image src="/assets/logo-text.jpg" width={1000} height={1000} alt="Logo Image" className="w-20 md:w-48" />
            </Link>
            <button
              className="text-2xl text-gray-500 hover:text-gray-700"
              onClick={() => handleClose()}
            >
              <IoCloseSharp />
            </button>
          </div>
          <div className="h-fit w-fit pt-9 pb-5">
            <h1 className="text-2xl md:text-3xl font-bold text-primary">{t("VerifyCodeRegister.title")}</h1>
            <p className="pt-4 text-slate-500">
              {t("VerifyCodeRegister.description")} <span className="font-bold text-primary">{` ${timer}s`}</span>
            </p>
            <div className="mt-6">
              <OTPValidation length={6} onComplete={handleOTPComplete} />
              <div className="text-right mt-3 ">
                <button
                  className="text-sm text-primary hover:underline font-bold"
                  onClick={handleResendCode}
                  disabled={resending}
                >
                  {resending ? "កំពុងផ្ញើរលេខសម្ងាត់ទៅអ្នក..." : t("VerifyCodeRegister.buttonVerifyAgain")}
                </button>
              </div>
            </div>
            <div className="mt-6">
              <Button
                type="submit"
                text={t("VerifyCodeRegister.buttons")}
                onClick={handleSubmit}
                isLoading={isLoading}
                className="w-full bg-primary hover:bg-primary text-white font-medium border-collapse"
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

export default OTPComponent;
