'use client';

import { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FiSearch, FiX } from 'react-icons/fi';

const Search = () => {
    const [isOpen, setIsOpen] = useState(false);
    const containerRef = useRef<HTMLDivElement>(null);
    const inputRef = useRef<HTMLInputElement>(null);

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

    const handleClick = () => {
        setIsOpen(true);
        setTimeout(() => inputRef.current?.focus(), 100);
    };

    return (
        <motion.div
            ref={containerRef}
            layout
            onClick={handleClick}
            className={`flex items-center bg-zinc-50 dark:bg-zinc-800 rounded-lg border border-zinc-200 dark:border-zinc-700 overflow-hidden cursor-text transition-colors ${isOpen ? 'ring-2 ring-[var(--brand-start)] border-transparent' : 'hover:border-zinc-300 dark:hover:border-zinc-600'
                }`}
            initial={{ width: 40 }}
            animate={{ width: isOpen ? 300 : 40 }}
            transition={{ type: 'spring', stiffness: 300, damping: 30 }}
        >
            <div className="flex items-center justify-center min-w-[40px] h-10">
                <FiSearch className={`w-5 h-5 ${isOpen ? 'text-[var(--brand-start)]' : 'text-zinc-500'}`} />
            </div>

            <AnimatePresence>
                {isOpen && (
                    <motion.input
                        ref={inputRef}
                        initial={{ opacity: 0, width: 0 }}
                        animate={{ opacity: 1, width: '100%' }}
                        exit={{ opacity: 0, width: 0 }}
                        type="text"
                        placeholder="Search..."
                        className="bg-transparent border-none outline-none text-sm text-zinc-900 dark:text-zinc-100 placeholder-zinc-400 h-full px-2 w-full min-w-[200px]"
                    />
                )}
            </AnimatePresence>

            {isOpen && (
                <div className="pr-3 flex items-center">
                    <span className="text-xs text-zinc-400 border border-zinc-200 dark:border-zinc-700 rounded px-1.5 py-0.5">
                        ⌘K
                    </span>
                </div>
            )}
        </motion.div>
    );
};

export default Search;
