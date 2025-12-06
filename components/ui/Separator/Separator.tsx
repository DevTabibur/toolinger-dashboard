"use client";
import React from "react";
import clsx from "clsx";

type SeparatorProps = {
    orientation?: "horizontal" | "vertical";
    className?: string;
};

const Separator = ({ orientation = "horizontal", className }: SeparatorProps) => {
    return (
        <div
            className={clsx(
                "bg-zinc-200 dark:bg-zinc-700",
                orientation === "horizontal" ? "h-[1px] w-full" : "h-full w-[1px]",
                className
            )}
        />
    );
};

/*
 * How to use:
 * 
 * import { Separator } from "@/components/ui";
 * 
 * <div className="space-y-4">
 *   <p>Text</p>
 *   <Separator />
 *   <p>Text</p>
 * </div>
 */

export default Separator;
