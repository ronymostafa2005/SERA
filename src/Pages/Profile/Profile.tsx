"use client";

import { useSidebar } from "../../Context/SidebarContext";
import { useRouter } from "next/navigation";
import { logout } from "../../utils/auth";
import Sidebar from "../../Components/Layout/Sidebar";

export default function Profile() {
  const { isOpen } = useSidebar();
  const router = useRouter();
  const UserName = "Rony Mostafa";
  const avatarurl = "/default-avatar.png";

  const handleLogout = () => {
    logout();
    router.push("/");
  };

  return (
    <>
      <Sidebar />
      <div className={`p-6 min-h-screen transition-all duration-500 ${isOpen ? "ml-64" : "ml-0"}`}>
      <h1 className="text-3xl font-bold text-white mb-6">الملف الشخصي</h1>
      
      <div className="bg-black/60 rounded-2xl p-8 max-w-2xl">
        {/* معلومات المستخدم */}
        <div className="flex items-center gap-6 mb-8">
          <div className="relative">
            <img
              src={avatarurl}
              alt="User Avatar"
              className="w-24 h-24 rounded-full border-2 border-emerald-400 object-cover shadow-lg"
            />
            <span className="absolute bottom-0 right-0 block w-4 h-4 bg-emerald-500 border-2 border-black rounded-full"></span>
          </div>
          <div className="flex flex-col">
            <h2 className="text-2xl font-bold text-white mb-2">{UserName}</h2>
            <span className="text-sm text-emerald-300">Online • متصل</span>
          </div>
        </div>

        {/* معلومات إضافية */}
        <div className="space-y-4">
          <div className="border-b border-gray-700 pb-4">
            <p className="text-sm text-gray-400 mb-1">البريد الإلكتروني</p>
            <p className="text-white">user@example.com</p>
          </div>
          <div className="border-b border-gray-700 pb-4">
            <p className="text-sm text-gray-400 mb-1">تاريخ الانضمام</p>
            <p className="text-white">يناير 2024</p>
          </div>
          <div>
            <p className="text-sm text-gray-400 mb-1">الإحصائيات</p>
            <div className="flex gap-6 mt-2">
              <div>
                <p className="text-emerald-400 font-semibold">12</p>
                <p className="text-sm text-gray-400">تلاوات</p>
              </div>
              <div>
                <p className="text-emerald-400 font-semibold">8</p>
                <p className="text-sm text-gray-400">قصص</p>
              </div>
              <div>
                <p className="text-emerald-400 font-semibold">15</p>
                <p className="text-sm text-gray-400">محاضرات</p>
              </div>
            </div>
          </div>
        </div>

        {/* الأزرار */}
        <div className="mt-6 flex gap-4">
          <button className="flex-1 px-6 py-3 bg-emerald-600 hover:bg-emerald-500 text-white font-semibold rounded-full shadow-lg transition-all duration-300 transform hover:-translate-y-1 hover:scale-105">
            تعديل الملف الشخصي
          </button>
          <button
            onClick={handleLogout}
            className="flex-1 px-6 py-3 bg-red-600/80 hover:bg-red-500 text-white font-semibold rounded-full shadow-lg transition-all duration-300 transform hover:-translate-y-1 hover:scale-105 flex items-center justify-center gap-2"
          >
            <svg
              className="w-5 h-5"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1"
              />
            </svg>
            تسجيل الخروج
          </button>
        </div>
      </div>
      </div>
    </>
  );
}

