"use client";

import React from "react";
import { Card, CardHeader, CardBody } from "@/components/ui";
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from "recharts";
import { useLanguage } from "@/context/LanguageContext";

const data = [
    { month: "Jan", users: 45 },
    { month: "Feb", users: 52 },
    { month: "Mar", users: 61 },
    { month: "Apr", users: 58 },
    { month: "May", users: 70 },
    { month: "Jun", users: 85 },
    { month: "Jul", users: 92 },
    { month: "Aug", users: 88 },
    { month: "Sep", users: 105 },
    { month: "Oct", users: 118 },
    { month: "Nov", users: 125 },
    { month: "Dec", users: 142 },
];

const UserGrowthChart = () => {
    const { t } = useLanguage();

    return (
        <Card noPadding>
            <CardHeader>
                <h3 className="text-lg font-semibold text-zinc-900 dark:text-zinc-100">
                    {t("User Growth")}
                </h3>
                <p className="text-sm text-zinc-500 dark:text-zinc-400 mt-1">
                    {t("Monthly user registration trend")}
                </p>
            </CardHeader>
            <CardBody>
                <ResponsiveContainer width="100%" height={300}>
                    <BarChart data={data}>
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
                        <Bar dataKey="users" fill="var(--primary)" radius={[0, 0, 0, 0]} />
                    </BarChart>
                </ResponsiveContainer>
            </CardBody>
        </Card>
    );
};

export default UserGrowthChart;
