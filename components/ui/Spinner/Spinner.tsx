"use client";
import React from "react";
import clsx from "clsx";

type SpinnerProps = {
    size?: "sm" | "md" | "lg" | "xl";
    className?: string;
};

const Spinner = ({ size = "md", className }: SpinnerProps) => {
    const sizes = {
        sm: "w-4 h-4 border-2",
        md: "w-6 h-6 border-2",
        lg: "w-8 h-8 border-3",
        xl: "w-12 h-12 border-4",
    };

    return (
        <div
            className={clsx(
                "animate-spin rounded-full border-zinc-200 dark:border-zinc-700 border-t-[var(--primary)]",
                sizes[size],
                className
            )}
        />
    );
};

/*
 * How to use:
 * 
 * import { Spinner } from "@/components/ui";
 * 
 * <Spinner size="lg" />
 */

export default Spinner;
