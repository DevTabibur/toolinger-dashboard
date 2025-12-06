"use client";
import React, { useState } from "react";
import clsx from "clsx";
import { motion } from "framer-motion";

type TabItem = {
    label: string;
    content: React.ReactNode;
    icon?: React.ReactNode;
};

type TabsProps = {
    tabs: TabItem[];
    defaultTab?: number;
    variant?: "underline" | "pills";
    className?: string;
};

const Tabs = ({ tabs, defaultTab = 0, variant = "underline", className }: TabsProps) => {
    const [activeTab, setActiveTab] = useState(defaultTab);

    return (
        <div className={clsx("w-full", className)}>
            <div className={clsx("flex gap-2 overflow-x-auto", variant === "underline" ? "border-b border-zinc-200 dark:border-zinc-700" : "p-1 bg-zinc-100 dark:bg-zinc-800 rounded-lg")}>
                {tabs.map((tab, index) => (
                    <button
                        key={index}
                        onClick={() => setActiveTab(index)}
                        className={clsx(
                            "relative px-4 py-2 text-sm font-medium transition-colors flex items-center gap-2 whitespace-nowrap",
                            variant === "pills" && "rounded-md",
                            activeTab === index
                                ? variant === "underline"
                                    ? "text-[var(--primary)]"
                                    : "bg-white dark:bg-zinc-700 text-zinc-900 dark:text-zinc-100 shadow-sm"
                                : "text-zinc-500 hover:text-zinc-700 dark:hover:text-zinc-300"
                        )}
                    >
                        {tab.icon && <span>{tab.icon}</span>}
                        {tab.label}
                        {activeTab === index && variant === "underline" && (
                            <motion.div
                                layoutId="activeTab"
                                className="absolute bottom-0 left-0 right-0 h-0.5 bg-[var(--primary)]"
                            />
                        )}
                    </button>
                ))}
            </div>
            <div className="mt-4">
                {tabs[activeTab] && tabs[activeTab].content}
            </div>
        </div>
    );
};

/*
 * How to use:
 * 
 * import { Tabs } from "@/components/ui";
 * 
 * <Tabs 
 *   tabs={[
 *     { label: "Account", content: <AccountSettings /> },
 *     { label: "Password", content: <PasswordSettings /> }
 *   ]} 
 *   variant="underline"
 * />
 */

export default Tabs;
