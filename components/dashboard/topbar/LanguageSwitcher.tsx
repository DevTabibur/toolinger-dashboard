'use client';

import { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FiChevronDown } from 'react-icons/fi';
import Image from 'next/image';
import { useLanguage } from '@/context/LanguageContext';

const languages = [
    { code: 'en', name: 'English', flag: <Image src="/assets/svg/flag.usa.svg" alt="Flag US" width={20} height={20} /> },
    { code: 'bn', name: 'Bangla', flag: <Image src="/assets/svg/flag.bd.svg" alt="Flag BD" width={20} height={20} /> },
    { code: 'es', name: 'Spanish', flag: <Image src="/assets/svg/flag.es.svg" alt="Flag ES" width={20} height={20} /> },
];

const LanguageSwitcher = () => {
    const { language, setLanguage } = useLanguage();
    const [isOpen, setIsOpen] = useState(false);
    const containerRef = useRef<HTMLDivElement>(null);

    // Find selected language object based on code
    const selectedLang = languages.find(l => l.code === language) || languages[0];

    useEffect(() => {
        const handleClickOutside = (event: MouseEvent) => {
            if (containerRef.current && !containerRef.current.contains(event.target as Node)) {
                setIsOpen(false);
            }
        };

        document.addEventListener('mousedown', handleClickOutside);
        return () => {
            document.removeEventListener('mousedown', handleClickOutside);
        };
    }, []);

    return (
        <div className="relative" ref={containerRef}>
            <button
                onClick={() => setIsOpen(!isOpen)}
                className="flex items-center gap-2 p-2 px-4  hover:bg-zinc-100 dark:hover:bg-zinc-800 transition-colors"
            >
                <div className="flex items-center justify-center w-6 h-4 overflow-hidden ">
                    {selectedLang.flag}
                </div>
                <FiChevronDown className={`w-4 h-4 text-zinc-500 transition-transform ${isOpen ? 'rotate-180' : ''}`} />
            </button>

            <AnimatePresence>
                {isOpen && (
                    <motion.div
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: 10 }}
                        transition={{ duration: 0.2 }}
                        className="absolute top-full right-0 mt-3 w-40 bg-white dark:bg-zinc-900  shadow-xl border border-zinc-200 dark:border-zinc-800 overflow-hidden z-50"
                    >
                        <div className="p-1">
                            {languages.map((lang) => (
                                <button
                                    key={lang.code}
                                    onClick={() => {
                                        setLanguage(lang.code as any);
                                        setIsOpen(false);
                                    }}
                                    className={`w-full flex items-center gap-3 px-3 py-2  text-sm transition-colors ${selectedLang.code === lang.code
                                        ? 'bg-zinc-100 dark:bg-zinc-800 text-zinc-900 dark:text-zinc-100'
                                        : 'text-zinc-600 dark:text-zinc-400 hover:bg-zinc-50 dark:hover:bg-zinc-800'
                                        }`}
                                >
                                    <div className="flex items-center justify-center w-6 h-4 overflow-hidden ">
                                        {lang.flag}
                                    </div>
                                    <span>{lang.name}</span>
                                </button>
                            ))}
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>
        </div>
    );
};

export default LanguageSwitcher;
