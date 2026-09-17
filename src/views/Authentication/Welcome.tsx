"use client";
import { useRouter } from "next/navigation";
import Link from "next/link";
import Image from "next/image";
import { useEffect, useState } from "react";
import backgroundImage from "../../assets/movie-background.jpg";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faKaaba } from "@fortawesome/free-solid-svg-icons";

export default function Welcome() {
  const router = useRouter();
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    const loadContent = async () => {
      if (typeof window !== "undefined") {
        await document.fonts.ready;
        requestAnimationFrame(() => {
          setTimeout(() => setIsMounted(true), 150);
        });
      }
    };
    loadContent();
  }, []);

  return (
    <div className="relative flex items-center justify-center min-h-screen overflow-hidden text-white">
      {/* الخلفية */}
      <div className="absolute inset-0">
        <Image
          src={backgroundImage}
          alt="Background"
          fill
          className="object-cover animate-background-pan"
          style={{ backgroundAttachment: "fixed" }}
          priority
        />
      </div>

      {/* طبقة تدرج متحركة */}
      <div
        className="absolute inset-0 background-animate opacity-90"
        style={{
          background: "linear-gradient(135deg, rgba(0,0,0,0.82) 0%, rgba(16,185,129,0.08) 40%, rgba(0,0,0,0.78) 70%, rgba(177,151,252,0.06) 100%)",
          backgroundSize: "300% 300%",
        }}
      />

      {/* كرات ضوئية خلفية */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-[20%] left-[15%] w-72 h-72 rounded-full bg-emerald-500/20 blur-[100px] animate-orb" />
        <div className="absolute bottom-[25%] right-[10%] w-96 h-96 rounded-full bg-violet-500/15 blur-[120px] animate-orb" style={{ animationDelay: "-6s" }} />
        <div className="absolute top-[50%] left-[50%] w-64 h-64 rounded-full bg-emerald-400/10 blur-[80px] animate-orb" style={{ animationDelay: "-12s" }} />
      </div>

      {/* المحتوى الرئيسي */}
      <div
        className={`relative z-10 flex flex-col items-center text-center px-6 max-w-4xl mx-auto transition-all duration-700 ${
          isMounted ? "opacity-100" : "opacity-0"
        }`}
      >
        {/* أيقونة متحركة مع توهج */}
        <div
          className={`mb-6 opacity-0 ${isMounted ? "animate-scale-in opacity-100" : ""}`}
          style={{ animationDelay: "0.1s", animationFillMode: "forwards" }}
        >
          <span
            className="inline-flex items-center justify-center w-20 h-20 md:w-24 md:h-24 rounded-2xl bg-gradient-to-br from-emerald-500/30 to-violet-500/30 border border-emerald-400/40 backdrop-blur-sm animate-float-icon animate-glow-pulse"
            style={{ boxShadow: "0 0 40px rgba(16,185,129,0.25), inset 0 1px 0 rgba(255,255,255,0.1)" }}
          >
            <FontAwesomeIcon
              icon={faKaaba}
              className="text-4xl md:text-5xl text-emerald-400"
              style={{ filter: "drop-shadow(0 0 12px rgba(16,185,129,0.8))" }}
            />
          </span>
        </div>

        {/* العنوان */}
        <h1
          className={`text-4xl md:text-6xl lg:text-7xl font-extrabold mb-6 opacity-0 ${isMounted ? "animate-fade-in-up animate-text-glow opacity-100" : ""} delay-300`}
          style={{
            color: "#6ee7b7",
            textShadow: "0 0 20px rgba(16,185,129,0.5), 0 0 40px rgba(16,185,129,0.2)",
            animationFillMode: "forwards",
          }}
        >
          مرحباً بك في منصة الإسلام الشاملة
        </h1>

        {/* الوصف */}
        <p
          className={`text-lg md:text-xl text-gray-200/95 mb-12 max-w-2xl leading-relaxed opacity-0 ${isMounted ? "animate-slide-up-blur opacity-100" : ""} delay-700`}
          style={{ animationFillMode: "forwards" }}
        >
          استكشف مكتبة شاملة من المحتوى الإسلامي الموثوق
        </p>

        {/* الأزرار */}
        <div
          className={`flex flex-col sm:flex-row gap-4 opacity-0 ${isMounted ? "animate-fade-in-up opacity-100" : ""} delay-1000`}
          style={{ animationFillMode: "forwards" }}
        >
          <Link
            href="/signup"
            className="group relative px-10 py-4 rounded-2xl font-bold text-white overflow-hidden transition-all duration-300 hover:scale-105 hover:-translate-y-1 active:scale-[0.98]"
            style={{
              background: "linear-gradient(135deg, #059669 0%, #10b981 50%, #34d399 100%)",
              boxShadow: "0 10px 40px -10px rgba(16,185,129,0.5), 0 0 0 1px rgba(255,255,255,0.1) inset",
            }}
          >
            <span className="relative z-10">إنشاء حساب جديد</span>
            <span
              className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300"
              style={{
                background: "linear-gradient(135deg, #10b981 0%, #34d399 100%)",
              }}
            />
          </Link>

          <Link
            href="/login"
            className="group relative px-10 py-4 rounded-2xl font-bold text-white transition-all duration-300 hover:scale-105 hover:-translate-y-1 active:scale-[0.98] border-2 border-emerald-400/60 hover:border-emerald-400 hover:shadow-[0_0_30px_rgba(16,185,129,0.3)] bg-black/40 backdrop-blur-sm"
          >
            تسجيل الدخول
          </Link>
        </div>

        {/* خط زخرفي تحت الأزرار */}
        <div
          className={`mt-14 h-px w-32 rounded-full opacity-0 ${isMounted ? "animate-fade-in opacity-100" : ""} delay-1200`}
          style={{
            background: "linear-gradient(90deg, transparent, rgba(16,185,129,0.6), transparent)",
            animationFillMode: "forwards",
          }}
        />
      </div>
    </div>
  );
}
