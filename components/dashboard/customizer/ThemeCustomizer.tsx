'use client';

import { motion, AnimatePresence } from 'framer-motion';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '@/redux/store';
import { toggleCustomizer, resetTheme } from '@/redux/slices/ui.slice';
import { FiX } from 'react-icons/fi';
import CustomizerSection from './CustomizerSection';
import ThemeMode from './sections/ThemeMode';
import SelectLayouts from './sections/SelectLayouts';
import LayoutWidth from './sections/LayoutWidth';
import TopBarColor from './sections/TopBarColor';
import SidebarColor from './sections/SidebarColor';
// import SidebarBackground from './sections/SidebarBackground';
import ThemeColors from './sections/ThemeColors';
import { useLanguage } from '@/context/LanguageContext';


const ThemeCustomizer = () => {
    const dispatch = useDispatch();
    const isOpen = useSelector((state: RootState) => state.ui.customizerOpen);
    const { t } = useLanguage();

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
                        className="fixed inset-0 bg-black/50 z-50"

                    />

                    {/* Sidebar */}
                    <motion.div
                        initial={{ x: '100%' }}
                        animate={{ x: 0 }}
                        exit={{ x: '100%' }}
                        transition={{ type: 'spring', damping: 25, stiffness: 200 }}
                        className="fixed right-0 top-0 h-full md:w-96 w-80 bg-white dark:bg-[var(--background)] shadow-2xl z-50 flex flex-col border-l"
                    >
                        {/* Header */}
                        <div className="p-4 border-b border-zinc-200 dark:border-zinc-800 flex items-center justify-between ">
                            <div>
                                <h2 className="text-lg font-semibold text-zinc-900 dark:text-zinc-100">{t("Theme Customizer")}</h2>
                                <p className="text-xs text-zinc-500">{t("Choose your themes & layouts etc.")}</p>
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
                            <CustomizerSection title={t("Theme Mode")} defaultOpen={true}>
                                <ThemeMode />
                            </CustomizerSection>
                            <CustomizerSection title={t("Select Layouts")} >
                                <SelectLayouts />
                            </CustomizerSection>

                            <CustomizerSection title={t("Layout Width")}>
                                <LayoutWidth />
                            </CustomizerSection>

                            <CustomizerSection title={t("Top Bar Color")}>
                                <TopBarColor />
                            </CustomizerSection>

                            <CustomizerSection title={t("Sidebar Color")}>
                                <SidebarColor />
                            </CustomizerSection>



                            {/* <CustomizerSection title="Sidebar Background">
                                <SidebarBackground />
                            </CustomizerSection> */}

                            <CustomizerSection title={t("Theme Colors")}>
                                <ThemeColors />
                            </CustomizerSection>
                        </div>

                        {/* Footer */}
                        <div className="p-4 flex gap-2">
                            <button
                                onClick={() => dispatch(resetTheme())}
                                className="flex-1 px-4 py-2 text-sm font-medium text-white bg-[var(--primary)] border dark:bg-[var(--primary)]   dark:bg-[var(--primary)]/20 dark:border-[var(--primary)] dark:hover:bg-[var(--primary)]/20 transition-colors"
                            >
                                {t("Reset")}
                            </button>
                            <button
                                onClick={() => dispatch(toggleCustomizer())}
                                className="flex-1 px-4 py-2 text-sm font-medium text-white  border bg-[var(--primary)]  dark:bg-[var(--primary)]/20 dark:border-[var(--primary)]  transition-colors"
                            >
                                {t("Close")}
                            </button>

                        </div>
                    </motion.div>
                </>
            )}
        </AnimatePresence>
    );
};

export default ThemeCustomizer;
