"use client";
import React from "react";
import { FiBell } from "react-icons/fi";
import clsx from "clsx";

type NotificationButtonProps = {
    count?: number;
    onClick?: () => void;
    className?: string;
};

const NotificationButton = ({ count = 0, onClick, className }: NotificationButtonProps) => {
    return (
        <button
            onClick={onClick}
            className={clsx(
                "relative p-2 text-zinc-600 dark:text-zinc-300 hover:bg-zinc-100 dark:hover:bg-zinc-800 rounded-lg transition-colors",
                className
            )}
        >
            <FiBell className="w-5 h-5" />
            {count > 0 && (
                <span className="absolute top-1.5 right-1.5 flex h-2 w-2">
                    <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-red-400 opacity-75"></span>
                    <span className="relative inline-flex rounded-full h-2 w-2 bg-red-500"></span>
                </span>
            )}
        </button>
    );
};

/*
 * How to use:
 * 
 * import { NotificationButton } from "@/components/ui";
 * 
 * <NotificationButton count={3} onClick={() => console.log("notifications")} />
 */

export default NotificationButton;
