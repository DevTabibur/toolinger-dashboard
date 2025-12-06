"use client";
import React from "react";
import clsx from "clsx";

type BadgeProps = {
    variant?: "solid" | "outline" | "soft";
    color?: "primary" | "secondary" | "success" | "warning" | "danger";
    children: React.ReactNode;
    className?: string;
    size?: "sm" | "md";
};

const Badge = ({
    variant = "solid",
    color = "primary",
    children,
    className,
    size = "md",
}: BadgeProps) => {

    const sizes = {
        sm: "px-2 py-0.5 text-xs",
        md: "px-2.5 py-0.5 text-sm",
    };

    const styles = {
        primary: {
            solid: "bg-[var(--primary)] text-[var(--primary-foreground)]",
            outline: "border border-[var(--primary)] text-[var(--primary)]",
            soft: "bg-[var(--primary)]/10 text-[var(--primary)]",
        },
        secondary: {
            solid: "bg-zinc-500 text-white",
            outline: "border border-zinc-500 text-zinc-500",
            soft: "bg-zinc-100 text-zinc-700 dark:bg-zinc-800 dark:text-zinc-300",
        },
        success: {
            solid: "bg-green-500 text-white",
            outline: "border border-green-500 text-green-600",
            soft: "bg-green-50 text-green-700 dark:bg-green-900/20 dark:text-green-400",
        },
        warning: {
            solid: "bg-yellow-500 text-white",
            outline: "border border-yellow-500 text-yellow-600",
            soft: "bg-yellow-50 text-yellow-700 dark:bg-yellow-900/20 dark:text-yellow-400",
        },
        danger: {
            solid: "bg-red-500 text-white",
            outline: "border border-red-500 text-red-600",
            soft: "bg-red-50 text-red-700 dark:bg-red-900/20 dark:text-red-400",
        },
    };

    const colorStyles = styles[color] || styles.primary;
    const variantClass = colorStyles[variant];

    return (
        <span className={clsx("inline-flex items-center font-medium rounded-full", sizes[size], variantClass, className)}>
            {children}
        </span>
    );
};

/*
 * How to use:
 * 
 * import { Badge } from "@/components/ui";
 * 
 * <Badge variant="solid" color="primary">New</Badge>
 * <Badge variant="soft" color="success">Completed</Badge>
 * <Badge variant="outline" color="danger" size="sm">High Priority</Badge>
 */

export default Badge;
