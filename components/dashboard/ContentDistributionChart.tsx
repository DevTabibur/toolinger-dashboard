"use client";

import React from "react";
import { Card, CardHeader, CardBody } from "@/components/ui";
import { PieChart, Pie, Cell, ResponsiveContainer, Legend, Tooltip } from "recharts";
import { useLanguage } from "@/context/LanguageContext";

const data = [
    { name: "Technology", value: 145, color: "#007496" },
    { name: "Lifestyle", value: 98, color: "#fe9f43" },
    { name: "Business", value: 76, color: "#009688" },
    { name: "Health", value: 54, color: "#d63031" },
    { name: "Education", value: 42, color: "#6c5ce7" },
];

const ContentDistributionChart = () => {
    const { t } = useLanguage();

    return (
        <Card noPadding>
            <CardHeader>
                <h3 className="text-lg font-semibold text-zinc-900 dark:text-zinc-100">
                    {t("Content Distribution")}
                </h3>
                <p className="text-sm text-zinc-500 dark:text-zinc-400 mt-1">
                    {t("Posts by category")}
                </p>
            </CardHeader>
            <CardBody>
                <ResponsiveContainer width="100%" height={300}>
                    <PieChart>
                        <Pie
                            data={data}
                            cx="50%"
                            cy="50%"
                            innerRadius={60}
                            outerRadius={100}
                            paddingAngle={2}
                            dataKey="value"
                        >
                            {data.map((entry, index) => (
                                <Cell key={`cell-${index}`} fill={entry.color} />
                            ))}
                        </Pie>
                        <Tooltip
                            contentStyle={{
                                backgroundColor: "var(--card)",
                                border: "1px solid var(--border)",
                                borderRadius: "0px",
                            }}
                        />
                        <Legend
                            verticalAlign="bottom"
                            height={36}
                            iconType="circle"
                            wrapperStyle={{ fontSize: "12px" }}
                        />
                    </PieChart>
                </ResponsiveContainer>
            </CardBody>
        </Card>
    );
};

export default ContentDistributionChart;
