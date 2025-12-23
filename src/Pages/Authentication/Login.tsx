"use client";

import { useRouter } from "next/navigation";
import Link from "next/link";
import Image from "next/image";
import { useState } from "react";
import { toast } from "react-toastify";
import { verifyUser } from "../../utils/auth";
import backgroundImage from "../../assets/movie-background.jpg";

export default function Login() {
  const router = useRouter();
  const allowedDashboardEmail =
    process.env.NEXT_PUBLIC_ADMIN_EMAIL?.toLowerCase() || "admin@example.com";
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });
  const [error, setError] = useState("");

  const playGreetingAudio = () => {
    if (typeof window === "undefined") return;
    try {
      const utterance = new SpeechSynthesisUtterance("السلام عليكم ورحمة الله وبركاته");
      utterance.lang = "ar-SA";
      window.speechSynthesis.cancel();
      window.speechSynthesis.speak(utterance);
    } catch (e) {
      console.warn("Speech synthesis not available", e);
    }
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setError("");

    // التحقق من البيانات
    if (!formData.email || !formData.password) {
      setError("يرجى ملء جميع الحقول");
      return;
    }

    // التحقق من بيانات المستخدم
    const user = verifyUser(formData.email, formData.password);
    if (user) {
      toast.success("مرحبًا بعودتك! تسجيل دخول ناجح ✨");
      playGreetingAudio();
      const userEmail = user.email?.toLowerCase();
      if (userEmail === allowedDashboardEmail) {
        // حساب مخول لصفحة إحصائيات المالك
        router.push("/admin-dashboard");
      } else {
        // نجاح تسجيل الدخول لكن ليس حساب المالك
        router.push("/");
      }
    } else {
      setError("البريد الإلكتروني أو كلمة المرور غير صحيحة");
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  return (
    <div className="relative flex items-center justify-center h-screen overflow-hidden text-white">
      {/* الخلفية مع الصورة */}
      <div className="absolute inset-0">
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

      {/* طبقة تظليل */}
      <div className="absolute inset-0 bg-gradient-to-br from-black/75 via-black/65 to-black/75"></div>

      {/* محتوى الصفحة */}
      <div className="relative z-10 flex flex-col items-center text-center px-6">
        <h1 className="text-4xl md:text-6xl font-extrabold text-emerald-400 mb-6 animate-fade-in-up drop-shadow-[0_0_20px_rgba(16,185,129,0.9)]">
          تسجيل الدخول ✨
        </h1>

        <p className="text-lg md:text-2xl text-gray-200 mb-10 max-w-xl animate-fade-in delay-500">
          مرحبًا بعودتك! سجل دخولك للوصول إلى محتواك الإسلامي
        </p>

        {/* نموذج تسجيل الدخول */}
        <form onSubmit={handleSubmit} className="bg-black/70 p-8 rounded-2xl shadow-lg w-full max-w-md flex flex-col gap-4 animate-fade-in delay-700">
          {error && (
            <div className="bg-red-500/20 border border-red-500 text-red-300 px-4 py-2 rounded-lg text-sm">
              {error}
            </div>
          )}
          <input
            type="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            placeholder="البريد الإلكتروني"
            className="p-3 rounded-lg border border-emerald-500/50 bg-black/50 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-emerald-400"
            required
          />
          <input
            type="password"
            name="password"
            value={formData.password}
            onChange={handleChange}
            placeholder="كلمة المرور"
            className="p-3 rounded-lg border border-emerald-500/50 bg-black/50 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-emerald-400"
            required
          />

          <div className="flex justify-end">
            <Link href="/Forgetpass" className="text-sm text-emerald-400 hover:text-emerald-300 transition-colors">
              نسيت كلمة المرور؟
            </Link>
          </div>

          <button
            type="submit"
            className="mt-4 px-6 py-3 bg-emerald-600 hover:bg-emerald-500 text-white font-semibold rounded-full shadow-lg transition-all duration-300 transform hover:-translate-y-1 hover:scale-105"
          >
            تسجيل الدخول
          </button>

          <p className="text-sm text-gray-300 mt-4">
            ليس لديك حساب؟{" "}
            <Link href="/signup" className="text-emerald-400 hover:text-emerald-300 transition-colors">
              سجل الآن
            </Link>
          </p>
        </form>

        {/* نص صغير */}
        <p className="mt-6 text-sm text-gray-300 animate-pulse">
          استمتع بمحتوى إسلامي موثوق وجذاب دائمًا ✨
        </p>
      </div>
    </div>
  );
}
