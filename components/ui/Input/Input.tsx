"use client";
import React, { forwardRef } from "react";
import clsx from "clsx";
import { FiEye, FiEyeOff } from "react-icons/fi";

type InputProps = React.InputHTMLAttributes<HTMLInputElement> & {
    label?: string;
    error?: string;
    helperText?: string;
    leftIcon?: React.ReactNode;
    rightIcon?: React.ReactNode;
    onClick?: (e: React.MouseEvent<HTMLInputElement>) => void;
    onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
    className?: string;
};

const Input = forwardRef<HTMLInputElement, InputProps>(
    ({ label, error, helperText, leftIcon, rightIcon, onClick, onChange, className, type, ...rest }, ref) => {
        const [showPassword, setShowPassword] = React.useState(false);
        const isPassword = type === "password";

        const togglePassword = () => {
            setShowPassword(!showPassword);
        };

        const inputType = isPassword ? (showPassword ? "text" : "password") : type;

        return (
            <div className={clsx("w-full", className)}>
                {label && (
                    <label className={clsx("block text-sm font-medium text-zinc-700 dark:text-zinc-300 mb-1.5", className)}>
                        {label} {rest.required && <span className="text-red-500">*</span>}
                    </label>
                )}
                <div className="relative">
                    {leftIcon && (
                        <div className={clsx("absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-zinc-500", className)}>
                            {leftIcon}
                        </div>
                    )}
                    <input
                        ref={ref}
                        type={inputType}
                        className={clsx(
                            "w-full border bg-white dark:bg-zinc-800 text-zinc-900 dark:text-zinc-100 placeholder-zinc-400 focus:outline-none focus:ring-2 focus:ring-[var(--primary)]/20 focus:border-[var(--primary)] transition-all",
                            leftIcon ? "pl-10" : "pl-3",
                            (rightIcon || isPassword) ? "pr-10" : "pr-3",
                            error
                                ? "border-red-500 focus:ring-red-200 focus:border-red-500"
                                : "border-zinc-200 dark:border-zinc-700",
                            "py-2 text-sm",
                            className
                        )}
                        onClick={onClick}
                        onChange={onChange}
                        {...rest}
                    />
                    {isPassword ? (
                        <button
                            type="button"
                            onClick={togglePassword}
                            className={clsx("absolute inset-y-0 right-0 pr-3 flex items-center text-zinc-500 hover:text-zinc-700 dark:hover:text-zinc-300 cursor-pointer focus:outline-none", className)}
                        >
                            {showPassword ? <FiEyeOff /> : <FiEye />}
                        </button>
                    ) : (
                        rightIcon && (
                            <div className={clsx("absolute inset-y-0 right-0 pr-3 flex items-center pointer-events-none text-zinc-500", className)}>
                                {rightIcon}
                            </div>
                        )
                    )}
                </div>
                {error && <p className={clsx("mt-1 text-sm text-red-500", className)}>{error}</p>}
                {helperText && !error && <p className={clsx("mt-1 text-xs text-zinc-500", className)}>{helperText}</p>}
            </div>
        );
    }
);

Input.displayName = "Input";

/*
 How to use:
 
 import { Input } from "@/components/ui";
 import { FiSearch } from "react-icons/fi";
 
 <Input label="Email" placeholder="Enter your email" type="email" required onClick={(e: any) => console.log("clicked", e.target.value)} onChange={(e: any) => console.log("value:", e.target.value)}/>
  <Input leftIcon={<FiSearch />} placeholder="Search..." onClick={(e: any) => console.log("clicked", e.target.value)} onChange={(e: any) => console.log("value:", e.target.value)}/>
  <Input label="Error Example" error="This field is required" onClick={(e: any) => console.log("clicked", e.target.value)} onChange={(e: any) => console.log("value:", e.target.value)}/>
 */

export default Input;
