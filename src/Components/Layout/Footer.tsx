"use client";

import { usePathname } from "next/navigation";
import Link from "next/link";

export default function Footer() {
  const pathname = usePathname();

  const authPaths = ["/", "/login", "/signup", "/Forgetpass", "/verfify"];
  if (authPaths.includes(pathname)) {
    return null;
  }

  const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || "https://islamic-platform.example.com";
  const shareUrl = new URL(pathname || "/", siteUrl).toString();
  const shareText = "منصة الإسلام الشاملة - محتوى موثوق ومتجدد";
  const encodedUrl = encodeURIComponent(shareUrl);
  const encodedText = encodeURIComponent(shareText);

  const sources = [
    {
      label: "صفحات المنصة الرئيسية",
      url: "/dashboard",
    },
    {
      label: "القرآن الكريم",
      url: "/quran",
    },
    {
      label: "الخطب (محاضرات)",
      url: "/khotab",
    },
    {
      label: "الأحاديث النبوية",
      url: "/hadiths",
    },
    {
      label: "محاضرات إسلامية",
      url: "/lectures",
    },
    {
      label: "ابتهالات النشقبندي",
      url: "/Nakshabanii",
    },
    {
      label: "تسوق الكتب",
      url: "/books-shop",
    },
    {
      label: "السيرة النبوية",
      url: "/sera-nabi",
    },
    {
      label: "الملف الشخصي",
      url: "/profile",
    },
  ];

  const socialLinks = [
    {
      label: "شارك على فيسبوك",
      href: `https://www.facebook.com/sharer/sharer.php?u=${encodedUrl}`,
      gradient: "from-blue-500 to-blue-700",
      icon: (
        <svg
          className="h-5 w-5"
          viewBox="0 0 24 24"
          fill="currentColor"
          aria-hidden="true"
        >
          <path d="M20 3h-3a5 5 0 0 0-5 5v3H9v4h3v6h4v-6h3l1-4h-4V8a1 1 0 0 1 1-1h3V3z" />
        </svg>
      ),
    },
    {
      label: "أرسل عبر واتساب",
      href: `https://wa.me/?text=${encodedText}%20${encodedUrl}`,
      gradient: "from-green-500 to-emerald-600",
      icon: (
        <svg
          className="h-5 w-5"
          viewBox="0 0 24 24"
          fill="currentColor"
          aria-hidden="true"
        >
          <path d="M17.5 14.5c-.3-.2-1.8-.9-2.1-1-.3-.1-.5-.2-.7.2-.2.3-.8 1-.9 1.2-.2.2-.3.2-.6 0-.3-.2-1.3-.5-2.5-1.7-.9-.8-1.5-1.8-1.7-2.1-.2-.3 0-.5.2-.7.2-.2.3-.3.4-.5.2-.2.3-.3.5-.5.2-.2.1-.4 0-.6-.1-.2-.7-1.7-.9-2.3-.2-.6-.5-.5-.7-.5h-.6c-.2 0-.6.1-.9.4-.3.3-1.2 1.2-1.2 3s1.2 3.5 1.4 3.7c.2.2 2.3 3.5 5.6 4.7.8.3 1.5.5 2 .6.8.2 1.5.2 2 .1.6-.1 1.8-.7 2-1.4.2-.7.2-1.2.1-1.4-.1-.2-.3-.2-.6-.4z" />
          <path d="M12 2a9.9 9.9 0 0 0-8.5 15l-1.4 5 5.2-1.4A10 10 0 1 0 12 2zm5.9 14.5c-.2.6-.9 1.1-1.6 1.2-.4.1-1 0-1.7-.1-.5-.1-1.1-.3-1.9-.6-3.4-1.3-4.8-4.1-4.9-4.3-.1-.2-1.1-1.5-1.1-2.9 0-1.5.8-2.3 1.1-2.6.3-.3.7-.4.9-.4h.6c.2 0 .5 0 .8.6.3.7 1 2.2 1.1 2.3.1.1.1.3 0 .4l-.5.6c-.1.1-.2.2-.3.3-.1.1-.2.2-.1.4.1.2.6 1 1.3 1.6.9.8 1.6 1.1 1.9 1.3.2.1.3.1.4 0l.7-.8c.1-.2.3-.2.5-.1.2.1 1.5.7 1.8.8.3.2.3.3.4.5.2.1.2.7 0 1.3z" />
        </svg>
      ),
    },
    {
      label: "غرّد على تويتر",
      href: `https://twitter.com/intent/tweet?url=${encodedUrl}&text=${encodedText}`,
      gradient: "from-sky-400 to-sky-600",
      icon: (
        <svg
          className="h-5 w-5"
          viewBox="0 0 24 24"
          fill="currentColor"
          aria-hidden="true"
        >
          <path d="M21.5 6.7c-.6.3-1.3.5-2 .6a3.4 3.4 0 0 0 1.5-1.9 6.4 6.4 0 0 1-2.2.9 3.2 3.2 0 0 0-5.5 2.2c0 .3 0 .5.1.8A9.1 9.1 0 0 1 4.2 5a3.2 3.2 0 0 0 1 4.3c-.5 0-.9-.2-1.3-.4v.1a3.2 3.2 0 0 0 2.6 3.1 3 3 0 0 1-1.4.1 3.2 3.2 0 0 0 3 2.3A6.5 6.5 0 0 1 3 16a9.1 9.1 0 0 0 4.9 1.4c5.9 0 9.2-4.9 9.2-9.1v-.4c.7-.5 1.3-1.1 1.8-1.8z" />
        </svg>
      ),
    },
    {
      label: "شارك على إنستجرام",
      href: `https://www.instagram.com/?url=${encodedUrl}`,
      gradient: "from-pink-500 via-rose-500 to-amber-400",
      icon: (
        <svg
          className="h-5 w-5"
          viewBox="0 0 24 24"
          fill="currentColor"
          aria-hidden="true"
        >
          <path d="M7 3h10a4 4 0 0 1 4 4v10a4 4 0 0 1-4 4H7a4 4 0 0 1-4-4V7a4 4 0 0 1 4-4zm0 2a2 2 0 0 0-2 2v10a2 2 0 0 0 2 2h10a2 2 0 0 0 2-2V7a2 2 0 0 0-2-2H7zm5 3.5A3.5 3.5 0 1 1 8.5 12 3.5 3.5 0 0 1 12 8.5zm0 2a1.5 1.5 0 1 0 1.5 1.5A1.5 1.5 0 0 0 12 10.5zm4.8-3.6a1 1 0 1 1-2 0 1 1 0 0 1 2 0z" />
        </svg>
      ),
    },
  ];

  return (
    <footer className="relative mt-10 overflow-hidden border-t border-emerald-500/30 bg-gradient-to-b from-black via-slate-900 to-black text-white backdrop-blur">
      <div className="pointer-events-none absolute inset-0 opacity-40">
        <div className="absolute -left-24 top-10 h-40 w-40 rounded-full bg-emerald-500 blur-[100px]" />
        <div className="absolute right-0 top-0 h-32 w-32 rounded-full bg-emerald-300 blur-3xl" />
      </div>

      <div className="relative mx-auto flex max-w-6xl flex-col gap-10 px-6 py-10 lg:flex-row lg:items-start lg:justify-between">
        <div className="space-y-4 lg:max-w-md">
          <div className="inline-flex items-center gap-3 rounded-full border border-emerald-500/30 bg-emerald-500/10 px-4 py-2 text-xs text-emerald-200">
            <span className="h-2 w-2 rounded-full bg-emerald-400 shadow-[0_0_0_4px_rgba(16,185,129,0.2)]" />
            محتوى موثوق - تجربة سلسة
          </div>
          <h3 className="text-2xl font-bold text-emerald-200 drop-shadow-[0_0_18px_rgba(16,185,129,0.35)]">
            منصة الإسلام الشاملة
          </h3>
          <p className="text-sm leading-7 text-gray-200">
            استكشف القرآن الكريم، الأحاديث، المحاضرات، والكتب في تجربة واحدة
            متناسقة تدعمك في التعلم والمشاركة مع الآخرين.
          </p>

          <div className="space-y-3">
            <p className="text-xs uppercase tracking-[0.2em] text-emerald-200">
              شارك المنصة
            </p>
            <div className="flex flex-wrap gap-3">
              {socialLinks.map((item) => (
                <a
                  key={item.label}
                  href={item.href}
                  target="_blank"
                  rel="noreferrer"
                  aria-label={item.label}
                  className="group relative flex items-center gap-2 rounded-full bg-white/5 px-3 py-2 text-sm text-white transition hover:-translate-y-0.5 hover:shadow-lg hover:shadow-emerald-500/20"
                >
                  <span
                    className={`absolute inset-0 -z-10 rounded-full bg-gradient-to-r ${item.gradient} opacity-0 transition-opacity duration-300 group-hover:opacity-100`}
                  />
                  <span className="rounded-full bg-black/30 p-1.5 text-white">
                    {item.icon}
                  </span>
                  <span className="whitespace-nowrap text-[13px] font-medium">
                    {item.label}
                  </span>
                </a>
              ))}
            </div>
          </div>
        </div>

        <div className="grid flex-1 grid-cols-1 gap-8 sm:grid-cols-2">
          <div className="space-y-4">
            <h4 className="text-sm font-semibold text-emerald-200">
              روابط سريعة
            </h4>
            <ul className="grid grid-cols-1 gap-3 text-sm text-gray-200 sm:grid-cols-2">
              {sources.map((src) => (
              <li key={src.url}>
                <Link
                  href={src.url}
                    className="group relative inline-flex items-center gap-2 overflow-hidden rounded-md px-2 py-1 transition"
                >
                    <span className="absolute inset-0 scale-0 bg-emerald-500/10 blur-sm transition-transform duration-300 group-hover:scale-100" />
                    <span className="relative text-sm group-hover:text-emerald-200">
                  {src.label}
                    </span>
                </Link>
              </li>
            ))}
          </ul>
          </div>

          <div className="space-y-4 rounded-2xl border border-white/5 bg-white/5 px-5 py-5 shadow-inner shadow-emerald-500/10">
            <h4 className="text-sm font-semibold text-emerald-200">
              لمحة سريعة
            </h4>
            <p className="text-sm leading-6 text-gray-200">
              نواصل إضافة محتوى موثوق وتفاعلي ليصل إلى الجميع بسهولة. تابع
              التحديثات واستفد من تجربة خفيفة ومتجاوبة على كل الأجهزة.
            </p>
            <div className="flex flex-wrap gap-2 text-[12px]">
              <span className="rounded-full border border-emerald-500/40 bg-emerald-500/10 px-3 py-1 text-emerald-100">
                تجاوب كامل
              </span>
              <span className="rounded-full border border-emerald-500/40 bg-emerald-500/10 px-3 py-1 text-emerald-100">
                تجربة آمنة
              </span>
              <span className="rounded-full border border-emerald-500/40 bg-emerald-500/10 px-3 py-1 text-emerald-100">
                تحديثات مستمرة
              </span>
            </div>
          </div>
        </div>
      </div>

      <div className="relative border-t border-white/5 bg-black/40 py-4 text-center text-xs text-gray-400">
        © {new Date().getFullYear()} جميع الحقوق محفوظة لمنصة الإسلام الشاملة.
      </div>
    </footer>
  );
}

