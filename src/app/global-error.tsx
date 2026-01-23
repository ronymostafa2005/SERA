"use client";

import Image from "next/image";
import { useEffect } from "react";
import "./globals.css";
import backgroundImage from "../assets/movie-background.jpg";

type GlobalErrorProps = {
  error: Error & { digest?: string };
  reset: () => void;
};

export default function GlobalError({ error, reset }: GlobalErrorProps) {
  useEffect(() => {
    // Log for debugging without crashing the client
    console.error(error);

    const message = error?.message || "";
    // Recover from stale or missing client chunks by forcing a hard reload
    if (error.name === "ChunkLoadError" || message.includes("Loading chunk")) {
      window.location.reload();
    }
  }, [error]);

  return (
    <html lang="ar" dir="rtl">
      <body className="min-h-screen text-white">
        <div className="relative flex items-center justify-center min-h-screen overflow-hidden">
          <div className="absolute inset-0">
            <Image
              src={backgroundImage}
              alt="Background"
              fill
              className="object-cover"
              priority
            />
          </div>
          <div className="absolute inset-0 bg-gradient-to-br from-black/80 via-black/70 to-black/80" />

          <div className="relative z-10 text-center space-y-4 px-6">
            <p className="text-xl font-semibold drop-shadow-[0_0_14px_rgba(16,185,129,0.6)]">
              حدث خطأ أثناء تحميل الصفحة
            </p>
            <p className="text-sm text-gray-200">
              يرجى المحاولة مرة أخرى أو تحديث الصفحة.
            </p>
            <div className="flex items-center justify-center gap-3">
              <button
                type="button"
                onClick={() => reset()}
                className="px-5 py-2 bg-emerald-600 hover:bg-emerald-500 text-white font-semibold rounded-full shadow-lg transition-all duration-300 transform hover:-translate-y-0.5 hover:scale-105"
              >
                إعادة المحاولة
              </button>
              <button
                type="button"
                onClick={() => window.location.reload()}
                className="px-4 py-2 bg-white/15 hover:bg-white/25 text-white rounded-full border border-white/20 transition-all duration-300"
              >
                تحديث الصفحة
              </button>
            </div>
          </div>
        </div>
      </body>
    </html>
  );
}
