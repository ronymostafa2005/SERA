"use client";

import { useEffect, useMemo, useState } from "react";
import { useSidebar } from "@/Context/SidebarContext";
import { toast } from "react-toastify";
import Sidebar from "@/Components/Layout/Sidebar";
import Pagination, { paginate } from "@/Components/componentsUI/Pagination";
import { CardBody, CardContainer, CardItem } from "@/Components/ui/3d-card";

type Book = {
  title: string;
  image: string;
  book_url: string;
};

export default function SeraNabi() {
  const { isOpen } = useSidebar();
  const [books, setBooks] = useState<Book[]>([]);
  const [loading, setLoading] = useState(true);
  const [currentPage, setCurrentPage] = useState(1);
  const [showBanner, setShowBanner] = useState(true);
  const itemsPerPage = 6;

  useEffect(() => {
    fetch("/api/sera-nabi")
      .then((res) => res.json())
      .then((data) => setBooks(data.data || []))
      .catch((err) => {
        console.error("Error fetching sera-nabi books:", err);
        toast.error("Failed to fetch sera-nabi books");
        setBooks([]);
      })
      .finally(() => setLoading(false));
  }, []);

  useEffect(() => {
    setCurrentPage(1);
  }, [books.length]);

  useEffect(() => {
    const timer = setTimeout(() => setShowBanner(false), 7000);
    return () => clearTimeout(timer);
  }, []);

  const { currentItems, totalPages } = useMemo(
    () => paginate(books, currentPage, itemsPerPage),
    [books, currentPage]
  );

  return (
    <>
      <Sidebar />
      <div className={`p-6 min-h-screen transition-all duration-500 ${isOpen ? "md:ml-64 ml-0" : "ml-0"} text-white pt-20 md:pt-8`}>
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold mb-3">السيرة النبوية</h1>
          <div className="mx-auto h-[3px] w-28 bg-gradient-to-r from-emerald-400 via-emerald-300 to-emerald-500 rounded-full shadow-[0_0_12px_rgba(16,185,129,0.7)]" />
        </div>

        {showBanner && (
          <div className="relative mb-6 overflow-hidden rounded-2xl border border-emerald-400/40 bg-gradient-to-r from-emerald-900/70 via-emerald-800/70 to-emerald-900/70 p-4 shadow-[0_0_25px_rgba(16,185,129,0.35)] transition duration-500 ease-out animate-[pulse_2s_ease-in-out_infinite]">
            <div className="absolute inset-0 opacity-30 blur-3xl bg-emerald-400/40" />
            <div className="relative flex items-center gap-3">
              <span className="inline-flex h-10 w-10 items-center justify-center rounded-full bg-emerald-500/90 text-black font-extrabold text-xl shadow-lg">
                ✨
              </span>
              <div className="space-y-1">
                <p className="text-lg font-semibold text-emerald-100">
                  انتظروا المزيد من الكتب الصحيحة للسيرة النبوية
                </p>
                <p className="text-sm text-emerald-50/90">
                  هذه مجرد البداية — نضيف تباعاً كتباً موثوقة بتنسيق جميل ومريح للقراءة.
                </p>
              </div>
            </div>
          </div>
        )}

        {loading && (
          <div className="flex justify-center items-center py-12">
            <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-emerald-500"></div>
          </div>
        )}

        {!loading && books.length === 0 && (
          <p className="text-gray-300 text-lg">لا توجد كتب متاحة.</p>
        )}

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {currentItems.map((book) => (
            <CardContainer key={book.book_url} className="w-full">
              <CardBody className="group/card relative w-full h-full rounded-2xl border border-emerald-500/25 bg-gradient-to-br from-slate-950 via-slate-900 to-black p-5 text-white shadow-lg overflow-hidden">
                <div className="pointer-events-none absolute inset-0 opacity-30">
                  <div className="absolute -right-10 -top-10 h-36 w-36 rounded-full bg-emerald-500/30 blur-3xl" />
                  <div className="absolute -left-12 bottom-0 h-28 w-28 rounded-full bg-emerald-300/20 blur-3xl" />
                </div>

                <div className="relative z-10 flex flex-col gap-3">
                  <CardItem
                    translateZ={60}
                    className="text-lg font-semibold text-emerald-200 drop-shadow-[0_0_12px_rgba(16,185,129,0.4)]"
                  >
                    {book.title}
                  </CardItem>

                  <CardItem
                    translateZ={90}
                    className="overflow-hidden rounded-xl border border-emerald-400/30 shadow-lg shadow-emerald-500/20"
                  >
                    <img
                      src={book.image}
                      alt={book.title}
                      className="h-44 w-full object-cover transition duration-500 group-hover/card:scale-105"
                      loading="lazy"
                    />
                  </CardItem>

                  <CardItem translateZ={40} className="mt-1">
                    {/** Encode file names to avoid issues with spaces/arabic chars in URLs */}
                    <a
                      href={encodeURI(book.book_url)}
                      target="_blank"
                      rel="noreferrer"
                      download
                      className="flex w-full items-center justify-center gap-2 rounded-full bg-emerald-600/85 px-4 py-2 text-sm font-semibold text-white transition hover:bg-emerald-500 hover:shadow-[0_0_18px_rgba(16,185,129,0.6)]"
                    >
                      فتح / تحميل الكتاب
                      <svg className="h-4 w-4" fill="currentColor" viewBox="0 0 20 20">
                        <path
                          fillRule="evenodd"
                          d="M3 3a1 1 0 000 2h14a1 1 0 100-2H3zm6 4a1 1 0 00-1 1v4.586L6.707 10.293a1 1 0 00-1.414 1.414l3.999 3.999a1 1 0 001.416 0l3.999-3.999a1 1 0 00-1.414-1.414L11 12.586V8a1 1 0 00-1-1z"
                          clipRule="evenodd"
                        />
                      </svg>
                    </a>
                  </CardItem>
                </div>
              </CardBody>
            </CardContainer>
          ))}
        </div>
        {totalPages > 1 && (
          <Pagination
            totalPages={totalPages}
            currentPage={currentPage}
            handlepagechange={setCurrentPage}
          />
        )}
      </div>
    </>
  );
}


