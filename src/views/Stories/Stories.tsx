"use client";

import { useSidebar } from "../../Context/SidebarContext";
import Sidebar from "../../Components/Layout/Sidebar";

export default function Stories() {
  const { isOpen } = useSidebar();

  return (
    <>
      <Sidebar />
      <div className={`p-6 min-h-screen transition-all duration-500 ${isOpen ? "md:ml-64 ml-0" : "ml-0"} pt-20 md:pt-6 text-white`}>
        <h1 className="text-3xl font-bold mb-6">قصص الأنبياء</h1>
        <p className="text-gray-300">قريباً: قصص الأنبياء والمرسلين</p>
      </div>
    </>
  );
}

