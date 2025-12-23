 import { error } from "console";
import { NextResponse } from "next/server";
import { toast } from "react-toastify";

// =======================================
const cover = "/nakshabandii/nakshabandi.jpg";

const data  = [
  {
    title: "ابتهال ليلة القدر",
    image: cover,
    audio_url:
      "/nakshabandii/%D8%A3%D8%BA%D9%86%D9%8A%D8%A9%20%D8%B3%D9%8A%D8%AF%20%D8%A7%D9%84%D9%86%D9%82%D8%B4%D8%A8%D9%86%D8%AF%D9%8A%20-%20%D8%A7%D8%A8%D8%AA%D9%87%D8%A7%D9%84%20%D9%84%D9%8A%D9%84%D8%A9%20%D8%A7%D9%84%D9%82%D8%AF%D8%B1.mp3",
  },
  {
    title: "ابتهال نفسي يا رب",
    image: cover,
    audio_url:
      "/nakshabandii/%D8%A3%D8%BA%D9%86%D9%8A%D8%A9%20%D8%B3%D9%8A%D8%AF%20%D8%A7%D9%84%D9%86%D9%82%D8%B4%D8%A8%D9%86%D8%AF%D9%8A%20-%20%D8%A7%D8%A8%D8%AA%D9%87%D8%A7%D9%84%20%D9%86%D9%81%D8%B3%D9%89%20%D9%8A%D8%A7%20%D8%B1%D8%A8.mp3",
  },
  {
    title: "ابتهال يا مجيب السائلين",
    image: cover,
    audio_url:
      "/nakshabandii/%D8%A3%D8%BA%D9%86%D9%8A%D8%A9%20%D8%B3%D9%8A%D8%AF%20%D8%A7%D9%84%D9%86%D9%82%D8%B4%D8%A8%D9%86%D8%AF%D9%8A%20-%20%D8%A7%D8%A8%D8%AA%D9%87%D8%A7%D9%84%20%D9%8A%D8%A7%20%D9%85%D8%AC%D9%8A%D8%A8%20%D8%A7%D9%84%D8%B3%D8%A7%D8%A6%D9%84%D9%8A%D9%86.mp3",
  },
  {
    title: "النفس تشكو",
    image: cover,
    audio_url: "/nakshabandii/%D8%A3%D8%BA%D9%86%D9%8A%D8%A9%20%D8%B3%D9%8A%D8%AF%20%D8%A7%D9%84%D9%86%D9%82%D8%B4%D8%A8%D9%86%D8%AF%D9%8A%20-%20%D8%A7%D9%84%D9%86%D9%81%D8%B3%20%D8%AA%D8%B4%D9%83%D9%88.mp3",
  },
  {
    title: "رب هب لي هدى",
    image: cover,
    audio_url: "/nakshabandii/%D8%A3%D8%BA%D9%86%D9%8A%D8%A9%20%D8%B3%D9%8A%D8%AF%20%D8%A7%D9%84%D9%86%D9%82%D8%B4%D8%A8%D9%86%D8%AF%D9%8A%20-%20%D8%B1%D8%A8%20%D9%87%D8%A8%20%D9%84%D9%8A%20%D9%87%D8%AF%D9%89.mp3",
  },
  {
    title: "رمضانيات",
    image: cover,
    audio_url: "/nakshabandii/%D8%A3%D8%BA%D9%86%D9%8A%D8%A9%20%D8%B3%D9%8A%D8%AF%20%D8%A7%D9%84%D9%86%D9%82%D8%B4%D8%A8%D9%86%D8%AF%D9%8A%20-%20%D8%B1%D9%85%D8%B6%D8%A7%D9%86%D9%8A%D8%A7%D8%AA.mp3",
  },
  {
    title: "ماشي بنور الله",
    image: cover,
    audio_url: "/nakshabandii/%D8%A3%D8%BA%D9%86%D9%8A%D8%A9%20%D8%B3%D9%8A%D8%AF%20%D8%A7%D9%84%D9%86%D9%82%D8%B4%D8%A8%D9%86%D8%AF%D9%8A%20-%20%D9%85%D8%A7%D8%B4%D9%8A%20%D8%A8%D9%86%D9%88%D8%B1%20%D8%A7%D9%84%D9%84%D9%87.mp3",
  },
  {
    title: "مدح رسول الله",
    image: cover,
    audio_url: "/nakshabandii/%D8%A3%D8%BA%D9%86%D9%8A%D8%A9%20%D8%B3%D9%8A%D8%AF%20%D8%A7%D9%84%D9%86%D9%82%D8%B4%D8%A8%D9%86%D8%AF%D9%8A%20-%20%D9%85%D8%AF%D8%AD%20%D8%B1%D8%B3%D9%88%D9%84%20%D8%A7%D9%84%D9%84%D9%87.mp3",
  },
  {
    title: "مولاي إني ببابك",
    image: cover,
    audio_url: "/nakshabandii/%D8%A3%D8%BA%D9%86%D9%8A%D8%A9%20%D8%B3%D9%8A%D8%AF%20%D8%A7%D9%84%D9%86%D9%82%D8%B4%D8%A8%D9%86%D8%AF%D9%8A%20-%20%D9%85%D9%88%D9%84%D8%A7%D9%89%20%D8%A7%D9%86%D9%89%20%D8%A8%D8%A8%D8%A7%D8%A8%D9%83.mp3",
  },
] ; 

 // fetch ibtehalat from the API
export async function GET() {
  try {
  return NextResponse.json(
    { data },
    {
      status: 200,
      headers: {
        "Access-Control-Allow-Origin": "*",
        "Access-Control-Allow-Methods": "GET",
      },
    }
  );
} catch (error) {
    console.error("Error fetching ibtehalat:", error);
    toast.error("فشل جلب الإبتهالات");
    return NextResponse.json(
      { error: "فشل جلب الإبتهالات" },
      { status: 500,
        headers: {
            "Access-Control-Allow-Origin": "*",
            "Access-Control-Allow-Methods": "GET",
          },
      }
    );
  }
}


