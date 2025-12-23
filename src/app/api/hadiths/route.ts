import { NextResponse } from "next/server";

export async function GET() {
  try {
    // يمكن استخدام API خارجي للأحاديث مثل hadeethenc.com
    // مثال: https://hadeethenc.com/api/v1/hadeeths/list/
    const response = await fetch("https://hadeethenc.com/api/v1/hadeeths/list/?language=ar&category_id=1&page=1&per_page=20", {
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
    console.error("Error fetching hadiths:", error);
    return NextResponse.json(
      { error: "Failed to fetch hadiths", data: [] },
      { status: 500 }
    );
  }
}

