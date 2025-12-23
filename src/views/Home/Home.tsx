"use client";

import { useMemo } from "react";
import { useSidebar } from "../../Context/SidebarContext";
import Sidebar from "../../Components/Layout/Sidebar";
import {
  BookOpenIcon,
  VideoCameraIcon,
  DocumentTextIcon,
  SpeakerWaveIcon,
  ScaleIcon,
  HeartIcon,
  SparklesIcon,
  RectangleStackIcon,
  DevicePhoneMobileIcon,
  MicrophoneIcon,
  FilmIcon,
} from "@heroicons/react/24/solid";
import Loader from "@/Components/Loader/Loader";

const sectionLabels: { [key: string]: string } = {
  showall: "عرض الكل",
  videos: "فيديوهات",
  books: "كتب",
  articles: "مقالات",
  audios: "صوتيات",
  fatwa: "فتاوى",
  favorites: "المفضلة",
  quran: "القرآن الكريم",
  poster: "ملصقات",
  apps: "تطبيقات",
  khotab: "خطب",
};

const promoCards = [
  { path: "/dashboard", title: "الرئيسية", desc: "نظرة عامة على المنصة.", icon: "showall" },
  { path: "/quran", title: "القرآن الكريم", desc: "تلاوات وختمات متعددة.", icon: "quran" },
  { path: "/hadiths", title: "الأحاديث النبوية", desc: "بحث وتصفح الأحاديث.", icon: "books" },
  { path: "/lectures", title: "محاضرات إسلامية", desc: "محاضرات مرئية وصوتية.", icon: "videos" },
  { path: "/books-shop", title: "تسوق الكتب", desc: "مكتبة وشراء الكتب إلكترونياً.", icon: "books" },
  { path: "/sera-nabi", title: "السيرة النبوية", desc: "كتب السيرة وروابط قراءة مباشرة.", icon: "articles" },
  { path: "/Nakshabanii", title: "ابتهالات النقشبندي", desc: "استمع لأجمل الابتهالات.", icon: "audios" },
  { path: "/profile", title: "الملف الشخصي", desc: "إدارة بياناتك وصورتك.", icon: "favorites" },
];

// دالة لتحديد الأيقونة المناسبة لكل قسم
const getSectionIcon = (blockName: string) => {
  const iconClass = "w-8 h-8 text-emerald-400";
  
  switch (blockName) {
    case "quran":
      return <BookOpenIcon className={iconClass} />;
    case "videos":
      return <VideoCameraIcon className={iconClass} />;
    case "books":
      return <DocumentTextIcon className={iconClass} />;
    case "articles":
      return <DocumentTextIcon className={iconClass} />;
    case "audios":
      return <SpeakerWaveIcon className={iconClass} />;
    case "fatwa":
      return <ScaleIcon className={iconClass} />;
    case "favorites":
      return <HeartIcon className={iconClass} />;
    case "poster":
      return <RectangleStackIcon className={iconClass} />;
    case "apps":
      return <DevicePhoneMobileIcon className={iconClass} />;
    case "khotab":
      return <MicrophoneIcon className={iconClass} />;
    case "showall":
      return <SparklesIcon className={iconClass} />;
    default:
      return <FilmIcon className={iconClass} />;
  }
};

