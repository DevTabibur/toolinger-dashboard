"use client";
import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import clsx from "clsx";

type TooltipProps = {
    content: string;
    children: React.ReactNode;
    placement?: "top" | "bottom" | "left" | "right";
    delay?: number;
    className?: string;
};

const Tooltip = ({ content, children, placement = "top", delay = 200, className }: TooltipProps) => {
    const [isVisible, setIsVisible] = useState(false);
    const timeoutRef = React.useRef<NodeJS.Timeout | null>(null);

    const showTooltip = () => {
        timeoutRef.current = setTimeout(() => setIsVisible(true), delay);
    };

    const hideTooltip = () => {
        if (timeoutRef.current) clearTimeout(timeoutRef.current);
        setIsVisible(false);
    };

    const positions = {
        top: "-top-2 left-1/2 -translate-x-1/2 -translate-y-full mb-2",
        bottom: "-bottom-2 left-1/2 -translate-x-1/2 translate-y-full mt-2",
        left: "-left-2 top-1/2 -translate-y-1/2 -translate-x-full mr-2",
        right: "-right-2 top-1/2 -translate-y-1/2 translate-x-full ml-2",
    };

    return (
        <div className="relative inline-block" onMouseEnter={showTooltip} onMouseLeave={hideTooltip}>
            {children}
            <AnimatePresence>
                {isVisible && (
                    <motion.div
                        initial={{ opacity: 0, scale: 0.9 }}
                        animate={{ opacity: 1, scale: 1 }}
                        exit={{ opacity: 0, scale: 0.9 }}
                        transition={{ duration: 0.1 }}
                        className={clsx(
                            "absolute z-[100] px-2 py-1 text-xs text-white bg-zinc-900 rounded shadow-sm whitespace-nowrap pointer-events-none",
                            positions[placement],
                            className
                        )}
                    >
                        {content}
                        <div
                            className={clsx(
                                "absolute w-0 h-0 border-4 border-transparent",
                                placement === "top" && "top-full left-1/2 -translate-x-1/2 border-t-zinc-900",
                                placement === "bottom" && "bottom-full left-1/2 -translate-x-1/2 border-b-zinc-900",
                                placement === "left" && "left-full top-1/2 -translate-y-1/2 border-l-zinc-900",
                                placement === "right" && "right-full top-1/2 -translate-y-1/2 border-r-zinc-900"
                            )}
                        />
                    </motion.div>
                )}
            </AnimatePresence>
        </div>
    );
};

/*
 * How to use:
 * 
 * import { Tooltip } from "@/components/ui";
 * 
 * <Tooltip content="Add new item">
 *   <Button>Add</Button>
 * </Tooltip>
 */

export default Tooltip;
