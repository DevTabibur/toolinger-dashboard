'use client';

import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '@/redux/store';
import { setLayoutMode } from '@/redux/slices/ui.slice';
import { FiLayout, FiSidebar, FiColumns } from 'react-icons/fi';

const layouts = [
    { id: 'default', name: 'Default', icon: FiLayout },
    { id: 'mini', name: 'Mini', icon: FiSidebar },
    { id: 'two-column', name: 'Two Column', icon: FiColumns },
    { id: 'horizontal', name: 'Horizontal', icon: FiLayout },
    { id: 'detached', name: 'Detached', icon: FiLayout },
    { id: 'without-header', name: 'Without Header', icon: FiLayout },
] as const;

const SelectLayouts = () => {
    const dispatch = useDispatch();
    const currentLayout = useSelector((state: RootState) => state.ui.layoutMode);

    return (
        <div className="grid grid-cols-3 gap-0 pt-4">
            {layouts.map((layout) => (
                <button
                    key={layout.id}
                    onClick={() => dispatch(setLayoutMode(layout.id))}
                    className={`flex flex-col items-center gap-2 p-2 rounded-lg border-2 transition-all ${currentLayout === layout.id
                            ? 'border-blue-500 bg-blue-50 dark:bg-blue-900/20'
                            : 'border-transparent hover:bg-zinc-100 dark:hover:bg-zinc-800'
                        }`}
                >
                    <div className={`w-10 h-8 rounded border flex items-center justify-center ${currentLayout === layout.id ? 'bg-blue-500 border-blue-500 text-white' : 'bg-white dark:bg-zinc-800 border-zinc-300 dark:border-zinc-700'
                        }`}>
                        <layout.icon className="w-4 h-4" />
                    </div>
                    <span className="text-xs text-zinc-600 dark:text-zinc-400">{layout.name}</span>
                </button>
            ))}
        </div>
    );
};

export default SelectLayouts;
