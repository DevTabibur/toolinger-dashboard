'use client';

import { useRef } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '@/redux/store';
import { setThemeColor } from '@/redux/slices/ui.slice';
import { FiCheck } from 'react-icons/fi';
import { IoColorPaletteOutline } from 'react-icons/io5';
import { themeColors } from '@/constants/themeColors.constant';



const 
ThemeColors = () => {
    const dispatch = useDispatch();
    const themeColor = useSelector((state: RootState) => state.ui.themeColor);
    const colorInputRef = useRef<HTMLInputElement>(null);

    const handleColorChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        dispatch(setThemeColor(e.target.value));
    };

    const isCustomColor = !themeColors.includes(themeColor);

    return (
        <div className="flex flex-wrap gap-1 pt-4">
            {themeColors.map((color) => (
                <div className='border border-zinc-300 dark:border-gray-600  p-1 '>
                    <button
                        key={color}
                        onClick={() => dispatch(setThemeColor(color))}
                        className="w-7 h-7  flex items-center justify-center transition-transform hover:scale-110"
                        style={{ backgroundColor: color }}
                    >
                        {themeColor === color && (
                            <FiCheck className="w-3 h-3 text-white" />
                        )}
                    </button>
                </div>
            ))}

            {/* Custom Color Picker Trigger */}
            <div className="relative">
                    <div className='border border-zinc-300 dark:border-gray-600  p-1 '>
                        <button
                        onClick={() => colorInputRef.current?.click()}
                        className={`w-7 h-7  flex items-center justify-center transition-all hover:scale-110 ${isCustomColor
                            ? 'border-[var(--brand-start)] bg-[var(--brand-start)]/10 text-[var(--brand-start)]'
                            : 'bg-zinc-100 dark:bg-zinc-800 border-zinc-300 dark:border-zinc-600 text-zinc-500 hover:text-zinc-700 dark:hover:text-zinc-300'
                            }`}
                    >
                        <IoColorPaletteOutline className="w-5 h-5" />
                    </button>
                    <input
                        ref={colorInputRef}
                        type="color"
                        className="absolute inset-0 opacity-0 w-0 h-0 pointer-events-none"
                        onChange={handleColorChange}
                        value={isCustomColor ? themeColor : '#ffffff'}
                    />
                </div>
            </div>
        </div>
    );
};

export default ThemeColors;
