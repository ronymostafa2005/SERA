"use client";

import { useMemo } from "react";
import { useSidebar } from "../../Context/SidebarContext";
import Sidebar from "../../Components/Layout/Sidebar";
import {
  BookOpenIcon,
  VideoCameraIcon,
  DocumentTextIcon,
  SpeakerWaveIcon,
  ScaleIcon,
  HeartIcon,
  SparklesIcon,
  RectangleStackIcon,
  DevicePhoneMobileIcon,
  MicrophoneIcon,
  FilmIcon,
  ShieldCheckIcon,
  BoltIcon,
  CheckCircleIcon,
  ArrowRightIcon,
  ArrowPathIcon,
} from "@heroicons/react/24/solid";
import Loader from "@/Components/Loader/Loader";
import { CardBody, CardContainer, CardItem } from "@/Components/ui/3d-card";

const promoCards = [
  { path: "/dashboard", title: "الرئيسية", desc: "نظرة عامة شاملة على المنصة.", icon: "showall", accentBar: "bg-gradient-to-r from-emerald-400 to-emerald-600", accentIcon: "bg-emerald-500/15 text-emerald-400 ring-emerald-500/30", accentPill: "bg-emerald-500/15 text-emerald-300", accentGlow: "hover:shadow-emerald-500/20", pillLabel: "رئيسي" },
  { path: "/quran", title: "القرآن الكريم", desc: "تلاوات وختمات بأصوات مميزة.", icon: "quran", accentBar: "bg-gradient-to-r from-cyan-400 to-cyan-600", accentIcon: "bg-cyan-500/15 text-cyan-400 ring-cyan-500/30", accentPill: "bg-cyan-500/15 text-cyan-300", accentGlow: "hover:shadow-cyan-500/20", pillLabel: "قرآن" },
  { path: "/hadiths", title: "الأحاديث النبوية", desc: "بحث وتحقق من صحة الأحاديث.", icon: "books", accentBar: "bg-gradient-to-r from-violet-400 to-violet-600", accentIcon: "bg-violet-500/15 text-violet-400 ring-violet-500/30", accentPill: "bg-violet-500/15 text-violet-300", accentGlow: "hover:shadow-violet-500/20", pillLabel: "حديث" },
  { path: "/lectures", title: "محاضرات إسلامية", desc: "محاضرات مرئية وصوتية للعلماء.", icon: "videos", accentBar: "bg-gradient-to-r from-amber-400 to-amber-600", accentIcon: "bg-amber-500/15 text-amber-400 ring-amber-500/30", accentPill: "bg-amber-500/15 text-amber-300", accentGlow: "hover:shadow-amber-500/20", pillLabel: "فيديو" },
  { path: "/books-shop", title: "تسوق الكتب", desc: "مكتبة واسعة للشراء والتحميل.", icon: "books", accentBar: "bg-gradient-to-r from-rose-400 to-rose-600", accentIcon: "bg-rose-500/15 text-rose-400 ring-rose-500/30", accentPill: "bg-rose-500/15 text-rose-300", accentGlow: "hover:shadow-rose-500/20", pillLabel: "كتب" },
  { path: "/sera-nabi", title: "السيرة النبوية", desc: "كتب السيرة وروابط قراءة مباشرة.", icon: "articles", accentBar: "bg-gradient-to-r from-sky-400 to-sky-600", accentIcon: "bg-sky-500/15 text-sky-400 ring-sky-500/30", accentPill: "bg-sky-500/15 text-sky-300", accentGlow: "hover:shadow-sky-500/20", pillLabel: "سيرة" },
  { path: "/Nakshabanii", title: "ابتهالات النقشبندي", desc: "استمع لأجمل الابتهالات بجودة عالية.", icon: "audios", accentBar: "bg-gradient-to-r from-teal-400 to-teal-600", accentIcon: "bg-teal-500/15 text-teal-400 ring-teal-500/30", accentPill: "bg-teal-500/15 text-teal-300", accentGlow: "hover:shadow-teal-500/20", pillLabel: "صوت" },
  { path: "/profile", title: "الملف الشخصي", desc: "إدارة بياناتك وصورتك الشخصية.", icon: "favorites", accentBar: "bg-gradient-to-r from-indigo-400 to-indigo-600", accentIcon: "bg-indigo-500/15 text-indigo-400 ring-indigo-500/30", accentPill: "bg-indigo-500/15 text-indigo-300", accentGlow: "hover:shadow-indigo-500/20", pillLabel: "ملف" },
];

