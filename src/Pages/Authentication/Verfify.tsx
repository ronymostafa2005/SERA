"use client";

import { useRouter, useSearchParams } from "next/navigation";
import Link from "next/link";
import { useState, useEffect } from "react";
import { updatePassword } from "../../utils/auth";

export default function Verfify() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const email = searchParams.get("email") || "";
  const [code, setCode] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [error, setError] = useState("");
  const [success, setSuccess] = useState(false);

  useEffect(() => {
    if (!email) {
      router.push("/Forgetpass");
    }
  }, [email, router]);

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setError("");
    setSuccess(false);

    if (!code || !newPassword || !confirmPassword) {
      setError("يرجى ملء جميع الحقول");
      return;
    }

    // التحقق من رمز التحقق (في التطبيق الحقيقي، سيكون هناك تحقق حقيقي)
    // هنا سنستخدم رمز بسيط للاختبار: 123456
    if (code !== "123456") {
      setError("رمز التحقق غير صحيح");
      return;
    }

    if (newPassword.length < 6) {
      setError("كلمة المرور يجب أن تكون 6 أحرف على الأقل");
      return;
    }

    if (newPassword !== confirmPassword) {
      setError("كلمات المرور غير متطابقة");
      return;
    }

    // تحديث كلمة المرور
    if (updatePassword(email, newPassword)) {
      setSuccess(true);
      // الانتقال إلى صفحة تسجيل الدخول بعد ثانيتين
      setTimeout(() => {
        router.push("/login");
      }, 2000);
    } else {
      setError("حدث خطأ أثناء تحديث كلمة المرور");
    }
  };

  return (
    <div className="relative flex items-center justify-center h-screen overflow-hidden text-white">
      {/* الخلفية مع انيميشن */}
      <div
        className="absolute inset-0 bg-gradient-to-r from-black via-slate-900 to-black animate-background-pan"
      ></div>

      {/* طبقة تظليل */}
      <div className="absolute inset-0 bg-black/60"></div>

      {/* محتوى الصفحة */}
      <div className="relative z-10 flex flex-col items-center text-center px-6">
        <h1 className="text-4xl md:text-6xl font-extrabold text-emerald-400 mb-6 animate-fade-in-up drop-shadow-[0_0_20px_rgba(16,185,129,0.9)]">
          التحقق من الرمز ✨
        </h1>

        <p className="text-lg md:text-2xl text-gray-200 mb-10 max-w-xl animate-fade-in delay-500">
          أدخل رمز التحقق الذي أرسلناه إلى بريدك الإلكتروني
        </p>

        {/* نموذج التحقق */}
        <form onSubmit={handleSubmit} className="bg-black/70 p-8 rounded-2xl shadow-lg w-full max-w-md flex flex-col gap-4 animate-fade-in delay-700">
          {error && (
            <div className="bg-red-500/20 border border-red-500 text-red-300 px-4 py-2 rounded-lg text-sm">
              {error}
            </div>
          )}
          {success && (
            <div className="bg-emerald-500/20 border border-emerald-500 text-emerald-300 px-4 py-2 rounded-lg text-sm">
              تم تحديث كلمة المرور بنجاح! سيتم توجيهك إلى صفحة تسجيل الدخول...
            </div>
          )}
          <input
            type="text"
            value={code}
            onChange={(e) => setCode(e.target.value)}
            placeholder="رمز التحقق"
            className="p-3 rounded-lg border border-emerald-500/50 bg-black/50 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-emerald-400"
            required
            maxLength={6}
          />
          <input
            type="password"
            value={newPassword}
            onChange={(e) => setNewPassword(e.target.value)}
            placeholder="كلمة المرور الجديدة"
            className="p-3 rounded-lg border border-emerald-500/50 bg-black/50 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-emerald-400"
            required
            minLength={6}
          />
          <input
            type="password"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
            placeholder="تأكيد كلمة المرور"
            className="p-3 rounded-lg border border-emerald-500/50 bg-black/50 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-emerald-400"
            required
            minLength={6}
          />

          <button
            type="submit"
            className="mt-4 px-6 py-3 bg-emerald-600 hover:bg-emerald-500 text-white font-semibold rounded-full shadow-lg transition-all duration-300 transform hover:-translate-y-1 hover:scale-105"
          >
            تحديث كلمة المرور
          </button>

          <p className="text-sm text-gray-300 mt-4">
            لم تستلم الرمز؟{" "}
            <Link href="/Forgetpass" className="text-emerald-400 hover:text-emerald-300 transition-colors">
              إعادة الإرسال
            </Link>
          </p>
        </form>

        {/* نص صغير */}
        <p className="mt-6 text-sm text-gray-300 animate-pulse">
          رمز التحقق التجريبي: 123456
        </p>
      </div>
    </div>
  );
}
