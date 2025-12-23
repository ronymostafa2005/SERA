type Card = {
  title: string;
  imageUrl: string;
  rating: string;
  genre: string;
  surahNo?: number;
  audio?: any;
};

type CardsProps = {
  items: Card[];
  onPlayAudio?: (surahNo: number) => void;
  playingSurah?: number | null;
};

export default function Cards({ items, onPlayAudio, playingSurah }: CardsProps) {
  return (
    <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
      {items.map((card) => (
        <div 
          key={card.title} 
          className="rounded-2xl bg-gradient-to-br from-black/80 via-slate-900/80 to-black/80 p-6 text-white hover:from-black/90 hover:via-slate-900/90 hover:to-black/90 transition-all duration-300 border border-emerald-500/20 hover:border-emerald-400/40 relative overflow-hidden"
        >
          {/* خلفية زخرفية */}
          <div className="absolute inset-0 opacity-10">
            <div className="absolute top-0 right-0 w-32 h-32 bg-emerald-500/20 rounded-full blur-3xl"></div>
            <div className="absolute bottom-0 left-0 w-24 h-24 bg-emerald-400/20 rounded-full blur-2xl"></div>
          </div>

          <div className="relative z-10 flex flex-col items-center justify-center min-h-[280px]">
            {/* بسم الله الرحمن الرحيم */}
            <div className="mb-6 text-center">
              <p className="text-2xl md:text-3xl font-bold text-emerald-400 mb-2 animate-bismillah">
                بِسْمِ اللَّهِ الرَّحْمَٰنِ الرَّحِيمِ
              </p>
              <div className="w-24 h-0.5 bg-gradient-to-r from-transparent via-emerald-400 to-transparent mx-auto animate-pulse"></div>
            </div>

            {/* اسم السورة في المنتصف */}
            <h3 className="text-2xl md:text-3xl font-bold mb-4 text-center text-white drop-shadow-[0_0_10px_rgba(16,185,129,0.5)]">
              {card.title}
            </h3>

            {/* معلومات إضافية */}
            <p className="text-sm text-gray-300 mb-6 text-center">{card.genre}</p>

            {/* زر التشغيل */}
            {card.surahNo && onPlayAudio && (
              <button
                onClick={() => onPlayAudio(card.surahNo!)}
                className={`
                  px-6 py-3 
                  rounded-full 
                  text-sm 
                  font-semibold
                  transition-all 
                  duration-300
                  transform
                  hover:scale-105
                  ${
                    playingSurah === card.surahNo
                      ? "bg-emerald-600 hover:bg-emerald-500 text-white shadow-[0_0_20px_rgba(16,185,129,0.8)]"
                      : "bg-emerald-600/80 hover:bg-emerald-500 text-white border border-emerald-400/50 shadow-lg hover:shadow-[0_0_15px_rgba(16,185,129,0.6)]"
                  }
                `}
              >
                {playingSurah === card.surahNo ? (
                  <span className="flex items-center gap-2">
                    <svg
                      className="w-5 h-5"
                      fill="currentColor"
                      viewBox="0 0 20 20"
                    >
                      <path
                        fillRule="evenodd"
                        d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zM7 8a1 1 0 012 0v4a1 1 0 11-2 0V8zm5-1a1 1 0 00-1 1v4a1 1 0 102 0V8a1 1 0 00-1-1z"
                        clipRule="evenodd"
                      />
                    </svg>
                    تشغيل...
                  </span>
                ) : (
                  <span className="flex items-center gap-2">
                    <svg
                      className="w-5 h-5"
                      fill="currentColor"
                      viewBox="0 0 20 20"
                    >
                      <path
                        fillRule="evenodd"
                        d="M10 18a8 8 0 100-16 8 8 0 000 16zM9.555 7.168A1 1 0 008 8v4a1 1 0 001.555.832l3-2a1 1 0 000-1.664l-3-2z"
                        clipRule="evenodd"
                      />
                    </svg>
                    تشغيل
                  </span>
                )}
              </button>
            )}
          </div>
        </div>
      ))}
    </div>
  );
}
