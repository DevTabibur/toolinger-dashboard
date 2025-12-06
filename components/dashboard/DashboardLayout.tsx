'use client';

import { useState } from 'react';
import Sidebar from './Sidebar';
import Topbar from './Topbar';
import ThemeCustomizer from './customizer/ThemeCustomizer';
import ThemeCustomizerTrigger from './customizer/ThemeCustomizerTrigger';
import { useSelector } from 'react-redux';
import { RootState } from '@/redux/store';
import HorizontalNav from './HorizontalNav';

interface DashboardLayoutProps {
    children: React.ReactNode;
}

const DashboardLayout = ({ children }: DashboardLayoutProps) => {
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
    const layoutMode = useSelector((state: RootState) => state.ui.layoutMode);
    const layoutWidth = useSelector((state: RootState) => state.ui.layoutWidth);

    const isHorizontal = layoutMode === 'horizontal';
    const isWithoutHeader = layoutMode === 'without-header';
    const isDetached = layoutMode === 'detached';

    return (
        <div className={`min-h-screen  dark:bg-[var(--background)] text-foreground dark:text-zinc-100 flex ${isHorizontal ? 'flex-col' : ''}`}>
            {/* Sidebar - Hide in Horizontal mode */}
            {!isHorizontal && (
                <Sidebar
                    isOpen={isMobileMenuOpen}
                    onClose={() => setIsMobileMenuOpen(false)}
                />
            )}

            {/* Main Content Area */}
            <div className={`flex-1 flex flex-col min-w-0 transition-all duration-300 ${isDetached ? 'p-0' : ''}`}>
                {!isWithoutHeader && (
                    <Topbar onMenuClick={() => setIsMobileMenuOpen(true)} />
                )}

                {isHorizontal && !isWithoutHeader && <HorizontalNav />}

                <main className={`flex-1 overflow-y-auto ${isDetached ? 'p-4 lg:p-6 lg:pr-4 lg:pb-4' : 'p-4 lg:p-8'}`}>
                    <div className={`${layoutWidth === 'stretched' ? 'max-w-7xl' : 'max-w-full'} mx-auto w-full h-full`}>
                        {children}
                    </div>
                </main>
            </div>

            <ThemeCustomizerTrigger />
            <ThemeCustomizer />
        </div>
    );
};

export default DashboardLayout;