export default function Home() {
  const { isOpen, sections, loading, refreshSections } = useSidebar();
  const sortedSections = useMemo(
    () =>
      [...sections].sort((a, b) => (a.block_name || "").localeCompare(b.block_name || "")),
    [sections]
  );

  return (
    <>
      <Sidebar />
      <div className={`p-6 min-h-screen transition-all duration-500 ${isOpen ? "md:ml-64 ml-0" : "ml-0"} pt-20 md:pt-6`}>
      {/* Header Section */}
      <div className="relative mb-12 text-center">
        {/* Decorative Background Elements */}
        <div className="absolute inset-0 -z-10">
          <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-emerald-500/10 rounded-full blur-3xl animate-pulse"></div>
          <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-64 h-64 bg-emerald-400/15 rounded-full blur-2xl animate-pulse delay-500"></div>
        </div>

        {/* Main Title with Icons */}
        <div className="flex items-center justify-center gap-4 md:gap-6 mb-4 animate-fade-in-up">
          {/* Islamic Icon - Crescent Moon */}
          <div className="relative animate-float">
            <svg
              className="w-12 h-12 md:w-16 md:h-16 text-emerald-400 drop-shadow-[0_0_20px_rgba(16,185,129,0.9)]"
              viewBox="0 0 100 100"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M50 20 C30 20, 15 35, 15 50 C15 65, 30 80, 50 80 C70 80, 85 65, 85 50 C85 35, 70 20, 50 20 Z"
                fill="currentColor"
                opacity="0.3"
              />
              <path
                d="M50 25 C35 25, 22.5 37.5, 22.5 50 C22.5 62.5, 35 75, 50 75 C65 75, 77.5 62.5, 77.5 50 C77.5 37.5, 65 25, 50 25 Z"
                fill="currentColor"
              />
              <path
                d="M50 35 L52 42 L59 42 L53 46 L55 53 L50 49 L45 53 L47 46 L41 42 L48 42 Z"
                fill="currentColor"
                className="animate-pulse"
              />
            </svg>
          </div>

          {/* Main Title */}
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-emerald-400 via-emerald-300 to-emerald-500 drop-shadow-[0_0_25px_rgba(16,185,129,0.5)]">
            منصة الإسلام الشاملة
          </h1>

          {/* Islamic Icon - Quran */}
          <div className="relative animate-float-delayed">
            <svg
              className="w-12 h-12 md:w-16 md:h-16 text-emerald-400 drop-shadow-[0_0_20px_rgba(16,185,129,0.9)]"
              viewBox="0 0 100 100"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <rect x="20" y="15" width="60" height="70" rx="3" fill="currentColor" opacity="0.2"/>
              <rect x="20" y="15" width="60" height="70" rx="3" stroke="currentColor" strokeWidth="2"/>
              <line x1="30" y1="25" x2="70" y2="25" stroke="currentColor" strokeWidth="1.5"/>
              <line x1="30" y1="35" x2="70" y2="35" stroke="currentColor" strokeWidth="1.5"/>
              <line x1="30" y1="45" x2="70" y2="45" stroke="currentColor" strokeWidth="1.5"/>
              <line x1="30" y1="55" x2="70" y2="55" stroke="currentColor" strokeWidth="1.5"/>
              <line x1="30" y1="65" x2="60" y2="65" stroke="currentColor" strokeWidth="1.5"/>
              <circle cx="50" cy="75" r="3" fill="currentColor" className="animate-pulse"/>
            </svg>
          </div>
        </div>

        {/* Subtitle */}
        <p className="text-lg md:text-xl text-gray-300 mb-2 animate-fade-in delay-300">
          استكشف مكتبة شاملة من المحتوى الإسلامي الموثوق
        </p>
        
        {/* Decorative Line */}
        <div className="flex items-center justify-center gap-4 mt-6 animate-fade-in delay-500">
          <div className="w-16 h-0.5 bg-gradient-to-r from-transparent to-emerald-400"></div>
          <div className="w-2 h-2 bg-emerald-400 rounded-full animate-pulse"></div>
          <div className="w-16 h-0.5 bg-gradient-to-l from-transparent to-emerald-400"></div>
        </div>

        {/* Stats or Description */}
        <div className="mt-8 flex flex-wrap items-center justify-center gap-6 md:gap-8 text-sm md:text-base">
          <div className="flex items-center gap-2 text-emerald-400">
            <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
              <path d="M9 2a1 1 0 000 2h2a1 1 0 100-2H9z" />
              <path fillRule="evenodd" d="M4 5a2 2 0 012-2 3 3 0 003 3h2a3 3 0 003-3 2 2 0 012 2v11a2 2 0 01-2 2H6a2 2 0 01-2-2V5zm3 4a1 1 0 000 2h.01a1 1 0 100-2H7zm3 0a1 1 0 000 2h3a1 1 0 100-2h-3zm-3 4a1 1 0 100 2h.01a1 1 0 100-2H7zm3 0a1 1 0 100 2h3a1 1 0 100-2h-3z" clipRule="evenodd" />
            </svg>
            <span className="text-gray-300">محتوى موثوق</span>
          </div>
          <div className="flex items-center gap-2 text-emerald-400">
            <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
              <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm1-12a1 1 0 10-2 0v4a1 1 0 00.293.707l2.828 2.829a1 1 0 101.415-1.415L11 9.586V6z" clipRule="evenodd" />
            </svg>
            <span className="text-gray-300">محدث يومياً</span>
          </div>
          <div className="flex items-center gap-2 text-emerald-400">
            <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
              <path fillRule="evenodd" d="M3.172 5.172a4 4 0 015.656 0L10 6.343l1.172-1.171a4 4 0 115.656 5.656L10 17.657l-6.828-6.829a4 4 0 010-5.656z" clipRule="evenodd" />
            </svg>
            <span className="text-gray-300">مجاني بالكامل</span>
          </div>
        </div>
      </div>

      {/* روابط المنصة */}
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-3xl font-bold text-emerald-400 drop-shadow-[0_0_20px_rgba(16,185,129,0.9)]">روابط المنصة</h2>
        <button
          onClick={refreshSections}
          className="px-4 py-2 bg-emerald-600/80 hover:bg-emerald-500 text-sm rounded-lg transition"
        >
          تحديث البيانات
        </button>
      </div>

       {loading ? (
         <Loader />
       ) : (
         <div className="text-emerald-200 mb-4">
           استكشف صفحات المنصة 
         </div>
       )}

       <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
        {promoCards.map((card) => (
          <div
            key={card.path}
            className="rounded-2xl bg-gradient-to-br from-black/80 via-slate-900/80 to-black/80 p-6 text-white hover:from-black/90 hover:via-slate-900/90 hover:to-black/90 transition-all duration-300 border border-emerald-500/20 hover:border-emerald-400/40 relative overflow-hidden"
          >
            <div className="absolute inset-0 opacity-10">
              <div className="absolute top-0 right-0 w-32 h-32 bg-emerald-500/20 rounded-full blur-3xl"></div>
              <div className="absolute bottom-0 left-0 w-24 h-24 bg-emerald-400/20 rounded-full blur-2xl"></div>
            </div>

            <div className="relative z-10 space-y-3 text-center">
              <div className="w-16 h-16 mx-auto bg-emerald-600/20 rounded-full flex items-center justify-center border-2 border-emerald-400/50">
                {getSectionIcon(card.icon)}
              </div>
              <h3 className="text-xl font-bold text-emerald-400">{card.title}</h3>
              <p className="text-sm text-gray-300">{card.desc}</p>
              <div className="flex justify-center">
                <a
                  href={card.path}
                  className="px-4 py-2 bg-emerald-600/80 hover:bg-emerald-500 text-white text-sm font-semibold rounded-full transition-all duration-300 transform hover:scale-105"
                >
                  افتح الصفحة
                </a>
              </div>
            </div>
          </div>
        ))}
      </div>

      </div>
    </>
  );
}

