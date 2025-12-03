'use client';

import { FiSettings } from 'react-icons/fi';
import { motion } from 'framer-motion';
import { useDispatch } from 'react-redux';
import { toggleCustomizer } from '@/redux/slices/ui.slice';

const ThemeCustomizerTrigger = () => {
    const dispatch = useDispatch();

    return (
        <button
            onClick={() => dispatch(toggleCustomizer())}
            className="p-2 text-zinc-600 hover:bg-zinc-100 dark:text-zinc-300 dark:hover:bg-zinc-800 rounded-full transition-colors relative group"
            aria-label="Theme Customizer"
        >
            <motion.div
                animate={{ rotate: 360 }}
                transition={{
                    duration: 3,
                    repeat: Infinity,
                    ease: "linear"
                }}
            >
                <FiSettings className="w-5 h-5" />
            </motion.div>
        </button>
    );
};

export default ThemeCustomizerTrigger;
