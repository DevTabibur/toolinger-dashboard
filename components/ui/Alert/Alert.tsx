"use client";
import React from "react";
import clsx from "clsx";
import { FiInfo, FiCheckCircle, FiAlertTriangle, FiXCircle } from "react-icons/fi";

type AlertProps = {
    variant?: "primary" | "success" | "warning" | "danger";
    title?: string;
    children: React.ReactNode;
    className?: string;
    icon?: boolean;
    onClose?: () => void;
};

const Alert = ({
    variant = "primary",
    title,
    children,
    className,
    icon = true,
    onClose,
}: AlertProps) => {

    const variants = {
        primary: "bg-[var(--primary)]/10 text-[var(--primary)] border-[var(--primary)]/20",
        success: "bg-green-50 text-green-700 border-green-200 dark:bg-green-900/10 dark:text-green-400 dark:border-green-900/20",
        warning: "bg-yellow-50 text-yellow-700 border-yellow-200 dark:bg-yellow-900/10 dark:text-yellow-400 dark:border-yellow-900/20",
        danger: "bg-red-50 text-red-700 border-red-200 dark:bg-red-900/10 dark:text-red-400 dark:border-red-900/20",
    };

    const icons = {
        primary: FiInfo,
        success: FiCheckCircle,
        warning: FiAlertTriangle,
        danger: FiXCircle,
    };

    const Icon = icons[variant];

    return (
        <div className={clsx("flex gap-3 p-4 rounded-lg border", variants[variant], className)} role="alert">
            {icon && (
                <div className="shrink-0">
                    <Icon className="w-5 h-5" />
                </div>
            )}
            <div className="flex-1">
                {title && <h5 className="font-semibold mb-1">{title}</h5>}
                <div className="text-sm opacity-90">{children}</div>
            </div>
            {onClose && (
                <button onClick={onClose} className="shrink-0 opacity-70 hover:opacity-100 transition-opacity">
                    <FiXCircle className="w-5 h-5" />
                </button>
            )}
        </div>
    );
};

/*
 * How to use:
 * 
 * import { Alert } from "@/components/ui";
 * 
 * <Alert variant="primary" title="Note">
 *   This is a primary alert.
 * </Alert>
 * 
 * <Alert variant="danger" title="Error" onClose={() => {}}>
 *   Something went wrong!
 * </Alert>
 */

export default Alert;
