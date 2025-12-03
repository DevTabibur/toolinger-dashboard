'use client';

import { motion, AnimatePresence } from 'framer-motion';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '@/redux/store';
import { toggleCustomizer } from '@/redux/slices/ui.slice';
import { FiX } from 'react-icons/fi';
import CustomizerSection from './CustomizerSection';
import ThemeMode from './sections/ThemeMode';
import SelectLayouts from './sections/SelectLayouts';
import LayoutWidth from './sections/LayoutWidth';
import TopBarColor from './sections/TopBarColor';
import SidebarColor from './sections/SidebarColor';
import SidebarBackground from './sections/SidebarBackground';
import ThemeColors from './sections/ThemeColors';


const ThemeCustomizer = () => {
    const dispatch = useDispatch();
    const isOpen = useSelector((state: RootState) => state.ui.customizerOpen);

    return (
        <AnimatePresence>
            {isOpen && (
                <>
                    {/* Backdrop */}
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        onClick={() => dispatch(toggleCustomizer())}
                        className="fixed inset-0 bg-black/50 z-40"
                    />

                    {/* Sidebar */}
                    <motion.div
                        initial={{ x: '100%' }}
                        animate={{ x: 0 }}
                        exit={{ x: '100%' }}
                        transition={{ type: 'spring', damping: 25, stiffness: 200 }}
                        className="fixed right-0 top-0 h-full md:w-96 w-80 bg-white dark:bg-zinc-900 shadow-2xl z-50 flex flex-col"
                    >
                        {/* Header */}
                        <div className="p-4 border-b border-zinc-200 dark:border-zinc-800 flex items-center justify-between bg-zinc-50 dark:bg-zinc-900">
                            <div>
                                <h2 className="text-lg font-semibold text-zinc-900 dark:text-zinc-100">Theme Customizer</h2>
                                <p className="text-xs text-zinc-500">Choose your themes & layouts etc.</p>
                            </div>
                            <button
                                onClick={() => dispatch(toggleCustomizer())}
                                className="p-1 text-zinc-500 hover:text-zinc-700 dark:hover:text-zinc-300 transition-colors"
                            >
                                <FiX className="w-5 h-5" />
                            </button>
                        </div>

                        {/* Content */}
                        <div className="flex-1 overflow-y-auto">
                            <CustomizerSection title="Theme Mode">
                                <ThemeMode />
                            </CustomizerSection>
                            <CustomizerSection title="Select Layouts" defaultOpen={true}>
                                <SelectLayouts />
                            </CustomizerSection>

                            <CustomizerSection title="Layout Width">
                                <LayoutWidth />
                            </CustomizerSection>

                            <CustomizerSection title="Top Bar Color">
                                <TopBarColor />
                            </CustomizerSection>

                            <CustomizerSection title="Sidebar Color">
                                <SidebarColor />
                            </CustomizerSection>



                            <CustomizerSection title="Sidebar Background">
                                <SidebarBackground />
                            </CustomizerSection>

                            <CustomizerSection title="Theme Colors">
                                <ThemeColors />
                            </CustomizerSection>
                        </div>

                        {/* Footer */}
                        <div className="p-4 border-t border-zinc-200 dark:border-zinc-800 flex gap-2">
                            <button
                                onClick={() => window.location.reload()}
                                className="flex-1 px-4 py-2 text-sm font-medium text-zinc-700 bg-white border border-zinc-300 rounded-lg hover:bg-zinc-50 dark:bg-zinc-800 dark:text-zinc-300 dark:border-zinc-700 dark:hover:bg-zinc-700 transition-colors"
                            >
                                Reset
                            </button>
                            <button className="flex-1 px-4 py-2 text-sm font-medium text-white bg-zinc-900 rounded-lg hover:bg-zinc-800 dark:bg-zinc-100 dark:text-zinc-900 dark:hover:bg-zinc-200 transition-colors">
                                Buy Product
                            </button>
                        </div>
                    </motion.div>
                </>
            )}
        </AnimatePresence>
    );
};

export default ThemeCustomizer;
