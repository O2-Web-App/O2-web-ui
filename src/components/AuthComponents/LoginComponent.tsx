"use client";
import React, { useState, useEffect } from "react";
import * as Yup from "yup";
import { Formik, Form } from "formik";
import { IoCloseSharp } from "react-icons/io5";
import Label from "./LabelComponent";
import DynamicField from "./AuthField";
import ErrorDynamic from "./ErrorComponent";
import PasswordField from "./PasswordField";
import Link from "next/link";
import Button from "./ButtonComponentForAuth";

import { useRouter } from "next/navigation";
import Image from "next/image";

import { useToast } from "@/hook/use-toast";
import { useAppDispatch, useAppSelector } from "@/app/redux/hooks";
import {
  selectToken,
  setAccessToken,
} from "@/app/redux/features/auth/authSlice";

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
  const { toast } = useToast();
  const router = useRouter();

  console.log("Access token: from Redux store", accessToken);

  const handleLogin = async (user: ValueTypes) => {
    setIsLoading(true);
  
    try {
      const response = await fetch(`${process.env.NEXT_PUBLIC_O2_API_URL}api/login`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(user),
      });
  
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
  
        toast({
          title: "Login Successful 🎉",
          description: "Redirecting to dashboard...",
          variant: "success",
          duration: 2000,
        });
  
        router.push(`/`);
      } else {
        throw new Error(result.message || "Login failed.");
      }
    } catch (error) {
      toast({
        title: "Login Failed",
        
        variant: "error",
        duration: 3000,
      });
      console.error("❌ Login Error:", error);
    } finally {
      setIsLoading(false);
    }
  };
  

  return (
    <section className="w-full h-screen md:p-20 lg:bg-[#F5F5F5]/60 lg:p-11">
      <div className="h-full w-full bg-transparent bg-white m-auto lg:mt-0 rounded-xl">
        <div className="lg:flex justify-between h-full">
          <div className="w-full lg:w-1/2 flex mx-auto">
            <div className="w-full mx-auto">
              <div className="lg:px-12">
                <div className="mt-12 md:mt-0 px-8 lg:mt-10 lg:px-12">
                  <h1 className="text-3xl font-bold text-primary">Login</h1>
                  <Formik
                    initialValues={initialValues}
                    validationSchema={validationSchema}
                    onSubmit={(values, { setSubmitting }) => {
                      handleLogin(values);
                      setSubmitting(false);
                    }}
                  >
                    {() => (
                      <Form className="py-4 mt-4">
                        <div className="space-y-4">
                          <div>
                            <Label htmlFor="email" text="Email" required />
                            <DynamicField
                              type="text"
                              name="email"
                              id="email"
                              placeholder="Enter your email"
                            />
                            <ErrorDynamic name="email" component="div" />
                          </div>

                          <div>
                            <Label
                              htmlFor="password"
                              text="Password"
                              required
                            />
                            <PasswordField
                              name="password"
                              id="password"
                              placeholder="Enter your password"
                            />
                            <ErrorDynamic name="password" component="div" />
                          </div>
                        </div>

                        <div className="mt-6">
                          <Button
                            type="submit"
                            text="Login"
                            isLoading={isLoading}
                            className="w-full bg-primary text-white"
                          />
                        </div>
                      </Form>
                    )}
                  </Formik>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default LoginComponent;
