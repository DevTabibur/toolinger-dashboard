"use client";
import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { translations } from './translations';

type LanguageCode = 'en' | 'bn' | 'es';

interface LanguageContextType {
    language: LanguageCode;
    setLanguage: (lang: LanguageCode) => void;
    t: (key: string) => string;
}

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

export const LanguageProvider = ({ children }: { children: ReactNode }) => {
    // Default to 'en' or try to get from localStorage if needed (skipping localStorage logic for simplicity/avoiding hydration mismatch unless necessary)
    // Actually, storing in localStorage is good UX.
    const [language, setLanguageState] = useState<LanguageCode>('en');

    useEffect(() => {
        const storedLang = localStorage.getItem('toolinger_lang') as LanguageCode;
        if (storedLang && ['en', 'bn', 'es'].includes(storedLang)) {
            setLanguageState(storedLang);
        }
    }, []);

    const setLanguage = (lang: LanguageCode) => {
        setLanguageState(lang);
        localStorage.setItem('toolinger_lang', lang);
    };

    const t = (key: string): string => {
        const langDict = translations[language];
        return langDict?.[key] || key;
    };

    return (
        <LanguageContext.Provider value={{ language, setLanguage, t }}>
            {children}
        </LanguageContext.Provider>
    );
};

export const useLanguage = () => {
    const context = useContext(LanguageContext);
    if (!context) {
        throw new Error('useLanguage must be used within a LanguageProvider');
    }
    return context;
};
