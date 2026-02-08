"use client";

import React from "react";
import { Card } from "@/components/ui";
import { IconType } from "react-icons";
import { FiTrendingUp, FiTrendingDown } from "react-icons/fi";

interface StatCardProps {
    title: string;
    value: string | number;
    icon: React.ReactElement<IconType>;
    trend?: {
        value: number;
        isPositive: boolean;
    };
    color?: string;
}

const StatCard = ({ title, value, icon, trend, color = "var(--primary)" }: StatCardProps) => {
    return (
        <Card className="transition-all duration-300 hover:shadow-md hover:border-[var(--primary)]/20">
            <div className="flex items-start justify-between">
                <div className="flex-1">
                    <p className="text-sm text-zinc-500 dark:text-zinc-400 mb-2">{title}</p>
                    <h3 className="text-3xl font-bold text-zinc-900 dark:text-zinc-100 mb-3">
                        {value}
                    </h3>
                    {trend && (
                        <div className="flex items-center gap-1">
                            {trend.isPositive ? (
                                <FiTrendingUp className="w-4 h-4 text-green-600 dark:text-green-500" />
                            ) : (
                                <FiTrendingDown className="w-4 h-4 text-red-600 dark:text-red-500" />
                            )}
                            <span
                                className={`text-sm font-medium ${trend.isPositive
                                        ? "text-green-600 dark:text-green-500"
                                        : "text-red-600 dark:text-red-500"
                                    }`}
                            >
                                {trend.value}%
                            </span>
                            <span className="text-sm text-zinc-500 dark:text-zinc-400 ml-1">
                                vs last month
                            </span>
                        </div>
                    )}
                </div>
                <div
                    className="w-14 h-14 flex items-center justify-center"
                    style={{ backgroundColor: `${color}15` }}
                >
                    <div style={{ color: color }} className="text-2xl">
                        {icon}
                    </div>
                </div>
            </div>
        </Card>
    );
};

export default StatCard;
