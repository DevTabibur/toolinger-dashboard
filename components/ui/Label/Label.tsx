"use client";
import React from "react";
import clsx from "clsx";

type LabelProps = React.LabelHTMLAttributes<HTMLLabelElement> & {
    required?: boolean;
};

const Label = ({ children, className, required, ...rest }: LabelProps) => {
    return (
        <label
            className={clsx(
                "block text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70 text-zinc-900 dark:text-zinc-100",
                className
            )}
            {...rest}
        >
            {children}
            {required && <span className="ml-1 text-red-500">*</span>}
        </label>
    );
};

/*
 * How to use:
 * 
 * import { Label } from "@/components/ui";
 * 
 * <Label htmlFor="email" required>Email</Label>
 */

export default Label;
