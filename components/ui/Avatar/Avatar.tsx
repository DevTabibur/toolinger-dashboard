"use client";
import React, { useState } from "react";
import clsx from "clsx";

type AvatarProps = React.HTMLAttributes<HTMLDivElement> & {
    src?: string;
    alt?: string;
    fallback?: React.ReactNode;
    size?: "sm" | "md" | "lg" | "xl";
};

const Avatar = ({ src, alt, fallback, size = "md", className, ...rest }: AvatarProps) => {
    const [hasError, setHasError] = useState(false);

    const sizes = {
        sm: "w-8 h-8 text-xs",
        md: "w-10 h-10 text-sm",
        lg: "w-14 h-14 text-base",
        xl: "w-20 h-20 text-xl",
    };

    return (
        <div
            className={clsx(
                "relative flex shrink-0 overflow-hidden rounded-full bg-zinc-100 dark:bg-zinc-800 items-center justify-center font-medium uppercase text-zinc-500 dark:text-zinc-400",
                sizes[size],
                className
            )}
            {...rest}
        >
            {src && !hasError ? (
                <img
                    src={src}
                    alt={alt || "Avatar"}
                    className="aspect-square h-full w-full object-cover"
                    onError={() => setHasError(true)}
                />
            ) : (
                fallback || (alt ? alt.charAt(0).toUpperCase() : "?")
            )}
        </div>
    );
};

/*
 * How to use:
 * 
 * import { Avatar } from "@/components/ui";
 * 
 * <Avatar src="https://github.com/shadcn.png" alt="@shadcn" />
 * <Avatar fallback="JD" />
 */

export default Avatar;
