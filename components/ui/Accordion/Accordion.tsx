"use client";
import React, { useState, createContext, useContext } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { FiChevronDown } from "react-icons/fi";
import clsx from "clsx";

type AccordionContextType = {
    activeItem: string | null;
    toggleItem: (value: string) => void;
};

const AccordionContext = createContext<AccordionContextType | undefined>(undefined);

type AccordionProps = {
    children: React.ReactNode;
    type?: "single" | "multiple"; // Simplified to single for now based on context need
    collapsible?: boolean;
    defaultValue?: string;
    className?: string;
};

const Accordion = ({ children, className, defaultValue }: AccordionProps) => {
    const [activeItem, setActiveItem] = useState<string | null>(defaultValue || null);

    const toggleItem = (value: string) => {
        setActiveItem((prev) => (prev === value ? null : value));
    };

    return (
        <AccordionContext.Provider value={{ activeItem, toggleItem }}>
            <div className={clsx("space-y-1", className)}>{children}</div>
        </AccordionContext.Provider>
    );
};

type AccordionItemProps = {
    value: string;
    children: React.ReactNode;
    className?: string;
};

const AccordionItem = ({ value, children, className }: AccordionItemProps) => {
    return (
        <div className={clsx("border border-zinc-200 dark:border-zinc-700 rounded-lg overflow-hidden", className)}>
            {React.Children.map(children, (child) => {
                if (React.isValidElement(child)) {
                    // @ts-ignore
                    return React.cloneElement(child, { value });
                }
                return child;
            })}
        </div>
    );
};

type AccordionTriggerProps = {
    children: React.ReactNode;
    value?: string; // Injected by Item
    className?: string;
};

const AccordionTrigger = ({ children, value, className }: AccordionTriggerProps) => {
    const context = useContext(AccordionContext);
    if (!context) throw new Error("AccordionTrigger must be used within Accordion");

    const isOpen = context.activeItem === value;

    return (
        <button
            onClick={() => value && context.toggleItem(value)}
            className={clsx(
                "flex items-center justify-between w-full px-4 py-3 text-sm font-medium text-left transition-colors hover:bg-zinc-50 dark:hover:bg-zinc-800/50",
                isOpen && "bg-zinc-50 dark:bg-zinc-800/50 text-[var(--primary)]",
                className
            )}
        >
            {children}
            <FiChevronDown
                className={clsx("w-4 h-4 transition-transform duration-200", isOpen && "transform rotate-180")}
            />
        </button>
    );
};

type AccordionContentProps = {
    children: React.ReactNode;
    value?: string; // Injected by Item
    className?: string;
};

const AccordionContent = ({ children, value, className }: AccordionContentProps) => {
    const context = useContext(AccordionContext);
    if (!context) throw new Error("AccordionContent must be used within Accordion");

    const isOpen = context.activeItem === value;

    return (
        <AnimatePresence initial={false}>
            {isOpen && (
                <motion.div
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: "auto", opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    transition={{ duration: 0.2 }}
                    className="overflow-hidden"
                >
                    <div className={clsx("px-4 py-3 text-sm text-zinc-600 dark:text-zinc-400 border-t border-zinc-200 dark:border-zinc-700", className)}>
                        {children}
                    </div>
                </motion.div>
            )}
        </AnimatePresence>
    );
};

/*
 * How to use:
 * 
 * import { Accordion, AccordionItem, AccordionTrigger, AccordionContent } from "@/components/ui";
 * 
 * <Accordion>
 *   <AccordionItem value="item-1">
 *     <AccordionTrigger>Is it accessible?</AccordionTrigger>
 *     <AccordionContent>Yes. It adheres to the WAI-ARIA design pattern.</AccordionContent>
 *   </AccordionItem>
 * </Accordion>
 */

export { Accordion, AccordionItem, AccordionTrigger, AccordionContent };
export default Accordion;
