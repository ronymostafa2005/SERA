"use client";

import { createContext, useContext, useState, useCallback, useEffect } from "react";
import type { ReactNode } from "react";
import { toast } from "react-toastify";

type Section = {
  block_name: string;
  type: string;
  items_count: number;
  api_url: string;
};

interface SidebarContextType {
  isOpen: boolean;
  toggleSidebar: () => void;
  sections: Section[];
  loading: boolean;
  refreshSections: () => Promise<void>;
}

const SidebarContext = createContext<SidebarContextType | undefined>(undefined);

const API_URL ="https://api3.islamhouse.com/v3/paV29H2gm56kvLPy/main/sitecontent/ar/ar/json";

export function SidebarProvider({ children }: { children: ReactNode }) {
  const [isOpen, setIsOpen] = useState(true);
  const [sections, setSections] = useState<Section[]>([]);
  const [loading, setLoading] = useState(false);

  const toggleSidebar = useCallback(() => {
    setIsOpen((prev) => !prev);
  }, []);

  const refreshSections = useCallback(async () => {
    setLoading(true);
    try {
      const res = await fetch(API_URL);
      if (!res.ok) throw new Error(`Status ${res.status}`);
      const data: Section[] = await res.json();
      setSections(data);
    } catch (err) {
      console.error(err);
      toast.error("فشل تحميل الأقسام من الـ API");
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    refreshSections();
  }, [refreshSections]);

  return (
    <SidebarContext.Provider value={{ isOpen, toggleSidebar, sections, loading, refreshSections }}>
      {children}
    </SidebarContext.Provider>
  );
}

export function useSidebar() {
  const context = useContext(SidebarContext);
  if (context === undefined) {
    throw new Error("useSidebar must be used within a SidebarProvider");
  }
  return context;
}