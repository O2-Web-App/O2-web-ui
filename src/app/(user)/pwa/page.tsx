"use client";

import React from "react";

export default function InstallPwaPage() {
  return (
    <div className=" flex flex-col items-center justify-center ">
      <div className=" p-6 w-full ">
        <h1 className="text-3xl font-bold text-center text-accent mb-6">
          Install Our App For IOS Device
        </h1>
        <p className="text-center text-gray-700 mb-6">
          Follow these simple steps to add the app to your home screen!
        </p>

        <ol className="list-decimal list-inside space-y-4 text-gray-800">
          <li className="flex items-start gap-2">
            <span className="text-2xl">🧭</span>
            <span>
              Open <strong>Safari</strong> browser on your iPhone or iPad.
            </span>
          </li>
          <li className="flex items-start gap-2">
            <span className="text-2xl">🌐</span>
            <span>
              Visit our website: <strong>https://cam-o2.com</strong>
            </span>
          </li>
          <li className="flex items-start gap-2">
            <span className="text-2xl">📤</span>
            <span>
              Tap the <strong>Share</strong> button (the square with an arrow
              pointing up).
            </span>
          </li>
          <li className="flex items-start gap-2">
            <span className="text-2xl">➕</span>
            <span>
              Scroll down and tap <strong>"Add to Home Screen"</strong>.
            </span>
          </li>
          <li className="flex items-start gap-2">
            <span className="text-2xl">✅</span>
            <span>
              Tap <strong>Add</strong> on the top right. Done!
            </span>
          </li>
        </ol>
      </div>
      <div className="p-6 w-full text-center ">
        <h1 className="text-3xl font-bold text-accent mb-6">
          Install Our App For Android Device
        </h1>
        <p className="text-gray-700">Click the install icon on button right concer below 👇</p>
      </div>
    </div>
  );
}
