"use client";

import { useCallback, useEffect, useMemo, useState } from "react";
import { toast } from "react-toastify";
import { useSidebar } from "@/Context/SidebarContext";
import Sidebar from "@/Components/Layout/Sidebar";
import Pagination from "@/Components/componentsUI/Pagination";
import { useRouter } from "next/navigation";

type BookItem = {
  id: number;
  title: string;
  description: string | null;
  api_url: string;
  prepared_by?: { title?: string }[];
  attachments?: { url: string; description?: string; extension_type?: string }[];
};

const FALLBACK_BOOKS_URL =
  "https://api3.islamhouse.com/v3/paV29H2gm56kvLPy/main/books/ar/ar/1/25/json";

export default function BooksShop() {
  const { sections, loading: sectionsLoading, refreshSections, isOpen } = useSidebar();
  const [books, setBooks] = useState<BookItem[]>([]);
  const [booksLoading, setBooksLoading] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const router = useRouter();

  // اختَر عنصر الكتب من استجابة الأقسام
  const booksSection = useMemo(
    () => sections.find((section) => section.block_name?.toLowerCase() === "books"),
    [sections]
  );

  const booksEndpoint = booksSection?.api_url || FALLBACK_BOOKS_URL;

  // 
  const fetchBooks = useCallback(async () => {
    if (!booksEndpoint) return;
    setBooksLoading(true);
    try {
      const res = await fetch(booksEndpoint);
      if (!res.ok) throw new Error(`Status ${res.status}`);
      const json = await res.json();
      setBooks(Array.isArray(json.data) ? json.data : []);
      setTotalPages(json.links?.pages_number ?? 1);
    } catch (err) {
      console.error(err);
      toast.error("فشل تحميل قائمة الكتب");
    } finally {
      setBooksLoading(false);
    }
  }, [booksEndpoint]);
// button for go to checkout page
  const goToCheckout = async (book: BookItem) => {
    try {
      const res = await fetch("/api/paymob/checkout", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          amountCents: 10000, // 100 EGP افتراضي
          title: book.title,
          firstName: "Guest",
          lastName: "User",
          email: "guest@example.com",
          phone: "+201000000000",
        }),
      });
      const data = await res.json().catch(() => null);
      if (!res.ok) {
        const msg = data?.error ? `فشل الدفع: ${data.error}` : `فشل الدفع (Status ${res.status})`;
        throw new Error(msg);
      }
      if (data?.iframeUrl) {
        // فتح بوابة الدفع في نفس الصفحة
        window.location.href = data.iframeUrl;
      } else {
        throw new Error("No iframe url");
      }
    } catch (err) {
      console.error(err);
      toast.error(err instanceof Error ? err.message : "فشل تهيئة الدفع");
    }
  };

  useEffect(() => {
    fetchBooks();
  }, [fetchBooks]);

  return (
    <>
      <Sidebar />

      <div
        className={`min-h-screen text-white p-4 sm:p-6 md:p-8 lg:p-10 transition-all duration-500 ${
          isOpen ? "md:ml-64 ml-0" : "ml-0"
        } pt-20 md:pt-8`}
      >
        <div className="w-full max-w-7xl mx-auto space-y-6">
          <header className="flex items-center justify-between">
            <div>
              <p className="text-emerald-300 text-sm mb-1">قسم المكتبة</p>
              <h1 className="text-3xl font-bold ">تسوق الكتب</h1>
          
            </div>
            <div className="flex gap-2">
              <button
                onClick={refreshSections}
                className="px-4 py-2 bg-slate-700 rounded-lg hover:bg-slate-600 transition text-sm"
              >
                تحديث الأقسام
              </button>
            <button
                onClick={fetchBooks}
                className="px-4 py-2 bg-emerald-600 rounded-lg hover:bg-emerald-500 transition text-sm"
              >
                تحديث الكتب
              </button>
            </div>
          </header>

          <div className="bg-black/60 border border-emerald-600/40 rounded-2xl p-6 shadow-xl backdrop-blur space-y-4">
            {(sectionsLoading || booksLoading) && <p className="text-emerald-200">جارِ التحميل...</p>}

            {!sectionsLoading && !booksSection && (
              <p className="text-red-300">لم يتم العثور على قسم الكتب في البيانات.</p>
            )}

            {!booksLoading && books.length === 0 && booksSection && (
              <p className="text-gray-200">لا توجد كتب متاحة حالياً.</p>
            )}

            {!booksLoading && books.length > 0 && (
              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4">
                {books.map((book) => {
                  const firstAttachment = book.attachments?.[0];
                  const authorName = book.prepared_by?.[0]?.title;
                  return (
                    <div
                      key={book.id}
                      className="border border-emerald-700/50 rounded-xl p-4 bg-slate-900/50 shadow h-full flex flex-col justify-between"
                    >
                      <div className="space-y-2">
                        <h3 className="text-lg font-semibold leading-snug">{book.title}</h3>
                        {authorName && (
                          <p className="text-sm text-emerald-200">إعداد: {authorName}</p>
                        )}
                        {book.description && (
                          <p className="text-sm text-gray-200 line-clamp-3">{book.description}</p>
                        )}
                      </div>

                      <div className="flex flex-wrap items-center gap-2 mt-3">
                        {firstAttachment?.url && (
                          <a
                            href={firstAttachment.url}
                            target="_blank"
                            rel="noreferrer"
                            className="inline-flex justify-center text-sm px-3 py-2 bg-emerald-700 rounded-lg hover:bg-emerald-600 transition"
                          >
                            تنزيل {firstAttachment.extension_type || "ملف"}
                          </a>
                        )}
                        <button
                          onClick={() => goToCheckout(book)}
                          className="inline-flex justify-center text-sm px-3 py-2 bg-indigo-600 rounded-lg hover:bg-indigo-500 transition"
                        >
                          شراء الكتاب
                        </button>
                      </div>
                    </div>
                  );
                })}
              </div>
            )}
          </div>
        </div>
        <Pagination
          totalPages={totalPages}
          currentPage={currentPage}
          handlepagechange={(page) => setCurrentPage(page)}
        />
      </div>
    </>
  );
}

