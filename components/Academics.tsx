import React, { useState, useEffect } from 'react';
import { useTranslation } from '../context/LanguageContext';

const ProgramCard: React.FC<{ title: string; description: string; imageUrl: string }> = ({ title, description, imageUrl }) => (
  <div className="bg-white dark:bg-gray-800 rounded-lg shadow-lg overflow-hidden transform hover:-translate-y-2 transition-transform duration-300">
    <img src={imageUrl} alt={title} className="w-full h-48 object-cover" />
    <div className="p-6">
      <h3 className="text-xl font-bold text-gray-800 dark:text-white mb-2">{title}</h3>
      <p className="text-gray-600 dark:text-gray-400">{description}</p>
    </div>
  </div>
);

const SkeletonCard: React.FC = () => (
    <div className="bg-white dark:bg-gray-800 rounded-lg shadow-lg overflow-hidden animate-pulse">
        <div className="w-full h-48 bg-gray-300 dark:bg-gray-700"></div>
        <div className="p-6">
            <div className="h-6 bg-gray-300 dark:bg-gray-700 rounded w-3/4 mb-4"></div>
            <div className="space-y-2">
                <div className="h-4 bg-gray-300 dark:bg-gray-700 rounded"></div>
                <div className="h-4 bg-gray-300 dark:bg-gray-700 rounded w-5/6"></div>
            </div>
        </div>
    </div>
);

const programData = [
    { id: 'early', imageUrl: "https://picsum.photos/seed/early/600/400" },
    { id: 'elementary', imageUrl: "https://picsum.photos/seed/elementary/600/400" },
    { id: 'middle', imageUrl: "https://picsum.photos/seed/middle/600/400" },
    { id: 'high', imageUrl: "https://picsum.photos/seed/high/600/400" },
    { id: 'stem', imageUrl: "https://picsum.photos/seed/stem/600/400" },
    { id: 'arts', imageUrl: "https://picsum.photos/seed/arts/600/400" },
];


const Academics: React.FC = () => {
    const [isLoading, setIsLoading] = useState(true);
    const { t } = useTranslation();

    useEffect(() => {
        const timer = setTimeout(() => {
            setIsLoading(false);
        }, 1500); // Simulate network delay
        return () => clearTimeout(timer);
    }, []);

    return (
        <section className="py-20 bg-white dark:bg-gray-900">
            <div className="container mx-auto px-6">
                <h2 className="text-4xl font-bold text-center mb-12 text-gray-800 dark:text-white">{t('academics.title')}</h2>
                <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
                    {isLoading ? (
                        Array.from({ length: 6 }).map((_, index) => <SkeletonCard key={index} />)
                    ) : (
                        programData.map((program) => (
                            <ProgramCard
                                key={program.id}
                                title={t(`academics.programs.${program.id}.title`)}
                                description={t(`academics.programs.${program.id}.description`)}
                                imageUrl={program.imageUrl}
                            />
                        ))
                    )}
                </div>
            </div>
        </section>
    );
};

export default Academics;