"use client";
import React from "react";
import clsx from "clsx";

type MessageBoxProps = {
    message: string;
    sender: "me" | "other";
    timestamp?: string;
    avatar?: React.ReactNode;
};

const MessageBox = ({ message, sender, timestamp, avatar }: MessageBoxProps) => {
    return (
        <div className={clsx("flex gap-3 max-w-[80%]", sender === "me" ? "ml-auto flex-row-reverse" : "mr-auto")}>
            {avatar && (
                <div className="shrink-0 w-8 h-8 rounded-full overflow-hidden bg-zinc-100 dark:bg-zinc-800">
                    {avatar}
                </div>
            )}
            <div>
                <div
                    className={clsx(
                        "p-3 rounded-2xl text-sm",
                        sender === "me"
                            ? "bg-[var(--primary)] text-white rounded-tr-sm"
                            : "bg-white dark:bg-zinc-800 text-zinc-800 dark:text-zinc-200 border border-zinc-100 dark:border-zinc-700 rounded-tl-sm shadow-sm"
                    )}
                >
                    {message}
                </div>
                {timestamp && (
                    <p className={clsx("text-[10px] text-zinc-400 mt-1", sender === "me" ? "text-right" : "text-left")}>
                        {timestamp}
                    </p>
                )}
            </div>
        </div>
    );
};

/*
 * How to use:
 * 
 * import { MessageBox } from "@/components/ui";
 * 
 * <MessageBox 
 *   sender="other" 
 *   message="Hello, how can I help you?" 
 *   timestamp="10:00 AM" 
 *   avatar={<img src="..." />} 
 * />
 * 
 * <MessageBox 
 *   sender="me" 
 *   message="I have a question about billing." 
 *   timestamp="10:05 AM" 
 * />
 */

export default MessageBox;
