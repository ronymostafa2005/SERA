"use client";

import { useEffect, useState } from "react";
import Sidebar from "../../Components/Layout/Sidebar";
import { useSidebar } from "../../Context/SidebarContext";

type Lecture = {
  id: number;
  title: string;
  description: string | null;
  api_url: string;
  prepared_by?: { title?: string }[];
  attachments?: { url: string; description?: string; extension_type?: string }[];
};

const KHOTAB_API =
  "https://api3.islamhouse.com/v3/paV29H2gm56kvLPy/main/khotab/ar/ar/1/25/json";

export default function Lectures() {
  const { isOpen } = useSidebar();
  const [lectures, setLectures] = useState<Lecture[]>([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const fetchLectures = async () => {
      setLoading(true);
      try {
        const res = await fetch(KHOTAB_API);
        if (!res.ok) throw new Error(`Status ${res.status}`);
        const json = await res.json();
        setLectures(Array.isArray(json.data) ? json.data : []);
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    };
    fetchLectures();
  }, []);

  return (
    <>
      <Sidebar />
          <div
            className={`p-6 min-h-screen transition-all duration-500 ${
              isOpen ? "md:ml-64 ml-0" : "ml-0"
            } pt-20 md:pt-8`}
          >
        <h1 className="text-3xl font-bold text-white mb-6">محاضرات إسلامية</h1>

        {loading && <p className="text-emerald-200">جارِ التحميل...</p>}

        {!loading && lectures.length === 0 && (
          <p className="text-gray-400 text-lg">لا توجد محاضرات متاحة</p>
        )}

        {!loading && lectures.length > 0 && (
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
            {lectures.map((item) => {
              const author = item.prepared_by?.[0]?.title;
              const attachment = item.attachments?.[0];
              return (
                <div
                  key={item.id}
                  className="p-4 rounded-xl bg-slate-900/70 border border-emerald-600/30 text-white shadow"
                >
                  <h2 className="text-lg font-semibold mb-1">{item.title}</h2>
                  {author && (
                    <p className="text-sm text-emerald-200 mb-1">المُعد: {author}</p>
                  )}
                  {item.description && (
                    <p className="text-sm text-gray-200 line-clamp-3 mb-2">
                      {item.description}
                    </p>
                  )}
                  <div className="flex gap-2 flex-wrap">
                    {attachment?.url && (
                      <a
                        href={attachment.url}
                        target="_blank"
                        rel="noreferrer"
                        className="text-sm px-3 py-2 bg-emerald-700 rounded-lg hover:bg-emerald-600 transition"
                      >
                        تحميل {attachment.extension_type || "ملف"}
                      </a>
                    )}
                    <a
                      href={item.api_url}
                      target="_blank"
                      rel="noreferrer"
                      className="text-sm px-3 py-2 bg-slate-700 rounded-lg hover:bg-slate-600 transition"
                    >
                      تفاصيل أكثر
                    </a>
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </div>
    </>
  );
}