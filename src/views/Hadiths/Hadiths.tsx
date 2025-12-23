"use client";
import { useEffect, useState } from "react";
import { useSidebar } from "@/Context/SidebarContext";
import Sidebar from "@/Components/Layout/Sidebar";
import { toast } from "react-toastify";
import { Hadith } from "@/types/hadiths";
import {
    BookOpenIcon,
    DocumentTextIcon,
    AcademicCapIcon,
    ScaleIcon,
    HeartIcon,
    MegaphoneIcon,
    ClockIcon,
    SparklesIcon,
} from "@heroicons/react/24/solid";
import Pagination from "@/Components/componentsUI/Pagination";

// دالة لتحديد الأيقونة المناسبة لكل فئة
const getCategoryIcon = (title: string) => {
    const titleLower = title.toLowerCase();
    
    if (titleLower.includes("qur'an") || titleLower.includes("quran") || titleLower.includes("قرآن")) {
        return <BookOpenIcon className="w-8 h-8" />;
    }
    if (titleLower.includes("hadith") || titleLower.includes("sunnah") || titleLower.includes("حديث")) {
        return <DocumentTextIcon className="w-8 h-8" />;
    }
    if (titleLower.includes("creed") || titleLower.includes("belief") || titleLower.includes("عقيدة")) {
        return <HeartIcon className="w-8 h-8" />;
    }
    if (titleLower.includes("jurisprudence") || titleLower.includes("fiqh") || titleLower.includes("فقه")) {
        return <ScaleIcon className="w-8 h-8" />;
    }
    if (titleLower.includes("virtue") || titleLower.includes("manners") || titleLower.includes("فضائل") || titleLower.includes("آداب")) {
        return <SparklesIcon className="w-8 h-8" />;
    }
    if (titleLower.includes("da'wah") || titleLower.includes("call") || titleLower.includes("دعوة")) {
        return <MegaphoneIcon className="w-8 h-8" />;
    }
    if (titleLower.includes("seerah") || titleLower.includes("history") || titleLower.includes("سيرة") || titleLower.includes("تاريخ")) {
        return <ClockIcon className="w-8 h-8" />;
    }
    if (titleLower.includes("knowledge") || titleLower.includes("علم")) {
        return <AcademicCapIcon className="w-8 h-8" />;
    }
    
    // الأيقونة الافتراضية
    return <BookOpenIcon className="w-8 h-8" />;
};

