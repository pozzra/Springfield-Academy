import React from 'react';
import { useTranslation } from '../context/LanguageContext';

const eventData = [
  { id: 'orientation', date: 'August 20, 2024' },
  { id: 'firstDayFall', date: 'August 22, 2024' },
  { id: 'openHouse', date: 'September 5, 2024' },
  { id: 'conferences', date: 'October 25, 2024' },
  { id: 'lastDayFall', date: 'December 20, 2024' },
  { id: 'firstDaySpring', date: 'January 6, 2025' },
];

const CalendarEvent: React.FC<{ date: string; title: string; description: string; isLast: boolean }> = ({ date, title, description, isLast }) => (
  <div className="flex">
    <div className="flex flex-col items-center mr-6">
      <div className="flex-shrink-0">
        <div className="flex items-center justify-center w-12 h-12 border-2 border-blue-600 dark:border-blue-400 rounded-full bg-white dark:bg-gray-800 text-blue-600 dark:text-blue-400">
          <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
          </svg>
        </div>
      </div>
      {!isLast && <div className="w-px h-full bg-gray-300 dark:bg-gray-600 mt-4"></div>}
    </div>
    <div className={`pb-12 ${!isLast ? 'pt-1' : 'pt-1'}`}>
      <p className="mb-1 text-sm font-semibold text-blue-600 dark:text-blue-400">{date}</p>
      <p className="mb-2 text-xl font-bold text-gray-800 dark:text-white">{title}</p>
      <p className="text-gray-600 dark:text-gray-400">{description}</p>
    </div>
  </div>
);

const Calendar: React.FC = () => {
  const { t } = useTranslation();
  return (
    <section className="py-20 bg-white dark:bg-gray-900">
      <div className="container mx-auto px-6">
        <h2 className="text-4xl font-bold text-center mb-12 text-gray-800 dark:text-white">{t('calendar.title')}</h2>
        <div className="max-w-3xl mx-auto">
          {eventData.map((event, index) => (
            <CalendarEvent
              key={event.id}
              date={event.date}
              title={t(`calendar.events.${event.id}.title`)}
              description={t(`calendar.events.${event.id}.description`)}
              isLast={index === eventData.length - 1}
            />
          ))}
        </div>
      </div>
    </section>
  );
};

export default Calendar;