"use client";
//========================================== SIGNUP PAGE ==========================================
import { useRouter } from "next/navigation";
import Image from "next/image";
import { useRef, useState } from "react";
import { toast } from "react-toastify";
import backgroundImage from "../../assets/movie-background.jpg";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faKaaba, faTrash, faUserPlus } from "@fortawesome/free-solid-svg-icons";
import axios from "axios";
//================================================================================================
export default function Signup() {
  const router = useRouter();
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    avatar: null as File | null,
  });
  const [avatarPreview, setAvatarPreview] = useState<string | null>(null);
  const [error, setError] = useState("");
  const fileInputRef = useRef<HTMLInputElement | null>(null);

  // Update text values
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  // Avatar selection
  const handleAvatar = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0] || null;
    setFormData(prev => ({ ...prev, avatar: file }));
    if (file) setAvatarPreview(URL.createObjectURL(file));
  };

  const handleClearAvatar = () => {
    setFormData(prev => ({ ...prev, avatar: null }));
    setAvatarPreview(null);
    if (fileInputRef.current) fileInputRef.current.value = "";
  };

  const handleGoogleSignup = () => {
    // Placeholder until real Google OAuth endpoint is connected
    toast.info("تسجيل جوجل قادم قريبًا ✨");
  };

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

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");

    if (!formData.name || !formData.email || !formData.password) {
      setError("يرجى ملء جميع الحقول");
      return;
    }

    if (formData.password.length < 6) {
      setError("كلمة المرور يجب أن تكون 6 أحرف على الأقل");
      return;
    }

    try {
      // Send data as FormData
      const payload = new FormData();
      payload.append("name", formData.name);
      payload.append("email", formData.email);
      payload.append("password", formData.password);
      if (formData.avatar) payload.append("avatar", formData.avatar);

      const res = await axios.post("/api/auth", payload, {
        headers: { "Content-Type": "multipart/form-data" },
      });
      const data = res.data;

      if (!data?.user) {
        setError(data?.error || "حدث خطأ أثناء التسجيل");
        return;
      }

      if (typeof window !== "undefined") {
        try {
          localStorage.setItem("currentUser", JSON.stringify(data.user));
        } catch {
          // ignore storage errors (no need to handle)  
        }
      }

      toast.success("تم إنشاء حسابك بنجاح، أهلاً بك ✨");
      playGreetingAudio();

      router.push("/dashboard");
    } catch (err) {
      console.error(err);
      setError("حدث خطأ أثناء التسجيل");
    }
  };

  return (
    <div className="relative flex items-center justify-center h-screen overflow-hidden text-white">
      {/* Background */}
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

      {/* Form */}
      <div className="relative z-10 flex flex-col items-center text-center px-6">
        <h1 className="text-4xl md:text-6xl font-extrabold text-emerald-400 mb-6 animate-fade-in-up drop-shadow-[0_0_20px_rgba(16,185,129,0.9)]">
          سجل حسابك الآن <FontAwesomeIcon icon={faKaaba} style={{ color: "#B197FC", fontSize: "2rem" }} />
        </h1>

        <p className="text-lg md:text-2xl text-gray-200 mb-10 max-w-xl animate-fade-in delay-500">
          انضم لمنصتنا الإسلامية واستمتع بالقرآن الكريم، قصص الأنبياء، محاضرات وأدعية
        </p>

        <form onSubmit={handleSubmit} className="bg-black/70 p-8 rounded-2xl shadow-lg w-full max-w-md flex flex-col gap-4 animate-fade-in delay-700">
          {error && (
            <div className="bg-red-500/20 border border-red-500 text-red-300 px-4 py-2 rounded-lg text-sm">
              {error}
            </div>
          )}

          {/* Inputs */}
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

          {/* Avatar */}
          <div className="text-left space-y-2">
            <label className="block text-sm text-gray-200">صورة الحساب (اختياري)</label>
            <input
              type="file"
              accept="image/*"
              onChange={handleAvatar}
              ref={fileInputRef}
              className="block w-full text-sm text-gray-200 file:mr-4 file:py-2 file:px-4 file:rounded-lg file:border-0 file:text-sm file:font-semibold file:bg-emerald-600 file:text-white hover:file:bg-emerald-500"
            />
            {avatarPreview && (
              <div className="flex items-center gap-2">
                <Image
                  src={avatarPreview}
                  alt="Avatar preview"
                  width={64}
                  height={64}
                  className="mt-2 w-16 h-16 rounded-full border border-emerald-500/50 object-cover"
                />
                <FontAwesomeIcon
                  icon={faTrash}
                  style={{ color: "white", fontSize: "1rem" }}
                  onClick={handleClearAvatar}
                />
              </div>
            )}
          </div>

          <button
            type="submit"
            className="mt-4 px-6 py-3 bg-emerald-600 hover:bg-emerald-500 text-white font-semibold rounded-full shadow-lg transition-all duration-300 transform hover:-translate-y-1 hover:scale-105"
          >
            تسجيل الآن <FontAwesomeIcon icon={faUserPlus} style={{ color: "white", fontSize: "1rem" }} />
          </button>

          <div className="relative mt-2">
            <div className="absolute inset-0 h-px bg-gradient-to-r from-transparent via-emerald-500/50 to-transparent" />
            <p className="relative mx-auto w-max px-3 text-xs text-gray-300 bg-black/70">
              أو سجّل باستخدام
            </p>
          </div>

          <button
            type="button"
            onClick={handleGoogleSignup}
            className="flex items-center justify-center gap-2 rounded-full border border-white/10 bg-white/10 px-5 py-3 text-sm font-semibold text-white transition hover:-translate-y-1 hover:border-emerald-400/60 hover:bg-emerald-500/10 hover:shadow-lg hover:shadow-emerald-500/20"
          >
            <span className="rounded-full bg-white p-1">
              <svg viewBox="0 0 533.5 544.3" className="h-5 w-5">
                <path
                  fill="#4285f4"
                  d="M533.5 278.4c0-17.4-1.6-34.1-4.6-50.2H272v95.1h147.1c-6.4 34.8-26 64.3-55.6 84v69.8h89.8c52.5-48.4 80.2-119.6 80.2-198.7z"
                />
                <path
                  fill="#34a853"
                  d="M272 544.3c75.3 0 138.6-24.9 184.8-67.2l-89.8-69.8c-24.9 16.7-56.9 26.5-95 26.5-72.9 0-134.7-49.2-156.8-115.3H22.6v72.4A272 272 0 0 0 272 544.3z"
                />
                <path
                  fill="#fbbc04"
                  d="M115.2 318.5c-5.6-16.7-8.8-34.6-8.8-52.5s3.2-35.8 8.8-52.5v-72.4H22.6A272 272 0 0 0 0 266c0 43.8 10.5 85.3 22.6 124.9l92.6-72.4z"
                />
                <path
                  fill="#ea4335"
                  d="M272 107.7c41 0 77.6 14.1 106.6 41.8l80-80C410.4 24.2 347.1 0 272 0 167.5 0 75.8 60.5 22.6 153.4l92.6 72.4C137.3 156.9 199.1 107.7 272 107.7z"
                />
              </svg>
            </span>
            تسجيل باستخدام جوجل
          </button>
        </form>

        <p className="mt-6 text-sm text-gray-300 animate-pulse">
          بانضمامك للمنصة، تحصل على محتوى إسلامي موثوق وجذاب دائمًا ✨
        </p>
      </div>
    </div>
  );
}
 