"use client";
import React, { useState, useEffect } from "react";
import * as Yup from "yup";
import { Formik, Form } from "formik";
import { IoCloseSharp } from "react-icons/io5";
import Label from "./LabelComponent";
import DynamicField from "./AuthField";
import ErrorDynamic from "./ErrorComponent";
import Button from "./ButtonComponentForAuth"; // Adjust the import path as needed
import { useForgotPasswordMutation } from "@/redux/service/auth";
// import "react-toastify/dist/ReactToastify.css";
// import { ToastContainer, toast } from "react-toastify";
import { useRouter } from "next/navigation";
import { useAppDispatch } from "@/redux/hooks";
import { setEmail } from "@/redux/feature/verify/verifySlice";
import Image from "next/image";
import Link from "next/link";
import { useTranslations } from "next-intl";
import { useToast } from "@/hooks/use-toast";
type ValueTypes = {
  email: string;
};

const initialValues: ValueTypes = {
  email: "",
};

const validationSchema = Yup.object().shape({
  email: Yup.string()
    .email("អ៉ីម៉ែលរបស់អ្នកមិនត្រឹមត្រូវ")
    .required("អ្នកត្រូវបញ្ជូលអ៉ីម៉ែលរបស់អ្នក"),
});

const ForgotPasswordComponent = () => {
  const t = useTranslations();
  const [currentLocale, setCurrentLocale] = useState<string>("km");
  const [forgotPassword] = useForgotPasswordMutation();
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);
  const { toast } = useToast()
  const dispatch = useAppDispatch();
  useEffect(() => {
    const savedLanguage = localStorage.getItem("language");
    if (savedLanguage) {
      setCurrentLocale(savedLanguage);
    }
  }, []);
  const handleForgotPassword = async (values: ValueTypes) => {
    setIsLoading(true);
    const { email } = values;
    try {
      const response = await forgotPassword({ email }).unwrap();
      // toast({
      //   title: "Your progress has been saved!",
      //   description: "You can continue later from your profile.",
      //   variant: "success",
      //   duration: 5000,
      // })
      toast({
        title: (response.message || "Email sent successfully!"),
        description: "Your action was completed.",
        variant: "success", // Use "destructive" for error messages
        duration: 4000,
      })
      // toast.success(
      //   response.message || "Password reset email sent successfully!"
      // );
      dispatch(setEmail(email));
      // Optionally, navigate to a confirmation page
      setTimeout(() => {
        router.push(`/${currentLocale}/verify-code-forgot`);
        // router.push("/verify-code-forgot"); // Update the path to your actual confirmation page
      });
    } catch (error: unknown) {
      console.error("Forgot Password Error:", error);

      if (
        error &&
        typeof error === "object" &&
        "status" in error &&
        "data" in error
      ) {
        const typedError = error as {
          status: number;
          data: { detail?: string; message?: string };
        };

        if (typedError.data?.detail) {
          // Specific error message like "User with this email does not exist."
          // toast.error(typedError.data.detail);
          // toast({
          //   title: "Uh oh! Something went wrong.",
          //   description: "Failed to save progress. Please try again.",
          //   variant: "error",
          //   duration: 5000,
          // })
          toast({
            title: (typedError.data.detail || "Uh oh! Something went wrong."),
            description: "Your email is not correct. Please try again.",
            variant: "error", // Use "destructive" for error messages
            duration: 4000,
          })
        } else {
          toast({
            title: (typedError.data.detail || "Uh oh! Something went wrong."),
            description: "Your email is not correct. Please try again.",
            variant: "error", // Use "destructive" for error messages
            duration: 4000,
          })
          // toast({
          //   title: (typedError.data.detail || "An error occurred during registration. Please try again."),
          //   description: "Your action was not completed.",
          //   variant: "default", // Use "destructive" for error messages
          //   className :"bg-red-600 text-white",
          //   duration: 2000,
          // })
          // toast.error("An error occurred. Please try again.");
        }
      } else {
        toast({
          title: ("An error occurred during registration. Please try again."),
          description: "Your action was not completed.",
          variant: "error", // Use "destructive" for error messages
          duration: 4000,
        })
        // toast.error("An unknown error occurred.");
      }
    } finally {
      setIsLoading(false);
    }
  };
  const handleClose = () => {
    //  href={`/${currentLocale}/login`}
    router.push(`/${currentLocale}/login`); // Redirect to the referrer
  };

  return (
    // <section className="w-full  h-screen flex justify-center items-center ">
    //     <div className='m-auto md:w-1/2 lg:w-1/3 p-8 border-1 border bg-white border-slate-100 rounded-xl'>
    //     <div className="">
    //         {/* Close Button - Left Aligned */}
    //         <div className="mb-5 flex justify-between ">
    //          <Link href={`/${currentLocale}/`}>
    //          <Image
    //                  src="/assets/logo-text.jpg"
    //                   width={1000} height={1000}
    //                     alt="Logo Image"
    //                     className="w-48"
    //                   />
    //          </Link>
    //             <div className="">
    //             <button
    //                 className="text-2xl text-gray-500 hover:text-gray-700"
    //                 onClick={() => handleClose()}
    //             >
    //                 <IoCloseSharp />
    //             </button>
    //             </div>
    //       </div>
    //     <div className="bg-white">
    //       <h1 className="text-3xl pb-3 font-bold text-primary">{t("ForgotPassword.title")}</h1>
    //       <p className=' text-slate-400'>{t("ForgotPassword.description")}</p>
    //       <Formik
    //         initialValues={initialValues}
    //         validationSchema={validationSchema}
    //         onSubmit={(values, { setSubmitting }) => {
    //           handleForgotPassword(values);
    //           console.log('Form Submitted:', values);
    //           setSubmitting(false); // Simulate a submission delay
    //         }}
    //       >
    //         {({}) => (
    //           <Form>
    //             <div className="space-y-4 mt-8">
    //               {/* Email Field */}
    //               <div>
    //                 <Label htmlFor="email" text={t("ForgotPassword.fields.email.label")} required />
    //                 <DynamicField
    //                   type="text"
    //                   name="email"
    //                   id="email"
    //                   placeholder={t("ForgotPassword.fields.email.placeholder")}
    //                 />
    //                 <ErrorDynamic  name="email" component="div" />
    //               </div>

    //             </div>

    //             {/* Submit Button */}
    //             <div className="mt-6">
    //               <Button
    //                 type="submit"
    //                 text={t("ForgotPassword.buttons")}
    //                 isLoading={isLoading} // Show loading spinner when the form is submitting
    //                 className="w-full bg-primary hover:bg-primary text-white font-medium border-collapse"
    //               />
    //             </div>

    //           </Form>

    //         )}

    //       </Formik>
    //       <ToastContainer />
    //     </div>
    //   </div>
    //     </div>

    // </section>
    <section className="w-full bg-[#F5F5F5]/60 h-screen p-16 ">
      <section className="h-full">
        <section className="h-full flex justify-between  bg-white rounded-xl">
          <div className="hidden md:flex lg:block lg: w-full  pb-8 lg:w-7/12 lg:pb-5 bg-primary/10 md:rounded-xl lg:rounded-none lg:rounded-l-xl">
            <div className="md:hidden lg:block pt-7">
              <Image
                src="/auth/1.png"
                width={1000}
                height={1000}
                alt="Login Image"
                className="max-w-lg mx-auto "
              />
            </div>
            <div className="mx-auto text-center pt-12">
              <h1 className="text-3xl text-primary font-bold">
                {t("Login.left.title")}
              </h1>
              <p className="text-gray-400 md:pt-5 lg:pt-3  md:px-20 lg:px-14 text-lg max-w-2xl mx-auto ">
                {t("Login.left.description")}
              </p>
            </div>
          </div>
          <div className="mx-auto my-14 md:w-1/2 lg:w-1/3   rounded-xl">
            <div className="mb-6">
              <div className=" flex justify-between ">
                <Link href={`/${currentLocale}/`}>
                  <Image
                    src="/assets/logo-text.jpg"
                    width={1000}
                    height={1000}
                    alt="Logo Image"
                    className="w-48"
                  />
                </Link>
                <div className="">
                  <button
                    className="text-2xl text-gray-500 hover:text-gray-700"
                    onClick={() => handleClose()}
                  >
                    <IoCloseSharp />
                  </button>
                </div>
              </div>
              <div>
                {/* <p className="text-lg text-gray-400 pt-4 px-3">រកឃើញសក្តានុពល និងស្វែងរកជំនាញឯកទេស នៅសាកលវិទ្យាល័យដែលស្របទៅនឹងចំណង់ចំណូលចិត្ត ចំណុចខ្លាំង។</p> */}
              </div>
            </div>
            <div className="border border-1 border-slate-100 p-8 rounded-xl">
              {/* Close Button - Left Aligned */}

              <div className="bg-white">
                <h1 className="text-3xl pb-3 font-bold text-primary">
                  {t("ForgotPassword.title")}
                </h1>
                <p className=" text-slate-400">
                  {t("ForgotPassword.description")}
                </p>
                <Formik
                  initialValues={initialValues}
                  validationSchema={validationSchema}
                  onSubmit={(values, { setSubmitting }) => {
                    handleForgotPassword(values);
                    console.log("Form Submitted:", values);
                    setSubmitting(false); // Simulate a submission delay
                  }}
                >
                  {({}) => (
                    <Form>
                      <div className="space-y-4 mt-8">
                        {/* Email Field */}
                        <div>
                          <Label
                            htmlFor="email"
                            text={t("ForgotPassword.fields.email.label")}
                            required
                          />
                          <DynamicField
                            type="text"
                            name="email"
                            id="email"
                            placeholder={t(
                              "ForgotPassword.fields.email.placeholder"
                            )}
                          />
                          <ErrorDynamic name="email" component="div" />
                        </div>
                      </div>

                      {/* Submit Button */}
                      <div className="mt-6">
                        <Button
                          type="submit"
                          text={t("ForgotPassword.buttons")}
                          isLoading={isLoading} // Show loading spinner when the form is submitting
                          className="w-full bg-primary hover:bg-primary text-white font-medium border-collapse"
                        />
                      </div>
                    </Form>
                  )}
                </Formik>
              </div>
            </div>
          </div>
        </section>
      </section>
    </section>
  );
};

export default ForgotPasswordComponent;
