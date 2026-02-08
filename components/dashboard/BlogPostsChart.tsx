"use client";

import React from "react";
import { Card, CardHeader, CardBody } from "@/components/ui";
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from "recharts";
import { useLanguage } from "@/context/LanguageContext";

const data = [
    { month: "Jan", posts: 12 },
    { month: "Feb", posts: 19 },
    { month: "Mar", posts: 15 },
    { month: "Apr", posts: 25 },
    { month: "May", posts: 22 },
    { month: "Jun", posts: 30 },
    { month: "Jul", posts: 28 },
    { month: "Aug", posts: 35 },
    { month: "Sep", posts: 32 },
    { month: "Oct", posts: 40 },
    { month: "Nov", posts: 38 },
    { month: "Dec", posts: 45 },
];

const BlogPostsChart = () => {
    const { t } = useLanguage();

    return (
        <Card noPadding>
            <CardHeader>
                <h3 className="text-lg font-semibold text-zinc-900 dark:text-zinc-100">
                    {t("Blog Posts Over Time")}
                </h3>
                <p className="text-sm text-zinc-500 dark:text-zinc-400 mt-1">
                    {t("Monthly blog post creation trend")}
                </p>
            </CardHeader>
            <CardBody>
                <ResponsiveContainer width="100%" height={300}>
                    <AreaChart data={data}>
                        <defs>
                            <linearGradient id="colorPosts" x1="0" y1="0" x2="0" y2="1">
                                <stop offset="5%" stopColor="var(--primary)" stopOpacity={0.3} />
                                <stop offset="95%" stopColor="var(--primary)" stopOpacity={0} />
                            </linearGradient>
                        </defs>
                        <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" className="dark:stroke-zinc-800" />
                        <XAxis
                            dataKey="month"
                            stroke="#71717a"
                            style={{ fontSize: "12px" }}
                        />
                        <YAxis stroke="#71717a" style={{ fontSize: "12px" }} />
                        <Tooltip
                            contentStyle={{
                                backgroundColor: "var(--card)",
                                border: "1px solid var(--border)",
                                borderRadius: "0px",
                            }}
                            labelStyle={{ color: "var(--foreground)" }}
                        />
                        <Area
                            type="monotone"
                            dataKey="posts"
                            stroke="var(--primary)"
                            strokeWidth={2}
                            fillOpacity={1}
                            fill="url(#colorPosts)"
                        />
                    </AreaChart>
                </ResponsiveContainer>
            </CardBody>
        </Card>
    );
};

export default BlogPostsChart;
