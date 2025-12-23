"use client";

export default function Footer() {
  const sources = [
    {
      label: "المحتوى العام (Sitecontent)",
      url: "https://api3.islamhouse.com/v3/paV29H2gm56kvLPy/main/sitecontent/ar/ar/json",
    },
    {
      label: "الكتب",
      url: "https://api3.islamhouse.com/v3/paV29H2gm56kvLPy/main/books/ar/ar/1/25/json",
    },
    {
      label: "الخطب (محاضرات)",
      url: "https://api3.islamhouse.com/v3/paV29H2gm56kvLPy/main/khotab/ar/ar/1/25/json",
    },
  ];

  return (
    <footer className="mt-10 border-t border-emerald-600/30 bg-black/70 text-white">
      <div className="max-w-6xl mx-auto px-6 py-8 flex flex-col gap-6 md:flex-row md:items-center md:justify-between">
        <div className="space-y-2">
          <h3 className="text-xl font-bold text-emerald-300 drop-shadow-[0_0_12px_rgba(16,185,129,0.6)]">
            منصة الإسلام الشاملة
          </h3>
          <p className="text-sm text-gray-300">
            مصادر موثوقة ومتنوعة من مكتبة IslamHouse لكتب وخطب ومحتوى عربي.
          </p>
        </div>

        <div className="space-y-2">
          <p className="text-sm font-semibold text-emerald-200">المصادر المستخدمة في الـ API</p>
          <ul className="space-y-1 text-sm text-gray-200">
            {sources.map((src) => (
              <li key={src.url}>
                <a
                  href={src.url}
                  target="_blank"
                  rel="noreferrer"
                  className="underline underline-offset-4 decoration-emerald-400 hover:text-emerald-200 transition"
                >
                  {src.label}
                </a>
              </li>
            ))}
          </ul>
        </div>
      </div>
      <div className="text-center text-xs text-gray-400 pb-4">
        © {new Date().getFullYear()} جميع الحقوق محفوظة.
      </div>
    </footer>
  );
}

