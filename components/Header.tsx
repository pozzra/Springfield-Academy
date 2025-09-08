import React, { useState } from 'react';
import type { Section } from '../types';
import { SECTIONS } from '../constants';
import { useTranslation } from '../context/LanguageContext';
import { useTheme } from '../context/ThemeContext';

const LanguageSwitcher: React.FC = () => {
  const { locale, changeLanguage } = useTranslation();

  return (
    <div className="flex items-center space-x-2 text-sm font-semibold">
      <button 
        onClick={() => changeLanguage('en')} 
        className={`${locale === 'en' ? 'text-blue-600 dark:text-blue-400' : 'text-gray-500 hover:text-blue-600 dark:hover:text-blue-400'}`}
      >
        EN
      </button>
      <span className="text-gray-300 dark:text-gray-600">|</span>
      <button 
        onClick={() => changeLanguage('km')} 
        className={`${locale === 'km' ? 'text-blue-600 dark:text-blue-400' : 'text-gray-500 hover:text-blue-600 dark:hover:text-blue-400'}`}
      >
        KM
      </button>
    </div>
  );
};

const ThemeSwitcher: React.FC = () => {
  const { theme, toggleTheme } = useTheme();

  return (
    <button
      onClick={toggleTheme}
      className="text-gray-600 dark:text-gray-400 hover:text-blue-600 dark:hover:text-blue-400 focus:outline-none"
      aria-label="Toggle theme"
    >
      {theme === 'light' ? (
        <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20.354 15.354A9 9 0 018.646 3.646 9.003 9.003 0 0012 21a9.003 9.003 0 008.354-5.646z" />
        </svg>
      ) : (
        <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 3v1m0 16v1m9-9h-1M4 12H3m15.364 6.364l-.707-.707M6.343 6.343l-.707-.707m12.728 0l-.707.707M6.343 17.657l-.707.707M16 12a4 4 0 11-8 0 4 4 0 018 0z" />
        </svg>
      )}
    </button>
  );
};

interface HeaderProps {
  activeSection: Section;
  onNavClick: (section: Section) => void;
}

const Header: React.FC<HeaderProps> = ({ activeSection, onNavClick }) => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const { t } = useTranslation();

  return (
    <header className="bg-white/80 dark:bg-gray-800/80 backdrop-blur-md shadow-md sticky top-0 z-50">
      <div className="container mx-auto px-6 py-4 flex justify-between items-center">
        <div className="flex items-center space-x-2">
          <svg className="h-8 w-8 text-blue-600 dark:text-blue-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6.253v11.494m-9-5.747h18" />
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 21a9 9 0 110-18 9 9 0 010 18z" />
          </svg>
          <h1 className="text-2xl font-bold text-gray-800 dark:text-white">{t('header.title')}</h1>
        </div>
        <nav className="hidden md:flex items-center space-x-6 lg:space-x-8">
          {SECTIONS.map(({id}) => (
            <button
              key={id}
              onClick={() => onNavClick(id)}
              className={`text-lg font-medium transition-colors duration-300 relative ${
                activeSection === id ? 'text-blue-600 dark:text-blue-400' : 'text-gray-600 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400'
              }`}
            >
              {t(`nav.${id}`)}
              {activeSection === id && (
                <span className="absolute -bottom-1 left-1/2 -translate-x-1/2 w-2/3 h-0.5 bg-blue-600 dark:bg-blue-400 rounded-full"></span>
              )}
            </button>
          ))}
          <div className="flex items-center space-x-4 pl-4 border-l border-gray-200 dark:border-gray-600">
            <LanguageSwitcher />
            <ThemeSwitcher />
          </div>
        </nav>
        <div className="md:hidden flex items-center space-x-4">
          <ThemeSwitcher />
          <LanguageSwitcher />
          <button onClick={() => setIsMenuOpen(!isMenuOpen)} className="text-gray-600 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400 focus:outline-none">
            <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d={isMenuOpen ? "M6 18L18 6M6 6l12 12" : "M4 6h16M4 12h16m-7 6h7"} />
            </svg>
          </button>
        </div>
      </div>
      {/* Mobile Menu */}
      {isMenuOpen && (
        <div className="md:hidden bg-white dark:bg-gray-800 pb-4">
          <nav className="flex flex-col items-center space-y-4">
            {SECTIONS.map(({id}) => (
              <button
                key={id}
                onClick={() => {
                  onNavClick(id);
                  setIsMenuOpen(false);
                }}
                className={`text-lg font-medium ${
                  activeSection === id ? 'text-blue-600 dark:text-blue-400' : 'text-gray-600 dark:text-gray-300'
                }`}
              >
                {t(`nav.${id}`)}
              </button>
            ))}
          </nav>
        </div>
      )}
    </header>
  );
};

export default Header;
