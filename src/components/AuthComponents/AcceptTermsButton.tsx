"use client";
import { Field } from "formik";
import React from "react";
import ErrorDynamic from "./ErrorComponent";

export default function AcceptTermsCheckbox({id, name }:any) {
  return (
    <div className="mt-4">
      <div className="flex items-center space-x-2">
        <Field
          type="checkbox"
          name={name}
          id={id}
          className="accent-primary w-4 h-4"
        />
        <label htmlFor={id} className="text-sm text-body">
          ខ្ញុំយល់ព្រមនឹង{" "}
          <a href="/privacy-policy" className="text-primary underline cursor-pointer">
            លក្ខខណ្ឌ និងគោលការណ៍
          </a>
        </label>
      </div>
      <ErrorDynamic name={name} component="div" />
    </div>
  );
}
