"use client";

import React, { useState } from "react";
import { Card, CardHeader, CardBody, Badge, Tabs } from "@/components/ui";
import { useLanguage } from "@/context/LanguageContext";
import { FiFileText, FiMessageCircle, FiUser, FiClock } from "react-icons/fi";

const recentBlogs = [
    { id: 1, title: "Getting Started with Next.js 15", status: "Published", time: "2 hours ago" },
    { id: 2, title: "Understanding React Server Components", status: "Draft", time: "5 hours ago" },
    { id: 3, title: "Tailwind CSS Best Practices", status: "Published", time: "1 day ago" },
    { id: 4, title: "TypeScript Advanced Types", status: "Published", time: "2 days ago" },
    { id: 5, title: "Building Scalable APIs", status: "Draft", time: "3 days ago" },
];

const recentComments = [
    { id: 1, author: "John Doe", comment: "Great article! Very helpful.", blog: "Next.js Guide", time: "1 hour ago" },
    { id: 2, author: "Jane Smith", comment: "Thanks for sharing this.", blog: "React Components", time: "3 hours ago" },
    { id: 3, author: "Mike Johnson", comment: "Could you elaborate more on...", blog: "CSS Tips", time: "6 hours ago" },
    { id: 4, author: "Sarah Williams", comment: "Excellent explanation!", blog: "TypeScript Guide", time: "1 day ago" },
];

const recentUsers = [
    { id: 1, name: "Alex Thompson", email: "alex@example.com", time: "30 minutes ago" },
    { id: 2, name: "Emma Davis", email: "emma@example.com", time: "2 hours ago" },
    { id: 3, name: "Oliver Brown", email: "oliver@example.com", time: "5 hours ago" },
    { id: 4, name: "Sophia Wilson", email: "sophia@example.com", time: "1 day ago" },
];

const RecentActivity = () => {
    const { t } = useLanguage();
    const [activeTab, setActiveTab] = useState("blogs");

    return (
        <Card noPadding>
            <CardHeader>
                <h3 className="text-lg font-semibold text-zinc-900 dark:text-zinc-100">
                    {t("Recent Activity")}
                </h3>
            </CardHeader>
            <CardBody className="p-0">
                <div className="border-b border-zinc-200 dark:border-zinc-800">
                    <div className="flex gap-6 px-6">
                        <button
                            onClick={() => setActiveTab("blogs")}
                            className={`py-3 px-1 border-b-2 transition-colors text-sm font-medium ${activeTab === "blogs"
                                ? "border-[var(--primary)] text-[var(--primary)]"
                                : "border-transparent text-zinc-500 dark:text-zinc-400 hover:text-zinc-700 dark:hover:text-zinc-300"
                                }`}
                        >
                            <div className="flex items-center gap-2">
                                <FiFileText className="w-4 h-4" />
                                {t("Recent Blogs")}
                            </div>
                        </button>
                        <button
                            onClick={() => setActiveTab("comments")}
                            className={`py-3 px-1 border-b-2 transition-colors text-sm font-medium ${activeTab === "comments"
                                ? "border-[var(--primary)] text-[var(--primary)]"
                                : "border-transparent text-zinc-500 dark:text-zinc-400 hover:text-zinc-700 dark:hover:text-zinc-300"
                                }`}
                        >
                            <div className="flex items-center gap-2">
                                <FiMessageCircle className="w-4 h-4" />
                                {t("Recent Comments")}
                            </div>
                        </button>
                        <button
                            onClick={() => setActiveTab("users")}
                            className={`py-3 px-1 border-b-2 transition-colors text-sm font-medium ${activeTab === "users"
                                ? "border-[var(--primary)] text-[var(--primary)]"
                                : "border-transparent text-zinc-500 dark:text-zinc-400 hover:text-zinc-700 dark:hover:text-zinc-300"
                                }`}
                        >
                            <div className="flex items-center gap-2">
                                <FiUser className="w-4 h-4" />
                                {t("New Users")}
                            </div>
                        </button>
                    </div>
                </div>

                <div className="p-6">
                    {activeTab === "blogs" && (
                        <div className="space-y-4">
                            {recentBlogs.map((blog) => (
                                <div key={blog.id} className="flex items-start justify-between py-3 border-b border-zinc-100 dark:border-zinc-800 last:border-0">
                                    <div className="flex-1">
                                        <h4 className="text-sm font-medium text-zinc-900 dark:text-zinc-100 mb-1">
                                            {blog.title}
                                        </h4>
                                        <div className="flex items-center gap-2">
                                            <Badge color={blog.status === "Published" ? "success" : "warning"}>
                                                {blog.status}
                                            </Badge>
                                            <span className="text-xs text-zinc-500 dark:text-zinc-400 flex items-center gap-1">
                                                <FiClock className="w-3 h-3" />
                                                {blog.time}
                                            </span>
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>
                    )}

                    {activeTab === "comments" && (
                        <div className="space-y-4">
                            {recentComments.map((comment) => (
                                <div key={comment.id} className="py-3 border-b border-zinc-100 dark:border-zinc-800 last:border-0">
                                    <div className="flex items-start justify-between mb-2">
                                        <p className="text-sm font-medium text-zinc-900 dark:text-zinc-100">
                                            {comment.author}
                                        </p>
                                        <span className="text-xs text-zinc-500 dark:text-zinc-400 flex items-center gap-1">
                                            <FiClock className="w-3 h-3" />
                                            {comment.time}
                                        </span>
                                    </div>
                                    <p className="text-sm text-zinc-600 dark:text-zinc-400 mb-1">
                                        {comment.comment}
                                    </p>
                                    <p className="text-xs text-zinc-500 dark:text-zinc-500">
                                        on "{comment.blog}"
                                    </p>
                                </div>
                            ))}
                        </div>
                    )}

                    {activeTab === "users" && (
                        <div className="space-y-4">
                            {recentUsers.map((user) => (
                                <div key={user.id} className="flex items-center justify-between py-3 border-b border-zinc-100 dark:border-zinc-800 last:border-0">
                                    <div className="flex items-center gap-3">
                                        <div className="w-10 h-10 bg-[var(--primary)]/10 flex items-center justify-center text-[var(--primary)] font-semibold">
                                            {user.name.charAt(0)}
                                        </div>
                                        <div>
                                            <p className="text-sm font-medium text-zinc-900 dark:text-zinc-100">
                                                {user.name}
                                            </p>
                                            <p className="text-xs text-zinc-500 dark:text-zinc-400">
                                                {user.email}
                                            </p>
                                        </div>
                                    </div>
                                    <span className="text-xs text-zinc-500 dark:text-zinc-400 flex items-center gap-1">
                                        <FiClock className="w-3 h-3" />
                                        {user.time}
                                    </span>
                                </div>
                            ))}
                        </div>
                    )}
                </div>
            </CardBody>
        </Card>
    );
};

export default RecentActivity;
