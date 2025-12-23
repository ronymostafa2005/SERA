"use client";

import { useEffect, useState } from "react";
import Cards from "../../Components/Cards/Cards";
import { useLoading } from "../../Context/LoadingContext";
import { useSidebar } from "../../Context/SidebarContext";
import Sidebar from "../../Components/Layout/Sidebar";
//--------------------------------------------------------------
type AudioReciter = {
  reciter: string;
  url: string;
  originalUrl: string;
};

type SurahAudio = {
  [key: string]: AudioReciter;
};

type Surah = {
  surahName: string;
  surahNameArabic: string;
  surahNameArabicLong: string;
  surahNameTranslation: string;
  revelationPlace: string;
  totalAyah: number;
  surahNo: number;
  audio: SurahAudio;
};

type CardItem = {
  title: string;
  imageUrl: string;
  rating: string;
  genre: string;
  surahNo: number;
  audio?: SurahAudio;
};

type Language = {
  code: string;
  name: string;
  endpoint: string;
};

const languages: Language[] = [
  { code: "english", name: "English Translation", endpoint: "english.json" },
  { code: "arabic1", name: "Arabic Translation with Tashkeel", endpoint: "arabic1.json" },
  { code: "arabic2", name: "Arabic Translation without Tashkeel", endpoint: "arabic2.json" },
  { code: "bengali", name: "Bengali Translation", endpoint: "bengali.json" },
  { code: "urdu", name: "Urdu Translation", endpoint: "urdu.json" },
  { code: "turkish", name: "Turkish Translation", endpoint: "turkish.json" },
  { code: "uzbek", name: "Uzbek Translation", endpoint: "uzbek.json" },
];

type Reciter = {
  id: string;
  name: string;
};

