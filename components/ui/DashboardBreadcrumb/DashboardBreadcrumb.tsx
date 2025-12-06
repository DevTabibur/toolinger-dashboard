"use client";
import React from "react";
import Link from "next/link";
import { FiChevronRight, FiHome } from "react-icons/fi";
import clsx from "clsx";

type BreadcrumbItem = {
    label: string;
    href?: string;
};

type DashboardBreadcrumbProps = {
    items: BreadcrumbItem[];
    className?: string;
};

const DashboardBreadcrumb = ({ items, className }: DashboardBreadcrumbProps) => {
    return (
        <nav className={clsx("flex text-sm text-zinc-500 dark:text-zinc-400", className)} aria-label="Breadcrumb">
            <ol className="inline-flex items-center space-x-1 md:space-x-2">
                <li className="inline-flex items-center">
                    <Link href="/dashboard" className="inline-flex items-center hover:text-[var(--primary)] transition-colors">
                        <FiHome className="w-4 h-4 mr-1" />
                        Dashboard
                    </Link>
                </li>
                {items.map((item, index) => (
                    <li key={index}>
                        <div className="flex items-center">
                            <FiChevronRight className="w-4 h-4 text-zinc-400 mx-1" />
                            {item.href ? (
                                <Link href={item.href} className="hover:text-[var(--primary)] transition-colors">
                                    {item.label}
                                </Link>
                            ) : (
                                <span className="text-zinc-800 dark:text-zinc-200 font-medium">
                                    {item.label}
                                </span>
                            )}
                        </div>
                    </li>
                ))}
            </ol>
        </nav>
    );
};

/*
 * How to use:
 * 
 * import { DashboardBreadcrumb } from "@/components/ui";
 * 
 * <DashboardBreadcrumb 
 *   items={[
 *     { label: "Users", href: "/dashboard/users" }, 
 *     { label: "Profile" }
 *   ]} 
 * />
 */

export default DashboardBreadcrumb;
