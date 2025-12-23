"use client";

import { useEffect, useMemo, useState } from "react";
import { useRouter } from "next/navigation";
import { getCurrentUser } from "@/utils/auth";

const ALLOWED_EMAIL =
  typeof process !== "undefined"
    ? process.env.NEXT_PUBLIC_ADMIN_EMAIL?.toLowerCase() || "admin@example.com"
    : "admin@example.com";

export default function AdminDashboard() {
  const router = useRouter();
  const [isAllowed, setIsAllowed] = useState<boolean | null>(null);
  const [currentReview, setCurrentReview] = useState(0);
  const [isAnimating, setIsAnimating] = useState(false);

  // بيانات إحصائية (افتراضية مؤقتًا)
  const stats = useMemo(
    () => [
      { label: "الزيارات اليوم", value: "1.2K", sub: "زيادة 12%" },
      { label: "المستخدمون المسجلون", value: "540", sub: "+23 اليوم" },
      { label: "الكتب المعروضة", value: "4,951", sub: "محدث تلقائياً" },
      { label: "الخطب المعروضة", value: "284", sub: "تمت المراجعة" },
      { label: "الكتب المباعة", value: "1,240", sub: "آخر 30 يوم" },
      { label: "مؤشر الأمان", value: "92%", sub: "مستقر وآمن" },
    ],
    []
  );

  const barData = useMemo(
    () => [
      { label: "يناير", value: 180, color: "from-emerald-400 to-emerald-600" },
      { label: "فبراير", value: 220, color: "from-teal-400 to-teal-600" },
      { label: "مارس", value: 260, color: "from-cyan-400 to-cyan-600" },
      { label: "أبريل", value: 300, color: "from-sky-400 to-sky-600" },
      { label: "مايو", value: 340, color: "from-blue-400 to-blue-600" },
      { label: "يونيو", value: 380, color: "from-indigo-400 to-indigo-600" },
      { label: "يوليو", value: 410, color: "from-violet-400 to-violet-600" },
      { label: "أغسطس", value: 430, color: "from-purple-400 to-purple-600" },
      { label: "سبتمبر", value: 390, color: "from-fuchsia-400 to-fuchsia-600" },
      { label: "أكتوبر", value: 420, color: "from-rose-400 to-rose-600" },
      { label: "نوفمبر", value: 450, color: "from-amber-400 to-amber-600" },
      { label: "ديسمبر", value: 470, color: "from-lime-400 to-lime-600" },
    ],
    []
  );

  const maxBarValue = useMemo(
    () => Math.max(...barData.map((b) => b.value), 1),
    [barData]
  );

  const reviews = useMemo(
    () => [
      {
        name: "أحمد سالم",
        role: "مستخدم نشط",
        text: "المنصة سريعة وسهلة الاستخدام، واستفدت كثيراً من مكتبة الكتب.",
      },
      {
        name: "سارة محمد",
        role: "قارئة دائمة",
        text: "تنوع المحتوى ممتاز، خصوصاً قسم الخطب المحدث باستمرار.",
      },
      {
        name: "خالد عبد الرحمن",
        role: "باحث",
        text: "وجود المصادر الموثوقة في مكان واحد وفر علي وقتاً وجهداً كبيرين.",
      },
      {
        name: "ليلى علي",
        role: "مهتمة بالتعلم",
        text: "واجهة واضحة وأداء جيد حتى مع كثرة البيانات.",
      },
    ],
    []
  );

  const handleNextReview = () => {
    setIsAnimating(true);
    setCurrentReview((prev) => (prev + 1) % reviews.length);
  };

  const handlePrevReview = () => {
    setIsAnimating(true);
    setCurrentReview((prev) => (prev - 1 + reviews.length) % reviews.length);
  };

  // تشغيل السلايدر تلقائياً كل 5 ثوانٍ
  useEffect(() => {
    const timer = setInterval(() => {
      handleNextReview();
    }, 5000);
    return () => clearInterval(timer);
  }, [reviews.length]);

  // إعادة ضبط حالة التحريك بعد الانتقال
  useEffect(() => {
    const timer = setTimeout(() => setIsAnimating(false), 400);
    return () => clearTimeout(timer);
  }, [currentReview]);

  const displayedReviews = useMemo(() => {
    if (reviews.length === 0) return [];
    const res = [];
    for (let i = 0; i < Math.min(3, reviews.length); i++) {
      res.push(reviews[(currentReview + i) % reviews.length]);
    }
    return res;
  }, [reviews, currentReview]);

  useEffect(() => {
    const user = getCurrentUser();
    const email = user?.email?.toLowerCase();
    if (email === ALLOWED_EMAIL) {
      setIsAllowed(true);
    } else {
      setIsAllowed(false);
      router.replace("/");
    }
  }, [router]);

  if (isAllowed === null) {
    return null;
  }

  if (!isAllowed) {
    return null;
  }

  return (
    <div className="p-6 min-h-screen text-white transition-all duration-500">
      <div className="max-w-6xl mx-auto space-y-8">
        <header className="flex flex-col gap-2">
          <p className="text-sm text-emerald-300">لوحة المالك</p>
          <h1 className="text-3xl font-bold">إحصائيات المنصة</h1>
          <p className="text-gray-300 text-sm">
            هذه الصفحة خاصة بحساب المالك فقط ({ALLOWED_EMAIL})
          </p>
        </header>

        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
          {stats.map((item) => (
            <div
              key={item.label}
              className="rounded-2xl bg-gradient-to-br from-emerald-600/30 via-black/60 to-slate-900/70 border border-emerald-500/30 p-4 shadow-lg"
            >
              <p className="text-sm text-gray-200">{item.label}</p>
              <p className="text-2xl font-extrabold text-emerald-200 mt-2">
                {item.value}
              </p>
            </div>
          ))}
        </div>

        <section className="grid gap-4 lg:grid-cols-3">
            <div className="lg:col-span-2 bg-black/60 border border-emerald-600/40 rounded-2xl p-6 shadow-xl">
            <h2 className="text-xl font-semibold mb-4">مبيعات الكتب (آخر 12 شهر)</h2>
              <div className="flex items-end gap-3 h-96">
              {barData.map((bar) => {
                  const heightPx = Math.max((bar.value / maxBarValue) * 320, 28); // أكبر وضوح للأعمدة
                return (
                  <div key={bar.label} className="flex-1 flex flex-col items-center gap-2">
                    <div
                        className={`w-full max-w-[50px] min-h-[12px] rounded-t-md border border-white/10 shadow-[0_8px_20px_rgba(16,185,129,0.25)] transition-all duration-300 bg-gradient-to-t ${bar.color} hover:scale-[1.03]`}
                        style={{ height: `${heightPx}px`, opacity: 0.95 }}
                    />
                    <span className="text-xs text-gray-300">{bar.label}</span>
                  </div>
                );
              })}
            </div>
          </div>

          <div className="bg-black/60 border border-emerald-600/40 rounded-2xl p-6 shadow-xl">
            <h2 className="text-xl font-semibold mb-3">تنبيهات سريعة</h2>
            <ul className="list-disc list-inside text-gray-200 space-y-2 text-sm">
              <li>تم فحص الثغرات: لا توجد مشاكل حرجة.</li>
              <li>آخر نسخة احتياطية: اليوم 02:15 AM.</li>
              <li>استهلاك السيرفر مستقر تحت 65%.</li>
            </ul>
            <div className="mt-4 p-3 rounded-lg bg-emerald-700/20 border border-emerald-500/30 text-sm text-emerald-100">
              مؤشر الأمان: <strong>92%</strong> • حالة النظام: مستقر
            </div>
          </div>
        </section>

        <section className="bg-black/60 border border-emerald-600/40 rounded-2xl p-6 shadow-xl">
          <div className="flex items-center justify-between mb-4">
            <div>
              <p className="text-sm text-emerald-300">سلايدر آراء المستخدمين</p>
              <h2 className="text-xl font-semibold">آراء حديثة</h2>
            </div>
            <div className="flex gap-2">
              <button
                onClick={handlePrevReview}
                className="px-3 py-2 bg-slate-800 rounded-lg hover:bg-slate-700 transition"
              >
                السابق
              </button>
              <button
                onClick={handleNextReview}
                className="px-3 py-2 bg-emerald-600 rounded-lg hover:bg-emerald-500 transition"
              >
                التالي
              </button>
            </div>
          </div>

          {reviews.length > 0 && (
            <div className="relative overflow-hidden">
              <div
                className={`grid gap-4 md:grid-cols-2 lg:grid-cols-3 transition-all duration-700 ${
                  isAnimating ? "opacity-80 scale-[0.99]" : "opacity-100 scale-100"
                }`}
              >
                {displayedReviews.map((rev, idx) => (
                  <div
                    key={`${rev.name}-${idx}`}
                    className="relative rounded-xl border border-emerald-500/30 bg-slate-900/70 p-5 shadow-lg transition-all duration-500 hover:-translate-y-1 hover:shadow-emerald-500/20"
                  >
                    <div className="absolute inset-0 pointer-events-none opacity-50 blur-lg"
                         style={{
                           backgroundImage:
                             "radial-gradient(circle at 20% 20%, rgba(34,197,94,0.12), transparent 40%), radial-gradient(circle at 80% 30%, rgba(52,211,153,0.08), transparent 35%), radial-gradient(circle at 50% 80%, rgba(16,185,129,0.12), transparent 40%)",
                         }}
                    />
                    <div className="relative">
                      <p className="text-lg font-semibold text-emerald-200 mb-1">{rev.name}</p>
                      <p className="text-sm text-gray-400 mb-3">{rev.role}</p>
                      <p className="text-sm text-gray-200 leading-6">{rev.text}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}
        </section>
      </div>
    </div>
  );
}
