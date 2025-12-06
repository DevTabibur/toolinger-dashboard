'use client';

import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '@/redux/store';
import { setLayoutMode, setRtl } from '@/redux/slices/ui.slice';
import { layouts } from '@/constants/selectLayouts.constant';
import { useLanguage } from '@/context/LanguageContext';


const SelectLayouts = () => {
    const dispatch = useDispatch();
    const currentLayout = useSelector((state: RootState) => state.ui.layoutMode);
    const isRtl = useSelector((state: RootState) => state.ui.rtl);
    const { t } = useLanguage();

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
                        className={`flex flex-col items-center gap-0 p-1 border-2 border-primary transition-all ${isActive
                            ? 'border-[var(--primary)] bg-[var(--primary-100)] dark:bg-[var(--primary-700)] dark:border-[var(--primary-700)]'
                            : 'border-transparent hover:bg-zinc-100 dark:hover:bg-zinc-800'
                            }`}
                    >

                        <layout.icon className="w-6 h-6 dark:text-zinc-400" />
                        <span className="text-xs text-zinc-600 dark:text-white">{t(layout.name)}</span>
                    </button>
                );
            })}
        </div>
    );
};

export default SelectLayouts;
