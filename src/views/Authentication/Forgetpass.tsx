"use client";

import { useRouter } from "next/navigation";
import Link from "next/link";
import Image from "next/image";
import { useState } from "react";
import backgroundImage from "../../assets/movie-background.jpg";

export default function Forgetpass() {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setMessage("تم إرسال رابط إعادة تعيين كلمة المرور إلى بريدك الإلكتروني");
  };

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
          نسيت كلمة المرور؟
        </h1>

        <p className="text-lg md:text-2xl text-gray-200 mb-10 max-w-xl animate-fade-in delay-500">
          أدخل بريدك الإلكتروني وسنرسل لك رابط إعادة تعيين كلمة المرور
        </p>

        <form onSubmit={handleSubmit} className="bg-black/70 p-8 rounded-2xl shadow-lg w-full max-w-md flex flex-col gap-4 animate-fade-in delay-700">
          {message && (
            <div className="bg-emerald-500/20 border border-emerald-500 text-emerald-300 px-4 py-2 rounded-lg text-sm">
              {message}
            </div>
          )}
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="البريد الإلكتروني"
            className="p-3 rounded-lg border border-emerald-500/50 bg-black/50 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-emerald-400"
            required
          />

          <button
            type="submit"
            className="mt-4 px-6 py-3 bg-emerald-600 hover:bg-emerald-500 text-white font-semibold rounded-full shadow-lg transition-all duration-300 transform hover:-translate-y-1 hover:scale-105"
          >
            إرسال رابط إعادة التعيين
          </button>

          <p className="text-sm text-gray-300 mt-4">
            تذكرت كلمة المرور؟{" "}
            <Link href="/login" className="text-emerald-400 hover:text-emerald-300 transition-colors">
              تسجيل الدخول
            </Link>
          </p>
        </form>
      </div>
    </div>
  );
}

