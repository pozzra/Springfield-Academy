import React, { useState, useEffect, useCallback } from 'react';
import { useTranslation } from '../context/LanguageContext';

const testimonialData = [
  {
    id: 'parent',
    name: "Sarah Johnson",
    imageUrl: "https://i.pravatar.cc/150?u=a042581f4e29026704d"
  },
  {
    id: 'alumnus',
    name: "Michael Chen",
    imageUrl: "https://i.pravatar.cc/150?u=a042581f4e29026704e"
  },
  {
    id: 'student',
    name: "Emily Rodriguez",
    imageUrl: "https://i.pravatar.cc/150?u=a042581f4e29026704f"
  }
];

const Testimonials: React.FC = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const { t } = useTranslation();

  const goToNext = useCallback(() => {
    setCurrentIndex(prevIndex => (prevIndex === testimonialData.length - 1 ? 0 : prevIndex + 1));
  }, []);

  const goToPrevious = () => {
    setCurrentIndex(prevIndex => (prevIndex === 0 ? testimonialData.length - 1 : prevIndex - 1));
  };
  
  useEffect(() => {
    const timer = setInterval(() => {
      goToNext();
    }, 5000);
    return () => clearInterval(timer);
  }, [goToNext]);


  return (
    <section className="py-20 bg-gray-100 dark:bg-gray-800/50">
      <div className="container mx-auto px-6 text-center">
        <h2 className="text-4xl font-bold mb-12 text-gray-800 dark:text-white">{t('testimonials.title')}</h2>
        <div className="relative max-w-3xl mx-auto">
          <div className="overflow-hidden relative h-80">
            {testimonialData.map((testimonial, index) => (
              <div
                key={index}
                className={`absolute inset-0 transition-opacity duration-700 ease-in-out ${index === currentIndex ? 'opacity-100' : 'opacity-0'}`}
                aria-hidden={index !== currentIndex}
              >
                <div className="flex flex-col items-center justify-center h-full p-4">
                  <p className="text-xl italic text-gray-600 dark:text-gray-400 mb-6">"{t(`testimonials.items.${testimonial.id}.quote`)}"</p>
                  <div className="flex items-center">
                    <img src={testimonial.imageUrl} alt={testimonial.name} className="w-16 h-16 rounded-full mr-4 shadow-md" />
                    <div>
                      <p className="font-bold text-lg text-gray-800 dark:text-white">{testimonial.name}</p>
                      <p className="text-gray-500 dark:text-gray-400">{t(`testimonials.items.${testimonial.id}.role`)}</p>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
          <button
            onClick={goToPrevious}
            className="absolute top-1/2 -left-4 md:-left-12 transform -translate-y-1/2 bg-white dark:bg-gray-700 rounded-full p-2 shadow-lg hover:bg-gray-100 dark:hover:bg-gray-600 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 dark:focus:ring-offset-gray-800 transition-colors"
            aria-label="Previous testimonial"
          >
            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-gray-600 dark:text-gray-300" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
            </svg>
          </button>
          <button
            onClick={goToNext}
            className="absolute top-1/2 -right-4 md:-right-12 transform -translate-y-1/2 bg-white dark:bg-gray-700 rounded-full p-2 shadow-lg hover:bg-gray-100 dark:hover:bg-gray-600 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 dark:focus:ring-offset-gray-800 transition-colors"
            aria-label="Next testimonial"
          >
            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-gray-600 dark:text-gray-300" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
            </svg>
          </button>
           <div className="absolute -bottom-8 left-1/2 -translate-x-1/2 flex space-x-2">
            {testimonialData.map((_, index) => (
              <button
                key={index}
                onClick={() => setCurrentIndex(index)}
                className={`w-3 h-3 rounded-full transition-colors duration-300 ${currentIndex === index ? 'bg-blue-600 dark:bg-blue-400' : 'bg-gray-300 dark:bg-gray-600 hover:bg-gray-400 dark:hover:bg-gray-500'}`}
                aria-label={`Go to slide ${index + 1}`}
                aria-current={currentIndex === index}
              ></button>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default Testimonials;