'use client';

import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '@/redux/store';
import { setAccent } from '@/redux/slices/ui.slice';
import { FiCheck } from 'react-icons/fi';

const colors = [
    '#2563eb', // Blue (Default)
    '#10b981', // Emerald
    '#ef4444', // Red
    '#8b5cf6', // Violet
    '#06b6d4', // Cyan
    '#14b8a6', // Teal
    '#f97316', // Orange
];

const ThemeColors = () => {
    const dispatch = useDispatch();
    const accent = useSelector((state: RootState) => state.ui.accent);

    return (
        <div className="flex flex-wrap gap-2 pt-4">
            {colors.map((color) => (
                <button
                    key={color}
                    onClick={() => dispatch(setAccent(color))}
                    className="w-8 h-8 rounded-full flex items-center justify-center transition-transform hover:scale-110"
                    style={{ backgroundColor: color }}
                >
                    {accent === color && (
                        <FiCheck className="w-4 h-4 text-white" />
                    )}
                </button>
            ))}

            {/* Custom Color Picker Trigger (Visual only for now) */}
            <button className="w-8 h-8 rounded-full bg-zinc-100 dark:bg-zinc-800 border border-zinc-300 dark:border-zinc-600 flex items-center justify-center text-zinc-500 hover:text-zinc-700 dark:hover:text-zinc-300">
                <span className="text-xs">?</span>
            </button>
        </div>
    );
};

export default ThemeColors;
