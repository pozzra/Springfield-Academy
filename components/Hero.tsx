import React from 'react';
import { useTranslation } from '../context/LanguageContext';

interface HeroProps {
  onCTAClick: () => void;
}

const Hero: React.FC<HeroProps> = ({ onCTAClick }) => {
  const { t } = useTranslation();
  return (
    <section className="relative h-screen flex items-center justify-center text-white">
      <div className="absolute inset-0 bg-black opacity-50 dark:opacity-60"></div>
      <img src="https://picsum.photos/1920/1080?grayscale&blur=2" alt="School Campus" className="absolute inset-0 w-full h-full object-cover" />
      <div className="relative z-10 text-center px-4">
        <h2 className="text-5xl md:text-7xl font-extrabold mb-4 leading-tight drop-shadow-lg">
          {t('hero.title')}
        </h2>
        <p className="text-xl md:text-2xl mb-8 max-w-3xl mx-auto drop-shadow-md">
          {t('hero.subtitle')}
        </p>
        <button
          onClick={onCTAClick}
          className="bg-blue-600 text-white font-bold py-3 px-8 rounded-full text-lg hover:bg-blue-700 transition-transform transform hover:scale-105 shadow-xl dark:bg-blue-500 dark:hover:bg-blue-600"
        >
          {t('hero.cta')}
        </button>
      </div>
    </section>
  );
};

export default Hero;