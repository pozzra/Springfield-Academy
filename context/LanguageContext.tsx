import React, { createContext, useState, useEffect, useContext, ReactNode, useCallback } from 'react';

type Locale = 'en' | 'km';

interface LanguageContextType {
  locale: Locale;
  changeLanguage: (locale: Locale) => void;
  t: (key: string, replacements?: { [key: string]: string | number }) => string;
}

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

type Translations = {
  [key in Locale]?: { [key: string]: any };
};

export const LanguageProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [locale, setLocale] = useState<Locale>('en');
  const [translations, setTranslations] = useState<Translations>({});

  useEffect(() => {
    const fetchTranslations = async () => {
        try {
            const [enResponse, kmResponse] = await Promise.all([
                fetch('/locales/en.json'),
                fetch('/locales/km.json')
            ]);
            if (!enResponse.ok || !kmResponse.ok) {
                throw new Error('Failed to fetch translation files');
            }
            const enData = await enResponse.json();
            const kmData = await kmResponse.json();
            setTranslations({ en: enData, km: kmData });
        } catch (error) {
            console.error("Failed to load translation files:", error);
        }
    };
    fetchTranslations();
  }, []);

  const changeLanguage = (newLocale: Locale) => {
    setLocale(newLocale);
  };

  const t = useCallback((key: string, replacements?: { [key: string]: string | number }) => {
    const langTranslations = translations[locale];
    if (!langTranslations) {
        return key; // Return key if translations for the locale are not loaded yet
    }

    const keys = key.split('.');
    let result: any = langTranslations;
    
    for (const k of keys) {
      result = result?.[k];
      if (result === undefined) {
        return key; // Return the key itself if not found
      }
    }

    if (typeof result === 'string' && replacements) {
      Object.keys(replacements).forEach(placeholder => {
        result = result.replace(`{{${placeholder}}}`, String(replacements[placeholder]));
      });
    }

    return result || key;
  }, [locale, translations]);

  return (
    <LanguageContext.Provider value={{ locale, changeLanguage, t }}>
      {children}
    </LanguageContext.Provider>
  );
};

export const useTranslation = (): LanguageContextType => {
  const context = useContext(LanguageContext);
  if (!context) {
    throw new Error('useTranslation must be used within a LanguageProvider');
  }
  return context;
};
