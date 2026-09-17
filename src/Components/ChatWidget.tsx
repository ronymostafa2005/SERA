"use client";

import { useEffect, useRef, useState } from "react";

type ChatItem = {
  id: string;
  role: "user" | "assistant";
  content: string;
  source?: string;
  timestamp?: string;
};

const createId = () => `${Date.now()}-${Math.random().toString(16).slice(2)}`;
const getTime = () =>
  new Date().toLocaleTimeString("ar-EG", { hour: "2-digit", minute: "2-digit" });

const SUGGESTIONS = [
  "تحقق من حديث: من غشنا فليس منا",
  "ما درجة حديث: خير القرون قرني؟",
  "هل حديث: اطلبوا العلم ولو في الصين صحيح؟",
];

export default function ChatWidget() {
  const [open, setOpen] = useState(false);
  const [message, setMessage] = useState("");
  const [history, setHistory] = useState<ChatItem[]>([
    {
      id: createId(),
      role: "assistant",
      content:
        "مرحباً! أنا مساعدك المتخصص في التحقق من الأحاديث النبوية.\n\nأرسل لي أي حديث وسأقوم بـ:\n• تحديد درجته (صحيح / حسن / ضعيف / موضوع)\n• ذكر من خرّجه من العلماء\n• شرح علة الضعف إن وُجدت",
      timestamp: getTime(),
    },
  ]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [mounted, setMounted] = useState(false);
  const containerRef = useRef<HTMLDivElement | null>(null);
  const textareaRef = useRef<HTMLTextAreaElement | null>(null);

  useEffect(() => setMounted(true), []);

  useEffect(() => {
    const el = containerRef.current;
    if (el) el.scrollTop = el.scrollHeight;
  }, [history, open]);

  useEffect(() => {
    if (open && textareaRef.current) {
      setTimeout(() => textareaRef.current?.focus(), 300);
    }
  }, [open]);

  const renderContent = (text: string) => {
    if (!text.trim()) return null;
    return text
      .trim()
      .split(/\n/)
      .map((line, idx) => {
        if (line.startsWith("•") || line.startsWith("-")) {
          return (
            <li key={idx} className="flex items-start gap-2 text-sm leading-relaxed">
              <span className="mt-1.5 w-1.5 h-1.5 rounded-full bg-emerald-400 shrink-0" />
              <span>{line.replace(/^[•\-]\s*/, "")}</span>
            </li>
          );
        }
        if (!line.trim()) return <div key={idx} className="h-1.5" />;
        return (
          <p key={idx} className="text-sm leading-relaxed">
            {line}
          </p>
        );
      });
  };

  const sendMessage = async (text?: string) => {
    const trimmed = (text ?? message).trim();
    if (!trimmed) {
      setError("اكتب الحديث أولاً قبل الإرسال.");
      return;
    }
    setError("");
    const userItem: ChatItem = {
      id: createId(),
      role: "user",
      content: trimmed,
      timestamp: getTime(),
    };
    setHistory((prev) => [...prev, userItem]);
    setMessage("");
    setLoading(true);

    try {
      const res = await fetch("/api/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ message: trimmed }),
      });
      const data = await res.json();
      const reply =
        (data && data.reply) || "لم يصل رد من الخدمة. برجاء المحاولة مجدداً.";
      setHistory((prev) => [
        ...prev,
        {
          id: createId(),
          role: "assistant",
          content: reply,
          source: data?.source,
          timestamp: getTime(),
        },
      ]);
    } catch {
      setError("تعذر الاتصال بالخادم. حاول مرة أخرى.");
    } finally {
      setLoading(false);
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      sendMessage();
    }
  };

  if (!mounted) return null;

  return (
    <>
      {/* Floating Trigger Button */}
      <button
        id="chat-widget-trigger"
        onClick={() => setOpen(true)}
        aria-label="فتح مساعد التحقق من الأحاديث"
        className="fixed bottom-6 right-6 z-40 group flex items-center gap-2.5 rounded-full bg-gradient-to-br from-emerald-500 via-emerald-600 to-teal-700 px-5 py-3.5 shadow-2xl shadow-emerald-700/40 transition-all duration-300 hover:shadow-emerald-500/50 hover:scale-105 active:scale-95"
      >
        <span className="text-xl">🕌</span>
        <span className="text-sm font-bold text-white tracking-wide">التحقق من الأحاديث</span>
        <span className="absolute -top-1 -right-1 w-3.5 h-3.5 bg-emerald-400 rounded-full border-2 border-[#0d1117] animate-pulse" />
      </button>

      {/* Backdrop */}
      {open && (
        <div
          className="fixed inset-0 z-50 bg-black/70 backdrop-blur-md"
          onClick={() => setOpen(false)}
          aria-hidden="true"
        />
      )}

      {/* Chat Panel — slides in from right */}
      <div
        id="chat-widget-panel"
        className={`fixed bottom-0 right-0 z-50 flex flex-col h-[100dvh] w-full max-w-[440px] bg-[#0d1117] border-l border-white/8 shadow-2xl transition-transform duration-300 ease-out ${
          open ? "translate-x-0" : "translate-x-full"
        }`}
        role="dialog"
        aria-label="مساعد التحقق من الأحاديث"
        aria-modal="true"
      >
        {/* ── Header ── */}
        <div className="shrink-0 flex items-center gap-3 px-5 py-4 border-b border-white/8 bg-[#0d1117]">
          <div className="relative">
            <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-emerald-500 to-teal-700 flex items-center justify-center text-xl shadow-lg shadow-emerald-700/30">
              🕌
            </div>
            <span className="absolute -bottom-0.5 -right-0.5 w-3 h-3 bg-emerald-400 rounded-full border-2 border-[#0d1117] animate-pulse" />
          </div>
          <div className="flex-1 min-w-0">
            <h2 className="text-sm font-bold text-white truncate">مساعد التحقق من الأحاديث</h2>
            <p className="text-[11px] text-emerald-400">مدعوم بـ Google Gemini AI • متاح الآن</p>
          </div>
          <div className="flex items-center gap-2">
            <button
              onClick={() => { setHistory([]); setError(""); }}
              className="p-2 rounded-lg text-slate-400 hover:text-slate-200 hover:bg-white/5 transition-colors text-xs"
              title="مسح المحادثة"
              aria-label="مسح المحادثة"
            >
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
              </svg>
            </button>
            <button
              onClick={() => setOpen(false)}
              className="p-2 rounded-lg text-slate-400 hover:text-slate-200 hover:bg-white/5 transition-colors"
              aria-label="إغلاق"
            >
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          </div>
        </div>

        {/* ── Suggestions (only shown when history is just the welcome) ── */}
        {history.length === 1 && (
          <div className="shrink-0 px-4 pt-3 pb-1 flex flex-col gap-2">
            <p className="text-[11px] text-slate-500 font-medium uppercase tracking-wider">اقتراحات للبدء</p>
            <div className="flex flex-col gap-1.5">
              {SUGGESTIONS.map((s) => (
                <button
                  key={s}
                  onClick={() => sendMessage(s)}
                  className="text-right text-xs text-slate-300 bg-white/[0.04] border border-white/8 hover:border-emerald-500/30 hover:bg-emerald-500/5 hover:text-emerald-300 rounded-xl px-3 py-2 transition-all duration-200"
                >
                  {s}
                </button>
              ))}
            </div>
            <div className="mt-1 h-px bg-gradient-to-r from-transparent via-white/8 to-transparent" />
          </div>
        )}

        {/* ── Messages ── */}
        <div
          ref={containerRef}
          className="flex-1 overflow-y-auto px-4 py-3 space-y-4 scroll-smooth"
          aria-live="polite"
          aria-busy={loading}
        >
          {history.map((item) => (
            <div
              key={item.id}
              className={`flex flex-col gap-1 ${item.role === "user" ? "items-end" : "items-start"}`}
            >
              {/* Role Label */}
              <span className="text-[10px] text-slate-500 px-1 font-medium">
                {item.role === "user" ? "أنت" : "المساعد"}
                {item.timestamp && (
                  <span className="ms-2 opacity-60">{item.timestamp}</span>
                )}
              </span>

              {/* Bubble */}
              <div
                className={`max-w-[88%] rounded-2xl px-4 py-3 shadow-sm ${
                  item.role === "user"
                    ? "bg-emerald-600/25 border border-emerald-500/25 text-emerald-50 rounded-tr-sm"
                    : "bg-white/[0.06] border border-white/8 text-slate-100 rounded-tl-sm"
                }`}
              >
                {item.role === "assistant" ? (
                  <ul className="space-y-1">{renderContent(item.content)}</ul>
                ) : (
                  <p className="text-sm leading-relaxed">{item.content}</p>
                )}
                {item.source && (
                  <div className="mt-2 pt-2 border-t border-white/10 text-[11px] text-emerald-300/70 flex items-center gap-1">
                    <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13.828 10.172a4 4 0 00-5.656 0l-4 4a4 4 0 105.656 5.656l1.102-1.101m-.758-4.899a4 4 0 005.656 0l4-4a4 4 0 00-5.656-5.656l-1.1 1.1" />
                    </svg>
                    {item.source}
                  </div>
                )}
              </div>
            </div>
          ))}

          {/* Typing Indicator */}
          {loading && (
            <div className="flex items-start gap-2">
              <div className="bg-white/[0.06] border border-white/8 rounded-2xl rounded-tl-sm px-4 py-3 flex items-center gap-2">
                <span className="flex gap-1 items-center">
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-bounce [animation-delay:0ms]" />
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-bounce [animation-delay:150ms]" />
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-bounce [animation-delay:300ms]" />
                </span>
                <span className="text-xs text-slate-400">جاري التحليل...</span>
              </div>
            </div>
          )}
        </div>

        {/* ── Error Banner ── */}
        {error && (
          <div className="shrink-0 mx-4 mb-2 flex items-center gap-2 bg-red-500/10 border border-red-500/25 rounded-xl px-3 py-2 text-xs text-red-300">
            <svg className="w-3.5 h-3.5 shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
            </svg>
            {error}
            <button onClick={() => setError("")} className="ms-auto opacity-60 hover:opacity-100">✕</button>
          </div>
        )}

        {/* ── Input Area ── */}
        <div className="shrink-0 border-t border-white/8 bg-[#0d1117] p-4 space-y-3">
          <div className="relative">
            <textarea
              ref={textareaRef}
              id="chat-input"
              value={message}
              onChange={(e) => { setMessage(e.target.value); setError(""); }}
              onKeyDown={handleKeyDown}
              placeholder="اكتب نص الحديث هنا... (Enter للإرسال)"
              rows={3}
              disabled={loading}
              className="w-full resize-none rounded-2xl border border-white/10 bg-white/[0.04] px-4 py-3 pr-12 text-sm text-white placeholder:text-slate-500 focus:border-emerald-500/50 focus:outline-none focus:ring-1 focus:ring-emerald-500/30 transition-all duration-200 disabled:opacity-50"
            />
            {/* Char counter */}
            {message.length > 0 && (
              <span className="absolute bottom-2.5 left-3 text-[10px] text-slate-600">
                {message.length}
              </span>
            )}
          </div>

          <button
            id="chat-send-button"
            onClick={() => sendMessage()}
            disabled={loading || !message.trim()}
            className="w-full flex items-center justify-center gap-2.5 rounded-2xl bg-gradient-to-r from-emerald-500 to-teal-600 px-4 py-3 text-sm font-bold text-white shadow-lg shadow-emerald-700/30 transition-all duration-200 hover:from-emerald-400 hover:to-teal-500 hover:shadow-emerald-500/40 disabled:opacity-40 disabled:cursor-not-allowed active:scale-[0.98]"
          >
            {loading ? (
              <>
                <span className="w-4 h-4 rounded-full border-2 border-white/40 border-t-white animate-spin" />
                جاري التحليل...
              </>
            ) : (
              <>
                <svg className="w-4 h-4 rotate-180" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8" />
                </svg>
                تحقق من الحديث الآن
              </>
            )}
          </button>

          <p className="text-center text-[11px] text-slate-600">
            الردود مصدرها الدرر السنية • مدعوم بـ Gemini AI
          </p>
        </div>
      </div>
    </>
  );
}
