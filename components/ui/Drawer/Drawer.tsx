"use client";
import React, { useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { FiX } from "react-icons/fi";
import clsx from "clsx";

type DrawerProps = {
    isOpen: boolean;
    onClose: () => void;
    position?: "left" | "right";
    children: React.ReactNode;
    title?: string;
    width?: string;
    className?: string;
};

const Drawer = ({
    isOpen,
    onClose,
    position = "right",
    children,
    title,
    width = "w-80",
    className,
}: DrawerProps) => {

    useEffect(() => {
        if (isOpen) {
            document.body.style.overflow = "hidden";
        } else {
            document.body.style.overflow = "unset";
        }
        return () => {
            document.body.style.overflow = "unset";
        };
    }, [isOpen]);

    const variants = {
        left: { x: "-100%" },
        right: { x: "100%" },
    };

    return (
        <AnimatePresence>
            {isOpen && (
                <>
                    {/* Backdrop */}
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        onClick={onClose}
                        className="fixed inset-0 bg-black/50 z-[60] backdrop-blur-sm"
                    />

                    {/* Drawer */}
                    <motion.div
                        initial={variants[position]}
                        animate={{ x: 0 }}
                        exit={variants[position]}
                        transition={{ type: "spring", damping: 25, stiffness: 200 }}
                        className={clsx(
                            "fixed inset-y-0 z-[70] bg-white dark:bg-[var(--card)] shadow-2xl flex flex-col border-zinc-200 dark:border-zinc-800",
                            position === "left" ? "left-0 border-r" : "right-0 border-l",
                            width,
                            className
                        )}
                    >
                        {/* Header */}
                        <div className="flex items-center justify-between px-6 py-4 border-b border-zinc-100 dark:border-zinc-800 shrink-0">
                            <h3 className="text-lg font-semibold">{title}</h3>
                            <button
                                onClick={onClose}
                                className="p-2 -mr-2 text-zinc-500 hover:bg-zinc-100 dark:text-zinc-400 dark:hover:bg-zinc-800 rounded-full transition-colors"
                            >
                                <FiX className="w-5 h-5" />
                            </button>
                        </div>

                        {/* Content */}
                        <div className="flex-1 overflow-y-auto p-6">
                            {children}
                        </div>
                    </motion.div>
                </>
            )}
        </AnimatePresence>
    );
};

/*
 * How to use:
 * 
 * import { Drawer } from "@/components/ui";
 * 
 * const [isOpen, setIsOpen] = useState(false);
 * 
 * <Drawer isOpen={isOpen} onClose={() => setIsOpen(false)} title="Drawer Title">
 *   <p>Drawer content here...</p>
 * </Drawer>
 */

export default Drawer;
