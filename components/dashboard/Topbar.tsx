'use client';

import { FiMenu } from 'react-icons/fi';
import Search from './topbar/Search';
import LanguageSwitcher from './topbar/LanguageSwitcher';
import ZoomToggle from './topbar/ZoomToggle';
import Notifications from './topbar/Notifications';
import ProfileMenu from './topbar/ProfileMenu';
import { useSelector } from 'react-redux';
import { RootState } from '@/redux/store';

interface TopbarProps {
    onMenuClick: () => void;
}

const Topbar = ({ onMenuClick }: TopbarProps) => {
    const topbarColor = useSelector((state: RootState) => state.ui.topbarColor);

    return (
        <header
            className="h-14 bg-white dark:bg-[var(--background)] border-b border-border flex items-center justify-between px-4 lg:px-8 sticky top-0 z-30 transition-colors duration-300"
            style={{ backgroundColor: topbarColor || undefined }}

        >
            {/* Left Side: Menu Toggle & Search */}
            <div className="flex items-center gap-4">
                <button
                    onClick={onMenuClick}
                    className="lg:hidden p-2 -ml-2 text-zinc-600 hover:bg-zinc-100 dark:text-zinc-300 dark:hover:bg-zinc-800 rounded-lg transition-colors"
                >
                    <FiMenu className="w-6 h-6" />
                </button>

                <Search />
            </div>

            {/* Right Side: Actions & Profile */}
            <div className="flex items-center gap-2 sm:gap-4">
                <LanguageSwitcher />

                <ZoomToggle />

                <Notifications />

                <div className="h-8 w-px bg-zinc-200 dark:bg-zinc-700 mx-1 hidden sm:block"></div>
                <ProfileMenu />
            </div>
        </header>
    );
};

export default Topbar;
