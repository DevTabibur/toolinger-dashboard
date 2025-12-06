'use client';

import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '@/redux/store';
import { setLayoutWidth } from '@/redux/slices/ui.slice';
import { TbLayoutList } from "react-icons/tb";
import { RxStretchHorizontally } from "react-icons/rx";

const LayoutWidth = () => {
    const dispatch = useDispatch();
    const layoutWidth = useSelector((state: RootState) => state.ui.layoutWidth);
    return (
        <>

            <div className="flex gap-1 pt-4">
                <button
                    onClick={() => dispatch(setLayoutWidth("fluid"))}
                    // className={`flex-1 flex  items-center justify-center gap-2 px-2 py-1.5 text-sm font-medium  border transition-colors ${layoutWidth === "fluid"
                    //     ? 'bg-blue-50 border-blue-500 text-blue-600 dark:bg-blue-900/20 dark:text-blue-400'
                    //     : 'bg-white border-zinc-200 text-zinc-700 hover:bg-zinc-50 dark:bg-zinc-800 dark:border-zinc-700 dark:text-zinc-300 dark:hover:bg-zinc-700'
                    //     }`}
                    className={`flex-1 flex  items-center justify-center gap-2 px-2 py-1.5 text-sm font-medium  border transition-colors ${layoutWidth === "fluid"
                        ? 'bg-[var(--primary)] border-[var(--primary)] text-white dark:bg-[var(--primary)]/20 '
                        : 'bg-white border-zinc-200 text-zinc-700 hover:bg-zinc-50 dark:bg-zinc-800 dark:border-zinc-700 dark:text-zinc-300 dark:hover:bg-zinc-700'
                        }`}
                >
                    <TbLayoutList className="w-4 h-4" />
                    Fluid
                </button>
                <button
                    onClick={() => dispatch(setLayoutWidth("stretched"))}
                    className={`flex-1 flex  items-center justify-center gap-2 px-2 py-1.5 text-sm font-medium border transition-colors ${layoutWidth === "stretched"
                        ? 'bg-[var(--primary)] border-[var(--primary)] text-[var(--primary)] dark:bg-[var(--primary)]/20 dark:text-[var(--primary)]'
                        : 'bg-white border-zinc-200 text-zinc-700 hover:bg-zinc-50 dark:bg-zinc-800 dark:border-zinc-700 dark:text-zinc-300 dark:hover:bg-zinc-700'
                        }`}
                >
                    <RxStretchHorizontally className="w-4 h-4" />
                    Stretched
                </button>

            </div>
        </>




    );
};

export default LayoutWidth;
