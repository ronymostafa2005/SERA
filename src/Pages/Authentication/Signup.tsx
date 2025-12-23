"use client";

import { useRouter } from "next/navigation";
import Image from "next/image";
import { useState } from "react";
import { toast } from "react-toastify";
import { saveUser, emailExists } from "../../utils/auth";
import backgroundImage from "../../assets/movie-background.jpg";

export default function Signup() {
  const router = useRouter();
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    avatar: "/default-avatar.png", 
  });
  const [error, setError] = useState("");
  const [avatarPreview, setAvatarPreview] = useState<string | null>(null);

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
    if (!formData.name || !formData.email || !formData.password) {
      setError("يرجى ملء جميع الحقول");
      return;
    }

    if (formData.password.length < 6) {
      setError("كلمة المرور يجب أن تكون 6 أحرف على الأقل");
      return;
    }

    // التحقق من وجود البريد الإلكتروني
    if (emailExists(formData.email)) {
      setError("هذا البريد الإلكتروني مستخدم بالفعل");
      return;
    }

    // نطلب إنشاء المستخدم عبر الـ API (للحصول على أي رد/تكامل لاحق)
    fetch("/api/auth", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        name: formData.name,
        email: formData.email,
        avatar: formData.avatar || "/default-avatar.png",
      }),
    }).catch(() => {
      // يمكن تجاهل الفشل هنا لأننا نخزن محلياً أيضاً
    });

    // حفظ المستخدم محلياً (بما في ذلك الصورة)
    saveUser(formData);
    // حفظ المستخدم الحالي
    localStorage.setItem("currentUser", JSON.stringify(formData));

    toast.success("تم إنشاء حسابك بنجاح، أهلاً بك ✨");
    playGreetingAudio();

    // الانتقال إلى صفحة Dashboard
    router.push("/dashboard");
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleAvatarChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onload = () => {
      const result = reader.result as string;
      setFormData((prev) => ({ ...prev, avatar: result }));
      setAvatarPreview(result);
    };
    reader.readAsDataURL(file);
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
          سجل حسابك الآن ✨
        </h1>

        <p className="text-lg md:text-2xl text-gray-200 mb-10 max-w-xl animate-fade-in delay-500">
          انضم لمنصتنا الإسلامية واستمتع بالقرآن الكريم، قصص الأنبياء، محاضرات وأدعية
        </p>

        {/* نموذج التسجيل */}
        <form onSubmit={handleSubmit} className="bg-black/70 p-8 rounded-2xl shadow-lg w-full max-w-md flex flex-col gap-4 animate-fade-in delay-700">
          {error && (
            <div className="bg-red-500/20 border border-red-500 text-red-300 px-4 py-2 rounded-lg text-sm">
              {error}
            </div>
          )}
          <input
            type="text"
            name="name"
            value={formData.name}
            onChange={handleChange}
            placeholder="الاسم الكامل"
            className="p-3 rounded-lg border border-emerald-500/50 bg-black/50 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-emerald-400"
            required
          />
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
            minLength={6}
          />

          <div className="text-left space-y-2">
            <label className="block text-sm text-gray-200">صورة الحساب (اختياري)</label>
            <input
              type="file"
              accept="image/*"
              onChange={handleAvatarChange}
              className="block w-full text-sm text-gray-200 file:mr-4 file:py-2 file:px-4 file:rounded-lg file:border-0 file:text-sm file:font-semibold file:bg-emerald-600 file:text-white hover:file:bg-emerald-500"
            />
            {avatarPreview && (
              <img
                src={avatarPreview}
                alt="Avatar preview"
                className="mt-2 w-16 h-16 rounded-full border border-emerald-500/50 object-cover"
              />
            )}
          </div>

          <button
            type="submit"
            className="mt-4 px-6 py-3 bg-emerald-600 hover:bg-emerald-500 text-white font-semibold rounded-full shadow-lg transition-all duration-300 transform hover:-translate-y-1 hover:scale-105"
          >
            تسجيل الآن
          </button>
        </form>

        {/* نص صغير */}
        <p className="mt-6 text-sm text-gray-300 animate-pulse">
          بانضمامك للمنصة، تحصل على محتوى إسلامي موثوق وجذاب دائمًا ✨
        </p>
      </div>
    </div>
  );
}
