import { NextResponse } from "next/server";

type Book = {
  title: string;
  image: string;
  book_url: string;
};

const cover = "/Books/cover.jpg"; 
const cover2 ="/Books/cover2.jpg"; 
const coverSiraAkram ="/Books/cover-akram-sira.svg";
const coverShamailAkram ="/Books/cover-akram-shamail.svg";
const books: Book[] = [
 
  {
    title: "السيرة النبوية (د: اكرم ضياء العمري )",
    image: coverSiraAkram,
    book_url: "/Books/السيرة_النبوية_الصحيحة.pdf",
  },
  {
    title: "الشمائل المحمدية (د: اكرم ضياء العمري)",
    image: coverShamailAkram,
    book_url: "/Books/كتاب_الشمائل_المحمدية.pdf",
  },
  {
    title: " السيرة النبوية لابن هشام ",
    image: cover,
    book_url: "/Books/alsyra_alnubawia.pdf",
  },
  {
    title: "السيرة النبوية لابن كثير - الجزء الثالث",
    image: cover2,
    book_url: "/Books/Noor-Book.com  السيرة النبوية لابن كثير 3 .pdf",
  },
  {
    title: "السيرة النبوية لابن كثير - الجزء الرابع",
    image: cover2,
    book_url: "/Books/ابن كثير جزء4.pdf",
  },
  {
    title: "الرحيق المختوم",
    image: cover,
    book_url: "/Books/Khizanat-lkotob.com  كتاب لرحيق  المختوم pdf.pdf",
  },

];
//========= to fetch the data from the API ================
export async function GET() {
  return NextResponse.json(
    { data: books },
    {
      status: 200,
      headers: {
        "Access-Control-Allow-Origin": "*",
        "Access-Control-Allow-Methods": "GET",
      },
    }
  );
}

