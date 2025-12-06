"use client";
import React from "react";
import clsx from "clsx";
import { FiCheck } from "react-icons/fi";

type CheckboxProps = React.InputHTMLAttributes<HTMLInputElement> & {
    label?: string;
};

const Checkbox = ({ label, className, ...rest }: CheckboxProps) => {
    return (
        <label className={clsx("inline-flex items-center gap-2 cursor-pointer group", className)}>
            <div className="relative">
                <input
                    type="checkbox"
                    className="peer sr-only"
                    {...rest}
                />
                <div className="w-5 h-5 rounded border border-zinc-300 dark:border-zinc-600 bg-white dark:bg-zinc-800 transition-all peer-checked:bg-[var(--primary)] peer-checked:border-[var(--primary)] flex items-center justify-center group-hover:border-[var(--primary)]">
                    <FiCheck className="w-3.5 h-3.5 text-white opacity-0 transform scale-50 transition-all peer-checked:opacity-100 peer-checked:scale-100" />
                </div>
            </div>
            {label && <span className="text-sm text-zinc-700 dark:text-zinc-300 select-none">{label}</span>}
        </label>
    );
};

/*
 * How to use:
 * 
 * import { Checkbox } from "@/components/ui";
 * 
 * <Checkbox label="Remember me" onChange={(e) => console.log(e.target.checked)} />
 * <Checkbox checked readOnly label="Checked (Read only)" />
 */

export default Checkbox;
