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
            className="fixed top-1/2 right-0 z-50 p-3 bg-[var(--brand-start)] text-white rounded-l-lg shadow-lg hover:bg-[var(--brand-end)] transition-colors group"
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