export default function Quran() {
  const { setLoading: setGlobalLoading } = useLoading();
  const { isOpen } = useSidebar();
  const [allCardsData, setAllCardsData] = useState<CardItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedLanguage, setSelectedLanguage] = useState<Language>(languages[0]);
  const [reciters, setReciters] = useState<Reciter[]>([]);
  const [selectedReciter, setSelectedReciter] = useState<string>("1");
  const [currentAudio, setCurrentAudio] = useState<HTMLAudioElement | null>(null);
  const [playingSurah, setPlayingSurah] = useState<number | null>(null);
  const [pagination, setPagination] = useState<number>(1);
  const itemsPerPage = 12;

  useEffect(() => {
    setPagination(1);
  }, [selectedLanguage]);

  // جلب القارئين
  useEffect(() => {
    fetch("https://quranapi.pages.dev/api/reciters.json")
      .then((res) => res.json())
      .then((data: { [key: string]: string }) => {
        const recitersList = Object.entries(data).map(([id, name]) => ({
          id,
          name,
        }));
        setReciters(recitersList);
      })
      .catch((err) => {
        console.error("Error fetching reciters:", err);
      });
  }, []);

  // جلب السور
  useEffect(() => {
    let isMounted = true;
    
    setLoading(true);
    setGlobalLoading(true);
    fetch(`https://quranapi.pages.dev/api/${selectedLanguage.endpoint}`)
      .then((res) => res.json())
      .then((data: Surah[]) => {
        if (isMounted) {
          const mapped = data.map((surah) => ({
            title: surah.surahNameArabicLong,
            imageUrl: "",
            rating: "5.0",
            genre: "تلاوة قرآنية",
            surahNo: surah.surahNo,
            audio: surah.audio,
          }));
          setAllCardsData(mapped);
          setLoading(false);
          setGlobalLoading(false);
        }
      })
      .catch((err) => {
        console.error("Error fetching surahs:", err);
        if (isMounted) {
          setLoading(false);
          setGlobalLoading(false);
        }
      });
    
    return () => {
      isMounted = false;
    };
  }, [selectedLanguage, setGlobalLoading]);

  // حساب البيانات للصفحة الحالية
  const totalPages = Math.ceil(allCardsData.length / itemsPerPage);
  const startIndex = (pagination - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  const currentPageData = allCardsData.slice(startIndex, endIndex);

  // تشغيل الصوت
  const handlePlayAudio = (surahNo: number) => {
    // إيقاف الصوت الحالي إن وجد
    if (currentAudio) {
      currentAudio.pause();
      currentAudio.currentTime = 0;
    }

    // البحث عن السورة
    const surah = allCardsData.find((card) => card.surahNo === surahNo);
    if (!surah || !surah.audio) return;

    // الحصول على رابط الصوت للقارئ المختار
    const reciterAudio = surah.audio[selectedReciter];
    if (!reciterAudio) return;

    // إنشاء audio element جديد
    const audio = new Audio(reciterAudio.url);
    audio.play();

    audio.addEventListener("ended", () => {
      setPlayingSurah(null);
      setCurrentAudio(null);
    });

    setCurrentAudio(audio);
    setPlayingSurah(surahNo);
  };

  // إيقاف الصوت
  const handleStopAudio = () => {
    if (currentAudio) {
      currentAudio.pause();
      currentAudio.currentTime = 0;
      setCurrentAudio(null);
      setPlayingSurah(null);
    }
  };
 
  if (loading) {
    return (
      <div className={`flex items-center justify-center h-screen transition-all duration-500 ${isOpen ? "ml-64" : "ml-0"}`}>
        <p className="text-white text-xl animate-pulse">جاري التحميل...</p>
      </div>
    );
  }

  return (
    <>
      <Sidebar />
    <div className={`p-6 min-h-screen transition-all duration-500 ${isOpen ? "ml-64" : "ml-0"}`}>
      <div className="flex items-center justify-between mb-6 flex-wrap gap-4">
        <h1 className="text-3xl font-bold text-white">القرآن الكريم</h1>
        
        <div className="flex gap-4 flex-wrap">
          {/* Language Selector */}
          <div className="relative">
            <select
              value={selectedLanguage.code}
              onChange={(e) => {
                const lang = languages.find(l => l.code === e.target.value);
                if (lang) setSelectedLanguage(lang);
              }}
              className="
                px-4 py-2 
                bg-black/70 
                border border-emerald-500/50 
                rounded-lg 
                text-white 
                text-sm
                focus:outline-none 
                focus:ring-2 
                focus:ring-emerald-400
                cursor-pointer
                appearance-none
                pr-10
              "
            >
              {languages.map((lang) => (
                <option key={lang.code} value={lang.code} className="bg-black">
                  {lang.name}
                </option>
              ))}
            </select>
            <div className="absolute right-3 top-1/2 transform -translate-y-1/2 pointer-events-none">
              <svg
                className="w-4 h-4 text-emerald-400"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M19 9l-7 7-7-7"
                />
              </svg>
            </div>
          </div>

          {/* Reciter Selector */}
          {reciters.length > 0 && (
            <div className="relative">
              <select
                value={selectedReciter}
                onChange={(e) => {
                  setSelectedReciter(e.target.value);
                  handleStopAudio();
                }}
                className="
                  px-4 py-2 
                  bg-black/70 
                  border border-emerald-500/50 
                  rounded-lg 
                  text-white 
                  text-sm
                  focus:outline-none 
                  focus:ring-2 
                  focus:ring-emerald-400
                  cursor-pointer
                  appearance-none
                  pr-10
                "
              >
                {reciters.map((reciter) => (
                  <option key={reciter.id} value={reciter.id} className="bg-black">
                    {reciter.name}
                  </option>
                ))}
              </select>
              <div className="absolute right-3 top-1/2 transform -translate-y-1/2 pointer-events-none">
                <svg
                  className="w-4 h-4 text-emerald-400"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M19 9l-7 7-7-7"
                  />
                </svg>
              </div>
            </div>
          )}

          {/* Stop Button */}
          {playingSurah && (
            <button
              onClick={handleStopAudio}
              className="
                px-4 py-2 
                bg-red-600/80 
                hover:bg-red-500 
                border border-red-500/50 
                rounded-lg 
                text-white 
                text-sm
                transition-all
                duration-300
              "
            >
              إيقاف
            </button>
          )}
        </div>
      </div>
      
      <Cards 
        items={currentPageData} 
        onPlayAudio={handlePlayAudio}
        playingSurah={playingSurah}
      />

      {/* Pagination UI */}
      {totalPages > 1 && (
        <div className="flex items-center justify-center gap-2 mt-8">
          {/* Previous Button */}
          <button
            onClick={() => setPagination((prev) => Math.max(1, prev - 1))}
            disabled={pagination === 1}
            className={`
              px-4 py-2 
              rounded-lg 
              text-sm 
              font-semibold
              transition-all 
              duration-300
              ${
                pagination === 1
                  ? "bg-gray-700/50 text-gray-500 cursor-not-allowed"
                  : "bg-emerald-600/80 hover:bg-emerald-500 text-white border border-emerald-400/50"
              }
            `}
          >
            السابق
          </button>

          {/* Page Numbers */}
          <div className="flex gap-2">
            {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => {
              // عرض الصفحات القريبة فقط
              if (
                page === 1 ||
                page === totalPages ||
                (page >= pagination - 1 && page <= pagination + 1)
              ) {
                return (
                  <button
                    key={page}
                    onClick={() => setPagination(page)}
                    className={`
                      px-4 py-2 
                      rounded-lg 
                      text-sm 
                      font-semibold
                      transition-all 
                      duration-300
                      min-w-[40px]
                      ${
                        pagination === page
                          ? "bg-emerald-600 text-white shadow-[0_0_15px_rgba(16,185,129,0.6)]"
                          : "bg-black/70 hover:bg-emerald-600/80 text-white border border-emerald-500/50"
                      }
                    `}
                  >
                    {page}
                  </button>
                );
              } else if (page === pagination - 2 || page === pagination + 2) {
                return (
                  <span key={page} className="px-2 text-gray-400">
                    ...
                  </span>
                );
              }
              return null;
            })}
          </div>

          {/* Next Button */}
          <button
            onClick={() => setPagination((prev) => Math.min(totalPages, prev + 1))}
            disabled={pagination === totalPages}
            className={`
              px-4 py-2 
              rounded-lg 
              text-sm 
              font-semibold
              transition-all 
              duration-300
              ${
                pagination === totalPages
                  ? "bg-gray-700/50 text-gray-500 cursor-not-allowed"
                  : "bg-emerald-600/80 hover:bg-emerald-500 text-white border border-emerald-400/50"
              }
            `}
          >
            التالي
          </button>
        </div>
      )}

      {/* Page Info */}
      {totalPages > 1 && (
        <div className="text-center mt-4 text-gray-400 text-sm">
          صفحة {pagination} من {totalPages} • إجمالي السور: {allCardsData.length}
        </div>
      )}
    </div>
    </>
  );
}
 