//================================================
export default function Hadiths() {
    // context for sidebar and sidebar component
    const { isOpen } = useSidebar();
    // state for the hadiths
    const [languages, setLanguages] = useState<Hadith["language"][]>([]);
    const [selectlanguage, setSelectlanguage] = useState<string>("ar");
    const [categories, setCategories] = useState<Hadith["category"][]>([]);
    const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
    const [hadiths, setHadiths] = useState<Hadith["list"][]>([]);
    const [loading, setloading] = useState<boolean>(false);
    const [currentPage, setCurrentPage] = useState<number>(1);
    const [totalPages, setTotalPages] = useState<number>(1);
    const [selectedHadeeth, setSelectedHadeeth] = useState<Hadith["details"] | null>(null);

    //---- fetch data from the api ---//
    useEffect(() => {
        async function fetchLanguages() {
            try {
                // محاولة جلب البيانات من API
                const res = await fetch("/api/languages");

                if (res.ok) {
                    const data = await res.json();
                    console.log("Languages from API:", data);
                    if (data && data.length > 0) {
                        setLanguages(data);
                        return;
                    }
                }
                
                // Fallback: استخدام بيانات ثابتة
                const fallbackLanguages: Hadith["language"][] = [
                    { code: "ar", native: "العربية" },
                    { code: "en", native: "English" },
                    { code: "ur", native: "اردو" },
                    { code: "es", native: "Español" },
                    { code: "fr", native: "Français" },
                    { code: "tr", native: "Türkçe" },
                    { code: "ru", native: "Русский" },
                    { code: "bn", native: "বাংলা" },
                    { code: "id", native: "Bahasa Indonesia" },
                    { code: "hi", native: "हिन्दी" },
                ];
                
                setLanguages(fallbackLanguages);
                console.log("Using fallback languages");
            } catch (error) {
                console.error("Error fetching languages:", error);
                // استخدام بيانات ثابتة في حالة الخطأ
                const fallbackLanguages: Hadith["language"][] = [
                    { code: "ar", native: "العربية" },
                    { code: "en", native: "English" },
                    { code: "ur", native: "اردو" },
                ];
                setLanguages(fallbackLanguages);
            }
        }

        fetchLanguages();
    }, []);
    // ======= useEffect for changing the language =======//
    useEffect(() => {
        if (!selectlanguage) return;
        async function fetchcategories() {
            setloading(true);
            try {
                const url = `https://hadeethenc.com/api/v1/categories/roots/?language=${selectlanguage}`;
                const res = await fetch(url);
                if (!res.ok) {
                    toast.error("Failed to fetch categories");
                    return;
                }
                const data = await res.json();
                console.log(data);
                setCategories(data);
                setSelectedCategory(null);
            } catch (error) {
                toast.error("Failed to fetch categories");
                console.error("Error fetching categories:", error);
            } finally {
                setloading(false);
            }
        }
        fetchcategories();
    }, [selectlanguage]);

    // ------------ useEffect for fetching the hadiths ------------//

    useEffect(() => {
        if (!selectedCategory || !selectlanguage) return;
        async function fetchhadiths() {
            setloading(true);
            try {
                const url = `https://hadeethenc.com/api/v1/hadeeths/list/?language=${selectlanguage}&category_id=${selectedCategory}&page=${currentPage}&per_page=20`;
                const res = await fetch(url);
                if (!res.ok) {
                    toast.error("Failed to fetch hadiths");
                    return;
                }
                const data = await res.json();
                console.log(data);
                setHadiths(data.data || []);
                if (data.meta) {
                    setTotalPages(parseInt(data.meta.last_page) || 1);
                }
            } catch (error) {
                toast.error("Failed to fetch hadiths");
                console.error("Error fetching hadiths:", error);
            } finally {
                setloading(false);
            }
        }
        fetchhadiths();
    }, [selectedCategory, selectlanguage, currentPage]);
    // ====== handle the hadith details ------------//

    async function fetchHadeethDetails(hadeethId: string) {
        setloading(true);

        try {
            const url = `https://hadeethenc.com/api/v1/hadeeths/one/?language=${selectlanguage}&id=${hadeethId}`;

            const response = await fetch(url);

            if (!response.ok) {
                throw new Error("فشل جلب تفاصيل الحديث");
            }

            const data = await response.json();
            setSelectedHadeeth(data);
        } catch (error) {
            console.error("خطأ في جلب تفاصيل الحديث:", error);
            toast.error("فشل جلب تفاصيل الحديث");
        } finally {
            setloading(false);
        }
    }
    // -----------hundle the pagination ------------//
    const handlepagechange = (page: number) => {
        setCurrentPage(page);
    }


    return (
        <>
            <Sidebar />

            <div className={`p-6 min-h-screen transition-all duration-500 ${isOpen ? "md:ml-64 ml-0" : "ml-0"} pt-20 md:pt-6`}>
                {/* العنوان الرئيسي */}
                <div className="relative mb-8 text-center">
                    <div className="absolute inset-0 -z-10">
                        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-emerald-500/10 rounded-full blur-3xl animate-pulse"></div>
                    </div>

                    <h1 className="text-4xl md:text-5xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-emerald-400 via-emerald-300 to-emerald-500 mb-4">
                        الأحاديث النبوية
                    </h1>
                    <p className="text-lg text-gray-300">استكشف الأحاديث النبوية الشريفة</p>
                </div>

                {/* اختيار اللغة */}
                <div className="mb-6 max-w-md mx-auto">
                    <label className="block text-white mb-2 text-sm font-semibold">اختر اللغة:</label>
                    <select
                        value={selectlanguage}
                        onChange={(e) => {
                            setSelectlanguage(e.target.value);
                            setCurrentPage(1);
                        }}
                        className="w-full bg-slate-800 text-white p-3 rounded-lg border border-emerald-500/20 focus:border-emerald-400 focus:outline-none transition-all"
                    >
                        {languages.map((lang) => (
                            <option key={lang.code} value={lang.code}>
                                {lang.native}
                            </option>
                        ))}
                    </select>
                </div>

                {/* حالة التحميل */}
                {loading && (
                    <div className="text-center py-12">
                        <div className="inline-block animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-emerald-400"></div>
                        <p className="text-emerald-400 mt-4">جاري التحميل...</p>
                    </div>
                )}

                {/* عرض الفئات */}
                {!loading && categories.length > 0 && (
                    <div className="mb-8">
                        <h2 className="text-2xl font-bold text-white mb-6 text-center">الفئات</h2>

                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
                            {categories.map((category) => (
                                <button
                                    key={category.id}
                                    onClick={() => {
                                        setSelectedCategory(category.id);
                                        setCurrentPage(1);
                                    }}
                                    className={`p-5 rounded-xl border transition-all transform hover:scale-105 ${selectedCategory === category.id
                                            ? "bg-emerald-600 border-emerald-400 text-white shadow-[0_0_20px_rgba(16,185,129,0.8)]"
                                            : "bg-slate-800 border-emerald-500/20 text-gray-300 hover:bg-slate-700 hover:border-emerald-400"
                                        }`}
                                >
                                    <div className="flex items-center justify-between mb-2">
                                        <h3 className="font-semibold text-lg flex-1">{category.title}</h3>
                                        <div className="text-emerald-400 ml-3">
                                            {getCategoryIcon(category.title)}
                                        </div>
                                    </div>
                                    <p className="text-sm opacity-80">
                                        {category.hadeeths_count} حديث
                                    </p>
                                </button>
                            ))}
                        </div>
                    </div>
                )}

                {/* عرض الأحاديث */}
                {!loading && selectedCategory && hadiths.length > 0 && (
                    <div className="mb-8">
                        <h2 className="text-2xl font-bold text-white mb-6 text-center">الأحاديث</h2>

                        <div className="space-y-4">
                            {hadiths.map((hadith) => (
                                <div
                                    key={hadith.id}
                                    onClick={() => fetchHadeethDetails(hadith.id)}
                                    className="bg-slate-800 p-5 rounded-xl border border-emerald-500/20 hover:border-emerald-400 cursor-pointer transition-all transform hover:scale-[1.02] hover:shadow-[0_0_15px_rgba(16,185,129,0.5)]"
                                >
                                    <div className="flex items-start justify-between">
                                        <div className="flex-1">
                                            <h3 className="text-white font-medium text-lg mb-2">{hadith.title}</h3>
                                            <p className="text-sm text-gray-400">
                                                {hadith.translations?.length || 0} لغة متاحة
                                            </p>
                                        </div>
                                        <div className="ml-4 text-emerald-400">
                                            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                                            </svg>
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>
                        {/* Pagination */}
                        <Pagination totalPages={totalPages} currentPage={currentPage} handlepagechange={handlepagechange} />
                    </div>
                )}

                {/* رسائل فارغة */}
                {!loading && categories.length === 0 && (
                    <div className="text-center py-12">
                        <p className="text-gray-400 text-lg">لا توجد فئات متاحة</p>
                    </div>
                )}

                {!loading && selectedCategory && hadiths.length === 0 && (
                    <div className="text-center py-12">
                        <p className="text-gray-400 text-lg">لا توجد أحاديث متاحة في هذه الفئة</p>
                    </div>
                )}

                {/* Modal لعرض تفاصيل الحديث */}
                {selectedHadeeth && (
                    <div
                        className="fixed inset-0 bg-black/70 flex items-center justify-center z-50 p-4"
                        onClick={() => setSelectedHadeeth(null)}
                    >
                        <div
                            className="bg-slate-900 rounded-2xl p-6 max-w-3xl w-full max-h-[90vh] overflow-y-auto border border-emerald-500/20"
                            onClick={(e) => e.stopPropagation()}
                        >
                            <div className="flex justify-between items-center mb-6">
                                <h2 className="text-2xl font-bold text-white">تفاصيل الحديث</h2>

                                <button
                                    onClick={() => setSelectedHadeeth(null)}
                                    className="text-gray-400 hover:text-white text-3xl transition-all"
                                >
                                    ×
                                </button>
                            </div>

                            <div className="space-y-6">
                                {/* العنوان */}
                                {selectedHadeeth.title && (
                                    <div>
                                        <h3 className="text-emerald-400 font-semibold mb-2">العنوان:</h3>
                                        <p className="text-white text-lg">{selectedHadeeth.title}</p>
                                    </div>
                                )}

                                {/* الحديث */}
                                {selectedHadeeth.hadeeth && (
                                    <div>
                                        <h3 className="text-emerald-400 font-semibold mb-2">الحديث:</h3>
                                        <p className="text-white leading-relaxed">{selectedHadeeth.hadeeth}</p>
                                    </div>
                                )}

                                {/* الحديث بالعربية */}
                                {selectedHadeeth.hadeeth_ar && (
                                    <div>
                                        <h3 className="text-emerald-400 font-semibold mb-2">الحديث بالعربية:</h3>
                                        <p className="text-white text-right leading-relaxed" dir="rtl">
                                            {selectedHadeeth.hadeeth_ar}
                                        </p>
                                    </div>
                                )}

                                {/* المصدر */}
                                {selectedHadeeth.attribution && (
                                    <div>
                                        <h3 className="text-emerald-400 font-semibold mb-2">المصدر:</h3>
                                        <p className="text-white">{selectedHadeeth.attribution}</p>
                                    </div>
                                )}

                                {/* الدرجة */}
                                {selectedHadeeth.grade && (
                                    <div>
                                        <h3 className="text-emerald-400 font-semibold mb-2">الدرجة:</h3>
                                        <span className="inline-block px-3 py-1 bg-emerald-600/20 text-emerald-400 rounded-lg border border-emerald-500/30">
                                            {selectedHadeeth.grade}
                                        </span>
                                    </div>
                                )}

                                {/* الشرح */}
                                {selectedHadeeth.explanation && (
                                    <div>
                                        <h3 className="text-emerald-400 font-semibold mb-2">الشرح:</h3>
                                        <p className="text-white leading-relaxed">{selectedHadeeth.explanation}</p>
                                    </div>
                                )}

                                {/* الشرح بالعربية */}
                                {selectedHadeeth.explanation_ar && (
                                    <div>
                                        <h3 className="text-emerald-400 font-semibold mb-2">الشرح بالعربية:</h3>
                                        <p className="text-white text-right leading-relaxed" dir="rtl">
                                            {selectedHadeeth.explanation_ar}
                                        </p>
                                    </div>
                                )}

                                {/* الإشارات */}
                                {selectedHadeeth.hints && selectedHadeeth.hints.length > 0 && (
                                    <div>
                                        <h3 className="text-emerald-400 font-semibold mb-2">الإشارات:</h3>
                                        <ul className="list-disc list-inside space-y-2 text-white">
                                            {selectedHadeeth.hints.map((hint, index) => (
                                                <li key={index} className="leading-relaxed">{hint}</li>
                                            ))}
                                        </ul>
                                    </div>
                                )}
                            </div>
                        </div>
                    </div>
                )}
            </div>
        </>
    );
}
