"use client";

import { useEffect, useRef, useState } from "react";

type ChatItem = {
  id: string;
  role: "user" | "assistant";
  content: string;
  source?: string;
};

const createId = () => `${Date.now()}-${Math.random().toString(16).slice(2)}`;

export default function ChatWidget() {
  const [open, setOpen] = useState(false);
  const [message, setMessage] = useState("");
  const [history, setHistory] = useState<ChatItem[]>([
    {
      id: createId(),
      role: "assistant",
      content:
        "مرحباً! أرسل نص الحديث للتحقق وسأعيد لك الرد مع المصدر من الدرر السنية.",
    },
  ]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const containerRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const el = containerRef.current;
    if (el) el.scrollTop = el.scrollHeight;
  }, [history, open]);

  const renderContent = (text: string) => {
    const trimmed = text.trim();
    if (!trimmed) return null;
    return trimmed.split(/\n{1,2}/).map((line, idx) => (
      <p key={idx} className="mb-1 last:mb-0">
        {line}
      </p>
    ));
  };

  const sendMessage = async () => {
    const trimmed = message.trim();
    if (!trimmed) {
      setError("اكتب الحديث أولاً قبل الإرسال.");
      return;
    }
    setError("");

    const userItem: ChatItem = {
      id: createId(),
      role: "user",
      content: trimmed,
    };
    setHistory((prev) => [...prev, userItem]);
    setLoading(true);

    try {
      const res = await fetch("/api/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ message: trimmed }),
      });

      const data = await res.json();
      const reply =
        (data && data.reply) ||
        "لم يصل رد من الخدمة. برجاء المحاولة مجدداً.";

      setHistory((prev) => [
        ...prev,
        {
          id: createId(),
          role: "assistant",
          content: reply,
          source: data?.source,
        },
      ]);
      setMessage("");
    } catch (err) {
      setError("تعذر الاتصال بالخادم. حاول مرة أخرى.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <button
        onClick={() => setOpen(true)}
        className="fixed bottom-6 right-6 z-40 rounded-full bg-gradient-to-r from-emerald-500 to-teal-400 w-16 h-16 text-sm font-semibold text-slate-900 shadow-2xl shadow-emerald-500/40 hover:from-emerald-400 hover:to-teal-300 transition focus:outline-none focus:ring-2 focus:ring-emerald-300 flex items-center justify-center"
        aria-label="فتح الشات"
      >
        <span className="text-2xl drop-shadow-sm">💬</span>
      </button>

      {open && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm px-4">
          <div className="relative w-full max-w-3xl rounded-3xl bg-white/10 border border-white/15 shadow-2xl p-6 backdrop-blur-lg">
            <button
              onClick={() => setOpen(false)}
              className="absolute top-4 left-4 text-slate-200 hover:text-white text-sm bg-white/10 rounded-full px-2 py-1 border border-white/10"
              aria-label="إغلاق"
            >
              إغلاق
            </button>

            <div className="flex items-center justify-between mb-4">
              <div>
                <div className="flex items-center gap-2 text-lg font-semibold text-emerald-200">
                  <span className="h-3 w-3 rounded-full bg-emerald-400 animate-pulse shadow-[0_0_12px_rgba(16,185,129,0.8)]"></span>
                  <span>مساعد التحقق من الأحاديث</span>
                </div>
                <p className="text-xs text-slate-200/80 mt-1">
                  يفحص نص الحديث، يرتب الرد، ويعرض المصدر من الدرر السنية مع توضيح المختصر.
                </p>
              </div>
              {error && (
                <span className="text-xs text-red-300 bg-red-500/10 px-2 py-1 rounded-full border border-red-400/40">
                  {error}
                </span>
              )}
            </div>

            <div
              ref={containerRef}
              className="h-96 overflow-y-auto space-y-3 rounded-2xl bg-black/30 border border-white/5 p-4"
              aria-live="polite"
              aria-busy={loading}
            >
              {history.map((item) => (
                <div
                  key={item.id}
                  className={`max-w-[90%] rounded-2xl px-4 py-3 text-sm leading-relaxed shadow ${item.role === "user"
                      ? "ml-auto bg-emerald-500/20 border border-emerald-400/30 text-emerald-50"
                      : "bg-white/5 border border-white/10 text-slate-100"
                    }`}
                >
                  <div className="text-[11px] uppercase tracking-wide opacity-70 mb-1">
                    {item.role === "user" ? "مستخدم" : "المساعد"}
                  </div>
                  <div className="space-y-1">{renderContent(item.content)}</div>
                  {item.source && (
                    <div className="mt-2 text-[11px] text-emerald-200/80">
                      المصدر: {item.source}
                    </div>
                  )}
                </div>
              ))}
              {loading && (
                <div className="mx-auto flex w-full items-center justify-center gap-2 text-emerald-100 text-sm">
                  <span className="h-2 w-2 rounded-full bg-emerald-400 animate-ping"></span>
                  <span className="animate-pulse">جاري البحث والتحقق...</span>
                </div>
              )}
            </div>

            <div className="mt-5 space-y-3">
              <textarea
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                placeholder="اكتب الحديث هنا..."
                rows={4}
                className="w-full rounded-2xl border border-white/10 bg-white/5 px-4 py-3 text-sm text-white placeholder:text-slate-400 focus:border-emerald-400/60 focus:outline-none focus:ring-2 focus:ring-emerald-400/30"
              />
              <div className="flex gap-3 items-center">
                <button
                  onClick={sendMessage}
                  disabled={loading}
                  className="flex-1 rounded-2xl bg-gradient-to-r from-emerald-500 to-teal-400 px-4 py-3 text-sm font-semibold text-slate-900 shadow-lg shadow-emerald-500/30 transition hover:from-emerald-400 hover:to-teal-300 disabled:opacity-60 disabled:cursor-not-allowed flex items-center justify-center gap-2"
                >
                  {loading && (
                    <span className="h-3 w-3 rounded-full border-2 border-white/70 border-b-transparent animate-spin" />
                  )}
                  {loading ? "جاري البحث والتحقق..." : "تحقق من الحديث الآن"}
                </button>
                <button
                  onClick={() => setHistory([])}
                  className="rounded-2xl px-4 py-3 text-xs text-slate-200 bg-white/5 border border-white/10 hover:border-emerald-300/40 transition"
                >
                  مسح المحادثة
                </button>
              </div>
              <div className="text-[12px] text-slate-300/80 text-center">
                الردود مصدرها الدرر السنية
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
