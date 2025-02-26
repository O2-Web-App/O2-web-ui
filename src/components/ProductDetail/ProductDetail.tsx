"use client";
import ReadMoreMotion from "@/components/ReadMoreMotion";
import { FaHeart } from "react-icons/fa";
import { GoStarFill } from "react-icons/go";
import SimiliarProductCart from "./SimiliarProductCart";
import { FaMinus } from "react-icons/fa";
import { FaPlus } from "react-icons/fa";
import { MdOutlineShoppingCart } from "react-icons/md";
import { useState } from "react";
export default function ProductDetail() {
  const [counter, setCounter] = useState(0);
  const totalProduct = counter;
  const description =
    "ប៉េងប៉ោះ គឺជាវល្លិដើមទាបពួកមួយ ជាដំណាំក៏មានដុះឯងក៏មានផ្លែប្រើជាបន្លែជាដើម។បន្លែដែលមកពីក្រុមដើមស្ពៃទឹក (nightshade)ដែលមានដើមកំណើតនៅអាមេរិកខាងត្បូង។ប៉េងប៉ោះគឺជាប្រភពអាហារបំប៉នដ៏សំខាន់នៃសារធាតុលីកូប៉ែនដែលមានសារជាតិប្រឆាំងអុកស៊ីតកម្មដែលត្រូវបានផ្សារភ្ជាប់ទៅនឹងអត្ថប្រយោជន៍សុខភាពជាច្រើនរួមមានការកាត់បន្ថយហានិភ័យនៃជំងឺបេះដូង និងជំងឺមហារីក។វាក៏ជាប្រភពដ៏ អស្ចារ្យនៃវីតាមីនសេ ប៉ូតាស្យូម ហ្វូឡាត និងវីតាមីនK ។ ជាធម្មតាវាមានពណ៌ក្រហមនៅពេលពេញវ័យ ប៉េងប៉ោះក៏អាចមានច្រើនពណ៌រួមមានពណ៌លឿង ទឹកក្រូច បៃតង និងស្វាយលើសពីនេះទៅទៀតប៉េងប៉ោះតូចៗជាច្រើនមានរូបរាង និងរសជាតិខុសៗគ្នា។";
  return (
    <div className="bg-card_color  p-4 my-5 rounded-tr-[40px] rounded-tl-[40px] overflow-y-auto scrollbar-hide">
      {/* first section */}
      <div className="flex justify-between">
        {/* price */}
        <div className="flex justify-center items-center ">
          <p className="text-title text-accent pr-2">$4.00</p>
          <p className="text-description text-[16px] line-through">$6.00</p>
        </div>
        {/* hearticon */}
        <div className="relative">
          <div className="rounded-full h-[30px] w-[30px] bg-primary opacity-20 flex items-center justify-center"></div>
          <FaHeart className="text-primary absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2" />
        </div>
      </div>
      {/* title */}
      <p className="text-title my-5">ប៉េងប៉ោះ</p>
      {/* rating */}
      <div className="flex space-x-3">
        <div className="flex justify-between items-center space-x-2">
          <GoStarFill className="text-[#FFA629] text-body " />
          <GoStarFill className="text-[#FFA629] text-body" />
          <GoStarFill className="text-[#FFA629] text-body" />
          <GoStarFill className="text-[#FFA629] text-body" />
          <GoStarFill className="text-description text-body" />
        </div>
        <p className="text-body text-accent">(4.4)</p>
      </div>
      {/* description */}
      <ReadMoreMotion text={description} />
      {/* similar product */}
      <p className="text-title my-5">ផលិតផលស្រដៀងគ្នា</p>
      <SimiliarProductCart />
      {/* total price */}
      <div className="rounded-lg bg-primary-light-10 my-5 flex justify-between p-4">
        <p className="text-[20px] text-primary">ថ្លៃសរុបចំនួន $4.00</p>
        {/* increase  or decrease   */}
        <div className=" flex  items-center space-x-3">
          {/* decrease */}
          <button
            onClick={() => setCounter(totalProduct - 1)}
            className="bg-primary-light-70 h-[30px] w-[30px] rounded-full flex items-center justify-center  "
          >
            <FaMinus className="text-card_color" />
          </button>
          <p className="text-body">{totalProduct}</p>
          {/*  increase */}
          <button
            onClick={() => setCounter(totalProduct + 1)}
            className="bg-primary h-[30px] w-[30px] rounded-full flex items-center justify-center"
          >
            <FaPlus className="text-card_color" />
          </button>
        </div>
      </div>
      {/* add to cart */}
      <div className="rounded-lg bg-primary p-4 flex justify-center items-center text-card_color text-body space-x-3 ">
        <MdOutlineShoppingCart />
        <p>បន្ថែមទៅកន្ត្រក</p>
      </div>
    </div>
  );
}
