import type { Metadata } from "next";
import { LoadingProvider } from "../Context/LoadingContext";
import { SidebarProvider } from "../Context/SidebarContext";
import Loader from "../Components/Loader/Loader";
import BackgroundLayout from "../Components/Layout/BackgroundLayout";
import Footer from "../Components/Layout/Footer";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import "../app/globals.css";

export const metadata: Metadata = {
  title: "منصة الإسلام الشاملة",
  description: "استمع لتلاوات خاشعة، وتعرّف على قصص الأنبياء، وتصفّح مكتبة من المحتوى الإسلامي الموثوق",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ar" dir="rtl">
      <body>
        <LoadingProvider>
          <SidebarProvider>
            <BackgroundLayout />
            <Loader />
            {children}
            <ToastContainer position="top-center" rtl />
            <Footer />
          </SidebarProvider>
        </LoadingProvider>
      </body>
    </html>
  );
}

