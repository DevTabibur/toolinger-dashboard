"use client";
import React from "react";
import clsx from "clsx";

type TypographyProps = {
    variant?: "h1" | "h2" | "h3" | "h4" | "h5" | "h6" | "p" | "lead" | "large" | "small" | "muted";
    children: React.ReactNode;
    className?: string;
    as?: any;
};

const Typography = ({ variant = "p", children, className, as }: TypographyProps) => {
    const Component = as || (variant === "lead" || variant === "large" || variant === "small" || variant === "muted" ? "p" : variant);

    const variants = {
        h1: "scroll-m-20 text-4xl font-extrabold tracking-tight lg:text-5xl",
        h2: "scroll-m-20 border-b pb-2 text-3xl font-semibold tracking-tight first:mt-0",
        h3: "scroll-m-20 text-2xl font-semibold tracking-tight",
        h4: "scroll-m-20 text-xl font-semibold tracking-tight",
        h5: "scroll-m-20 text-lg font-semibold tracking-tight",
        h6: "scroll-m-20 text-base font-semibold tracking-tight",
        p: "leading-7 [&:not(:first-child)]:mt-6",
        lead: "text-xl text-zinc-500 dark:text-zinc-400",
        large: "text-lg font-semibold",
        small: "text-sm font-medium leading-none",
        muted: "text-sm text-zinc-500 dark:text-zinc-400",
    };

    return (
        <Component className={clsx("text-zinc-900 dark:text-zinc-100", variants[variant], className)}>
            {children}
        </Component>
    );
};

/*
 * How to use:
 * 
 * import { Typography } from "@/components/ui";
 * 
 * <Typography variant="h1">Heading</Typography>
 * <Typography variant="muted">Subtitle</Typography>
 */

export default Typography;
