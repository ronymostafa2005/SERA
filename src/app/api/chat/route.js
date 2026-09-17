
import { NextResponse } from "next/server";
// landing update

// System prompt لخبير الأحاديث النبوية
const HADITH_EXPERT_PROMPT = `أنت عالم متخصص في علوم الحديث النبوي الشريف، خبير في:

1. **علم الرجال والجرح والتعديل**: تعرف أحوال الرواة من حيث الثقة والضعف والجهالة.

2. **تخريج الأحاديث**: تستطيع تحديد مصادر الحديث في كتب السنة (البخاري، مسلم، الترمذي، أبو داود، النسائي، ابن ماجه، وغيرها).

3. **الحكم على الأحاديث**: تصنف الأحاديث إلى صحيح، حسن، ضعيف، موضوع مع ذكر العلل إن وجدت.

4. **شرح المتون**: تشرح معاني الأحاديث وفقه الحديث ومستنبطاته.

5. **كشف الأحاديث الموضوعة والضعيفة**: تنبه على الأحاديث المنتشرة التي لا أصل لها أو ضعيفة السند.

عند مراجعة أي حديث:
- اذكر نص الحديث كاملاً
- اذكر من خرّجه من أصحاب الكتب
- اذكر درجة الحديث (صحيح/حسن/ضعيف/موضوع)
- اذكر أقوال العلماء في تصحيحه أو تضعيفه
- إن كان ضعيفاً، اذكر علة الضعف
- إن وُجد حديث بديل صحيح في نفس المعنى، أشر إليه

كن دقيقاً وأميناً في النقل، ولا تجزم بصحة حديث إلا بدليل، وقل 'لا أعلم' إن لم تكن متأكداً.`;

// ==============================================
export async function POST(req) {
  try {
    const { message } = await req.json();

    if (!message || !message.trim()) {
      return NextResponse.json(
        { reply: "من فضلك اكتب نص الحديث أولاً." },
        { status: 400 }
      );
    }

    // 
    const geminiRes = await fetch(
      `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.5-flash:generateContent?key=${process.env.GEMINI_API_KEY}`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          systemInstruction: {
            parts: [{ text: HADITH_EXPERT_PROMPT }],
          },
          contents: [
            {
              role: "user",
              parts: [
                {
                  text: `قم بتحليل صحة الحديث التالي وبيان درجته وشرحه وذكر من خرّجه:\n\n${message.trim()}`,
                },
              ],
            },
          ],
        }),
      }
    );

    if (!geminiRes.ok) {
      const err = await geminiRes.json().catch(() => ({}));
      return NextResponse.json(
        {
          reply:
            err?.error?.message ||
            "تعذر الحصول على رد من نموذج الذكاء الاصطناعي.",
        },
        { status: geminiRes.status }
      );
    }

    const aiData = await geminiRes.json();
    const replyText =
      aiData?.candidates?.[0]?.content?.parts?.[0]?.text ||
      "لم يصل رد صالح من نموذج الذكاء الاصطناعي.";

    return NextResponse.json({ reply: replyText });
  } catch (error) {
    console.error("chat route error:", error);
    return NextResponse.json(
      { reply: "حدث خطأ داخلي. حاول مرة أخرى لاحقاً." },
      { status: 500 }
    );
  }
}