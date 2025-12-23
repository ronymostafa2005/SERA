"use client";
import { ChevronLeftIcon, ChevronRightIcon } from "@heroicons/react/24/solid";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { useSidebar } from "../../Context/SidebarContext";
import { logout } from "../../utils/auth";
import { useEffect, useState } from "react";
import { useLoading } from "@/Context/LoadingContext";

const NAV_ITEMS = [
  { path: "/dashboard", label: "الرئيسية" },
  { path: "/quran", label: "القرآن الكريم" },
  { path: "/hadiths", label: "الأحاديث النبوية" },
  { path: "/lectures", label: "محاضرات إسلامية" },
  { path: "/Nakshabanii", label: "ابتهالات النشقبندي" },
  { path: "/books-shop", label: "تسوق الكتب" },
  { path : "/sera-nabi" , label : "السيرة النبوية"} , 
  { path: "/profile", label: "الملف الشخصي" },
];

export default function Sidebar() {
  const { isOpen, toggleSidebar } = useSidebar();
  const router = useRouter();
  const pathname = usePathname();
  const [userName, setUserName] = useState("Rony Mostafa");
  const [avatar, setAvatar] = useState("/default-avatar.png");
  const { setLoading } = useLoading();

  useEffect(() => {
    setLoading(false);
  }, [pathname, setLoading]);

  useEffect(() => {
    if (typeof window === "undefined") return;
    try {
      const stored = localStorage.getItem("currentUser");
      if (stored) {
        const parsed = JSON.parse(stored);
        if (parsed?.name) setUserName(parsed.name);
        if (parsed?.avatar) setAvatar(parsed.avatar);
      }
    } catch {
      // ignore parse errors
    }
  }, []);

  const handleLogout = () => {
    logout();
    router.push("/");
  };

  return (
    <div className="flex">
      <div
        className={`hidden md:block fixed top-0 left-0 h-screen w-64 text-white transform ${
          isOpen ? "translate-x-0" : "-translate-x-full"
        } transition-transform duration-200 ease-in-out shadow-2xl z-50 overflow-hidden 
        bg-black/90 border-r border-emerald-700/50 rounded-r-3xl will-change-transform`}
      >
        <div className="absolute inset-0 bg-gradient-to-b from-black via-slate-900 to-black background-animate opacity-90"></div>

        <div className="p-6 relative h-full z-10 flex flex-col">
          <div className="flex items-center gap-3 mb-8">
            <div className="relative">
              <img
                src={avatar}
                alt="User Avatar"
                className="w-10 h-10 rounded-full border border-emerald-400 object-cover shadow-md"
              />
              <span className="absolute bottom-0 right-0 block w-3 h-3 bg-emerald-500 border-2 border-black rounded-full"></span>
            </div>
            <div className="flex flex-col">
              <span className="font-semibold text-sm">{userName}</span>
              <span className="text-xs text-emerald-300">Online • متصلة</span>
            </div>
          </div>

          <p className="text-xs text-gray-300 mb-4 tracking-wide">
            منصتك الإسلامية • Quran • Stories • Duas
          </p>

          <ul className="space-y-3 flex-1">
            {NAV_ITEMS.map((item) => {
              const isActive = pathname === item.path;

              return (
                <li key={item.path}>
                  <Link
                    href={item.path}
                    prefetch
                    onClick={() => setLoading(true)}
                    className={`
                      block w-full p-3 rounded-xl border 
                      text-sm font-medium 
                      transition-all duration-300
                      ${
                        isActive
                          ? "bg-emerald-600/90 border-emerald-300 text-white shadow-[0_0_20px_rgba(16,185,129,0.8)] translate-x-1"
                          : "bg-black/40 border-transparent text-gray-200 hover:bg-slate-900/90 hover:border-emerald-400 hover:translate-x-1 hover:shadow-[0_0_15px_rgba(16,185,129,0.5)]"
                      }
                    `}
                  >
                    {item.label}
                  </Link>
                </li>
              );
            })}
          </ul>

          <div className="mt-6 text-[10px] text-gray-400 text-center mb-4">
            <p className="animate-pulse">
              ﷽ · اجعل هذه المنصة بابًا للأجر المستمر
            </p>
          </div>

          <button
            onClick={handleLogout}
            className="w-full px-4 py-3 bg-red-600/80 hover:bg-red-500 text-white font-semibold rounded-xl border border-red-400/50 transition-all duration-300 transform hover:scale-105 hover:shadow-[0_0_15px_rgba(239,68,68,0.6)] flex items-center justify-center gap-2"
          >
            <svg
              className="w-5 h-5"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1"
              />
            </svg>
            تسجيل الخروج
          </button>
        </div>
      </div>

      <button
        onClick={toggleSidebar}
        className={`
          hidden md:flex
          fixed top-1/2 transform -translate-y-1/2 
          bg-emerald-700 text-white p-3 
          rounded-full shadow-lg 
          hover:bg-emerald-500 transition-all duration-200 ease-in-out z-50
          border border-emerald-300/80
          ${isOpen ? "left-64 -translate-x-1/2" : "left-0 translate-x-1/2"}
        `}
      >
        {isOpen ? (
          <ChevronLeftIcon className="w-6 h-6" />
        ) : (
          <ChevronRightIcon className="w-6 h-6" />
        )}
      </button>

      <div className="md:hidden fixed top-0 left-0 right-0 z-50">
        <div className="flex items-center justify-between bg-black/80 backdrop-blur px-4 py-3 border-b border-emerald-600/50">
          <div className="flex items-center gap-3">
            <img
              src={avatar}
              alt="User Avatar"
              className="w-10 h-10 rounded-full border border-emerald-400 object-cover shadow-md"
            />
            <div className="flex flex-col">
              <span className="font-semibold text-sm text-white">{userName}</span>
              <span className="text-xs text-emerald-300">Online • متصلة</span>
            </div>
          </div>
          <button
            onClick={toggleSidebar}
            className="px-3 py-2 bg-emerald-600 rounded-lg text-white text-sm font-semibold"
          >
            القائمة
          </button>
        </div>
        {isOpen && (
          <div className="bg-black/90 border-b border-emerald-700/50 shadow-xl max-h-[70vh] overflow-auto">
            <ul className="p-4 space-y-3">
              {NAV_ITEMS.map((item) => {
                const isActive = pathname === item.path;
                return (
                  <li key={item.path}>
                    <Link
                      href={item.path}
                      prefetch
                      onClick={() => {
                        setLoading(true);
                        toggleSidebar();
                      }}
                      className={`
                        block w-full p-3 rounded-xl border 
                        text-sm font-medium 
                        transition-all duration-300
                        ${
                          isActive
                            ? "bg-emerald-600/90 border-emerald-300 text-white shadow-[0_0_20px_rgba(16,185,129,0.8)]"
                            : "bg-black/40 border-transparent text-gray-200 hover:bg-slate-900/90 hover:border-emerald-400"
                        }
                      `}
                    >
                      {item.label}
                    </Link>
                  </li>
                );
              })}
            </ul>
          </div>
        )}
      </div>
    </div>
  );
}
