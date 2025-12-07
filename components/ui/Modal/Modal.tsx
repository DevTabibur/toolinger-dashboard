"use client";
import React, { useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { FiX } from "react-icons/fi";
import clsx from "clsx";

type ModalProps = {
    isOpen: boolean;
    onClose: () => void;
    title?: string;
    children: React.ReactNode;
    size?: "sm" | "md" | "lg" | "xl";
};

const Modal = ({ isOpen, onClose, title, children, size = "md" }: ModalProps) => {

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

    const sizes = {
        sm: "max-w-sm",
        md: "max-w-md",
        lg: "max-w-lg",
        xl: "max-w-xl",
    };

    return (
        <AnimatePresence>
            {isOpen && (
                <div className="fixed inset-0 z-[60] flex items-center justify-center p-4">
                    {/* Backdrop */}
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        onClick={onClose}
                        className="absolute inset-0 bg-black/50 backdrop-blur-sm"
                    />

                    {/* Modal Content */}
                    <motion.div
                        initial={{ opacity: 0, scale: 0.95, y: 10 }}
                        animate={{ opacity: 1, scale: 1, y: 0 }}
                        exit={{ opacity: 0, scale: 0.95, y: 10 }}
                        transition={{ duration: 0.2 }}
                        className={clsx(
                            "relative z-[70] w-full bg-white dark:bg-[var(--card)] shadow-2xl border border-zinc-200 dark:border-zinc-800 flex flex-col max-h-[90vh]",
                            sizes[size]
                        )}
                    >
                        {title && (
                            <div className="flex items-center justify-between px-6 py-4 border-b border-zinc-100 dark:border-zinc-800 shrink-0">
                                <h3 className="text-lg font-semibold">{title}</h3>
                                <button
                                    onClick={onClose}
                                    className="p-2 -mr-2 text-zinc-500 hover:bg-zinc-100 dark:text-zinc-400 dark:hover:bg-zinc-800 rounded-full transition-colors"
                                >
                                    <FiX className="w-5 h-5" />
                                </button>
                            </div>
                        )}
                        <div className="p-6 overflow-y-auto">
                            {children}
                        </div>
                    </motion.div>
                </div>
            )}
        </AnimatePresence>
    );
};

/*
 * How to use:
 * 
 * import { Modal, Button } from "@/components/ui";
 * const [isOpen, setIsOpen] = useState(false);
 * 
 * <Button onClick={() => setIsOpen(true)}>Open Modal</Button>
 * 
 * <Modal isOpen={isOpen} onClose={() => setIsOpen(false)} title="Confirmation">
 *   <p>Are you sure you want to proceed?</p>
 * </Modal>
 */

export default Modal;
