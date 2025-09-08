import React from 'react';
import { useTranslation } from '../context/LanguageContext';

const Step: React.FC<{ number: string; title: string; description: string; }> = ({ number, title, description }) => (
    <div className="flex">
        <div className="flex flex-col items-center mr-4">
            <div>
                <div className="flex items-center justify-center w-10 h-10 border rounded-full bg-blue-600 text-white font-bold dark:bg-blue-500">
                    {number}
                </div>
            </div>
            <div className="w-px h-full bg-gray-300 dark:bg-gray-600"></div>
        </div>
        <div className="pb-8">
            <p className="mb-2 text-xl font-bold text-gray-800 dark:text-white">{title}</p>
            <p className="text-gray-600 dark:text-gray-400">{description}</p>
        </div>
    </div>
);

const Admissions: React.FC = () => {
    const { t } = useTranslation();
    const steps = ['application', 'assessment', 'interview', 'decision'];

    return (
        <section className="py-20 bg-gray-100 dark:bg-gray-800/50 ">
            <div className="container mx-auto px-6">
                <div className="grid gap-10 lg:grid-cols-2">
                    <div>
                        <h2 className="text-4xl font-bold mb-4 text-gray-800 dark:text-white">{t('admissions.title')}</h2>
                        <p className="text-lg text-gray-600 dark:text-gray-400 mb-8">
                            {t('admissions.description')}
                        </p>
                        <div className="max-w-md">
                           {steps.map((step, index) => (
                                <Step 
                                    key={step}
                                    number={`${index + 1}`} 
                                    title={t(`admissions.steps.${step}.title`)} 
                                    description={t(`admissions.steps.${step}.description`)}
                                />
                           ))}
                        </div>
                    </div>
                    <div className="relative w-full h-64 lg:h-auto rounded-lg shadow-xl overflow-hidden">
                        <img className="object-cover w-full h-full" src="https://picsum.photos/seed/admissions/800/600" alt={t('admissions.imageAlt')}/>
                        <div className="absolute inset-0 bg-blue-800 bg-opacity-30 dark:bg-opacity-50"></div>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default Admissions;