"use client";
import React, { useState, useEffect } from "react";
import * as Yup from "yup";
import { Formik, Form } from "formik";
import { IoChevronBackCircle, IoCloseSharp } from "react-icons/io5";
import Label from "./LabelComponent";
import DynamicField from "./AuthField";
import ErrorDynamic from "./ErrorComponent";
import PasswordField from "./PasswordField";
import Link from "next/link";
import Button from "./ButtonComponentForAuth";

import { useRouter } from "next/navigation";
import Image from "next/image";

// import { useToast } from "@/hook/use-toast";
import { useAppDispatch, useAppSelector } from "@/app/redux/hooks";
import {
  selectToken,
  setAccessToken,
} from "@/app/redux/features/auth/authSlice";
import { FcGoogle } from "react-icons/fc";
import { toast } from "sonner";

type ValueTypes = {
  email: string;
  password: string;
};

const initialValues: ValueTypes = {
  email: "",
  password: "",
};

const LoginComponent = () => {
  //const t = useTranslations();
  const validationSchema = Yup.object().shape({
    email: Yup.string()
      .email("អ៉ីម៉ែលរបស់អ្នកមិនត្រឹមត្រូវ")
      .required("អ្នកត្រូវបញ្ជូលអ៉ីម៉ែលរបស់អ្នក"),
    password: Yup.string()
      .min(8, "ពាក្យសម្ងាត់របស់អ្នកខ្លីពេក, សូមបញ្ជូលពាក្យសម្ងាត់ 8 តួរ")
      .required("អ្នកត្រូវបញ្ជូលពាក្យសម្ងាត់របស់អ្នក"),
  });

  const [isLoading, setIsLoading] = useState(false);
  const dispatch = useAppDispatch();
  const accessToken = useAppSelector(selectToken);
  // const { toast } = useToast();
  const router = useRouter();

  const handleLoginWithGoogle = async () => {
    try {
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_O2_API_URL}api/auth/google`
      );
      const result = await response.json();
      console.log(result);
    } catch (error) {
      console.log(error);
    }
  };

  const handleLogin = async (user: ValueTypes) => {
    setIsLoading(true);

    try {
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_O2_API_URL}api/login`,
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(user),
        }
      );

      const result = await response.json();
      console.log("Login API Response:", result);

      if (response.ok && result?.data?.access_token) {
        const { access_token, refresh_token } = result.data;

        console.log("✅ Extracted Access Token:", access_token);

        // Store tokens in Redux
        dispatch(setAccessToken(access_token));

        // Store refresh token in cookies
        document.cookie = `refresh_token=${refresh_token}; path=/; Secure; HttpOnly; SameSite=Strict`;

        // Save in localStorage for persistence
        localStorage.setItem("access_token", access_token);

        // toast({
        //   title: "Login Successful 🎉",
        //   description: "Redirecting to dashboard...",
        //   variant: "success",
        //   duration: 2000,
        // });

        router.push(`/`);
      } else {
        toast.success("អ៉ីម៉ែលឬពាក្យសម្ងាត់មិនត្រឹមត្រូវ", {
          style: {
            background: "#bb2124",
          },
        });
      }
    } catch (error) {
      // toast({
      //   title: "Login Failed",

      //   variant: "error",
      //   duration: 3000,
      // });
      console.error("❌ Login Error:", error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <section className="bg-primary w-full h-screen flex flex-col justify-between">
      {/* header section */}

      {/* icon back */}
      <div className=" px-5 pt-5 ">
        <div
          onClick={() => router.push("/")}
          className="h-[50px] w-[50px] flex flex-col items-start justify-start"
        >
          <IoChevronBackCircle className="h-full w-full text-card_color" />
        </div>
      </div>
      {/* Logo centered while keeping icon at start */}
      <div className=" flex justify-center ">
        <div className="w-[100px] h-[100px] rounded-full bg-white flex items-center justify-center">
          <Image
            alt="logo"
            src={"/logo.png"}
            width={150}
            height={150}
            className="object-cover rounded-full h-full w-full"
          />
        </div>
      </div>
      {/* welcome  */}
      <p className="text-heading text-card_color text-center my-5">
        O2 សូមស្វាគមន៍
      </p>

      {/* form section */}
      <div className="w-full h-[70%]  bg-card_color rounded-tr-[40px] rounded-tl-[40px] p-5 ">
        <p className="text-[24px]">បង្កើតគណនី</p>
        <Formik
          initialValues={initialValues}
          validationSchema={validationSchema}
          onSubmit={handleLogin}
        >
          {() => (
            <Form className="py-5 mt-4">
              <div className="space-y-4">
                {/* email */}
                <div>
                  <Label htmlFor="email" text="អ៉ីម៉ែល" required />
                  <DynamicField
                    type="text"
                    name="email"
                    id="email"
                    placeholder="សូមបញ្ជូលអ៉ីម៉ែលរបស់អ្នក"
                  />
                  <ErrorDynamic name="email" component="div" />
                </div>

                {/* password */}
                <div>
                  <Label htmlFor="password" text="ពាក្យសម្ងាត់" required />
                  <PasswordField
                    name="password"
                    id="password"
                    placeholder="សូមបញ្ជូលពាក្យសម្ងាត់របស់អ្នក"
                  />
                  <ErrorDynamic name="password" component="div" />
                </div>

                {/* forget password */}
                <p
                  onClick={() => router.push("/forget-password")}
                  className="text-[14px] text-end text-accent"
                >
                  ភ្លេចពាក្យសម្ងាត់មែនទេ?
                </p>
              </div>

              <div className="mt-6">
                <Button
                  type="submit"
                  text="ចូលគណនី"
                  isLoading={isLoading}
                  className="w-full bg-primary text-white"
                />
              </div>
            </Form>
          )}
        </Formik>

        {/* divide  */}
        <div className="flex justify-center items-center">
          <div className="flex-1 bg-description h-[0.7px]"></div>
          <div className="px-3">ឬ</div>
          <div className="flex-1 bg-description h-[0.7px]"></div>
        </div>

        {/* google button login */}

        <div className="mt-6 ">
          <Button
            onClick={() => handleLoginWithGoogle()}
            icon={<FcGoogle className="text-title mr-2" />}
            type="submit"
            text="បង្កើតគណនីតាម Google"
            className="w-full border-[1px] text-body "
          />
        </div>
        <p className="text-[14px] text-description mt-6 text-center">
          មិនទាន់មានគណនីមែនទេ?{" "}
          <span
            onClick={() => router.push("/register")}
            className="text-[14px] text-accent"
          >
            បង្កើតគណនី
          </span>
        </p>
      </div>
    </section>
  );
};

export default LoginComponent;