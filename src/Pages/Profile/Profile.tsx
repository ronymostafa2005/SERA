"use client";

import { useSidebar } from "../../Context/SidebarContext";
import Sidebar from "../../Components/Layout/Sidebar";
import { getCurrentUser } from "../../utils/auth";
import { useEffect, useState } from "react";

export default function Profile() {
  const { isOpen } = useSidebar();
  const [user, setUser] = useState<any>(null);

  useEffect(() => {
    const currentUser = getCurrentUser();
    setUser(currentUser);
  }, []);

  return (
    <>
      <Sidebar />
      <div className={`p-6 min-h-screen transition-all duration-500 ${isOpen ? "md:ml-64 ml-0" : "ml-0"} pt-20 md:pt-6 text-white`}>
        <h1 className="text-3xl font-bold mb-6">الملف الشخصي</h1>
        {user ? (
          <div className="bg-slate-900/70 p-6 rounded-xl border border-emerald-600/40">
            <div className="flex items-center gap-4 mb-4">
              {user.avatar && (
                <img
                  src={user.avatar}
                  alt="Avatar"
                  className="w-20 h-20 rounded-full border border-emerald-500/50 object-cover"
                />
              )}
              <div>
                <h2 className="text-2xl font-semibold text-emerald-400">{user.name}</h2>
                <p className="text-gray-300">{user.email}</p>
              </div>
            </div>
          </div>
        ) : (
          <p className="text-gray-300">يرجى تسجيل الدخول لعرض ملفك الشخصي</p>
        )}
      </div>
    </>
  );
}

