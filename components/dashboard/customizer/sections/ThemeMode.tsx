'use client';

import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '@/redux/store';
import { setTheme } from '@/redux/slices/ui.slice';
import { FiSun, FiMoon, FiMonitor } from 'react-icons/fi';

const ThemeMode = () => {
    const dispatch = useDispatch();
    const theme = useSelector((state: RootState) => state.ui.theme);

    return (
        <div className="flex gap-1 pt-4">
            <button
                onClick={() => dispatch(setTheme('light'))}
                className={`flex-1 flex items-center justify-center gap-2 px-2 py-1.5 text-sm font-medium  border transition-colors ${theme === 'light'
                        ? 'bg-blue-50 border-blue-500 text-blue-600 dark:bg-blue-900/20 dark:text-blue-400'
                        : 'bg-white border-zinc-200 text-zinc-700 hover:bg-zinc-50 dark:bg-zinc-800 dark:border-zinc-700 dark:text-zinc-300 dark:hover:bg-zinc-700'
                    }`}
            >
                <FiSun className="w-4 h-4" />
                Light
            </button>
            <button
                onClick={() => dispatch(setTheme('dark'))}
                className={`flex-1 flex items-center justify-center gap-2 px-2 py-1.5 text-sm font-medium  border transition-colors ${theme === 'dark'
                        ? 'bg-blue-50 border-blue-500 text-blue-600 dark:bg-blue-900/20 dark:text-blue-400'
                        : 'bg-white border-zinc-200 text-zinc-700 hover:bg-zinc-50 dark:bg-zinc-800 dark:border-zinc-700 dark:text-zinc-300 dark:hover:bg-zinc-700'
                    }`}
            >
                <FiMoon className="w-4 h-4" />
                Dark
            </button>
            <button
                onClick={() => dispatch(setTheme('system'))}
                className={`flex-1 flex items-center justify-center gap-2 px-2 py-1.5 text-sm font-medium  border transition-colors ${theme === 'system'
                        ? 'bg-blue-50 border-blue-500 text-blue-600 dark:bg-blue-900/20 dark:text-blue-400'
                        : 'bg-white border-zinc-200 text-zinc-700 hover:bg-zinc-50 dark:bg-zinc-800 dark:border-zinc-700 dark:text-zinc-300 dark:hover:bg-zinc-700'
                    }`}
            >
                <FiMonitor className="w-4 h-4" />
                System
            </button>
        </div>
    );
};

export default ThemeMode;
