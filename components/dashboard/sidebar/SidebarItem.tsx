'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { motion, AnimatePresence } from 'framer-motion';
import { FiChevronRight, FiChevronDown } from 'react-icons/fi';
import { IconType } from 'react-icons';

interface SubItem {
    title: string;
    href: string;
}

interface MenuItem {
    title: string;
    icon: IconType;
    href: string;
    subItems?: SubItem[];
}

interface SidebarItemProps {
    item: MenuItem;
    isMini?: boolean;
    isSidebarDark?: boolean;
}

const SidebarItem = ({ item, isMini = false, isSidebarDark = false }: SidebarItemProps) => {
    const pathname = usePathname();
    const [isOpen, setIsOpen] = useState(false);
    const hasSubItems = item.subItems && item.subItems.length > 0;

    // Check if any sub-item is active to keep the menu open
    const isSubItemActive = item.subItems?.some(sub => pathname === sub.href);
    const isActive = pathname === item.href || isSubItemActive;

    useEffect(() => {
        if (isSubItemActive) {
            setIsOpen(true);
        }
    }, [isSubItemActive]);

    const toggleOpen = () => {
        if (hasSubItems) {
            setIsOpen(!isOpen);
        }
    };

    const Icon = item.icon;

    return (
        <div className="mb-0">
            {hasSubItems ? (
                <button
                    onClick={toggleOpen}
                    className={`w-full flex items-center justify-between px-4 py-1.5 rounded-lg transition-all duration-200 group ${isActive
                        ? 'bg-[var(--brand-start)]/5 text-[var(--brand-start)]'
                        : isSidebarDark
                            ? 'text-zinc-400 hover:bg-white/10 hover:text-zinc-100'
                            : 'text-zinc-600 dark:text-zinc-400 hover:bg-zinc-50 dark:hover:bg-zinc-800 hover:text-zinc-900 dark:hover:text-zinc-100'
                        } ${isMini ? 'justify-center px-2' : ''}`}
                >
                    <div className={`flex items-center gap-3 ${isMini ? 'justify-center' : ''}`}>
                        <Icon className={`w-4 h-4 ${isActive ? 'text-[var(--brand-start)]' : isSidebarDark ? 'text-zinc-400 group-hover:text-zinc-300' : 'text-zinc-400 group-hover:text-zinc-600 dark:group-hover:text-zinc-300'}`} />
                        {!isMini && <span className={`font-medium ${isActive ? 'font-semibold' : ''}`}>{item.title}</span>}
                    </div>
                    {!isMini && (
                        <FiChevronRight
                            className={`w-4 h-4 transition-transform duration-200 ${isOpen ? 'rotate-90' : ''} ${isActive ? 'text-[var(--brand-start)]' : 'text-zinc-400'}`}
                        />
                    )}
                </button>
            ) : (
                <Link
                    href={item.href}
                    className={`flex items-center gap-3 px-4 py-2.5 rounded-lg transition-all duration-200 group ${isActive
                        ? 'bg-[var(--brand-start)]/5 text-[var(--brand-start)]'
                        : isSidebarDark
                            ? 'text-zinc-400 hover:bg-white/10 hover:text-zinc-100'
                            : 'text-zinc-600 dark:text-zinc-400 hover:bg-zinc-50 dark:hover:bg-zinc-800 hover:text-zinc-900 dark:hover:text-zinc-100'
                        } ${isMini ? 'justify-center px-2' : ''}`}
                >
                    <Icon className={`w-4 h-4 ${isActive ? 'text-[var(--brand-start)]' : isSidebarDark ? 'text-zinc-400 group-hover:text-zinc-300' : 'text-zinc-400 group-hover:text-zinc-600 dark:group-hover:text-zinc-300'}`} />
                    {!isMini && <span className={`font-medium ${isActive ? 'font-semibold' : ''}`}>{item.title}</span>}
                </Link>
            )}

            <AnimatePresence>
                {hasSubItems && isOpen && (
                    <motion.div
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: 'auto', opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        transition={{ duration: 0.2, ease: 'easeInOut' }}
                        className="overflow-hidden"
                    >
                        <div className="pl-12 pr-4 py-1 space-y-1">
                            {item.subItems?.map((subItem) => {
                                const isSubActive = pathname === subItem.href;
                                return (
                                    <Link
                                        key={subItem.href}
                                        href={subItem.href}
                                        className={`block py-2 text-sm transition-colors relative ${isSubActive
                                            ? 'text-[var(--brand-start)] font-medium'
                                            : isSidebarDark
                                                ? 'text-zinc-400 hover:text-zinc-200'
                                                : 'text-zinc-500 dark:text-zinc-400 hover:text-zinc-900 dark:hover:text-zinc-200'
                                            }`}
                                    >
                                        <span className="absolute -left-4 top-1/2 -translate-y-1/2 w-1.5 h-1.5 rounded-full bg-current opacity-50"></span>
                                        {subItem.title}
                                    </Link>
                                );
                            })}
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>
        </div>
    );
};

export default SidebarItem;
