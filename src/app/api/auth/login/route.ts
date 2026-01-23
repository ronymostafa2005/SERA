import { NextResponse } from "next/server";
import { cookies } from "next/headers";

const MAX_AGE = 60 * 60 * 24 * 60; // 60 days

function getUsersFromCookie(cookieStore: Awaited<ReturnType<typeof cookies>>) {
  const raw = cookieStore.get("users")?.value;
  if (!raw) return [];
  try {
    return JSON.parse(raw) as Array<any>;
  } catch {
    return [];
  }
}

export async function POST(req: Request) {
  try {
    const formData = await req.formData();
    const email = (formData.get("email") as string)?.toLowerCase() || "";
    const password = (formData.get("password") as string) || "";

    if (!email || !password) {
      return NextResponse.json({ error: "Email and password are required" }, { status: 400 });
    }

    const cookieStore = await cookies();
    const users = getUsersFromCookie(cookieStore);
    const user = users.find((u) => u.email === email && u.password === password);

    if (!user) {
      return NextResponse.json({ error: "Invalid credentials" }, { status: 401 });
    }

    const safeUser = { ...user };
    delete (safeUser as any).password;

    cookieStore.set("user", JSON.stringify(safeUser), {
      httpOnly: true,
      secure: true,
      sameSite: "strict",
      path: "/",
      maxAge: MAX_AGE,
    });

    return NextResponse.json({ message: "Login successful", user: safeUser });
  } catch (error) {
    console.error(error);
    return NextResponse.json({ error: "Server error" }, { status: 500 });
  }
}

