"use client";
import React, { forwardRef } from "react";
import clsx from "clsx";

type TextareaProps = React.TextareaHTMLAttributes<HTMLTextAreaElement> & {
    label?: string;
    error?: string;
    helperText?: string;
};

const Textarea = forwardRef<HTMLTextAreaElement, TextareaProps>(
    ({ label, error, helperText, className, ...rest }, ref) => {
        return (
            <div className="w-full">
                {label && (
                    <label className="block text-sm font-medium text-zinc-700 dark:text-zinc-300 mb-1.5">
                        {label} {rest.required && <span className="text-red-500">*</span>}
                    </label>
                )}
                <div className="relative">
                    <textarea
                        ref={ref}
                        className={clsx(
                            "w-full  border bg-white dark:bg-zinc-800 text-zinc-900 dark:text-zinc-100 placeholder-zinc-400 focus:outline-none focus:ring-2 focus:ring-[var(--primary)]/20 focus:border-[var(--primary)] transition-all py-2 px-3 text-sm min-h-[80px]",
                            error
                                ? "border-red-500 focus:ring-red-200 focus:border-red-500"
                                : "border-zinc-200 dark:border-zinc-700",
                            className
                        )}
                        {...rest}
                    />
                </div>
                {error && <p className="mt-1 text-sm text-red-500">{error}</p>}
                {helperText && !error && <p className="mt-1 text-xs text-zinc-500">{helperText}</p>}
            </div>
        );
    }
);

Textarea.displayName = "Textarea";

/*
 * How to use:
 * 
 * import { Textarea } from "@/components/ui";
 * 
 * <Textarea label="Bio" placeholder="Tell us about yourself" rows={4} />
 */

export default Textarea;
