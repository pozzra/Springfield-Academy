import React from 'react';
import { useTranslation } from '../context/LanguageContext';

const Footer: React.FC = () => {
  const { t } = useTranslation();
  return (
    <footer className="bg-gray-800 text-white py-8 dark:bg-gray-900/50 dark:text-gray-300">
      <div className="container mx-auto px-6 text-center">
        <p>&copy; {new Date().getFullYear()} {t('footer.copyright')}</p>
        <div className="flex justify-center space-x-4 mt-4">
          <a href="#" className="hover:text-blue-400 transition-colors">Facebook</a>
          <a href="#" className="hover:text-blue-400 transition-colors">Twitter</a>
          <a href="#" className="hover:text-blue-400 transition-colors">Instagram</a>
        </div>
      </div>
    </footer>
  );
};

export default Footer;