const platformFeatures = [
  { icon: "shield", title: "محتوى موثوق", desc: "مصادر من الأزهر والدرر السنية فقط" },
  { icon: "bolt", title: "بحث ذكي وسريع", desc: "أدوات بحث متقدمة للوصول الفوري" },
  { icon: "check", title: "تحقق من الأحاديث", desc: "خدمة AI للتحقق من صحة الأحاديث" },
  { icon: "sparkles", title: "مجاني بالكامل", desc: "وصول حر لجميع المحتويات بلا رسوم" },
  { icon: "doc", title: "مكتبة شاملة", desc: "كتب ومقالات ومحاضرات في مكان واحد" },
  { icon: "heart", title: "بيئة آمنة", desc: "محتوى مناسب لجميع الأعمار" },
];

const platformInfo = [
  { num: "01", title: "رسالة المنصة", colorClass: "text-emerald-400", bgClass: "bg-emerald-500/10", borderClass: "border-emerald-500/25", dotClass: "bg-emerald-400", lines: ["محتوى ديني موثوق وآمن لجميع الأعمار.", "هدفنا تسهيل الوصول إلى مصادر موثوقة.", "دليلك اليومي لفهم الدين بطريقة مبسطة."] },
  { num: "02", title: "ميزات المنصة", colorClass: "text-cyan-400", bgClass: "bg-cyan-500/10", borderClass: "border-cyan-500/25", dotClass: "bg-cyan-400", lines: ["تصحيح الأحاديث والاطلاع على مصادر موثوقة.", "متابعة الدروس والمحاضرات الدينية."] },
  { num: "03", title: "حماية وبحث ذكي", colorClass: "text-violet-400", bgClass: "bg-violet-500/10", borderClass: "border-violet-500/25", dotClass: "bg-violet-400", lines: ["حماية المحتوى ومنع النسخ غير المصرح.", "أدوات بحث ذكية للوصول السريع."] },
  { num: "04", title: "تشجيع المستخدم", colorClass: "text-amber-400", bgClass: "bg-amber-500/10", borderClass: "border-amber-500/25", dotClass: "bg-amber-400", lines: ["اكتشف محتوى ديني موثوق بطريقة سهلة.", "ابدأ رحلتك في التعلم الإسلامي بثقة."] },
  { num: "05", title: "رحلة علمية آمنة", colorClass: "text-rose-400", bgClass: "bg-rose-500/10", borderClass: "border-rose-500/25", dotClass: "bg-rose-400", lines: ["العلم الشرعي أصبح بين يديك.", "بطريقة آمنة ومبسطة تناسب الجميع."] },
];

const cinematicItems = [
  { src: "/images/09bcd3a39ca0ee40e2f9b69992d10591.jpg", title: "رسالة أمل", label: "تأمل", line: "مهما أذنبت لا تستسلم لشيطانك — جاهد وادعُ ربك ولا تنسَ أن رحمته وسعت كل شيء.", verse: "قُلْ يَا عِبَادِيَ الَّذِينَ أَسْرَفُوا عَلَى أَنفُسِهِمْ لَا تَقْنَطُوا مِن رَّحْمَةِ اللَّهِ", ref: "[الزمر: 53]" },
  { src: "/images/0b4a52d860c5725c12911c4a4214aaeb.jpg", title: "العودة إلى الله", label: "توبة", line: "مهما ضاع منك وقتك أو غلبتك الوساوس، ارجع لربك بكل قلبك.", verse: "قُلْ رَبِّ أَعُوذُ بِكَ مِنْ هَمَزَاتِ الشَّيَاطِينِ", ref: "[المؤمنون: 97]" },
  { src: "/images/4a0ed22888a03d79c86a6cc10c79ffbf.jpg", title: "سعة الرحمة", label: "رجاء", line: "لو شعرت بالذنب أو الضعف، تذكّر أن رحمة الله وسعت كل شيء — لا تيأس من التوبة.", verse: "وَأَنِيبُوا إِلَى رَبِّكُمْ وَأَسْلِمُوا لَهُ", ref: "[الزمر: 54]" },
  { src: "/images/4dedfab3b5c66b611b53a68cf03f9402.jpg", title: "التوبة الصادقة", label: "مغفرة", line: "مهما كبرت خطاياك، الله يغفر لمن تاب ورجع بإخلاص.", verse: "إِنَّ اللَّهَ يُحِبُّ التَّوَّابِينَ وَيُحِبُّ الْمُتَطَهِّرِينَ", ref: "[البقرة: 222]" },
  { src: "/images/547d7e1692a13b33b47fb7a721177f84.jpg", title: "ثبات على الطريق", label: "صبر", line: "لا تترك اليأس يسيطر عليك، واصل الطاعة مهما كانت الظروف صعبة.", verse: "فَاسْتَغْفِرُوا رَبَّكُمْ ثُمَّ تُوبُوا إِلَيْهِ", ref: "[هود: 90]" },
  { src: "/images/b7d3a71c95cd316d03544e5e1ced1380.jpg", title: "يوم جديد", label: "أمل", line: "كل يوم فرصة جديدة للتقرب من الله، فلا تحرم قلبك من الطمأنينة.", verse: "لَا تَقْنَطُوا مِن رَّحْمَةِ اللَّهِ", ref: "[الزمر: 53]" },
];

