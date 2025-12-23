"use client";

import Cards from "../../Components/Cards/Cards";
import { useSidebar } from "../../Context/SidebarContext";
import Sidebar from "../../Components/Layout/Sidebar";

export default function Duas() {
  const { isOpen } = useSidebar();
  const cardsData: never[] = [];

  return (
    <>
      <Sidebar />
      <div className={`p-6 min-h-screen transition-all duration-500 ${isOpen ? "ml-64" : "ml-0"}`}>
        <h1 className="text-3xl font-bold text-white mb-6">أدعية وأذكار</h1>
        {cardsData.length === 0 ? (
          <div className="text-center py-12">
            <p className="text-gray-400 text-lg">لا توجد أدعية متاحة</p>
          </div>
        ) : (
          <Cards items={cardsData} />
        )}
      </div>
    </>
  );
}

