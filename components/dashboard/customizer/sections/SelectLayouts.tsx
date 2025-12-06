'use client';

import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '@/redux/store';
import { setLayoutMode, setRtl } from '@/redux/slices/ui.slice';
import { layouts } from '@/constants/selectLayouts.constant';


const SelectLayouts = () => {
    const dispatch = useDispatch();
    const currentLayout = useSelector((state: RootState) => state.ui.layoutMode);
    const isRtl = useSelector((state: RootState) => state.ui.rtl);

    const handleLayoutClick = (id: string) => {
        if (id === 'rtl') {
            dispatch(setRtl(true));
        } else {
            dispatch(setLayoutMode(id as any));
            dispatch(setRtl(false));
        }
    };

    return (
        <div className="grid grid-cols-3 gap-0 pt-4">
            {layouts.map((layout) => {
                const isActive = layout.id === 'rtl' ? isRtl : (currentLayout === layout.id && !isRtl);

                return (
                    <button
                        key={layout.id}
                        onClick={() => handleLayoutClick(layout.id)}
                        className={`flex flex-col items-center gap-2 p-2 border-2 transition-all ${isActive
                            ? 'border-blue-500 bg-blue-50 dark:bg-blue-900/20'
                            : 'border-transparent hover:bg-zinc-100 dark:hover:bg-zinc-800'
                            }`}
                    >
                        <div className={`w-10 h-8  border flex items-center justify-center ${isActive ? 'bg-blue-500 border-blue-500 text-white' : 'bg-white dark:bg-zinc-800 border-zinc-300 dark:border-zinc-700'
                            }`}>
                            <layout.icon className="w-4 h-4" />
                        </div>
                        <span className="text-xs text-zinc-600 dark:text-zinc-400">{layout.name}</span>
                    </button>
                );
            })}
        </div>
    );
};

export default SelectLayouts;
