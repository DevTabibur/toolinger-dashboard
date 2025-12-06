"use client";
import React from "react";
import clsx from "clsx";

type SkeletonProps = React.HTMLAttributes<HTMLDivElement> & {
    width?: string;
    height?: string;
    circle?: boolean;
};

const Skeleton = ({ width, height, circle, className, ...rest }: SkeletonProps) => {
    return (
        <div
            className={clsx(
                "animate-pulse bg-zinc-200 dark:bg-zinc-800",
                circle ? "rounded-full" : "rounded-md",
                width ? width : "w-full",
                height ? height : "h-4",
                className
            )}
            style={{ width, height }}
            {...rest}
        />
    );
};

/*
 * How to use:
 * 
 * import { Skeleton } from "@/components/ui";
 * 
 * <Skeleton className="w-1/2 h-4 mb-2" />
 * <Skeleton circle width="40px" height="40px" />
 */

export default Skeleton;
