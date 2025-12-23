// src/App.tsx

import { BrowserRouter } from "react-router-dom";
import { useState, useEffect } from "react";
import Routes from "./routes/Routes";
import Loader from "./Components/Loader/Loader";
import { LoadingProvider, useLoading } from "./Context/LoadingContext";
import { SidebarProvider } from "./Context/SidebarContext";
import backgroundImage from "./assets/moon-light-shine-through-window-into-islamic-mosque-interior.jpg";

function AppContent() {
  const [initialLoading, setInitialLoading] = useState(true);
  const { isLoading } = useLoading();

  useEffect(() => {
    // محاكاة تحميل الموقع الأولي
    const timer = setTimeout(() => {
      setInitialLoading(false);
    }, 2000);
    return () => clearTimeout(timer);
  }, []);

  return (
    <>
      <div
        className="fixed inset-0 -z-10"
        style={{
          backgroundImage: `url(${backgroundImage})`,
          backgroundSize: "cover",
          backgroundPosition: "center center",
          backgroundAttachment: "fixed",
          backgroundRepeat: "no-repeat",
        }}
      >
        {/* طبقة تظليل لضمان وضوح النص */}
        <div className="absolute inset-0 bg-gradient-to-br from-black/60 via-black/40 to-black/60"></div>
      </div>
      {(initialLoading || isLoading) && <Loader />}
      <Routes />
    </>
  );
}

function App() {
  return (
    <BrowserRouter>
      <LoadingProvider>
        <SidebarProvider>
          <AppContent />
        </SidebarProvider>
      </LoadingProvider>
    </BrowserRouter>
  );
}

export default App;
