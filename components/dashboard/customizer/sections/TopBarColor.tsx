'use client';

import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '@/redux/store';
import { setThemeColor, setTopbarColor } from '@/redux/slices/ui.slice';
import { FiCheck } from 'react-icons/fi';
import { colors } from '@/constants/topbarColors.constant';
import { useRef } from 'react';
import { themeColors } from '@/constants/themeColors.constant';
import { IoColorPaletteOutline } from 'react-icons/io5';



const TopBarColor = () => {
    const dispatch = useDispatch();
    const topbarColor = useSelector((state: RootState) => state.ui.topbarColor);
    const themeColor = useSelector((state: RootState) => state.ui.themeColor);
    const colorInputRef = useRef<HTMLInputElement>(null);

    const handleColorChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        dispatch(setThemeColor(e.target.value));
    };

    const isCustomColor = !themeColors.includes(themeColor);
    return (
        <div className="pt-4">
            <p className="text-xs text-zinc-500 mb-2">Solid Colors</p>
            <div className="flex flex-wrap gap-2">
                {colors.map((color) => (
                    <div className='border border-zinc-300 dark:border-gray-600  p-1 '>
                        <button
                            key={color}
                            onClick={() => dispatch(setTopbarColor(color))}
                            className="w-7 h-7  border border-zinc-200 dark:border-zinc-700 flex items-center justify-center transition-transform hover:scale-110"
                            style={{ backgroundColor: color }}
                        >
                            {topbarColor === color && (
                                <FiCheck className={`w-3 h-3 ${color === '#ffffff' ? 'text-zinc-900' : 'text-white'}`} />
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
                            onChange={(e) => dispatch(setTopbarColor(e.target.value))}
                            value={isCustomColor ? themeColor : '#ffffff'}
                        />
                    </div>
                </div>
            </div>
        </div>
    );
};

export default TopBarColor;
