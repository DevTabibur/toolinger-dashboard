"use client";
import React from "react";
import clsx from "clsx";

type AspectRatioProps = React.HTMLAttributes<HTMLDivElement> & {
    ratio?: number; // e.g., 16/9
    children: React.ReactNode;
};

const AspectRatio = ({ ratio = 16 / 9, children, className, ...rest }: AspectRatioProps) => {
    return (
        <div
            className={clsx("relative w-full overflow-hidden", className)}
            style={{ paddingBottom: `${(1 / ratio) * 100}%` }}
            {...rest}
        >
            <div className="absolute inset-0 w-full h-full">
                {children}
            </div>
        </div>
    );
};

/*
 * How to use:
 * 
 * import { AspectRatio } from "@/components/ui";
 * import Image from "next/image";
 * 
 * <AspectRatio ratio={16 / 9} className="rounded-lg">
 *   <Image src="..." alt="..." fill className="object-cover" />
 * </AspectRatio>
 */

export default AspectRatio;
