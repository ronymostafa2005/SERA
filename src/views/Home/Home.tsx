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
import { CardBody, CardContainer, CardItem } from "@/Components/ui/3d-card";

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

const infoCubes = [
  {
    title: "رسالة المنصة",
    lines: [
      "منصتنا الإسلامية تقدم محتوى ديني موثوق وآمن لجميع الأعمار، مع التركيز على التعليم والفهم الصحيح للدين.",
      "هدفنا هو تسهيل الوصول إلى مصادر دينية موثوقة، وتمكين المستخدمين من التعلم والتفاعل بشكل آمن.",
      "منصة تجمع بين التعلم والتفاعل، لتكون دليلك اليومي لفهم الدين بطريقة مبسطة وعملية.",
    ],
  },
  {
    title: "ميزات المنصة",
    lines: [
      "تتيح لك المنصة تصحيح الأحاديث والاطلاع على مصادر موثوقة مثل موقع الأزهر والدرر السنية.",
      "يمكنك متابعة الدروس، المقالات، والمحاضرات الدينية، مع إمكانية التفاعل وطرح الأسئلة.",
    ],
  },
  {
    title: "حماية وبحث ذكي",
    lines: [
      "نضمن حماية المحتوى ومنع النسخ، لتوفير بيئة تعليمية آمنة لجميع المستخدمين.",
      "توفر المنصة أدوات بحث ذكية للوصول السريع للمعلومة الصحيحة دون عناء.",
    ],
  },
  {
    title: "تشجيع المستخدم",
    lines: [
      "انضم إلينا لتكتشف محتوى ديني موثوق بطريقة سهلة وممتعة.",
      "ابدأ رحلتك في التعلم الإسلامي بثقة مع منصة تقدم كل ما تحتاجه من مصادر وأدوات.",
    ],
  },
  {
    title: "رحلة علمية آمنة",
    lines: [
      "مع منصتنا، العلم الشرعي أصبح بين يديك، بطريقة آمنة ومبسطة تناسب الجميع.",
    ],
  },
];

