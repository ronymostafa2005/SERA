"use client";

import { useEffect, useMemo, useState } from "react";
import { useSidebar } from "@/Context/SidebarContext";
import { toast } from "react-toastify";
import Sidebar from "@/Components/Layout/Sidebar";
import Pagination, { paginate } from "@/Components/componentsUI/Pagination";

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
            <div
              key={book.book_url}
              className="bg-slate-900/70 p-4 rounded-xl border border-emerald-500/20 hover:border-emerald-400 transition-all hover:shadow-[0_0_15px_rgba(16,185,129,0.4)]"
            >
              <h2 className="text-lg font-semibold mb-2">{book.title}</h2>
              <img
                src={book.image}
                alt={book.title}
                className="w-full h-40 object-cover rounded-lg mb-3"
              />
              <a
                href={book.book_url}
                target="_blank"
                rel="noreferrer"
                className="inline-block px-4 py-2 bg-emerald-600 text-white rounded-lg hover:bg-emerald-500 transition"
              >
                فتح الكتاب
              </a>
            </div>
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


