"use client";

import { useState, type FormEvent, Suspense } from "react";
import { useSearchParams } from "next/navigation";
import Sidebar from "@/Components/Layout/Sidebar";
import { useSidebar } from "@/Context/SidebarContext";
import { toast } from "react-toastify";

export const dynamic = 'force-dynamic';

function CheckoutContent() {
  const searchParams = useSearchParams();
  const { isOpen } = useSidebar();

  const bookTitle = searchParams?.get("title") ?? "كتاب";
  const bookId = searchParams?.get("id") ?? "";

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [address, setAddress] = useState("");
  const [notes, setNotes] = useState("");

  const validateForm = () => {
    if (!name.trim() || !email.trim() || !phone.trim() || !address.trim()) {
      toast.error("الرجاء تعبئة جميع الحقول الإلزامية");
      return false;
    }
    const emailRegex = /\S+@\S+\.\S+/;
    if (!emailRegex.test(email)) {
      toast.error("صيغة البريد الإلكتروني غير صحيحة");
      return false;
    }
    if (phone.trim().length < 8) {
      toast.error("رقم الهاتف يجب أن يكون 8 أرقام على الأقل");
      return false;
    }
    return true;
  };

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    if (!validateForm()) return;
    // هنا يتم إرسال البيانات للباك إند/بوابة الدفع
    toast.success("تم استلام الطلب، سنقوم بالتواصل معك لإتمام الدفع");
  };

  return (
    <>
      <Sidebar />
      <div
        className={`min-h-screen text-white p-6 md:p-10 transition-all duration-500 ${
          isOpen ? "md:ml-64 ml-0" : "ml-0"
        } pt-20 md:pt-8`}
      >
        <div className="max-w-3xl mx-auto space-y-6 bg-slate-900/80 border border-emerald-600/50 rounded-2xl p-6 shadow-xl backdrop-blur transform transition-all duration-500 hover:-translate-y-1 hover:shadow-emerald-500/20">
          <div>
            <p className="text-emerald-300 text-sm mb-1">بوابة الدفع والطلب</p>
            <h1 className="text-3xl font-bold">إتمام شراء الكتاب</h1>
            <p className="text-sm text-gray-300 mt-2">
              الكتاب المختار: <span className="text-emerald-200">{bookTitle}</span> {bookId && `(ID: ${bookId})`}
            </p>
          </div>

          <form className="space-y-4" onSubmit={handleSubmit}>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm text-gray-200 mb-1">الاسم الكامل</label>
                <input
                  required
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  className="w-full rounded-lg bg-slate-800/80 border border-emerald-600/50 px-3 py-2 text-white focus:outline-none focus:border-emerald-400 focus:ring-2 focus:ring-emerald-500/50 transition-all duration-200"
                />
              </div>
              <div>
                <label className="block text-sm text-gray-200 mb-1">البريد الإلكتروني</label>
                <input
                  type="email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full rounded-lg bg-slate-800/80 border border-emerald-600/50 px-3 py-2 text-white focus:outline-none focus:border-emerald-400 focus:ring-2 focus:ring-emerald-500/50 transition-all duration-200"
                />
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm text-gray-200 mb-1">رقم الهاتف</label>
                <input
                  required
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                  className="w-full rounded-lg bg-slate-800/80 border border-emerald-600/50 px-3 py-2 text-white focus:outline-none focus:border-emerald-400 focus:ring-2 focus:ring-emerald-500/50 transition-all duration-200"
                />
              </div>
              <div>
                <label className="block text-sm text-gray-200 mb-1">العنوان</label>
                <input
                  required
                  value={address}
                  onChange={(e) => setAddress(e.target.value)}
                  className="w-full rounded-lg bg-slate-800/80 border border-emerald-600/50 px-3 py-2 text-white focus:outline-none focus:border-emerald-400 focus:ring-2 focus:ring-emerald-500/50 transition-all duration-200"
                />
              </div>
            </div>

            <div>
              <label className="block text-sm text-gray-200 mb-1">ملاحظات إضافية</label>
              <textarea
                value={notes}
                onChange={(e) => setNotes(e.target.value)}
                rows={4}
                className="w-full rounded-lg bg-slate-800/80 border border-emerald-600/50 px-3 py-2 text-white focus:outline-none focus:border-emerald-400 focus:ring-2 focus:ring-emerald-500/50 transition-all duration-200"
              />
            </div>

            <button
              type="submit"
              className="w-full py-3 bg-emerald-600 hover:bg-emerald-500 rounded-lg font-semibold text-white transition transform hover:-translate-y-0.5 hover:shadow-[0_10px_25px_-10px_rgba(16,185,129,0.7)]"
            >
              تأكيد الطلب والدفع
            </button>
          </form>
        </div>
      </div>
    </>
  );
}

export default function BooksCheckoutPage() {
  return (
    <Suspense fallback={<div className="min-h-screen bg-black flex items-center justify-center text-emerald-400">جاري التحميل...</div>}>
      <CheckoutContent />
    </Suspense>
  );
}

