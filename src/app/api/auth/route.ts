import { NextResponse } from "next/server";

type AuthUser = {
  name: string;
  email: string;
  avatar: string;
  paymentStatus: "pending" | "paid";
  paymentUrl: string;
};

// جلب بيانات المستخدم: نطلب إرسالها عبر POST
export async function GET() {
  return NextResponse.json(
    { message: "استخدم POST لإرسال بيانات المستخدم (name, email, avatar)" },
    {
      status: 400,
      headers: {
        "Access-Control-Allow-Origin": "*",
        "Access-Control-Allow-Methods": "GET, POST",
      },
    }
  );
}

// تسجيل (اختباري) مع إرجاع بيانات المستخدم + رابط الدفع
export async function POST(req: Request) {
  try {
    const body = await req.json();
    if (!body?.name || !body?.email) {
      return NextResponse.json(
        { error: "الاسم والبريد الإلكتروني مطلوبان" },
        {
          status: 400,
          headers: {
            "Access-Control-Allow-Origin": "*",
            "Access-Control-Allow-Methods": "GET, POST",
          },
        }
      );
    }

    const user: AuthUser = {
      name: body.name,
      email: body.email,
      avatar: body?.avatar || "/default-avatar.png",
      paymentStatus: "pending",
      paymentUrl: "/books-shop/checkout",
    };

    return NextResponse.json(
      { user, message: "تم التسجيل بنجاح" },
      {
        status: 201,
        headers: {
          "Access-Control-Allow-Origin": "*",
          "Access-Control-Allow-Methods": "GET, POST",
        },
      }
    );
  } catch (error) {
    console.error("Auth endpoint error:", error);
    return NextResponse.json(
      { error: "فشل معالجة الطلب" },
      {
        status: 500,
        headers: {
          "Access-Control-Allow-Origin": "*",
          "Access-Control-Allow-Methods": "GET, POST",
        },
      }
    );
  }
}

