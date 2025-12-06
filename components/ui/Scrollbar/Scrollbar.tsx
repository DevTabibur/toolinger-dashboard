"use client";
import React from "react";
import clsx from "clsx";

type ScrollbarProps = React.HTMLAttributes<HTMLDivElement> & {
    children: React.ReactNode;
};

const Scrollbar = ({ children, className, ...rest }: ScrollbarProps) => {
    return (
        <div className={clsx("scrollbar-custom overflow-y-auto", className)} {...rest}>
            {children}
            <style jsx global>{`
                .scrollbar-custom::-webkit-scrollbar {
                    width: 6px;
                    height: 6px;
                }
                .scrollbar-custom::-webkit-scrollbar-track {
                    background: transparent;
                }
                .scrollbar-custom::-webkit-scrollbar-thumb {
                    background: var(--scrollbar-thumb);
                    border-radius: 99px;
                }
                .scrollbar-custom::-webkit-scrollbar-thumb:hover {
                    background: var(--primary);
                }
            `}</style>
        </div>
    );
};

/*
 * How to use:
 * 
 * import { Scrollbar } from "@/components/ui";
 * 
 * <Scrollbar className="h-64">
 *   <p>Long content...</p>
 * </Scrollbar>
 */

export default Scrollbar;
