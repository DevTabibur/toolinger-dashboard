'use client';

import { FiMenu, FiBell, FiSearch, FiUser } from 'react-icons/fi';

interface TopbarProps {
    onMenuClick: () => void;
}

const Topbar = ({ onMenuClick }: TopbarProps) => {
    return (
        <header className="h-16 bg-white dark:bg-zinc-900 border-b border-zinc-200 dark:border-zinc-800 flex items-center justify-between px-4 lg:px-8 sticky top-0 z-30">
            {/* Left Side: Menu Toggle & Search */}
            <div className="flex items-center gap-4">
                <button
                    onClick={onMenuClick}
                    className="lg:hidden p-2 -ml-2 text-zinc-600 hover:bg-zinc-100 dark:text-zinc-300 dark:hover:bg-zinc-800 rounded-lg transition-colors"
                >
                    <FiMenu className="w-6 h-6" />
                </button>

                <div className="hidden md:flex items-center gap-2 px-4 py-2 bg-zinc-50 dark:bg-zinc-800 rounded-lg border border-zinc-200 dark:border-zinc-700 w-64 focus-within:ring-2 focus-within:ring-[var(--brand-start)] focus-within:border-transparent transition-all">
                    <FiSearch className="w-5 h-5 text-zinc-400" />
                    <input
                        type="text"
                        placeholder="Search..."
                        className="bg-transparent border-none outline-none text-sm text-zinc-900 dark:text-zinc-100 placeholder-zinc-400 w-full"
                    />
                </div>
            </div>

            {/* Right Side: Actions & Profile */}
            <div className="flex items-center gap-4">
                <button className="p-2 text-zinc-500 hover:bg-zinc-100 dark:text-zinc-400 dark:hover:bg-zinc-800 rounded-full transition-colors relative">
                    <FiBell className="w-5 h-5" />
                    <span className="absolute top-1.5 right-1.5 w-2 h-2 bg-red-500 rounded-full border-2 border-white dark:border-zinc-900"></span>
                </button>

                <div className="h-8 w-px bg-zinc-200 dark:bg-zinc-700 mx-1"></div>

                <button className="flex items-center gap-3 hover:bg-zinc-50 dark:hover:bg-zinc-800 p-1.5 pr-3 rounded-full transition-colors border border-transparent hover:border-zinc-200 dark:hover:border-zinc-700">
                    <div className="w-8 h-8 rounded-full bg-gradient-to-br from-[var(--brand-start)] to-[var(--brand-end)] flex items-center justify-center text-white font-medium shadow-md">
                        AD
                    </div>
                    <div className="hidden md:block text-left">
                        <p className="text-sm font-semibold text-zinc-900 dark:text-zinc-100 leading-none">
                            Admin User
                        </p>
                        <p className="text-xs text-zinc-500 dark:text-zinc-400 mt-0.5">
                            admin@toolinger.com
                        </p>
                    </div>
                </button>
            </div>
        </header>
    );
};

export default Topbar;
