"use client";
import React from "react";
import clsx from "clsx";

type ToggleProps = {
    pressed?: boolean;
    onPressedChange?: (pressed: boolean) => void;
    children: React.ReactNode;
    className?: string;
    variant?: "default" | "outline";
    size?: "sm" | "md" | "lg";
    disabled?: boolean;
};

const Toggle = ({
    pressed,
    onPressedChange,
    children,
    className,
    variant = "default",
    size = "md",
    disabled,
}: ToggleProps) => {
    const handleclick = () => {
        if (!disabled && onPressedChange) {
            onPressedChange(!pressed);
        }
    };

    const variants = {
        default: "hover:bg-zinc-100 dark:hover:bg-zinc-800 text-zinc-500 dark:text-zinc-400",
        outline: "border border-zinc-200 dark:border-zinc-700 hover:bg-zinc-100 dark:hover:bg-zinc-800 text-zinc-500 dark:text-zinc-400",
    };

    const sizes = {
        sm: "h-8 px-2 text-xs",
        md: "h-9 px-3 text-sm",
        lg: "h-10 px-4 text-base",
    };

    return (
        <button
            type="button"
            aria-pressed={pressed}
            disabled={disabled}
            onClick={handleclick}
            className={clsx(
                "inline-flex items-center justify-center rounded-md font-medium transition-colors focus:outline-none focus:ring-2 focus:ring-[var(--primary)] focus:ring-offset-2 disabled:pointer-events-none disabled:opacity-50",
                variants[variant],
                sizes[size],
                pressed && "bg-[var(--primary)] text-white hover:bg-[var(--primary-dark)] dark:bg-[var(--primary)] dark:text-white dark:hover:bg-[var(--primary-dark)]",
                className
            )}
        >
            {children}
        </button>
    );
};

/*
 * How to use:
 * 
 * import { Toggle } from "@/components/ui";
 * import { FiBold } from "react-icons/fi";
 * 
 * <Toggle pressed={isBold} onPressedChange={setIsBold}>
 *   <FiBold />
 * </Toggle>
 */

export default Toggle;
