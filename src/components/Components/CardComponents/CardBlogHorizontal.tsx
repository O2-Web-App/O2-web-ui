// import React from 'react'
// import Image from 'next/image'
// import Link from 'next/link'
// import { Bookmark, BookmarkCheck } from 'lucide-react';

// interface CardBlogHorizontalProps {
//     id: string
//     tags: { uuid: string; name: string }[];
//     date: string
//     view: number
//     title: string
//     image: string
//     isBookmarked: boolean;
//     bookmarks: (id: string) => void;
// }

// // Function to format date from "2025-02-25T05:20:22.000000Z" to "25 Feb 2025"
// const formatDate = (dateString: string) => {
//     const date = new Date(dateString);
//     return date.toLocaleDateString("en-GB", {
//         day: "2-digit",
//         month: "short",
//         year: "numeric",
//     });
// };

// const CardBlogHorizontal = ({
//     id,
//     tags,
//     date,
//     view,
//     title,
//     image,
//     isBookmarked,
//     bookmarks,
// }: CardBlogHorizontalProps) => {
//     return (
//         <div className="w-full mx-auto py-4">
//             <div className="flex justify-between gap-4 items-start">
//                 {/* Image */}
//                 <Link href={`/blog/${id}`} className="w-24 h-24 aspect-square rounded-lg overflow-hidden flex-shrink-0">
//                     <Image
//                         src={image}
//                         alt={title}
//                         width={1000}
//                         height={1000}
//                         unoptimized
//                         className="w-full h-full object-cover"
//                     />
//                 {/* </Link> */}

//                 {/* Content */}
//                 <div className="flex-1 space-y-1 w-full items-center">
//                     <div className="flex justify-between gap-y-3">
//                         <div className="flex flex-wrap gap-2 items-center">
//                             {tags.length > 0 ? (
//                                 tags.map((tag) => (
//                                     <span
//                                         key={tag.uuid}
//                                         className="text-sm font-medium bg-gray-200 px-2 py-1 rounded-lg"
//                                     >
//                                         {tag.name}
//                                     </span>
//                                 ))
//                             ) : (
//                                 <span className="text-sm font-medium bg-gray-200 px-2 py-1 rounded-lg">
//                                     Untagged
//                                 </span>
//                             )}
//                         </div>
//                         {/* <button
//                             onClick={() => bookmarks(id)}
//                             // disabled={disabledBookmark}
//                             className="p-2 "
//                         >
//                             {isBookmarked ? <BookmarkCheck className="w-6 h-6 text-yellow-500" /> : <Bookmark className="w-5 h-5 " />}
//                         </button> */}
//                     </div>
//                     {/* Wrap date & views inside a div and align to end */}
//                     <div className="flex justify-end text-xs text-gray-500">
//                         <span>{formatDate(date)} • {view} views</span>
//                     </div>
//                     {/* <Link href={`/blog/${id}`} > */}
//                         <h1 className="text-xl font-semibold tracking-tight truncate max-w-[250px]">{title}</h1>
//                     </Link>
//                 </div>
//             </div>
//         </div>
//     )
// }

// export default CardBlogHorizontal;

"use client"

import React, { useState, useRef, useEffect } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { Bookmark, BookmarkCheck, MoreVertical } from 'lucide-react'
import { useGetUserQuery } from '@/app/redux/service/user'
import { useRouter } from 'next/navigation'

interface CardBlogHorizontalProps {
  id: string
  tags: { uuid: string; name: string }[]
  date: string
  view: number
  title: string
  image: string
  isBookmarked: boolean
  bookmarks: (id: string) => void
  disabledBookmark?: boolean
}

const formatDate = (dateString: string) => {
  const date = new Date(dateString)
  return date.toLocaleDateString('en-GB', {
    day: '2-digit',
    month: 'short',
    year: 'numeric',
  })
}

const CardBlogHorizontal = ({
  id,
  tags,
  date,
  view,
  title,
  image,
  isBookmarked,
  bookmarks,
  disabledBookmark = false,
}: CardBlogHorizontalProps) => {
  const { data: user } = useGetUserQuery()
  const router = useRouter()

  const [menuOpen, setMenuOpen] = useState(false)
  const menuRef = useRef<HTMLDivElement>(null)

  // Close menu on outside click
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (menuRef.current && !menuRef.current.contains(event.target as Node)) {
        setMenuOpen(false)
      }
    }
    document.addEventListener('mousedown', handleClickOutside)
    return () => document.removeEventListener('mousedown', handleClickOutside)
  }, [])

  return (
    <div className="w-full mx-auto py-4 relative">
      <div className="flex justify-between gap-4 items-start">
        {/* Image */}
        <Link
          href={`/blog/${id}`}
          className="w-24 h-24 aspect-square rounded-lg overflow-hidden flex-shrink-0"
        >
          <Image
            src={image}
            alt={title}
            width={1000}
            height={1000}
            unoptimized
            className="w-full h-full object-cover"
          />
        </Link>

        {/* Content */}
        <div className="flex-1 space-y-1 w-full items-center">
          <div className="flex justify-between gap-y-3">
            <div className="flex flex-wrap gap-2 items-center">
              {tags.length > 0 ? (
                tags.map((tag) => (
                  <span
                    key={tag.uuid}
                    className="text-sm font-medium bg-gray-200 px-2 py-1 rounded-lg"
                  >
                    {tag.name}
                  </span>
                ))
              ) : (
                <span className="text-sm font-medium bg-gray-200 px-2 py-1 rounded-lg">
                  Untagged
                </span>
              )}
            </div>

            {/* Right-side Menu */}
            <div className="relative" ref={menuRef}>
              {user ? (
                <>
                  <button
                    className="p-2"
                    onClick={() => setMenuOpen(!menuOpen)}
                  >
                    <MoreVertical className="w-5 h-5 text-gray-700" />
                  </button>
                  {menuOpen && (
                    <div className="absolute right-0 mt-1 bg-white border shadow-md rounded-md text-sm z-10 min-w-[120px]">
                      <button
                        onClick={() => router.push(`/blog/${id}`)}
                        className="w-full text-left px-4 py-2 hover:bg-gray-100"
                      >
                        View
                      </button>
                      <button
                        onClick={() => router.push(`/editBlog/${id}`)}
                        className="w-full text-left px-4 py-2 hover:bg-gray-100"
                      >
                        Edit
                      </button>
                      <button
                        onClick={() => alert(`Delete blog ${id}`)}
                        className="w-full text-left px-4 py-2 text-red-600 hover:bg-gray-100"
                      >
                        Delete
                      </button>
                    </div>
                  )}
                </>
              ) : (
                <button
                  onClick={() => bookmarks(id)}
                  disabled={disabledBookmark}
                  className={`p-2 ${
                    disabledBookmark ? 'opacity-50 cursor-not-allowed' : ''
                  }`}
                >
                  {isBookmarked ? (
                    <BookmarkCheck className="w-6 h-6 text-yellow-500" />
                  ) : (
                    <Bookmark className="w-5 h-5" />
                  )}
                </button>
              )}
            </div>
          </div>

          {/* Date and Views */}
          <div className="flex justify-end text-xs text-gray-500">
            <span>{formatDate(date)} • {view} views</span>
          </div>

          {/* Blog Title */}
          <Link href={`/blog/${id}`}>
            <h1 className="text-xl font-semibold tracking-tight truncate max-w-[250px]">
              {title}
            </h1>
          </Link>
        </div>
      </div>
    </div>
  )
}

export default CardBlogHorizontal
