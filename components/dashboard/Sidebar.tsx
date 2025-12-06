'use client';

import Link from 'next/link';
import { FiX } from 'react-icons/fi';
import { SidebarMenuData } from '@/constants/SidebarMenu.constant';
import SidebarItem from './sidebar/SidebarItem';
import { useSelector } from 'react-redux';
import { RootState } from '@/redux/store';
import { useLanguage } from '@/context/LanguageContext';


interface SidebarProps {
    isOpen: boolean;
    onClose: () => void;
}

const Sidebar = ({ isOpen, onClose }: SidebarProps) => {
    const layoutMode = useSelector((state: RootState) => state.ui.layoutMode);
    const isMini = layoutMode === 'mini';
    const isDetached = layoutMode === 'detached';
    const sidebarColor = useSelector((state: RootState) => state.ui.sidebarColor);
    const isSidebarDark = sidebarColor !== '#ffffff';
    const { t } = useLanguage();


    return (
        <>
            {/* Mobile Overlay */}
            <div
                className={`fixed inset-0 z-40 lg:hidden transition-opacity duration-300
    ${isOpen ? 'opacity-90' : 'opacity-0 pointer-events-none'}
    `}
                onClick={onClose}
            />
            {/* Sidebar Container */}
            <aside
                className={`fixed lg:static bg-white dark:bg-[var(--background)]  inset-y-0 left-0 z-50 border-r border-gray-200 dark:border-gray-800 transform transition-all duration-300 lg:transform-none lg:translate-x-0 
                   ${isOpen ? 'translate-x-0' : '-translate-x-full'}
                   ${isMini ? 'w-20' : 'w-64'}
                   ${isDetached ? 'lg:m-4  lg:h-[calc(100vh-2rem)] lg:border shadow-sm' : 'h-screen'}
                `}
                // style={!isDark && sidebarColor ? { background: sidebarColor } : undefined}
                style={{ backgroundColor: sidebarColor || undefined }}
            >
                {/* Logo Area */}
                <div className={`h-14 flex items-center ${isMini ? 'justify-center px-0' : 'justify-between px-6'} border-b border-zinc-100 dark:border-zinc-800`}>
                    <Link href="/dashboard" className="flex items-center gap-2">
                        <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-[var(--brand-start)] to-[var(--brand-end)] flex items-center justify-center text-white font-bold text-xl shrink-0">
                            T
                        </div>
                        {!isMini && (
                            <span className="text-xl font-bold bg-gradient-to-r from-[var(--brand-start)] to-[var(--brand-end)] bg-clip-text text-transparent whitespace-nowrap">
                                Toolinger
                            </span>
                        )}
                    </Link>
                    <button
                        onClick={onClose}
                        className={`lg:hidden p-1 transition-colors ${isSidebarDark ? 'text-zinc-400 hover:text-zinc-200' : 'text-zinc-500 hover:text-zinc-700 dark:text-zinc-400 dark:hover:text-zinc-200'}`}
                    >
                        <FiX className="w-6 h-6" />
                    </button>
                </div>

                {/* Navigation */}
                <nav className={`p-4 space-y-6 overflow-y-auto scrollbar-thin scrollbar-thumb-zinc-200 dark:scrollbar-thumb-zinc-800 ${isDetached ? 'h-[calc(100vh-6rem)]' : 'h-[calc(100vh-4rem)]'}`}>
                    {SidebarMenuData.map((section, index) => (
                        <div key={index}>
                            {!isMini && (
                                <h3 className={`px-4 mb-2 text-xs font-semibold uppercase tracking-wider whitespace-nowrap ${isSidebarDark ? 'text-zinc-400' : 'text-zinc-500'}`}>
                                    {t(section.title)}
                                </h3>
                            )}
                            <div className="space-y-1">
                                {section.items.map((item) => (
                                    <SidebarItem key={item.title} item={item} isMini={isMini} isSidebarDark={isSidebarDark} />
                                ))}
                            </div>
                        </div>
                    ))}
                </nav>
            </aside>
        </>
    );
};

export default Sidebar;
