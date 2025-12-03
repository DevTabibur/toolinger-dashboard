'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import { TbZoomPan, TbMaximize, TbMinimize } from 'react-icons/tb';

const ZoomToggle = () => {
    const [isFullScreen, setIsFullScreen] = useState(false);

    const toggleFullScreen = () => {
        if (!document.fullscreenElement) {
            document.documentElement.requestFullscreen();
            setIsFullScreen(true);
        } else {
            if (document.exitFullscreen) {
                document.exitFullscreen();
                setIsFullScreen(false);
            }
        }
    };

    return (
        <motion.button
            whileTap={{ scale: 0.95 }}
            onClick={toggleFullScreen}
            className="p-2 text-zinc-500 hover:bg-zinc-100 dark:text-zinc-400 dark:hover:bg-zinc-800 rounded-full transition-colors"
            title={isFullScreen ? "Exit Fullscreen" : "Enter Fullscreen"}
        >
            {isFullScreen ? <TbMinimize className="w-5 h-5" /> : <TbMaximize className="w-5 h-5" />}
        </motion.button>
    );
};

export default ZoomToggle;
