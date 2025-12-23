// Types for Hadiths page

export type Hadith = {
    // Hadith list item
    list: {
        id: string;
        title: string;
        translations: string[];
    };
    // Hadith details
    details: {
        id: string;
        title: string;
        hadeeth: string;
        attribution: string;
        grade: string;
        explanation: string;
        hints: string[];
        hadeeth_ar: string;
        explanation_ar: string;
    };
    // Language
    language: {
        code: string;
        native: string;
    };
    // Category
    category: {
        id: string;
        title: string;
        hadeeths_count: string;
        parent_id: string | null;
    };
}

