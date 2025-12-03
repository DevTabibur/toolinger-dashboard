'use client';

import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '@/redux/store';
import { setSidebarColor } from '@/redux/slices/ui.slice';
import { FiCheck } from 'react-icons/fi';

const solidColors = [
    '#111827', // Default Dark
    '#ffffff', // White
    '#1f2937', // Gray-800
    '#2563eb', // Blue-600
    '#7c3aed', // Violet-600
    '#059669', // Emerald-600
];

const gradientColors = [
    'linear-gradient(to bottom, #1e3a8a, #3b82f6)', // Blue
    'linear-gradient(to bottom, #581c87, #a855f7)', // Purple
    'linear-gradient(to bottom, #064e3b, #10b981)', // Emerald
    'linear-gradient(to bottom, #7f1d1d, #ef4444)', // Red
];

const SidebarColor = () => {
    const dispatch = useDispatch();
    const sidebarColor = useSelector((state: RootState) => state.ui.sidebarColor);

    return (
        <div className="space-y-4 gap-1 pt-4">
            <div>
                <p className="text-xs text-zinc-500 mb-2">Solid Colors</p>
                <div className="flex flex-wrap gap-2">
                    {solidColors.map((color) => (
                        <button
                            key={color}
                            onClick={() => dispatch(setSidebarColor(color))}
                            className="w-8 h-8 rounded-lg border border-zinc-200 dark:border-zinc-700 flex items-center justify-center transition-transform hover:scale-110"
                            style={{ backgroundColor: color }}
                        >
                            {sidebarColor === color && (
                                <FiCheck className={`w-4 h-4 ${color === '#ffffff' ? 'text-zinc-900' : 'text-white'}`} />
                            )}
                        </button>
                    ))}
                </div>
            </div>

            <div>
                <p className="text-xs text-zinc-500 mb-2">Gradient Colors</p>
                <div className="flex flex-wrap gap-2">
                    {gradientColors.map((gradient) => (
                        <button
                            key={gradient}
                            onClick={() => dispatch(setSidebarColor(gradient))}
                            className="w-8 h-8 rounded-lg border border-zinc-200 dark:border-zinc-700 flex items-center justify-center transition-transform hover:scale-110"
                            style={{ background: gradient }}
                        >
                            {sidebarColor === gradient && (
                                <FiCheck className="w-4 h-4 text-white" />
                            )}
                        </button>
                    ))}
                </div>
            </div>
        </div>
    );
};

export default SidebarColor;
