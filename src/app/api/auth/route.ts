"use server";

import { NextResponse } from "next/server";
import { cookies } from "next/headers";
import cloudinary from "../../../utils/cloudinary";
import { Readable } from "stream";

const MAX_AGE = 60 * 60 * 24 * 60; // 60 days

// Helper to convert ArrayBuffer to Stream
function bufferToStream(buffer: Buffer) {
  const readable = new Readable();
  readable.push(buffer);
  readable.push(null);
  return readable;
}

function getUsersFromCookie(cookieStore: Awaited<ReturnType<typeof cookies>>) {
  const raw = cookieStore.get("users")?.value;
  if (!raw) return [];
  try {
    return JSON.parse(raw) as Array<any>;
  } catch {
    return [];
  }
}

function setUsersCookie(cookieStore: Awaited<ReturnType<typeof cookies>>, users: any[]) {
  cookieStore.set("users", JSON.stringify(users), {
    httpOnly: true,
    secure: true,
    sameSite: "strict",
    path: "/",
    maxAge: MAX_AGE,
  });
}

export async function POST(req: Request) {
  try {
    const formData = await req.formData();

    const name = (formData.get("name") as string) || "";
    const email = (formData.get("email") as string)?.toLowerCase() || "";
    const password = (formData.get("password") as string) || "";
    const avatar = formData.get("avatar") as File | null;

    if (!name || !email || !password) {
      return NextResponse.json({ error: "Name, email and password are required" }, { status: 400 });
    }

    let avatarUrl = "/default-avatar.png";
    const hasCloudinaryConfig =
      !!process.env.CLOUDINARY_CLOUD_NAME && !!process.env.CLOUDINARY_API_KEY && !!process.env.CLOUDINARY_API_SECRET;

    // upload image to Cloudinary (skip gracefully if not configured or upload fails)
    if (avatar && avatar.size > 0) {
      if (!hasCloudinaryConfig) {
        console.warn("Cloudinary env vars missing; skipping avatar upload and using default avatar");
      } else {
        try {
          const buffer = Buffer.from(await avatar.arrayBuffer());
          const uploadedUrl = (await new Promise((resolve, reject) => {
            const uploadStream = cloudinary.uploader.upload_stream(
              { folder: "avatars", public_id: `${Date.now()}-${avatar.name}` },
              (error, result) => {
                if (error) reject(error);
                else resolve(result?.secure_url ?? "");
              }
            );
            bufferToStream(buffer).pipe(uploadStream);
          })) as string;

          if (uploadedUrl) {
            avatarUrl = uploadedUrl;
          } else {
            console.warn("Cloudinary upload returned empty url; using default avatar");
          }
        } catch (uploadError) {
          console.error("Cloudinary upload failed; using default avatar", uploadError);
        }
      }
    }

    const user = {
      name,
      email,
      password,
      avatar: avatarUrl,
      paymentStatus: "pending",
    };

    const cookieStore = await cookies();
    const users = getUsersFromCookie(cookieStore);
    const exists = users.find((u) => u.email === email);
    if (exists) {
      return NextResponse.json({ error: "User already exists" }, { status: 409 });
    }
    users.push(user);
    setUsersCookie(cookieStore, users);

    // save logged-in user without password
    const safeUser = { ...user };
    delete (safeUser as any).password;
    cookieStore.set("user", JSON.stringify(safeUser), {
      httpOnly: true,
      secure: true,
      sameSite: "strict",
      path: "/",
      maxAge: MAX_AGE,
    });

    return NextResponse.json({
      message: "Signup successful",
      user: safeUser,
    });
  } catch (error) {
    console.error(error);
    return NextResponse.json({ error: "Server error" }, { status: 500 });
  }
}
