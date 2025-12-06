"use client";
import React from "react";
import clsx from "clsx";

type FieldProps = {
    label?: string;
    error?: string;
    helperText?: string;
    required?: boolean;
    children: React.ReactNode;
    className?: string;
    description?: string;
};

const Field = ({ label, error, helperText, required, children, className, description }: FieldProps) => {
    return (
        <div className={clsx("w-full space-y-1.5", className)}>
            {label && (
                <label className="block text-sm font-medium text-zinc-700 dark:text-zinc-300">
                    {label} {required && <span className="text-red-500">*</span>}
                </label>
            )}
            {description && (
                <p className="text-xs text-zinc-500 dark:text-zinc-400">{description}</p>
            )}
            <div className="relative">
                {children}
            </div>
            {error && <p className="text-sm text-red-500 animate-in slide-in-from-top-1 fade-in">{error}</p>}
            {helperText && !error && <p className="text-xs text-zinc-500 dark:text-zinc-400">{helperText}</p>}
        </div>
    );
};

/*
 * How to use:
 * 
 * import { Field, Input } from "@/components/ui";
 * 
 * <Field label="Username" error="Username is required" required>
 *   <Input placeholder="Enter username" />
 * </Field>
 */

export default Field;
