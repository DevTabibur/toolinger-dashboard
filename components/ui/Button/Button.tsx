"use client";
import React from "react";
import clsx from "clsx";

type ButtonProps = React.ButtonHTMLAttributes<HTMLButtonElement> & {
    variant?: "solid" | "outline" | "ghost";
    size?: "sm" | "md" | "lg";
    loading?: boolean;
    icon?: React.ReactNode;
};

const Button = ({
    variant = "solid",
    size = "md",
    loading = false,
    icon,
    children,
    className,
    ...rest
}: ButtonProps) => {
    const sizes = {
        sm: "px-3 py-1.5 text-sm",
        md: "px-4 py-2 text-sm",
        lg: "px-5 py-3 text-base",
    };

    const base = "inline-flex items-center gap-2 font-semibold rounded-md transition-shadow focus:outline-none focus:ring-2 focus:ring-offset-2";
    const solid = "bg-[var(--primary)] text-[var(--primary-foreground)] hover:bg-[var(--primary-dark)]";
    const outline = "bg-transparent border border-[color:var(--primary)] text-[var(--primary)] hover:bg-[var(--primary-20)]";
    const ghost = "bg-transparent text-[var(--primary)] hover:bg-[var(--primary-20)]";

    const variantClass = variant === "solid" ? solid : variant === "outline" ? outline : ghost;

    return (
        <button
            {...rest}
            disabled={loading || rest.disabled}
            className={clsx(base, sizes[size], variantClass, className, loading && "opacity-80 cursor-wait")}
        >
            {loading ? (
                <svg className="w-4 h-4 animate-spin" viewBox="0 0 24 24">
                    <circle cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="3" strokeDasharray="60" strokeDashoffset="0" fill="none" strokeLinecap="round" />
                </svg>
            ) : icon ? (
                <span className="flex items-center">{icon}</span>
            ) : null}
            <span>{children}</span>
        </button>
    );
}
export default Button
