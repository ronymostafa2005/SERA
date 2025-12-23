"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

const ADMIN_NAV = [
  { path: "/admin-dashboard", label: "لوحة الإحصائيات" },
  { path: "/admin-dashboard/reviews", label: "التقييمات" },
  { path: "/admin-dashboard/feedback", label: "آراء المستخدمين" },
];

export default function AdminSidebar() {
  const pathname = usePathname();

  return (
    <div className="fixed top-0 left-0 h-screen w-60 text-white bg-black/90 border-r border-emerald-700/50 shadow-2xl z-50">
      <div className="p-5 border-b border-emerald-700/40">
        <h2 className="text-lg font-semibold text-emerald-300">لوحة المالك</h2>
        <p className="text-xs text-gray-400">إدارة وتحليلات خاصة</p>
      </div>
      <ul className="p-4 space-y-2">
        {ADMIN_NAV.map((item) => {
          const active = pathname === item.path;
          return (
            <li key={item.path}>
              <Link
                href={item.path}
                prefetch
                className={`block w-full px-3 py-2 rounded-lg text-sm font-medium transition-all duration-300 ${
                  active
                    ? "bg-emerald-600/90 text-white shadow-[0_0_15px_rgba(16,185,129,0.6)]"
                    : "bg-black/40 text-gray-200 hover:bg-slate-900/80 hover:text-white"
                }`}
              >
                {item.label}
              </Link>
            </li>
          );
        })}
      </ul>
    </div>
  );
}

