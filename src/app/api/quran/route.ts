import { NextResponse } from "next/server";

export async function GET() {
  try {
    // يمكن استخدام API خارجي للقرآن مثل api.alquran.cloud
    // مثال: https://api.alquran.cloud/v1/quran/quran-uthmani
    const response = await fetch("https://api.alquran.cloud/v1/surah", {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        "Accept": "application/json",
      },
    });

    if (!response.ok) {
      throw new Error(`API responded with status: ${response.status}`);
    }

    const data = await response.json();
    
    return NextResponse.json(data, {
      status: 200,
      headers: {
        "Access-Control-Allow-Origin": "*",
        "Access-Control-Allow-Methods": "GET",
      },
    });
  } catch (error) {
    console.error("Error fetching quran:", error);
    return NextResponse.json(
      { error: "Failed to fetch quran", data: [] },
      { status: 500 }
    );
  }
}

