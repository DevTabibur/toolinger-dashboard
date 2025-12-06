"use client";
import React, { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import clsx from "clsx";

export type DropdownItem = {
    label: string;
    onClick?: () => void;
    icon?: React.ReactNode;
    color?: "default" | "danger" | "primary";
};

type DropdownProps = {
    trigger: React.ReactNode;
    items: DropdownItem[];
    align?: "left" | "right";
    width?: string;
};

const Dropdown = ({ trigger, items, align = "left", width = "w-48" }: DropdownProps) => {
    const [isOpen, setIsOpen] = useState(false);
    const dropdownRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        const handleClickOutside = (event: MouseEvent) => {
            if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
                setIsOpen(false);
            }
        };
        document.addEventListener("mousedown", handleClickOutside);
        return () => document.removeEventListener("mousedown", handleClickOutside);
    }, []);

    const handleItemClick = (item: DropdownItem) => {
        if (item.onClick) item.onClick();
        setIsOpen(false);
    };

    return (
        <div className="relative inline-block text-left" ref={dropdownRef}>
            <div onClick={() => setIsOpen(!isOpen)}>{trigger}</div>

            <AnimatePresence>
                {isOpen && (
                    <motion.div
                        initial={{ opacity: 0, y: 5, scale: 0.95 }}
                        animate={{ opacity: 1, y: 0, scale: 1 }}
                        exit={{ opacity: 0, y: 5, scale: 0.95 }}
                        transition={{ duration: 0.1 }}
                        className={clsx(
                            "absolute z-50 mt-2 bg-white dark:bg-[var(--card)] rounded-xl shadow-lg border border-zinc-100 dark:border-zinc-800 overflow-hidden",
                            align === "left" ? "left-0" : "right-0",
                            width
                        )}
                    >
                        <div className="py-1">
                            {items.map((item, index) => (
                                <button
                                    key={index}
                                    onClick={() => handleItemClick(item)}
                                    className={clsx(
                                        "w-full text-left px-4 py-2 text-sm flex items-center gap-2 hover:bg-zinc-50 dark:hover:bg-zinc-800 transition-colors",
                                        item.color === "danger"
                                            ? "text-red-600 dark:text-red-400"
                                            : item.color === "primary"
                                                ? "text-[var(--primary)]"
                                                : "text-zinc-700 dark:text-zinc-200"
                                    )}
                                    disabled={!item.onClick}
                                >
                                    {item.icon && <span className="text-lg opacity-80">{item.icon}</span>}
                                    {item.label}
                                </button>
                            ))}
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>
        </div>
    );
};

/*
 * How to use:
 * 
 * import { Dropdown } from "@/components/ui";
 * import { FiMoreVertical, FiEdit, FiTrash } from "react-icons/fi";
 * 
 * <Dropdown 
 *   trigger={<button><FiMoreVertical /></button>}
 *   items={[
 *     { label: "Edit", icon: <FiEdit />, onClick: () => {} },
 *     { label: "Delete", icon: <FiTrash />, color: "danger", onClick: () => {} }
 *   ]}
 *   align="right"
 * />
 */

export default Dropdown;
