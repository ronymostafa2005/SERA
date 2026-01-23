import { NextResponse } from "next/server";
import { cookies } from "next/headers";

// OTP valid for 10 minutes
const OTP_TTL = 60 * 10;

function setOtpCookie(cookieStore: Awaited<ReturnType<typeof cookies>>, payload: any) {
  cookieStore.set("otp", JSON.stringify(payload), {
    httpOnly: true,
    secure: true,
    sameSite: "strict",
    path: "/",
    maxAge: OTP_TTL,
  });
}

export async function POST(req: Request) {
  try {
    const formData = await req.formData();
    const email = (formData.get("email") as string)?.toLowerCase() || "";
    if (!email) {
      return NextResponse.json({ error: "Email is required" }, { status: 400 });
    }

    const code = Math.floor(100000 + Math.random() * 900000).toString();
    const expiresAt = Date.now() + OTP_TTL * 1000;

    const cookieStore = await cookies();
    setOtpCookie(cookieStore, { email, code, expiresAt });

    // NOTE: In production, send the code via email/SMS. We return it here for testing only.
    return NextResponse.json({ message: "OTP generated", code });
  } catch (error) {
    console.error(error);
    return NextResponse.json({ error: "Server error" }, { status: 500 });
  }
}

