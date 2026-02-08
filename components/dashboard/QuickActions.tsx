"use client";

import React from "react";
import { Card } from "@/components/ui";
import { useLanguage } from "@/context/LanguageContext";
import { FiFileText, FiUserPlus, FiBarChart2, FiSettings } from "react-icons/fi";
import Link from "next/link";

const actions = [
    {
        id: 1,
        titleKey: "Create Blog",
        descriptionKey: "Write a new blog post",
        icon: FiFileText,
        href: "/dashboard/cms/blog/create",
        color: "#007496",
    },
    {
        id: 2,
        titleKey: "Add User",
        descriptionKey: "Register a new user",
        icon: FiUserPlus,
        href: "/dashboard/users",
        color: "#fe9f43",
    },
    {
        id: 3,
        titleKey: "View Reports",
        descriptionKey: "Analytics and insights",
        icon: FiBarChart2,
        href: "/dashboard/reports",
        color: "#009688",
    },
    {
        id: 4,
        titleKey: "Settings",
        descriptionKey: "Configure your dashboard",
        icon: FiSettings,
        href: "/dashboard/settings",
        color: "#6c5ce7",
    },
];

const QuickActions = () => {
    const { t } = useLanguage();

    return (
        <div>
            <h3 className="text-lg font-semibold text-zinc-900 dark:text-zinc-100 mb-4">
                {t("Quick Actions")}
            </h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
                {actions.map((action) => {
                    const Icon = action.icon;
                    return (
                        <Link key={action.id} href={action.href}>
                            <Card className="cursor-pointer transition-all duration-300 hover:shadow-md hover:border-[var(--primary)]/30 hover:-translate-y-1">
                                <div className="flex items-start gap-4">
                                    <div
                                        className="w-12 h-12 flex items-center justify-center flex-shrink-0"
                                        style={{ backgroundColor: `${action.color}15` }}
                                    >
                                        <Icon className="w-6 h-6" style={{ color: action.color }} />
                                    </div>
                                    <div className="flex-1 min-w-0">
                                        <h4 className="text-sm font-semibold text-zinc-900 dark:text-zinc-100 mb-1">
                                            {t(action.titleKey)}
                                        </h4>
                                        <p className="text-xs text-zinc-500 dark:text-zinc-400 line-clamp-2">
                                            {t(action.descriptionKey)}
                                        </p>
                                    </div>
                                </div>
                            </Card>
                        </Link>
                    );
                })}
            </div>
        </div>
    );
};

export default QuickActions;
