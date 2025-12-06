'use client';

import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '@/redux/store';
import { setSidebarColor } from '@/redux/slices/ui.slice';
import { FiCheck } from 'react-icons/fi';
import { gradientColors, solidColors } from '@/constants/sidebarColors.constant';
import { useRef } from 'react';
import { IoColorPaletteOutline } from 'react-icons/io5';


const SidebarColor = () => {
    const dispatch = useDispatch();
    const sidebarColor = useSelector((state: RootState) => state.ui.sidebarColor);
    const themeColor = useSelector((state: RootState) => state.ui.themeColor);
    const colorInputRef = useRef<HTMLInputElement>(null);
    const isCustomColor = !solidColors.includes(sidebarColor as any);
    
    return (
        <div className="space-y-4 gap-1 pt-4">
            <div>
                <p className="text-xs text-zinc-500 mb-2">Solid Colors</p>
                <div className="flex flex-wrap gap-2">
                    {solidColors.map((color) => (
                        <div className='border border-zinc-300 dark:border-gray-600  p-1 '>
                            <button
                                key={color}
                                onClick={() => dispatch(setSidebarColor(color))}
                                className="w-7 h-7  border border-zinc-200 dark:border-zinc-700 flex items-center justify-center transition-transform hover:scale-110"
                                style={{ backgroundColor: color }}
                            >
                                {sidebarColor === color && (
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
                                onChange={(e) => dispatch(setSidebarColor(e.target.value))}
                                value={isCustomColor ? themeColor : '#ffffff'}
                            />
                        </div>
                    </div>
                </div>
            </div>

            {/* <div>
                <p className="text-xs text-zinc-500 mb-2">Gradient Colors</p>
                <div className="flex flex-wrap gap-2">
                    {gradientColors.map((gradient) => (
                        <div className='border border-zinc-300 dark:border-gray-600  p-1 '>
                            <button
                                key={gradient}
                                onClick={() => dispatch(setSidebarColor(gradient))}
                                className="w-7 h-7  border border-zinc-200 dark:border-zinc-700 flex items-center justify-center transition-transform hover:scale-110"
                                style={{ background: gradient }}
                            >
                                {sidebarColor === gradient && (
                                    <FiCheck className="w-3 h-3 text-white" />
                                )}
                            </button>
                        </div>
                    ))}
                </div>
            </div> */}
        </div>
    );
};

export default SidebarColor;