const getSectionIcon = (blockName: string) => {
  const cls = "w-6 h-6";
  switch (blockName) {
    case "quran": return <BookOpenIcon className={cls} />;
    case "videos": return <VideoCameraIcon className={cls} />;
    case "books": return <DocumentTextIcon className={cls} />;
    case "articles": return <DocumentTextIcon className={cls} />;
    case "audios": return <SpeakerWaveIcon className={cls} />;
    case "fatwa": return <ScaleIcon className={cls} />;
    case "favorites": return <HeartIcon className={cls} />;
    case "poster": return <RectangleStackIcon className={cls} />;
    case "apps": return <DevicePhoneMobileIcon className={cls} />;
    case "khotab": return <MicrophoneIcon className={cls} />;
    case "showall": return <SparklesIcon className={cls} />;
    default: return <FilmIcon className={cls} />;
  }
};

const getFeatureIcon = (icon: string) => {
  const cls = "w-5 h-5";
  switch (icon) {
    case "shield": return <ShieldCheckIcon className={cls} />;
    case "bolt": return <BoltIcon className={cls} />;
    case "check": return <CheckCircleIcon className={cls} />;
    case "sparkles": return <SparklesIcon className={cls} />;
    case "doc": return <DocumentTextIcon className={cls} />;
    case "heart": return <HeartIcon className={cls} />;
    default: return <SparklesIcon className={cls} />;
  }
};

function SectionHeader({ title, badge, sub }: { title: string; badge?: string; sub?: string }) {
  return (
    <div className="mb-4">
      {badge && (
        <span className="inline-block text-xs font-semibold uppercase tracking-widest text-emerald-400 bg-emerald-500/10 border border-emerald-500/20 px-3 py-1 rounded-full mb-2">
          {badge}
        </span>
      )}
      <div className="flex items-center gap-4">
        <h2 className="text-xl md:text-2xl font-extrabold text-white shrink-0">{title}</h2>
        <div className="flex-1 h-px bg-gradient-to-r from-emerald-500/40 via-emerald-400/10 to-transparent" />
      </div>
      {sub && <p className="text-xs text-slate-400 mt-1">{sub}</p>}
    </div>
  );
}

