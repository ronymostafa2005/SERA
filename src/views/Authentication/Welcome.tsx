"use client";

import { useRouter } from "next/navigation";
import Link from "next/link";
import Image from "next/image";
import backgroundImage from "../../assets/movie-background.jpg";

export default function Welcome() {
  const router = useRouter();

  return (
    <div className="relative flex items-center justify-center h-screen overflow-hidden text-white">
      <div className="absolute inset-0">
        <Image
          src={backgroundImage}
          alt="Background"
          fill
          className="object-cover"
          style={{ backgroundAttachment: "fixed" }}
        />
      </div>

      <div className="absolute inset-0 bg-gradient-to-br from-black/75 via-black/65 to-black/75"></div>

      <div className="relative z-10 flex flex-col items-center text-center px-6">
        <h1 className="text-4xl md:text-6xl font-extrabold text-emerald-400 mb-6 animate-fade-in-up drop-shadow-[0_0_20px_rgba(16,185,129,0.9)]">
          مرحباً بك في منصة الإسلام الشاملة ✨
        </h1>

        <p className="text-lg md:text-2xl text-gray-200 mb-10 max-w-xl animate-fade-in delay-500">
          استكشف مكتبة شاملة من المحتوى الإسلامي الموثوق
        </p>

        <div className="flex flex-col sm:flex-row gap-4 animate-fade-in delay-700">
          <Link
            href="/signup"
            className="px-8 py-4 bg-emerald-600 hover:bg-emerald-500 text-white font-semibold rounded-full shadow-lg transition-all duration-300 transform hover:-translate-y-1 hover:scale-105"
          >
            إنشاء حساب جديد
          </Link>
          <Link
            href="/login"
            className="px-8 py-4 bg-black/50 hover:bg-black/70 text-white font-semibold rounded-full border border-emerald-500/50 transition-all duration-300 transform hover:-translate-y-1 hover:scale-105"
          >
            تسجيل الدخول
          </Link>
        </div>
      </div>
    </div>
  );
}

