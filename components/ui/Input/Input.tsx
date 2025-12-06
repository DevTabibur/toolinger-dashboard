"use client";
import React, { forwardRef } from "react";
import clsx from "clsx";

type InputProps = React.InputHTMLAttributes<HTMLInputElement> & {
    label?: string;
    error?: string;
    helperText?: string;
    leftIcon?: React.ReactNode;
    rightIcon?: React.ReactNode;
};

const Input = forwardRef<HTMLInputElement, InputProps>(
    ({ label, error, helperText, leftIcon, rightIcon, className, ...rest }, ref) => {
        return (
            <div className="w-full">
                {label && (
                    <label className="block text-sm font-medium text-zinc-700 dark:text-zinc-300 mb-1.5">
                        {label} {rest.required && <span className="text-red-500">*</span>}
                    </label>
                )}
                <div className="relative">
                    {leftIcon && (
                        <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-zinc-500">
                            {leftIcon}
                        </div>
                    )}
                    <input
                        ref={ref}
                        className={clsx(
                            "w-full rounded-lg border bg-white dark:bg-zinc-800 text-zinc-900 dark:text-zinc-100 placeholder-zinc-400 focus:outline-none focus:ring-2 focus:ring-[var(--primary)]/20 focus:border-[var(--primary)] transition-all",
                            leftIcon ? "pl-10" : "pl-3",
                            rightIcon ? "pr-10" : "pr-3",
                            error
                                ? "border-red-500 focus:ring-red-200 focus:border-red-500"
                                : "border-zinc-200 dark:border-zinc-700",
                            "py-2 text-sm",
                            className
                        )}
                        {...rest}
                    />
                    {rightIcon && (
                        <div className="absolute inset-y-0 right-0 pr-3 flex items-center pointer-events-none text-zinc-500">
                            {rightIcon}
                        </div>
                    )}
                </div>
                {error && <p className="mt-1 text-sm text-red-500">{error}</p>}
                {helperText && !error && <p className="mt-1 text-xs text-zinc-500">{helperText}</p>}
            </div>
        );
    }
);

Input.displayName = "Input";

/*
 * How to use:
 * 
 * import { Input } from "@/components/ui";
 * import { FiSearch } from "react-icons/fi";
 * 
 * <Input label="Email" placeholder="Enter your email" type="email" required />
 * <Input leftIcon={<FiSearch />} placeholder="Search..." />
 * <Input label="Error Example" error="This field is required" />
 */

export default Input;
