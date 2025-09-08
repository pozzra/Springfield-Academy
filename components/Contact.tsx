import React from 'react';
import { useTranslation } from '../context/LanguageContext';

const Contact: React.FC = () => {
  const { t } = useTranslation();
  return (
    <section className="py-20 bg-white dark:bg-gray-900">
      <div className="container mx-auto px-6">
        <h2 className="text-4xl font-bold text-center mb-12 text-gray-800 dark:text-white">{t('contact.title')}</h2>
        <div className="grid lg:grid-cols-2 gap-12">
          <div className="bg-gray-50 dark:bg-gray-800 p-8 rounded-lg shadow-lg">
            <h3 className="text-2xl font-bold mb-6 dark:text-white">{t('contact.form.title')}</h3>
            <form>
              <div className="mb-4">
                <label htmlFor="name" className="block text-gray-700 dark:text-gray-300 font-medium mb-2">{t('contact.form.name.label')}</label>
                <input type="text" id="name" name="name" className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 bg-white dark:bg-gray-700 dark:text-white" placeholder={t('contact.form.name.placeholder')} />
              </div>
              <div className="mb-4">
                <label htmlFor="email" className="block text-gray-700 dark:text-gray-300 font-medium mb-2">{t('contact.form.email.label')}</label>
                <input type="email" id="email" name="email" className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 bg-white dark:bg-gray-700 dark:text-white" placeholder={t('contact.form.email.placeholder')} />
              </div>
              <div className="mb-4">
                <label htmlFor="message" className="block text-gray-700 dark:text-gray-300 font-medium mb-2">{t('contact.form.message.label')}</label>
                <textarea id="message" name="message" rows={5} className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 bg-white dark:bg-gray-700 dark:text-white" placeholder={t('contact.form.message.placeholder')}></textarea>
              </div>
              <button type="submit" className="w-full bg-blue-600 text-white font-bold py-3 px-6 rounded-lg hover:bg-blue-700 dark:bg-blue-500 dark:hover:bg-blue-600 transition-colors duration-300">
                {t('contact.form.submit')}
              </button>
            </form>
          </div>
          <div className="space-y-6">
            <h3 className="text-2xl font-bold dark:text-white">{t('contact.info.title')}</h3>
            <div className="flex items-start space-x-4">
              <div className="mt-1"><svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-blue-600 dark:text-blue-400" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" /><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" /></svg></div>
              <div>
                <h4 className="font-bold dark:text-white">{t('contact.info.address.title')}</h4>
                <p className="dark:text-gray-400">123 Education Lane, Springfield, IL 62704</p>
              </div>
            </div>
             <div className="flex items-start space-x-4">
              <div className="mt-1"><svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-blue-600 dark:text-blue-400" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" /></svg></div>
              <div>
                <h4 className="font-bold dark:text-white">{t('contact.info.phone.title')}</h4>
                <p className="dark:text-gray-400">(855) 695-243-14</p>
              </div>
            </div>
             <div className="flex items-start space-x-4">
              <div className="mt-1"><svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-blue-600 dark:text-blue-400" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" /></svg></div>
              <div>
                <h4 className="font-bold dark:text-white">{t('contact.info.email.title')}</h4>
                <p className="dark:text-gray-400">admissions@springfield.edu</p>
              </div>
            </div>
            <div className="h-64 w-full rounded-lg shadow-lg overflow-hidden mt-6">
                <img src="https://picsum.photos/seed/map/600/400" className="w-full h-full object-cover" alt={t('contact.info.mapAlt')}/>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Contact;