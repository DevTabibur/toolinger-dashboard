'use client';

import { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FiBell, FiClock } from 'react-icons/fi';
import Image from 'next/image';

const notifications = [
    {
        id: 1,
        user: 'James Kirwin',
        action: 'confirmed his order.',
        detail: 'Order No: #78901. Estimated delivery: 2 days',
        time: '4 mins ago',
        avatar: 'https://i.pravatar.cc/150?u=1',
        unread: true,
    },
    {
        id: 2,
        user: 'Leo Kelly',
        action: 'cancelled his order',
        detail: 'scheduled for 17 Jan 2025',
        time: '10 mins ago',
        avatar: 'https://i.pravatar.cc/150?u=2',
        unread: false,
    },
    {
        id: 3,
        user: 'Payment of $50',
        action: 'received for Order',
        detail: '#67890 from Antonio Engle',
        time: '12 mins ago',
        avatar: 'https://i.pravatar.cc/150?u=3',
        unread: true,
    },
];

const Notifications = () => {
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

    const unreadCount = notifications.filter(n => n.unread).length;

    return (
        <div className="relative" ref={containerRef}>
            <button
                onClick={() => setIsOpen(!isOpen)}
                className="p-2 text-zinc-500 hover:bg-zinc-100 dark:text-zinc-400 dark:hover:bg-zinc-800 rounded-full transition-colors relative"
            >
                <FiBell className="w-5 h-5" />
                {unreadCount > 0 && (
                    <span className="absolute top-1.5 right-1.5 w-2 h-2 bg-red-500 rounded-full border-2 border-white dark:border-zinc-900"></span>
                )}
            </button>

            <AnimatePresence>
                {isOpen && (
                    <motion.div
                        initial={{ opacity: 0, y: 10, scale: 0.95 }}
                        animate={{ opacity: 1, y: 0, scale: 1 }}
                        exit={{ opacity: 0, y: 10, scale: 0.95 }}
                        transition={{ duration: 0.2 }}
                        className="absolute top-full right-0 mt-2 w-80 sm:w-96 bg-white dark:bg-zinc-900 rounded-xl shadow-xl border border-zinc-200 dark:border-zinc-800 overflow-hidden z-50"
                    >
                        <div className="flex items-center justify-between px-4 py-3 border-b border-zinc-100 dark:border-zinc-800">
                            <h3 className="font-semibold text-zinc-900 dark:text-zinc-100">Notifications</h3>
                            <button className="text-xs text-[var(--brand-start)] hover:underline font-medium">
                                Mark all as read
                            </button>
                        </div>

                        <div className="max-h-[400px] overflow-y-auto">
                            {notifications.map((item) => (
                                <div
                                    key={item.id}
                                    className={`flex gap-3 p-4 border-b border-zinc-50 dark:border-zinc-800 hover:bg-zinc-50 dark:hover:bg-zinc-800/50 transition-colors ${item.unread ? 'bg-blue-50/30 dark:bg-blue-900/10' : ''
                                        }`}
                                >
                                    <Image
                                        src={item.avatar}
                                        alt={item.user}
                                        width={40}
                                        height={40}
                                        className="w-10 h-10 rounded-full object-cover flex-shrink-0"
                                    />

                                    <div className="flex-1 min-w-0">
                                        <p className="text-sm text-zinc-900 dark:text-zinc-100">
                                            <span className="font-semibold">{item.user}</span> {item.action}
                                        </p>
                                        <p className="text-xs text-zinc-500 dark:text-zinc-400 mt-0.5 truncate">
                                            {item.detail}
                                        </p>
                                        <p className="text-xs text-zinc-400 mt-1.5 flex items-center gap-1">
                                            <FiClock className="w-3 h-3" />
                                            {item.time}
                                        </p>
                                    </div>
                                    {item.unread && (
                                        <div className="w-2 h-2 bg-red-500 rounded-full mt-2 flex-shrink-0"></div>
                                    )}
                                </div>
                            ))}
                        </div>

                        <div className="p-3 border-t border-zinc-100 dark:border-zinc-800 flex gap-2">
                            <button
                                onClick={() => setIsOpen(false)}
                                className="flex-1 px-4 py-2 text-sm font-medium text-white bg-zinc-900 hover:bg-zinc-800 dark:bg-zinc-100 dark:text-zinc-900 dark:hover:bg-zinc-200 rounded-lg transition-colors"
                            >
                                Cancel
                            </button>
                            <button className="flex-1 px-4 py-2 text-sm font-medium text-white bg-[var(--brand-start)] hover:opacity-90 rounded-lg transition-colors">
                                View all
                            </button>
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>
        </div>
    );
};

export default Notifications;
