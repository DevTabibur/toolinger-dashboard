"use client";
import React from "react";
import clsx from "clsx";

type ProgressProps = {
    value: number; // 0 to 100
    max?: number;
    className?: string;
    variant?: "default" | "success" | "warning" | "danger";
    size?: "sm" | "md" | "lg";
    label?: boolean;
};

const Progress = ({ value, max = 100, className, variant = "default", size = "md", label = false }: ProgressProps) => {
    const percentage = Math.min(100, Math.max(0, (value / max) * 100));

    const sizes = {
        sm: "h-2",
        md: "h-4",
        lg: "h-6",
    };

    const colors = {
        default: "bg-[var(--primary)]",
        success: "bg-green-500",
        warning: "bg-yellow-500",
        danger: "bg-red-500",
    };

    return (
        <div className={clsx("w-full bg-zinc-100 dark:bg-zinc-800 rounded-full overflow-hidden", sizes[size], className)} role="progressbar" aria-valuenow={value} aria-valuemin={0} aria-valuemax={max}>
            <div
                className={clsx("h-full transition-all duration-300 flex items-center justify-center text-[10px] font-medium text-white", colors[variant])}
                style={{ width: `${percentage}%` }}
            >
                {label && size !== "sm" && `${Math.round(percentage)}%`}
            </div>
        </div>
    );
};

/*
 * How to use:
 * 
 * import { Progress } from "@/components/ui";
 * 
 * <Progress value={60} />
 * <Progress value={80} variant="success" size="lg" label />
 */

export default Progress;
