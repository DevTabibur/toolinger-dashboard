"use client";
import React from "react";
import clsx from "clsx";
import { FiChevronDown } from "react-icons/fi";

type SelectOption = {
    label: string;
    value: string;
};

type SelectProps = React.SelectHTMLAttributes<HTMLSelectElement> & {
    label?: string;
    options: SelectOption[];
    error?: string;
    helperText?: string;
};

const Select = ({ label, options, error, helperText, className, ...rest }: SelectProps) => {
    return (
        <div className="w-full">
            {label && (
                <label className="block text-sm font-medium text-zinc-700 dark:text-zinc-300 mb-1.5">
                    {label} {rest.required && <span className="text-red-500">*</span>}
                </label>
            )}
            <div className="relative">
                <select
                    className={clsx(
                        "w-full  border bg-white dark:bg-zinc-800 text-zinc-900 dark:text-zinc-100 placeholder-zinc-400 focus:outline-none focus:ring-2 focus:ring-[var(--primary)]/20 focus:border-[var(--primary)] transition-all appearance-none py-2 pl-3 pr-10 text-sm",
                        error
                            ? "border-red-500 focus:ring-red-200 focus:border-red-500"
                            : "border-zinc-200 dark:border-zinc-700",
                        className
                    )}
                    {...rest}
                >
                    {options.map((option) => (
                        <option key={option.value} value={option.value}>
                            {option.label}
                        </option>
                    ))}
                </select>
                <div className="absolute inset-y-0 right-0 pr-3 flex items-center pointer-events-none text-zinc-500">
                    <FiChevronDown className="w-4 h-4" />
                </div>
            </div>
            {error && <p className="mt-1 text-sm text-red-500">{error}</p>}
            {helperText && !error && <p className="mt-1 text-xs text-zinc-500">{helperText}</p>}
        </div>
    );
};

/*
 * How to use:
 * 
 * import { Select } from "@/components/ui";
 * 
 * <Select 
 *   label="Role" 
 *   options={[
 *     { label: "Admin", value: "admin" }, 
 *     { label: "User", value: "user" }
 *   ]} 
 *   onChange={(e) => console.log(e.target.value)} 
 * />
 */

export default Select;
