import { NextResponse } from "next/server";

type AuthUser = {
  name: string;
  email: string;
  avatar: string;
  paymentStatus: "pending" | "paid";
  paymentUrl: string;
};

export async function GET() {
  return NextResponse.json(
    { message: "Use POST to send user data (name, email, avatar)" },
    {
      status: 400,
      headers: {
        "Access-Control-Allow-Origin": "*",
        "Access-Control-Allow-Methods": "GET, POST",
      },
    }
  );
}

export async function POST(req: Request) {
  try {
    const body = await req.json();
    if (!body?.name || !body?.email) {
      return NextResponse.json(
        { error: "Name and email are required" },
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

