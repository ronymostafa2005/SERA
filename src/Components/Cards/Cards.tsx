"use client";

import { CardBody, CardContainer, CardItem } from "../ui/3d-card";

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
        <CardContainer key={card.title} className="w-full">
          <CardBody className="group/card relative w-full h-full cursor-pointer rounded-2xl border border-emerald-500/25 bg-gradient-to-br from-slate-950 via-slate-900 to-black p-6 text-white shadow-lg overflow-hidden">
            <div className="pointer-events-none absolute inset-0 opacity-30">
              <div className="absolute -right-10 -top-10 h-40 w-40 rounded-full bg-emerald-500/30 blur-3xl" />
              <div className="absolute -left-10 bottom-0 h-32 w-32 rounded-full bg-emerald-300/20 blur-3xl" />
            </div>

            <div className="relative z-10 flex flex-col gap-4">
              <CardItem
                translateZ={50}
                className="text-center text-emerald-300 text-xl font-semibold drop-shadow-[0_0_12px_rgba(16,185,129,0.55)]"
              >
                بِسْمِ اللَّهِ الرَّحْمَٰنِ الرَّحِيمِ
              </CardItem>

              <CardItem
                translateZ={70}
                className="text-center text-2xl md:text-3xl font-bold text-white drop-shadow-[0_0_14px_rgba(16,185,129,0.45)]"
              >
                {card.title}
              </CardItem>

              <CardItem
                translateZ={60}
                className="text-center text-sm text-gray-300"
              >
                {card.genre}
              </CardItem>

              <CardItem
                translateZ={90}
                rotateX={0}
                rotateZ={0}
                className="mt-2 w-full overflow-hidden rounded-xl border border-emerald-400/30 shadow-lg shadow-emerald-500/20"
              >
                <img
                  src={card.imageUrl || "/Books/cover.jpg"}
                  alt={card.title}
                  className="h-48 w-full object-cover"
                  loading="lazy"
                />
              </CardItem>

              {card.surahNo && onPlayAudio && (
                <CardItem
                  translateZ={40}
                  translateX={-10}
                  className="mt-4"
                >
                  <button
                    onClick={() => onPlayAudio(card.surahNo!)}
                    className={`
                      flex w-full items-center justify-center gap-2
                      rounded-full px-5 py-3 text-sm font-semibold
                      transition-all duration-300
                      ${
                        playingSurah === card.surahNo
                          ? "bg-emerald-600 hover:bg-emerald-500 text-white shadow-[0_0_22px_rgba(16,185,129,0.8)]"
                          : "bg-emerald-600/85 hover:bg-emerald-500 text-white border border-emerald-400/60 shadow-[0_0_15px_rgba(16,185,129,0.6)] hover:shadow-[0_0_18px_rgba(16,185,129,0.7)]"
                      }
                    `}
                  >
                    {playingSurah === card.surahNo ? (
                      <>
                        <svg className="h-5 w-5" fill="currentColor" viewBox="0 0 20 20">
                          <path
                            fillRule="evenodd"
                            d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zM7 8a1 1 0 012 0v4a1 1 0 11-2 0V8zm5-1a1 1 0 00-1 1v4a1 1 0 102 0V8a1 1 0 00-1-1z"
                            clipRule="evenodd"
                          />
                        </svg>
                        تشغيل...
                      </>
                    ) : (
                      <>
                        <svg className="h-5 w-5" fill="currentColor" viewBox="0 0 20 20">
                          <path
                            fillRule="evenodd"
                            d="M10 18a8 8 0 100-16 8 8 0 000 16zM9.555 7.168A1 1 0 008 8v4a1 1 0 001.555.832l3-2a1 1 0 000-1.664l-3-2z"
                            clipRule="evenodd"
                          />
                        </svg>
                        تشغيل
                      </>
                    )}
                  </button>
                </CardItem>
              )}
            </div>
          </CardBody>
        </CardContainer>
      ))}
    </div>
  );
}
