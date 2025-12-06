import React from 'react';

const InitialLoader = () => {
    return (
        <div className="fixed inset-0 z-[9999] flex flex-col items-center justify-center bg-white dark:bg-[#111827] transition-colors duration-300">
            <div className="relative flex items-center justify-center">
                {/* Outer Ring */}
                <div className="absolute w-24 h-24 border-4 border-zinc-200 dark:border-zinc-800 rounded-full"></div>

                {/* Spinning Gradient Ring */}
                <div className="w-24 h-24 border-4 border-transparent rounded-full animate-spin border-t-[var(--brand-start)] border-r-[var(--brand-end)]"></div>

                {/* Inner Pulse */}
                <div className="absolute w-12 h-12 bg-[var(--brand-start)]/20 rounded-full animate-pulse"></div>

                {/* Center Dot */}
                <div className="absolute w-3 h-3 bg-[var(--brand-start)] rounded-full"></div>
            </div>

            <div className="mt-8 flex flex-col items-center gap-2">
                <h2 className="text-xl font-semibold text-zinc-800 dark:text-zinc-100 tracking-wide animate-pulse">
                    Toolinger
                </h2>
                <p className="text-sm text-zinc-500 dark:text-zinc-400">
                    Loading your workspace...
                </p>
            </div>
        </div>
    );
};

export default InitialLoader;
