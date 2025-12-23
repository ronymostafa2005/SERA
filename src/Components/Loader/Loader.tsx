"use client";

import { useEffect, useState } from "react";
import { useLoading } from "../../Context/LoadingContext";

// Loader component
export default function Loader() {
  const { isLoading } = useLoading();
  const [showVideo, setShowVideo] = useState(false);

  // عند ظهور تحميل جدي
  useEffect(() => {
    if (!isLoading) return;
    setShowVideo(true);
    const timer = setTimeout(() => setShowVideo(false), 3500);
    return () => clearTimeout(timer);
  }, [isLoading]);

  if (!isLoading) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-gray-900/80 backdrop-blur-sm">
      <div className="text-center relative">
        {showVideo && (
          <div className="relative inline-block mb-4">
            <div className="absolute inset-0 -m-4 rounded-full border-4 border-transparent border-t-emerald-400 border-r-emerald-500 animate-spin-slow"></div>
            <div className="absolute inset-0 -m-6 rounded-full border-4 border-transparent border-b-emerald-300 border-l-emerald-600 animate-spin-reverse"></div>
            <div className="relative inline-block rounded-[50px] overflow-hidden shadow-2xl border-2 border-emerald-500/40 z-10">
              <video
                autoPlay
                loop
                muted
                playsInline
                className="w-[120px] h-[120px] object-cover"
              >
                <source src="/29.11.2025_20.00.17_REC.mp4" type="video/mp4" />
              </video>
              <div className="absolute inset-0 bg-gradient-to-t from-black/20 via-transparent to-transparent pointer-events-none"></div>
            </div>
          </div>
        )}
        <p className="text-white text-lg md:text-xl mt-2 animate-pulse font-semibold drop-shadow-lg">
          جاري التحميل...
        </p>
      </div>
    </div>
  );
}

