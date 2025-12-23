"use client";
import Sidebar from "@/Components/Layout/Sidebar";
import { useSidebar } from "@/Context/SidebarContext";
import { useState, useEffect, useMemo } from "react";
import Pagination, { paginate } from "@/Components/componentsUI/Pagination";
import { toast } from "react-toastify";

type item = { title: string; image: string; audio_url: string };

export default function IbtehalatNashqbandi() {
  const { isOpen } = useSidebar();
  const [ibtehalatData, setIbtehalatData] = useState<item[]>([]);
  const [loading, setLoading] = useState(true);
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 6;

  useEffect(() => {
    fetch("/api/ibtehalat")
      .then((res) => res.json())
      .then((data) => setIbtehalatData(data.data || []))
      .catch((err) => {
        console.error("Error fetching ibtehalat:", err);
        toast.error("Failed to fetch ibtehalat");
        setIbtehalatData([]);
      })
      .finally(() => setLoading(false));
  }, []);

  useEffect(() => {
    setCurrentPage(1);
  }, [ibtehalatData.length]);

  const { currentItems, totalPages } = useMemo(
    () => paginate(ibtehalatData, currentPage, itemsPerPage),
    [ibtehalatData, currentPage]
  );

  if (loading) {
    return (
      <div className="flex justify-center items-center h-screen">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-emerald-500"></div>
      </div>
    );
  }

  return (
    <>
      <Sidebar />
      <div className={`p-6 min-h-screen transition-all duration-500 ${isOpen ? "md:ml-64 ml-0" : "ml-0"} pt-20 md:pt-8`}>
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold text-white mb-3 box-shadow-lg shadow-emerald-500/50 rounded-lg p-4 inline-block">
            ابتهالات النقشبندي
          </h1>
          <div className="mx-auto h-[3px] w-32 bg-gradient-to-r from-emerald-400 via-emerald-300 to-emerald-500 rounded-full shadow-[0_0_12px_rgba(16,185,129,0.7)]" />
        </div>
        {!loading && ibtehalatData.length === 0 && (
          <p className="text-gray-400 text-lg">لا توجد إبتهالات متاحة</p>
        )}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {currentItems.map((item) => (
            <div
              key={item.title}
              className="bg-slate-800 p-4 rounded-xl border border-emerald-500/20 hover:border-emerald-400 cursor-pointer transition-all transform hover:scale-[1.02] hover:shadow-[0_0_15px_rgba(16,185,129,0.5)]"
            >
              <h2 className="text-lg font-semibold mb-1">{item.title}</h2>
              <img src={item.image} alt={item.title} className="w-full h-40 object-cover rounded-lg mb-2" />
              <audio src={item.audio_url} controls className="w-full" />
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


