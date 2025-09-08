import React, { useState, useRef, useEffect } from "react";
import Header from "./components/Header";
import Hero from "./components/Hero";
import About from "./components/About";
import Academics from "./components/Academics";
import Admissions from "./components/Admissions";
import Calendar from "./components/Calendar";
import FAQ from "./components/FAQ";
import Testimonials from "./components/Testimonials";
import Contact from "./components/Contact";
import Footer from "./components/Footer";
import AITutor from "./components/AITutor";
import type { Section } from "./types";
import { SECTIONS } from "./constants";

const App: React.FC = () => {
  const [activeSection, setActiveSection] = useState<Section>("home");
  const [isTutorOpen, setIsTutorOpen] = useState(false);
  const sectionRefs = {
    home: useRef<HTMLDivElement>(null),
    about: useRef<HTMLDivElement>(null),
    academics: useRef<HTMLDivElement>(null),
    admissions: useRef<HTMLDivElement>(null),
    calendar: useRef<HTMLDivElement>(null),
    faq: useRef<HTMLDivElement>(null),
    testimonials: useRef<HTMLDivElement>(null),
    contact: useRef<HTMLDivElement>(null),
  };

  const handleNavClick = (section: Section) => {
    setActiveSection(section);
    sectionRefs[section].current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const id = entry.target.id as Section;
            // A slight delay to avoid rapid changes while scrolling fast
            setTimeout(() => setActiveSection(id), 100);
          }
        });
      },
      { rootMargin: "-50% 0px -50% 0px", threshold: 0.1 }
    );

    Object.values(sectionRefs).forEach((ref) => {
      if (ref.current) {
        observer.observe(ref.current);
      }
    });

    return () => {
      Object.values(sectionRefs).forEach((ref) => {
        if (ref.current) {
          observer.unobserve(ref.current);
        }
      });
    };
  }, []); // eslint-disable-line react-hooks/exhaustive-deps

  return (
    <div className="bg-gray-50 text-gray-800 dark:bg-gray-900 dark:text-gray-200 font-sans">
      <Header activeSection={activeSection} onNavClick={handleNavClick} />
      <main>
        <div id="home" ref={sectionRefs.home}>
          <Hero onCTAClick={() => handleNavClick("admissions")} />
        </div>
        <div id="about" ref={sectionRefs.about}>
          <About />
        </div>
        <div id="academics" ref={sectionRefs.academics}>
          <Academics />
        </div>
        <div id="admissions" ref={sectionRefs.admissions}>
          <Admissions />
        </div>
        <div id="calendar" ref={sectionRefs.calendar}>
          <Calendar />
        </div>
        <div id="faq" ref={sectionRefs.faq}>
          <FAQ />
        </div>
        <div id="testimonials" ref={sectionRefs.testimonials}>
          <Testimonials />
        </div>
        <div id="contact" ref={sectionRefs.contact}>
          <Contact />
        </div>
      </main>
      <Footer />
      <AITutor isOpen={isTutorOpen} onClose={() => setIsTutorOpen(false)} />

      {/* AI Tutor Floating Action Button */}
      <button
        onClick={() => setIsTutorOpen(true)}
        className="fixed bottom-8 right-8 bg-blue-600 text-white p-4 rounded-full shadow-lg hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 transition-transform transform hover:scale-110 dark:focus:ring-offset-gray-900"
        aria-label="Open AI Tutor"
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="20"
          height="20"
          fill="currentColor"
          class="bi bi-chat-dots"
          viewBox="0 0 16 16"
        >
          <path d="M5 8a1 1 0 1 1-2 0 1 1 0 0 1 2 0m4 0a1 1 0 1 1-2 0 1 1 0 0 1 2 0m3 1a1 1 0 1 0 0-2 1 1 0 0 0 0 2" />
          <path d="m2.165 15.803.02-.004c1.83-.363 2.948-.842 3.468-1.105A9 9 0 0 0 8 15c4.418 0 8-3.134 8-7s-3.582-7-8-7-8 3.134-8 7c0 1.76.743 3.37 1.97 4.6a10.4 10.4 0 0 1-.524 2.318l-.003.011a11 11 0 0 1-.244.637c-.079.186.074.394.273.362a22 22 0 0 0 .693-.125m.8-3.108a1 1 0 0 0-.287-.801C1.618 10.83 1 9.468 1 8c0-3.192 3.004-6 7-6s7 2.808 7 6-3.004 6-7 6a8 8 0 0 1-2.088-.272 1 1 0 0 0-.711.074c-.387.196-1.24.57-2.634.893a11 11 0 0 0 .398-2" />
        </svg>
      </button>
    </div>
  );
};

export default App;
