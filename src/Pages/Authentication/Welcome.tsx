"use client";

import Link from "next/link";
import Image from "next/image";
import backgroundImage from "./../../assets/movie-background.jpg";

export default function Welcome() {
  return (
    <div
      className="relative flex items-center justify-center h-screen overflow-hidden text-white"
      style={{
        backgroundImage: `url(${backgroundImage})`,
        backgroundSize: "cover",
        backgroundPosition: "center center",
      }}
    >
      {/* طبقة تظليل بألوان غامقة تميل للإسلامي */}
      <div className="absolute inset-0 bg-gradient-to-r from-black via-slate-900 to-black opacity-80"></div>

      {/* خلفية متحركة مع بلور خفيف */}
      <div className="absolute inset-0 z-0 animate-background-pan blur-sm overflow-hidden">
        <Image
          src={backgroundImage}
          alt="Background"
          fill
          className="object-cover"
          style={{
            backgroundAttachment: "fixed",
          }}
        />
      </div>

      {/* المحتوى */}
      <div className="relative z-10 text-center px-4">
        <div className="flex items-center justify-center gap-4 md:gap-6 mb-6 animate-fade-in-up flex-wrap">
          {/* أيقونة هلال إسلامي */}
          <div className="relative animate-float">
            <svg
              className="w-14 h-14 md:w-20 md:h-20 text-emerald-400 drop-shadow-[0_0_20px_rgba(16,185,129,0.9)]"
              viewBox="0 0 100 100"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              {/* هلال */}
              <path
                d="M50 20 C30 20, 15 35, 15 50 C15 65, 30 80, 50 80 C70 80, 85 65, 85 50 C85 35, 70 20, 50 20 Z"
                fill="currentColor"
                opacity="0.3"
              />
              <path
                d="M50 25 C35 25, 22.5 37.5, 22.5 50 C22.5 62.5, 35 75, 50 75 C65 75, 77.5 62.5, 77.5 50 C77.5 37.5, 65 25, 50 25 Z"
                fill="currentColor"
              />
              {/* نجمة داخل الهلال */}
              <path
                d="M50 35 L52 42 L59 42 L53 46 L55 53 L50 49 L45 53 L47 46 L41 42 L48 42 Z"
                fill="currentColor"
                className="animate-pulse"
              />
            </svg>
          </div>

          <h1 className="text-4xl md:text-6xl font-extrabold drop-shadow-[0_0_25px_rgba(0,0,0,0.9)]">
            مرحبًا بك في منصتك الإسلامية
          </h1>

          {/* أيقونة مصحف */}
          <div className="relative animate-float-delayed">
            <svg
              className="w-14 h-14 md:w-20 md:h-20 text-emerald-400 drop-shadow-[0_0_20px_rgba(16,185,129,0.9)]"
              viewBox="0 0 100 100"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              {/* غلاف المصحف */}
              <rect x="20" y="15" width="60" height="70" rx="3" fill="currentColor" opacity="0.2"/>
              <rect x="20" y="15" width="60" height="70" rx="3" stroke="currentColor" strokeWidth="2"/>
              
              {/* صفحات المصحف */}
              <line x1="30" y1="25" x2="70" y2="25" stroke="currentColor" strokeWidth="1.5"/>
              <line x1="30" y1="35" x2="70" y2="35" stroke="currentColor" strokeWidth="1.5"/>
              <line x1="30" y1="45" x2="70" y2="45" stroke="currentColor" strokeWidth="1.5"/>
              <line x1="30" y1="55" x2="70" y2="55" stroke="currentColor" strokeWidth="1.5"/>
              <line x1="30" y1="65" x2="60" y2="65" stroke="currentColor" strokeWidth="1.5"/>
              
              {/* زخرفة إسلامية */}
              <circle cx="50" cy="75" r="3" fill="currentColor" className="animate-pulse"/>
            </svg>
          </div>
        </div>

        <p className="text-lg md:text-2xl text-gray-200 animate-fade-in delay-500 max-w-2xl mx-auto leading-relaxed">
          استمع لتلاوات خاشعة، وتعرّف على قصص الأنبياء، وتصفّح
          مكتبة من المحتوى الإسلامي الموثوق في مكان واحد.
        </p>

        <div className="mt-10 flex items-center justify-center">
          {/* زر رئيسي */}
          <Link href="/signup">
            <button
              className="
                px-10 py-3 
                bg-black/80 
                border border-emerald-500/70 
                rounded-full 
                text-lg font-semibold 
                shadow-lg 
                transition 
                duration-300 
                transform 
                hover:-translate-y-1 
                hover:scale-105 
                hover:bg-emerald-600 
                hover:border-emerald-300
                hover:shadow-[0_0_25px_rgba(16,185,129,0.9)]
                focus:outline-none
                focus:ring-2
                focus:ring-emerald-500
              "
            >
              ابدأ رحلتك الإيمانية الآن
            </button>
          </Link>
        </div>

        {/* نص صغير متحرك تحت الأزرار */}
        <p className="mt-8 text-sm md:text-base text-gray-300 animate-pulse">
          محتوى منوّع: قرآن كريم • قصص أنبياء • محاضرات • أدعية
        </p>
      </div>
    </div>
  );
}
