import { NextResponse } from "next/server";

type Book = {
  title: string;
  image: string;
  book_url: string;
};

const cover = "/Books/cover.jpg"; 
const cover2 ="/Books/cover2.jpg"; 

const books: Book[] = [
  {
    title: "السيرة النبوية لابن هشام - الجزء الأول",
    image: cover,
    book_url: "/Books/%D8%A7%D9%84%D8%B3%D9%8A%D8%B1%D8%A9%20%D8%A7%D9%84%D9%86%D8%A8%D9%88%D9%8A%D8%A9%20%D9%84%D8%A7%D8%A8%D9%86%20%D9%87%D8%B4%D8%A7%D9%85%20%D8%AC1%20pdf%20(arab-books.com).pdf",
  },
  {
    title: "السيرة النبوية لابن هشام - الجزء الثاني",
    image: cover,
    book_url: "/Books/%D8%A7%D9%84%D8%B3%D9%8A%D8%B1%D8%A9%20%D8%A7%D9%84%D9%86%D8%A8%D9%88%D9%8A%D8%A9%20%D9%84%D8%A7%D8%A8%D9%86%20%D9%87%D8%B4%D8%A7%D9%85%20%D8%AC2%20pdf%20(arab-books.com).pdf",
  },
  {
    title: "السيرة النبوية لابن هشام - الجزء الثالث",
    image: cover,
    book_url: "/Books/%D8%A7%D9%84%D8%B3%D9%8A%D8%B1%D8%A9%20%D8%A7%D9%84%D9%86%D8%A8%D9%88%D9%8A%D8%A9%20%D9%84%D8%A7%D8%A8%D9%86%20%D9%87%D8%B4%D8%A7%D9%85%20%D8%AC3%20pdf%20(arab-books.com).pdf",
  },
  {
    title: "كتاب الحوار في السيرة النبوية",
    image: cover2,
    book_url: "/Books/%D9%83%D8%AA%D8%A7%D8%A8%20%D8%A7%D9%84%D8%AD%D9%88%D8%A7%D8%B1%20%D9%81%D9%8A%20%D8%A7%D9%84%D8%B3%D9%8A%D8%B1%D8%A9%20%D8%A7%D9%84%D9%86%D8%A8%D9%88%D9%8A%D8%A9%20PDF%20(arab-books.com).pdf",
  },
  {
    title: "أربعة أجزاء في السيرة",
    image: cover,
    book_url: "/Books/04_94566-4part.pdf",
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

