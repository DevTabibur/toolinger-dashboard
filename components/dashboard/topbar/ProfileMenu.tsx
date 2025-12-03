'use client';

import { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FiLogOut } from 'react-icons/fi';
import Link from 'next/link';
import { ProfileMenuData } from '@/constants/ProfileMenu.constant';

const ProfileMenu = () => {
    const [isOpen, setIsOpen] = useState(false);
    const containerRef = useRef<HTMLDivElement>(null);

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
                className="flex items-center gap-3 hover:bg-zinc-50 dark:hover:bg-zinc-800 p-1.5 pr-3 rounded-full transition-colors border border-transparent hover:border-zinc-200 dark:hover:border-zinc-700"
            >
                <img
                    src="https://i.pravatar.cc/150?u=admin"
                    alt="Admin User"
                    className="w-8 h-8 rounded-full object-cover shadow-sm"
                />
                <div className="hidden md:block text-left">
                    <p className="text-sm font-semibold text-zinc-900 dark:text-zinc-100 leading-none">
                        John Smilga
                    </p>
                    <p className="text-xs text-zinc-500 dark:text-zinc-400 mt-0.5">
                        Admin
                    </p>
                </div>
            </button>

            <AnimatePresence>
                {isOpen && (
                    <motion.div
                        initial={{ opacity: 0, y: 10, scale: 0.95 }}
                        animate={{ opacity: 1, y: 0, scale: 1 }}
                        exit={{ opacity: 0, y: 10, scale: 0.95 }}
                        transition={{ duration: 0.2 }}
                        className="absolute top-full right-0 mt-2 w-64 bg-white dark:bg-zinc-900 rounded-xl shadow-xl border border-zinc-200 dark:border-zinc-800 overflow-hidden z-50"
                    >
                        <div className="p-4 border-b border-zinc-100 dark:border-zinc-800 flex items-center gap-3 bg-zinc-50/50 dark:bg-zinc-800/50">
                            <img
                                src="https://i.pravatar.cc/150?u=admin"
                                alt="Admin User"
                                className="w-12 h-12 rounded-full object-cover shadow-sm"
                            />
                            <div>
                                <p className="font-semibold text-zinc-900 dark:text-zinc-100">John Smilga</p>
                                <p className="text-xs text-zinc-500 dark:text-zinc-400">Admin</p>
                            </div>
                        </div>

                        <div className="p-2">
                            {ProfileMenuData.map((item) => {
                                const Icon = item.icon;

                                return (
                                    <Link
                                        key={item.id}
                                        href={item.href}
                                        className="w-full flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm text-zinc-600 dark:text-zinc-300 hover:bg-zinc-50 dark:hover:bg-zinc-800 transition-colors"
                                    >
                                        <Icon className="w-4 h-4" />
                                        {item.title}
                                    </Link>
                                );
                            })}

                        </div>

                        <div className="p-2 border-t border-zinc-100 dark:border-zinc-800">
                            <button className="w-full flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm text-red-600 dark:text-red-400 hover:bg-red-50 dark:hover:bg-red-900/20 transition-colors">
                                <FiLogOut className="w-4 h-4" />
                                Logout
                            </button>
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>
        </div>
    );
};

export default ProfileMenu;
