'use client';

import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '@/redux/store';
import { setTopbarColor } from '@/redux/slices/ui.slice';
import { FiCheck } from 'react-icons/fi';

const colors = [
    '#ffffff', // White
    '#1f2937', // Gray-800
    '#111827', // Gray-900
    '#2563eb', // Blue-600
    '#7c3aed', // Violet-600
    '#059669', // Emerald-600
    '#4f46e5', // Indigo-600
];

const TopBarColor = () => {
    const dispatch = useDispatch();
    const topbarColor = useSelector((state: RootState) => state.ui.topbarColor);

    return (
        <div className="pt-4">
            <p className="text-xs text-zinc-500 mb-2">Solid Colors</p>
            <div className="flex flex-wrap gap-2">
                {colors.map((color) => (
                    <button
                        key={color}
                        onClick={() => dispatch(setTopbarColor(color))}
                        className="w-8 h-8 rounded-lg border border-zinc-200 dark:border-zinc-700 flex items-center justify-center transition-transform hover:scale-110"
                        style={{ backgroundColor: color }}
                    >
                        {topbarColor === color && (
                            <FiCheck className={`w-4 h-4 ${color === '#ffffff' ? 'text-zinc-900' : 'text-white'}`} />
                        )}
                    </button>
                ))}
            </div>
        </div>
    );
};

export default TopBarColor;