export default function Home() {
  const { isOpen, sections, loading, refreshSections } = useSidebar();
  const sortedSections = useMemo(
    () => [...sections].sort((a, b) => (a.block_name || "").localeCompare(b.block_name || "")),
    [sections]
  );

  return (
    <>
      <Sidebar />
      <div className={`min-h-screen transition-all duration-500 ${isOpen ? "md:ml-64 ml-0" : "ml-0"} pt-20 md:pt-4`}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8 pb-10">

          {/* HERO */}
          <section className="relative text-center py-3">
            <div className="pointer-events-none absolute inset-0 -z-10">
              <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[400px] h-[200px] bg-emerald-500/10 rounded-full blur-3xl animate-pulse" />
            </div>

            <div className="inline-flex items-center gap-2 bg-white/5 border border-white/10 rounded-full px-4 py-1.5 text-sm text-slate-300 mb-3">
              <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
              أهلاً بك في منصة الإسلام الشاملة
            </div>

            <h1 className="text-3xl md:text-4xl lg:text-5xl font-extrabold leading-tight text-transparent bg-clip-text bg-gradient-to-r from-emerald-300 via-white to-emerald-400 mb-2">
              منصة الإسلام الشاملة
            </h1>
            <p className="text-sm md:text-base text-slate-400 max-w-xl mx-auto mb-4">
              استكشف مكتبة غنية من المحتوى الإسلامي الموثوق — قرآن، أحاديث، محاضرات، وكتب.
            </p>

            <div className="inline-flex flex-wrap items-center justify-center gap-5 md:gap-8 bg-white/[0.03] border border-white/8 rounded-2xl px-6 py-3 backdrop-blur-sm">
              {[{ num: "٨", label: "أقسام رئيسية" }, { num: "+١٠٠", label: "كتاب ومقال" }, { num: "٢٤/٧", label: "وصول مجاني" }, { num: "AI", label: "تحقق ذكي" }].map((s) => (
                <div key={s.label} className="flex flex-col items-center gap-0.5">
                  <span className="text-lg md:text-xl font-extrabold text-emerald-400">{s.num}</span>
                  <span className="text-[11px] text-slate-400">{s.label}</span>
                </div>
              ))}
            </div>
          </section>

          {/* NAVIGATION CARDS */}
          <section>
            <div className="flex items-start justify-between gap-4 mb-4">
              <SectionHeader title="أقسام المنصة" badge="استكشف" sub="اختر القسم الذي تريد البدء منه" />
              <button
                onClick={refreshSections}
                className="flex items-center gap-2 px-3 py-1.5 text-xs text-emerald-300 bg-emerald-500/10 border border-emerald-500/20 rounded-xl hover:bg-emerald-500/20 transition-all shrink-0 mt-1"
              >
                <ArrowPathIcon className="w-3.5 h-3.5" />
                تحديث
              </button>
            </div>

            {loading ? (
              <Loader />
            ) : (
              <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
                {promoCards.map((card) => (
                  <a
                    key={card.path}
                    href={card.path}
                    className={`group relative flex flex-col rounded-2xl bg-[#0d1117] border border-white/8 overflow-hidden hover:border-white/15 transition-all duration-300 hover:shadow-xl ${card.accentGlow} hover:-translate-y-1`}
                  >
                    <div className={`h-[3px] w-full ${card.accentBar}`} />
                    <div className="flex flex-col gap-3 p-5 flex-1">
                      <div className="flex items-start justify-between">
                        <div className={`w-10 h-10 rounded-xl ${card.accentIcon} flex items-center justify-center ring-1`}>
                          {getSectionIcon(card.icon)}
                        </div>
                        <span className={`text-[10px] font-semibold uppercase tracking-wide px-2.5 py-1 rounded-full ${card.accentPill}`}>
                          {card.pillLabel}
                        </span>
                      </div>
                      <div className="flex-1">
                        <h3 className="text-sm font-bold text-white mb-1 group-hover:text-emerald-200 transition-colors">{card.title}</h3>
                        <p className="text-xs text-slate-400 leading-relaxed">{card.desc}</p>
                      </div>
                      <div className="flex items-center gap-1.5 text-xs font-medium text-slate-500 group-hover:text-emerald-300 transition-colors">
                        <span>افتح القسم</span>
                        <ArrowRightIcon className="w-3 h-3 group-hover:translate-x-0.5 transition-transform" />
                      </div>
                    </div>
                    <div className="pointer-events-none absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300 bg-gradient-to-br from-white/3 to-transparent" />
                  </a>
                ))}
              </div>
            )}
          </section>

          {/* PLATFORM FEATURES */}
          <section>
            <SectionHeader title="لماذا منصتنا؟" badge="الميزات" sub="ما يميزنا عن غيرنا من المنصات الإسلامية" />
            <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
              {platformFeatures.map((f, i) => (
                <div key={i} className="flex items-start gap-4 p-5 rounded-2xl bg-white/[0.03] border border-white/8 hover:border-emerald-500/25 hover:bg-white/5 transition-all duration-200 group">
                  <div className="w-10 h-10 shrink-0 rounded-xl bg-emerald-500/15 flex items-center justify-center text-emerald-400 ring-1 ring-emerald-500/25 group-hover:bg-emerald-500/25 transition-colors">
                    {getFeatureIcon(f.icon)}
                  </div>
                  <div>
                    <h4 className="font-semibold text-white text-sm mb-0.5">{f.title}</h4>
                    <p className="text-xs text-slate-400 leading-relaxed">{f.desc}</p>
                  </div>
                </div>
              ))}
            </div>
          </section>

          {/* PLATFORM INFO */}
          <section>
            <SectionHeader title="لمحة عن المنصة" badge="تعرف علينا" />
            <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5">
              {platformInfo.map((info) => (
                <CardContainer key={info.num} className="w-full">
                  <CardBody className={`relative h-full rounded-2xl bg-[#0d1117] border ${info.borderClass} overflow-hidden p-5 flex flex-col gap-3`}>
                    <CardItem translateZ={40}>
                      <div className={`inline-flex items-center justify-center w-10 h-10 rounded-xl ${info.bgClass} ${info.colorClass} font-extrabold text-base border ${info.borderClass}`}>
                        {info.num}
                      </div>
                    </CardItem>
                    <CardItem translateZ={50}>
                      <h4 className={`text-sm font-bold ${info.colorClass}`}>{info.title}</h4>
                    </CardItem>
                    <div className="flex flex-col gap-2 flex-1">
                      {info.lines.map((line, i) => (
                        <CardItem key={i} translateZ={35} className="block">
                          <p className="text-xs text-slate-400 leading-relaxed flex items-start gap-2">
                            <span className={`mt-1.5 w-1.5 h-1.5 rounded-full shrink-0 ${info.dotClass}`} />
                            {line}
                          </p>
                        </CardItem>
                      ))}
                    </div>
                    <div className={`absolute bottom-0 left-0 right-0 h-[2px] ${info.bgClass}`} />
                  </CardBody>
                </CardContainer>
              ))}
            </div>
          </section>

          {/* CINEMATIC / INSPIRATION */}
          <section>
            <SectionHeader title="استعن بالله" badge="إلهام" sub="آيات وكلمات تعينك على مسيرتك" />
            <div className="grid gap-6 lg:grid-cols-2 xl:grid-cols-3">
              {cinematicItems.map((item, idx) => (
                <CardContainer key={item.src} className="w-full">
                  <CardBody className="relative overflow-hidden rounded-2xl border border-white/8 shadow-xl group transition-all duration-500 hover:border-emerald-400/25">
                    <CardItem translateZ={30}>
                      <div
                        className="aspect-[16/9] bg-cover bg-center transition-transform duration-700 group-hover:scale-[1.04]"
                        style={{ backgroundImage: `url(${item.src})` }}
                        role="img"
                        aria-label={item.title}
                      />
                    </CardItem>
                    <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/50 to-transparent pointer-events-none" />
                    <div className="absolute top-4 right-4">
                      <span className="text-[10px] font-bold uppercase tracking-widest text-emerald-200 bg-black/50 border border-emerald-500/30 px-2.5 py-1 rounded-full backdrop-blur-sm">
                        {item.label}
                      </span>
                    </div>
                    <div className="absolute top-4 left-4">
                      <span className="text-xs font-bold text-white/30">{String(idx + 1).padStart(2, "0")}</span>
                    </div>
                    <div className="absolute inset-x-0 bottom-0 p-5 space-y-2.5">
                      <CardItem translateZ={50}>
                        <h3 className="text-base font-bold text-white">{item.title}</h3>
                      </CardItem>
                      <CardItem translateZ={55}>
                        <p className="text-sm text-slate-200 leading-relaxed">{item.line}</p>
                      </CardItem>
                      <CardItem translateZ={45}>
                        <div className="flex items-start gap-2 bg-white/8 border border-white/10 rounded-xl p-3 backdrop-blur-sm">
                          <span className="text-emerald-400 text-lg leading-none mt-0.5">"</span>
                          <div>
                            <p className="text-xs text-emerald-100 leading-relaxed">{item.verse}</p>
                            <p className="text-[10px] text-emerald-400/60 mt-1">{item.ref}</p>
                          </div>
                        </div>
                      </CardItem>
                    </div>
                    <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none">
                      <div className="absolute inset-3 rounded-2xl border border-emerald-400/20" />
                    </div>
                  </CardBody>
                </CardContainer>
              ))}
            </div>
          </section>

        </div>
      </div>
    </>
  );
}