const cinematicItems = [
  {
    src: "/images/09bcd3a39ca0ee40e2f9b69992d10591.jpg",
    title: "رسالة أمل",
    line: "مهما عملت واذنبت اوعي تستلم لشيطانك ويقنعك ان حالتك ميوؤس منها عافر وجاهدوادعي كتير لربك ومتنساش",
    verse: "قُلْ يَا عِبَادِيَ الَّذِينَ أَسْرَفُوا عَلَى أَنفُسِهِمْ لَا تَقْنَطُوا مِن رَّحْمَةِ اللَّهِ ۚ إِنَّ اللَّهَ يَغْفِرُ الذُّنُوبَ جَمِيعًا ۚ إِنَّهُ هُوَ الْغَفُورُ الرَّحِيمُ [الزمر: 53]",
  },
  {
    src: "/images/0b4a52d860c5725c12911c4a4214aaeb.jpg",
    title: "مثال 1",
    line: "مهما ضاع منك وقتك أو غلبتك الوساوس، ارجع لربك بكل قلبك، واطلب منه الهداية والصبر.",
    verse: "قُلْ رَبِّ أَعُوذُ بِكَ مِنْ هَمَزَاتِ الشَّيَاطِينِ وَأَعُوذُ بِكَ رَبِّ أَنْ يَحْضُرُونِ [المؤمنون: 97-98]",
  },
  {
    src: "/images/4a0ed22888a03d79c86a6cc10c79ffbf.jpg",
    title: "مثال 2",
    line: "لو شعرت بالذنب أو الضعف، تذكّر أن رحمة الله وسعت كل شيء، ولا تيأس من الدعاء والتوبة.",
    verse: "وَأَنِيبُوا إِلَى رَبِّكُمْ وَأَسْلِمُوا لَهُ قَبْلَ أَنْ يَأْتِيَكُمُ الْعَذَابُ ثُمَّ لَا تُنصَرُونَ [الزمر: 54]",
  },
  {
    src: "/images/4dedfab3b5c66b611b53a68cf03f9402.jpg",
    title: "مثال 3",
    line: "مهما كبرت خطاياك أو كثرت زلاتك، تذكر أن الله يغفر لمن تاب ورجع بإخلاص.",
    verse: "إِنَّ اللَّهَ يُحِبُّ التَّوَّابِينَ وَيُحِبُّ الْمُتَطَهِّرِينَ [البقرة: 222]",
  },
  {
    src: "/images/547d7e1692a13b33b47fb7a721177f84.jpg",
    title: "مثال 4",
    line: "لا تترك اليأس يسيطر عليك، وواصل الاجتهاد والطاعة مهما كانت الظروف صعبة.",
    verse: "فَاسْتَغْفِرُوا رَبَّكُمْ ثُمَّ تُوبُوا إِلَيْهِ إِنَّ رَبِّي رَحِيمٌ وَدُودٌ [هود: 90]",
  },
  {
    src: "/images/b7d3a71c95cd316d03544e5e1ced1380.jpg",
    title: "مثال 5",
    line: "كل يوم فرصة جديدة للتقرب من الله، فلا تحرم قلبك من الطمأنينة بالرجوع إليه.",
    verse: "قُلْ يَا عِبَادِيَ الَّذِينَ أَسْرَفُوا عَلَى أَنفُسِهِمْ لَا تَقْنَطُوا مِن رَّحْمَةِ اللَّهِ [الزمر: 53]",
  },
];

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
      <div className="max-w-7xl mx-auto space-y-12">
      <div className="relative mb-12 text-center">
        <div className="absolute inset-0 -z-10">
          <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-emerald-500/10 rounded-full blur-3xl animate-pulse"></div>
          <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-64 h-64 bg-emerald-400/15 rounded-full blur-2xl animate-pulse delay-500"></div>
        </div>

        <div className="flex items-center justify-center gap-4 md:gap-6 mb-4 animate-fade-in-up">
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

          <h1 className="text-4xl md:text-5xl lg:text-6xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-emerald-400 via-emerald-300 to-emerald-500 drop-shadow-[0_0_25px_rgba(16,185,129,0.5)]">
            منصة الإسلام الشاملة
          </h1>

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

        <p className="text-lg md:text-xl text-gray-300 mb-2 animate-fade-in delay-300">
          استكشف مكتبة شاملة من المحتوى الإسلامي الموثوق
        </p>
        
        <div className="flex items-center justify-center gap-4 mt-6 animate-fade-in delay-500">
          <div className="w-16 h-0.5 bg-gradient-to-r from-transparent to-emerald-400"></div>
          <div className="w-2 h-2 bg-emerald-400 rounded-full animate-pulse"></div>
          <div className="w-16 h-0.5 bg-gradient-to-l from-transparent to-emerald-400"></div>
        </div>

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

      <div className="flex flex-col gap-3 md:flex-row md:items-center md:justify-between mb-4">
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
          <CardContainer key={card.path} className="w-full">
            <CardBody className="rounded-2xl bg-gradient-to-br from-black/80 via-slate-900/80 to-black/80 p-6 text-white hover:from-black/90 hover:via-slate-900/90 hover:to-black/90 transition-all duration-300 border border-emerald-500/20 hover:border-emerald-400/40 relative overflow-hidden shadow-[0_20px_40px_-24px_rgba(16,185,129,0.5)]">
              <div className="absolute inset-0 opacity-10">
                <div className="absolute top-0 right-0 w-32 h-32 bg-emerald-500/20 rounded-full blur-3xl"></div>
                <div className="absolute bottom-0 left-0 w-24 h-24 bg-emerald-400/20 rounded-full blur-2xl"></div>
              </div>

              <div className="relative z-10 space-y-3 text-center">
                <CardItem translateZ={60}>
                  <div className="w-16 h-16 mx-auto bg-emerald-600/20 rounded-full flex items-center justify-center border-2 border-emerald-400/50">
                    {getSectionIcon(card.icon)}
                  </div>
                </CardItem>
                <CardItem translateZ={50}>
                  <h3 className="text-xl font-bold text-emerald-400">{card.title}</h3>
                </CardItem>
                <CardItem translateZ={40}>
                  <p className="text-sm text-gray-300">{card.desc}</p>
                </CardItem>
                <div className="flex justify-center">
                  <CardItem translateZ={60}>
                    <a
                      href={card.path}
                      className="px-4 py-2 bg-emerald-600/80 hover:bg-emerald-500 text-white text-sm font-semibold rounded-full transition-all duration-300 transform hover:scale-105"
                    >
                      افتح الصفحة
                    </a>
                  </CardItem>
                </div>
              </div>
            </CardBody>
          </CardContainer>
        ))}
      </div>

      <div className="mt-14">
        <div className="flex flex-col gap-3 md:flex-row md:items-center md:justify-between mb-6">
          <div>
            <h3 className="text-3xl font-bold text-emerald-400 drop-shadow-[0_0_20px_rgba(16,185,129,0.9)]">
            لمحة عن المنصة
            </h3>
          
          </div>
        </div>

        <div className="relative rounded-3xl border border-emerald-500/20 bg-gradient-to-br from-slate-900/70 via-black/70 to-slate-900/70 p-4 md:p-6 shadow-[0_20px_60px_-25px_rgba(16,185,129,0.45)]">
          <div className="pointer-events-none absolute inset-x-0 top-3 z-20 h-12">
            <svg className="w-full h-full" preserveAspectRatio="none" viewBox="0 0 100 20">
              <path
                d="M0 10 H15 L20 5 L25 15 L30 10 H45 L50 3 L55 17 L60 10 H75 L80 6 L85 14 L90 10 H100"
                className="stroke-[1.5]"
                stroke="url(#pulseGrad)"
                fill="transparent"
                strokeLinecap="round"
                strokeLinejoin="round"
                style={{ filter: "drop-shadow(0 0 6px rgba(34,211,238,0.8))" }}
              >
                <animate
                  attributeName="stroke-dashoffset"
                  values="30;0;30"
                  dur="2s"
                  repeatCount="indefinite"
                />
                <animate
                  attributeName="stroke-width"
                  values="2;2.8;2"
                  dur="1.5s"
                  repeatCount="indefinite"
                />
              </path>
              <defs>
                <linearGradient id="pulseGrad" x1="0%" y1="0%" x2="100%" y2="0%">
                  <stop offset="0%" stopColor="#22d3ee" stopOpacity="0" />
                  <stop offset="20%" stopColor="#22d3ee" stopOpacity="0.9" />
                  <stop offset="80%" stopColor="#10b981" stopOpacity="0.9" />
                  <stop offset="100%" stopColor="#10b981" stopOpacity="0" />
                </linearGradient>
              </defs>
            </svg>
          </div>

          <div className="pointer-events-none absolute inset-x-0 top-2 z-30 grid gap-7 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 2xl:grid-cols-5 px-2">
            {infoCubes.map((_, idx) => (
              <div key={idx} className="flex flex-col items-center gap-1">
                <span className="relative inline-block w-3 h-3 rounded-full bg-cyan-400 shadow-[0_0_14px_rgba(34,211,238,0.9)] animate-pulse">
                  <span className="absolute inset-0 rounded-full bg-cyan-400/30 blur-[2px]"></span>
                </span>
                <span className="w-[1.5px] h-10 bg-gradient-to-b from-cyan-400/90 via-cyan-300/70 to-transparent"></span>
              </div>
            ))}
          </div>

          <div className="relative z-10 grid gap-7 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 2xl:grid-cols-5 pt-12">
            {infoCubes.map((cube, idx) => (
              <CardContainer key={cube.title} className="group w-full">
                <CardBody className="relative h-full rounded-3xl bg-gradient-to-br from-slate-900/95 via-black/85 to-slate-900/90 border border-emerald-500/25 shadow-[0_25px_60px_-12px_rgba(16,185,129,0.45)] overflow-hidden transform-gpu transition-all duration-500 group-hover:shadow-[0_25px_70px_-10px_rgba(34,211,238,0.5)] [transform-style:preserve-3d]">
                  <div className="absolute inset-0 opacity-25 bg-[radial-gradient(circle_at_20%_20%,rgba(16,185,129,0.5),transparent_48%),radial-gradient(circle_at_80%_0%,rgba(34,211,238,0.45),transparent_42%)]"></div>
                  <div className="absolute -top-12 -right-12 w-32 h-32 bg-emerald-500/20 blur-3xl"></div>
                  <div className="absolute -bottom-10 -left-6 w-28 h-28 bg-cyan-400/15 blur-2xl"></div>
                  <div className="absolute inset-px rounded-[28px] border border-emerald-500/15 bg-gradient-to-br from-emerald-500/8 via-transparent to-cyan-400/8 backdrop-blur-sm"></div>
                  <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 bg-[radial-gradient(circle_at_50%_0%,rgba(34,211,238,0.25),transparent_45%)]"></div>
                  <div className="absolute inset-0">
                    <div className="absolute left-6 top-6 w-12 h-[1px] bg-gradient-to-r from-transparent via-cyan-300/70 to-transparent"></div>
                    <div className="absolute right-6 bottom-6 w-12 h-[1px] bg-gradient-to-r from-transparent via-emerald-300/60 to-transparent"></div>
                  </div>

                  <div className="relative z-10 p-6 space-y-4 min-h-[260px] flex flex-col">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <CardItem translateZ={40}>
                          <span className="inline-flex items-center justify-center w-8 h-8 rounded-full bg-emerald-600/50 text-sm font-bold text-white border border-emerald-400/60 shadow-[0_0_12px_rgba(16,185,129,0.6)]">
                            {idx + 1}
                          </span>
                        </CardItem>
                        <CardItem translateZ={50}>
                          <h4 className="text-xl font-bold text-emerald-200 drop-shadow-[0_0_10px_rgba(34,211,238,0.35)]">
                            {cube.title}
                          </h4>
                        </CardItem>
                      </div>
                      <CardItem translateZ={40}>
                        <span className="w-3 h-3 rounded-full bg-cyan-400 shadow-[0_0_16px_rgba(34,211,238,0.9)] animate-pulse"></span>
                      </CardItem>
                    </div>
                    <div className="space-y-2 text-gray-200 leading-relaxed text-sm flex-1">
                      {cube.lines.map((line) => (
                        <CardItem
                          key={line}
                          translateZ={55}
                          className="block"
                        >
                          <p className="bg-white/5 rounded-xl p-3 border border-emerald-500/10 shadow-inner shadow-emerald-500/10 group-hover:border-cyan-400/25 transition-colors duration-300">
                            {line}
                          </p>
                        </CardItem>
                      ))}
                    </div>
                  </div>
                </CardBody>
              </CardContainer>
            ))}
          </div>
        </div>
      </div>

      <div className="mt-16 relative">
        <div className="flex flex-col gap-3 md:flex-row md:items-center md:justify-between mb-6">
          <div>
            <h3 className="text-3xl font-bold text-emerald-400 drop-shadow-[0_0_20px_rgba(16,185,129,0.9)]">
              استعن بالله 
            </h3>
          </div>
        
        </div>

        <div className="absolute inset-0 -z-10 blur-3xl bg-[radial-gradient(circle_at_20%_20%,rgba(16,185,129,0.18),transparent_40%),radial-gradient(circle_at_80%_0%,rgba(34,211,238,0.16),transparent_42%)]"></div>

        <div className="grid gap-6 lg:grid-cols-2 xl:grid-cols-3">
          {cinematicItems.map((item, idx) => (
            <CardContainer key={item.src} className="w-full">
              <CardBody className="relative overflow-hidden rounded-3xl bg-black/30 border border-emerald-500/20 shadow-[0_25px_70px_-25px_rgba(16,185,129,0.55)] group transition-all duration-500">
                <CardItem translateZ={35}>
                  <div
                    className="aspect-[16/9] bg-cover bg-center transition-transform duration-700 group-hover:scale-[1.04]"
                    style={{ backgroundImage: `url(${item.src})` }}
                    role="img"
                    aria-label={item.title}
                  />
                </CardItem>
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/55 to-transparent pointer-events-none"></div>
                <div className="absolute inset-x-0 bottom-0 p-6 space-y-3">
                  <CardItem translateZ={45}>
                    <div className="flex items-center gap-2 text-xs text-emerald-200 uppercase tracking-[0.2em]">
                      <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse"></span>
                    
                    </div>
                  </CardItem>
                  <CardItem translateZ={55}>
                    <p className="text-lg md:text-xl font-semibold text-white leading-relaxed drop-shadow-[0_0_15px_rgba(0,0,0,0.6)]">
                      {item.line}
                    </p>
                  </CardItem>
                  <CardItem translateZ={50}>
                    <p className="text-sm text-emerald-100 leading-relaxed bg-white/5 border border-white/10 rounded-2xl p-3 shadow-inner shadow-emerald-500/10">
                      {item.verse}
                    </p>
                  </CardItem>
                </div>
                <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500">
                  <div className="absolute inset-4 rounded-3xl border border-emerald-400/30"></div>
                  <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,rgba(34,211,238,0.15),transparent_45%)]"></div>
                </div>
              </CardBody>
            </CardContainer>
          ))}
        </div>
      </div>

      </div>
      </div>
    </>
  );
}

