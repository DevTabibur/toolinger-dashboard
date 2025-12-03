'use client';

import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '@/redux/store';
import { setBoxed } from '@/redux/slices/ui.slice';

const LayoutWidth = () => {
    const dispatch = useDispatch();
    const boxed = useSelector((state: RootState) => state.ui.boxed);

    return (
        <div className="flex gap-1 pt-4">
            <button
                onClick={() => dispatch(setBoxed(false))}
                className={`flex-1 px-2 py-1.5 text-sm font-medium rounded-lg border transition-colors ${!boxed
                        ? 'bg-blue-50 border-blue-500 text-blue-600 dark:bg-blue-900/20 dark:text-blue-400'
                        : 'bg-white border-zinc-200 text-zinc-700 hover:bg-zinc-50 dark:bg-zinc-800 dark:border-zinc-700 dark:text-zinc-300 dark:hover:bg-zinc-700'
                    }`}
            >
                Fluid Layout
            </button>
            <button
                onClick={() => dispatch(setBoxed(true))}
                className={`flex-1 px-2 py-1.5 text-sm font-medium rounded-lg border transition-colors ${boxed
                        ? 'bg-blue-50 border-blue-500 text-blue-600 dark:bg-blue-900/20 dark:text-blue-400'
                        : 'bg-white border-zinc-200 text-zinc-700 hover:bg-zinc-50 dark:bg-zinc-800 dark:border-zinc-700 dark:text-zinc-300 dark:hover:bg-zinc-700'
                    }`}
            >
                Boxed Layout
            </button>
        </div>
    );
};

export default LayoutWidth;
