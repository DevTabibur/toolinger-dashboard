"use client";
import React from "react";
import clsx from "clsx";

type KbdProps = {
    children: React.ReactNode;
    className?: string;
    size?: "sm" | "md" | "lg";
};

const Kbd = ({ children, className, size = "sm" }: KbdProps) => {
    const sizes = {
        sm: "px-1.5 py-0.5 text-xs h-5",
        md: "px-2 py-1 text-sm h-7",
        lg: "px-2.5 py-1.5 text-base h-9",
    };

    return (
        <kbd
            className={clsx(
                "inline-flex items-center justify-center font-sans font-medium text-zinc-500 dark:text-zinc-400 bg-zinc-100 dark:bg-zinc-800 border border-zinc-200 dark:border-zinc-700 rounded select-none",
                sizes[size],
                className
            )}
        >
            {children}
        </kbd>
    );
};

/*
 * How to use:
 * 
 * import { Kbd } from "@/components/ui";
 * 
 * <div className="text-sm">
 *   Press <Kbd>⌘</Kbd> + <Kbd>K</Kbd> to search
 * </div>
 */

export default Kbd;
