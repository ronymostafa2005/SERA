"use client";

import { useRouter } from "next/navigation";
import Link from "next/link";
import Image from "next/image";
import { useState } from "react";
import backgroundImage from "../../assets/movie-background.jpg";

export default function Verfify() {
  const router = useRouter();
  const [code, setCode] = useState("");
  const [error, setError] = useState("");

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (code.length === 6) {
      router.push("/login");
    } else {
      setError("الكود يجب أن يكون 6 أرقام");
    }
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
          التحقق من البريد الإلكتروني
        </h1>

        <p className="text-lg md:text-2xl text-gray-200 mb-10 max-w-xl animate-fade-in delay-500">
          أدخل الكود المرسل إلى بريدك الإلكتروني
        </p>

        <form onSubmit={handleSubmit} className="bg-black/70 p-8 rounded-2xl shadow-lg w-full max-w-md flex flex-col gap-4 animate-fade-in delay-700">
          {error && (
            <div className="bg-red-500/20 border border-red-500 text-red-300 px-4 py-2 rounded-lg text-sm">
              {error}
            </div>
          )}
          <input
            type="text"
            value={code}
            onChange={(e) => {
              setCode(e.target.value);
              setError("");
            }}
            placeholder="أدخل الكود (6 أرقام)"
            maxLength={6}
            className="p-3 rounded-lg border border-emerald-500/50 bg-black/50 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-emerald-400 text-center text-2xl tracking-widest"
            required
          />

          <button
            type="submit"
            className="mt-4 px-6 py-3 bg-emerald-600 hover:bg-emerald-500 text-white font-semibold rounded-full shadow-lg transition-all duration-300 transform hover:-translate-y-1 hover:scale-105"
          >
            التحقق
          </button>

          <p className="text-sm text-gray-300 mt-4">
            لم تستلم الكود؟{" "}
            <Link href="/Forgetpass" className="text-emerald-400 hover:text-emerald-300 transition-colors">
              إعادة الإرسال
            </Link>
          </p>
        </form>
      </div>
    </div>
  );
}

