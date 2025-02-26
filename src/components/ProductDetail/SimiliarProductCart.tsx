import Image from "next/image";
import React from "react";
import { GoHeart } from "react-icons/go";
import { GoHeartFill } from "react-icons/go";
export default function SimiliarProductCart() {
  const data = [
    {
      name: "ប៉េងប៉ោះ",
      imageUrl:
        "https://www.fervalle.com/wp-content/uploads/2022/07/580b57fcd9996e24bc43c23b-1024x982.png",
    },
    {
      name: "ខ្ទឹមបារាំង",
      imageUrl: "https://brusco.co.uk/wp-content/uploads/2024/02/Onion.png",
    },
    {
      name: "ផ្កាខាត់ណាខៀវ",
      imageUrl:
        "https://dtgxwmigmg3gc.cloudfront.net/imagery/assets/derivations/icon/512/512/true/eyJpZCI6ImM1ODI2NmMwN2FkMTI3ODU2NWQ5MmFjNTkzODJjZDMyLmpwZyIsInN0b3JhZ2UiOiJwdWJsaWNfc3RvcmUifQ?signature=4a0e5fc44bf9d86c7dce0c91f4a085000961528e67bd718d0ce354a70b1f09bc",
    },
    {
      name: "ផ្កាខាត់ណាខៀវ",
      imageUrl:
        "https://dtgxwmigmg3gc.cloudfront.net/imagery/assets/derivations/icon/512/512/true/eyJpZCI6ImM1ODI2NmMwN2FkMTI3ODU2NWQ5MmFjNTkzODJjZDMyLmpwZyIsInN0b3JhZ2UiOiJwdWJsaWNfc3RvcmUifQ?signature=4a0e5fc44bf9d86c7dce0c91f4a085000961528e67bd718d0ce354a70b1f09bc",
    },
  ];
  return (
    <div className="flex space-x-3 overflow-x-auto whitespace-nowrap w-full  scrollbar-hide">
      {data.map((item, index) => (
        <div
          key={index}
          className="w-[200px] min-w-[150px] bg-primary-light-10 p-2 rounded-lg"
        >
          <img
            src={item.imageUrl}
            alt={item.name}
            className="object-cover w-full  rounded-md"
          />
          <div className="flex justify-between items-center mt-4 ">
            <p className="text-body truncate w-[90%]">{item.name}</p>
            <GoHeart />
          </div>
        </div>
      ))}
    </div>
  );
}
