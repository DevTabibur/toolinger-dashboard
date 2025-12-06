"use client";
import React, { useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import clsx from "clsx";

type AlertDialogProps = {
    isOpen: boolean;
    onClose: () => void;
    children: React.ReactNode;
};

const AlertDialog = ({ isOpen, onClose, children }: AlertDialogProps) => {
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

    return (
        <AnimatePresence>
            {isOpen && (
                <div className="fixed inset-0 z-[80] flex items-center justify-center p-4">
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        onClick={onClose}
                        className="absolute inset-0 bg-black/50 backdrop-blur-sm"
                    />
                    <motion.div
                        initial={{ opacity: 0, scale: 0.95, y: 10 }}
                        animate={{ opacity: 1, scale: 1, y: 0 }}
                        exit={{ opacity: 0, scale: 0.95, y: 10 }}
                        transition={{ duration: 0.2 }}
                        className="relative z-[90] w-full max-w-lg bg-white dark:bg-[var(--card)] rounded-xl shadow-2xl border border-zinc-200 dark:border-zinc-800 p-6 flex flex-col gap-4"
                    >
                        {children}
                    </motion.div>
                </div>
            )}
        </AnimatePresence>
    );
};

const AlertDialogContent = ({ children, className }: { children: React.ReactNode; className?: string }) => (
    <div className={clsx("space-y-4", className)}>{children}</div>
);

const AlertDialogHeader = ({ children, className }: { children: React.ReactNode; className?: string }) => (
    <div className={clsx("flex flex-col gap-2", className)}>{children}</div>
);

const AlertDialogTitle = ({ children, className }: { children: React.ReactNode; className?: string }) => (
    <h2 className={clsx("text-lg font-semibold", className)}>{children}</h2>
);

const AlertDialogDescription = ({ children, className }: { children: React.ReactNode; className?: string }) => (
    <p className={clsx("text-sm text-zinc-500 dark:text-zinc-400", className)}>{children}</p>
);

const AlertDialogFooter = ({ children, className }: { children: React.ReactNode; className?: string }) => (
    <div className={clsx("flex flex-col-reverse sm:flex-row sm:justify-end gap-2", className)}>
        {children}
    </div>
);

const AlertDialogAction = ({ children, onClick, className }: { children: React.ReactNode; onClick?: () => void; className?: string }) => (
    // Reusing standard button logic or composing it
    <button
        onClick={onClick}
        className={clsx(
            "inline-flex items-center justify-center px-4 py-2 font-semibold text-sm rounded-md transition-colors focus:outline-none focus:ring-2 focus:ring-offset-2",
            "bg-red-600 text-white hover:bg-red-700 focus:ring-red-600",
            className
        )}
    >
        {children}
    </button>
);

const AlertDialogCancel = ({ children, onClick, className }: { children: React.ReactNode; onClick?: () => void; className?: string }) => (
    <button
        onClick={onClick}
        className={clsx(
            "inline-flex items-center justify-center px-4 py-2 font-semibold text-sm rounded-md transition-colors focus:outline-none focus:ring-2 focus:ring-offset-2",
            "bg-white dark:bg-zinc-800 border border-zinc-200 dark:border-zinc-700 text-zinc-700 dark:text-zinc-300 hover:bg-zinc-50 dark:hover:bg-zinc-700",
            className
        )}
    >
        {children}
    </button>
);

/*
 * How to use:
 * 
 * import { AlertDialog, AlertDialogContent, AlertDialogHeader, AlertDialogTitle, AlertDialogDescription, AlertDialogFooter, AlertDialogAction, AlertDialogCancel } from "@/components/ui";
 * 
 * <AlertDialog isOpen={isOpen} onClose={() => setIsOpen(false)}>
 *   <AlertDialogContent>
 *     <AlertDialogHeader>
 *       <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
 *       <AlertDialogDescription>This action cannot be undone.</AlertDialogDescription>
 *     </AlertDialogHeader>
 *     <AlertDialogFooter>
 *       <AlertDialogCancel onClick={() => setIsOpen(false)}>Cancel</AlertDialogCancel>
 *       <AlertDialogAction onClick={handleDelete}>Continue</AlertDialogAction>
 *     </AlertDialogFooter>
 *   </AlertDialogContent>
 * </AlertDialog>
 */

export {
    AlertDialog,
    AlertDialogContent,
    AlertDialogHeader,
    AlertDialogTitle,
    AlertDialogDescription,
    AlertDialogFooter,
    AlertDialogAction,
    AlertDialogCancel
};
export default AlertDialog;
