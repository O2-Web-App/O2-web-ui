"use client";
import { Form, Formik } from "formik";
import Image from "next/image";
import React, { useState } from "react";
import { IoChevronBackCircle } from "react-icons/io5";
import Label from "./LabelComponent";
import DynamicField from "./AuthField";
import { FcGoogle } from "react-icons/fc";
import ErrorDynamic from "./ErrorComponent";
import PasswordField from "./PasswordField";
import Button from "./ButtonComponentForAuth";
import * as Yup from "yup";
export default function RegisterComponet() {
  const [isLoading, setIsLoading] = useState(false);

  const initialValues = {
    email: "",
    password: "",
    confirmPassword: "",
  };
  const validationSchema = Yup.object({
    email: Yup.string()
      .email("អ៉ីម៉ែលរបស់អ្នកមិនត្រឹមត្រូវ")
      .required("អ្នកត្រូវបញ្ជូលអ៉ីម៉ែលរបស់អ្នក"),
    password: Yup.string()
      .min(8, "ពាក្យសម្ងាត់របស់អ្នកខ្លីពេក, សូមបញ្ជូលពាក្យសម្ងាត់ 8 តួរ")
      .required("អ្នកត្រូវបញ្ជូលពាក្យសម្ងាត់របស់អ្នក"),
    confirmPassword: Yup.string()
      .oneOf([Yup.ref("password")], "ពាក្យសម្ងាត់របស់អ្នកមិនដូចគ្នា")
      .required("អ្នកត្រូវបញ្ជូលពាក្យសម្ងាត់បញ្ជាក់"),
  });

  return (
    <section className="bg-primary w-full h-screen flex flex-col justify-between">
      {/* header section */}

      {/* icon back */}
      <div className=" px-5 pt-5 ">
        <div className="h-[50px] w-[50px] flex flex-col items-start justify-start">
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
          onSubmit={(values) => {
            console.log(values);
          }}
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

                {/* comfirm password */}
                <div>
                  <Label
                    htmlFor="confirmPassword"
                    text="ពាក្យសម្ងាត់បញ្ជាក់"
                    required
                  />
                  <PasswordField
                    name="confirmPassword"
                    id="confirmPassword"
                    placeholder="សូមបញ្ជូលពាក្យសម្ងាត់បញ្ជាក់"
                  />
                  <ErrorDynamic name="confirmPassword" component="div" />
                </div>
              </div>

              <div className="mt-6">
                <Button
                  type="submit"
                  text="បង្កើតគណនី"
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
            icon={<FcGoogle className="text-title mr-2" />}
            type="submit"
            text="បង្កើតគណនីតាម Google"
            className="w-full border-[1px] text-body "
          />
        </div>
      </div>
    </section>
  );
}
