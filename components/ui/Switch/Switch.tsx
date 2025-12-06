"use client";
import React from "react";
import clsx from "clsx";

type SwitchProps = {
    checked?: boolean;
    onChange?: (checked: boolean) => void;
    className?: string;
    disabled?: boolean;
};

const Switch = ({ checked = false, onChange, className, disabled }: SwitchProps) => {
    return (
        <button
            type="button"
            role="switch"
            aria-checked={checked}
            disabled={disabled}
            onClick={() => !disabled && onChange?.(!checked)}
            className={clsx(
                "relative inline-flex h-6 w-11 items-center rounded-full transition-colors focus:outline-none focus:ring-2 focus:ring-[var(--primary)] focus:ring-offset-2",
                checked ? "bg-[var(--primary)]" : "bg-zinc-200 dark:bg-zinc-700",
                disabled && "opacity-50 cursor-not-allowed",
                className
            )}
        >
            <span
                className={clsx(
                    "inline-block h-4 w-4 transform rounded-full bg-white transition-transform",
                    checked ? "translate-x-6" : "translate-x-1"
                )}
            />
        </button>
    );
};

/*
 * How to use:
 * 
 * import { Switch } from "@/components/ui";
 * 
 * <Switch checked={isEnabled} onChange={setIsEnabled} />
 */

export default Switch;
