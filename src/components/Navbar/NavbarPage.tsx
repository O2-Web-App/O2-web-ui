"use client";
import React, { useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { Menu, X } from "lucide-react";

import { useGetUserQuery } from "@/app/redux/service/user";

interface NavbarTranslationKeys {
  navLinks: {
    home: string;
    test: string;
    university: string;
    jobs: string;
    privacyPolicy: string;
    aboutUs: string;
  };
  buttons: {
    signIn: string;
    khmerLanguage: string;
    englishLanguage: string;
  };
}

type NestedKeyOf<ObjectType extends object> = {
  [Key in keyof ObjectType & string]: ObjectType[Key] extends object
    ? `${Key}.${NestedKeyOf<ObjectType[Key]>}`
    : Key;
}[keyof ObjectType & string];

export default function NavbarPage() {
  const router = useRouter(); // Using Next.js router
  const pathname = usePathname();
  const [currentLocale, setCurrentLocale] = useState<string>("km");
  //const { i18n } = useTranslation();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  // Fetch user data
  const { data, isLoading } = useGetUserQuery(); // Include loading and error sta
  const [sidebarOpen, setSidebarOpen] = useState(false); // Sidebar state

  // Fetch user avatar with proper handling
  const userAvatar = data?.data?.avatar;
  const avatarUrl = userAvatar
    ? userAvatar.startsWith("http")
      ? userAvatar
      : `http://127.0.0.1:8000${userAvatar}`
    : "/auth/personplaceholder.png";

  useEffect(() => {
    // Check if the route has /en or /km in the URL
    const languageFromUrl = pathname.split("/")[1];

    // If the route includes '/en' or '/km', proceed to check sessionStorage
    if (languageFromUrl === "en" || languageFromUrl === "km") {
      const language = sessionStorage.getItem("language");

      if (language) {
        setCurrentLocale(language);
      } else {
        // If no language in sessionStorage, set it to 'km' by default
        sessionStorage.setItem("language", languageFromUrl);
        setCurrentLocale(languageFromUrl);
      }
    } else {
      // Default to 'km' if no valid language prefix in the URL
      sessionStorage.setItem("language", "km");
      setCurrentLocale("km");
    }

    // Cleanup when component unmounts, which will be triggered when the page is closed or refreshed
    return () => {
      sessionStorage.removeItem("language");
    };
  }, [pathname]);

  const handleLanguageChange = (lang: string) => {
    localStorage.setItem("language", lang); // Save language to localStorage
    setCurrentLocale(lang); // Update state to reflect the selected language
    const updatedPathname = pathname.replace(`/${currentLocale}`, ""); // Remove old locale
    router.push(`/${lang}${updatedPathname}`); // Navigate to the new language
  };

  const navLinks = [
    { href: "/", label: "Home" },
    { href: "/test", label: "Test" },
  ];

  // Handle sidebar toggle
  const toggleSidebar = () => {
    setSidebarOpen(!sidebarOpen);
  };

  // Close sidebar when clicking outside
  useEffect(() => {
    const handleOutsideClick = (event: MouseEvent) => {
      if (
        sidebarOpen &&
        !(event.target as HTMLElement).closest("#sidebar") &&
        !(event.target as HTMLElement).closest("#profile-avatar")
      ) {
        setSidebarOpen(false);
      }
    };
    document.addEventListener("mousedown", handleOutsideClick);
    return () => {
      document.removeEventListener("mousedown", handleOutsideClick);
    };
  }, [sidebarOpen]);

  // If `locale` is not available, you can set a default value
  return (
    <div className="w-full sticky top-0 z-50 bg-slate-50 border-b border-b-slate-100">
      <header className="flex items-center justify-between  max-w-[95%] mx-auto">
        {/* Logo and Navigation Links */}

        {/* Logo */}
        <Link href={`/`} className=" ">
          <div className=" w-[50px] h-[60px]">
            <Image
              src="/navbar/logo.png"
              alt="Logo"
              width={1000}
              height={1000}
              className="w-full h-full object-cover  "
            ></Image>
          </div>
        </Link>

        {/* Language Selector and Sign-in */}
        <div className="hidden md:flex lg:flex items-center space-x-6">
          {isLoading ? (
            // Show loading state while fetching user data
            <div className="flex items-center">
              {isLoading ? (
                <Link
                  href={`/login`}
                  className="bg-emerald-500 text-white rounded-xl px-5 py-2"
                >
                  Sign in
                </Link>
              ) : (
                <Image
                  src="https://i.natgeofe.com/n/548467d8-c5f1-4551-9f58-6817a8d2c45e/NationalGeographic_2572187_3x4.jpg"
                  alt="Loading"
                  width={35}
                  height={35}
                  className="w-full h-full rounded-full animate-pulse"
                />
              )}
            </div>
          ) : isLoading || !data ? (
            // If the user is not logged in or an error occurs, show the Login button
            <Link
              href={`/login`}
              className="bg-emerald-500 text-white rounded-xl lg:px-5 md:px-3 py-2"
            >
              Sign in
            </Link>
          ) : (
            // If the user is logged in, show their profile
            <div className="flex items-center space-x-4">
              <div className="w-12 h-12 border-2 border-primary bg-[#fdfdfd] rounded-full p-1">
                <div onClick={toggleSidebar}>
                  <Image
                    src={avatarUrl}
                    alt="User Avatar"
                    width={35}
                    height={35}
                    className="object-cover rounded-full w-full h-full"
                  />
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Hamburger Menu Button */}
        <button className="md:hidden" onClick={toggleSidebar}>
          {mobileMenuOpen ? <X size={27} /> : <Menu size={27} />}
        </button>

        {/* Sidebar */}
        {sidebarOpen && (
          <div className="fixed inset-0 bg-black bg-opacity-50 z-50">
            <div
              id="sidebar"
              className="fixed right-0 top-0 h-full w-72 bg-white shadow-lg p-6 transition-transform transform translate-x-0"
            >
              <button
                className="absolute top-4 right-4 text-gray-600"
                onClick={() => setSidebarOpen(false)}
              >
                <X size={24} />
              </button>
              <h2 className="text-lg font-semibold mb-4">User Profile</h2>
              <div className="flex items-center space-x-4">
                <Image
                  src={avatarUrl}
                  alt="User Avatar"
                  width={50}
                  height={50}
                  className="rounded-full"
                />
                <span className="text-lg">{data?.data?.name || "User"}</span>
              </div>
              <ul className="mt-6 space-y-4">
                <li>
                  <Link
                    href="/profile-about-user"
                    className="text-blue-500 hover:underline"
                  >
                    View Profile
                  </Link>
                </li>
                <li>
                  <Link
                    href="/settings"
                    className="text-blue-500 hover:underline"
                  >
                    Settings
                  </Link>
                </li>
                <li>
                  <button className="text-red-500 hover:underline">
                    Logout
                  </button>
                </li>
              </ul>
            </div>
          </div>
        )}
      </header>
    </div>
  );
}
