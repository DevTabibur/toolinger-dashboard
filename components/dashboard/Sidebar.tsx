'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useState } from 'react';
import {
    FiHome,
    FiBarChart2,
    FiUsers,
    FiSettings,
    FiBox,
    FiGrid,
    FiX
} from 'react-icons/fi';

interface SidebarProps {
    isOpen: boolean;
    onClose: () => void;
}

const menuItems = [
    { name: 'Overview', icon: FiHome, path: '/dashboard' },
    { name: 'Analytics', icon: FiBarChart2, path: '/dashboard/analytics' },
    { name: 'Customers', icon: FiUsers, path: '/dashboard/customers' },
    { name: 'Products', icon: FiBox, path: '/dashboard/products' },
    { name: 'Orders', icon: FiGrid, path: '/dashboard/orders' },
    { name: 'Settings', icon: FiSettings, path: '/dashboard/settings' },
];

const Sidebar = ({ isOpen, onClose }: SidebarProps) => {
    const pathname = usePathname();

    return (
        <>
            {/* Mobile Overlay */}
            <div
                className={`fixed inset-0 bg-black/50 z-40 lg:hidden transition-opacity duration-300 ${isOpen ? 'opacity-100' : 'opacity-0 pointer-events-none'
                    }`}
                onClick={onClose}
            />

            {/* Sidebar Container */}
            <aside
                className={`fixed lg:static inset-y-0 left-0 z-50 w-64 bg-white dark:bg-zinc-900 border-r border-zinc-200 dark:border-zinc-800 transform transition-transform duration-300 lg:transform-none lg:translate-x-0 ${isOpen ? 'translate-x-0' : '-translate-x-full'
                    }`}
            >
                {/* Logo Area */}
                <div className="h-16 flex items-center justify-between px-6 border-b border-zinc-100 dark:border-zinc-800">
                    <Link href="/dashboard" className="flex items-center gap-2">
                        <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-[var(--brand-start)] to-[var(--brand-end)] flex items-center justify-center text-white font-bold text-xl">
                            T
                        </div>
                        <span className="text-xl font-bold bg-gradient-to-r from-[var(--brand-start)] to-[var(--brand-end)] bg-clip-text text-transparent">
                            Toolinger
                        </span>
                    </Link>
                    <button
                        onClick={onClose}
                        className="lg:hidden p-1 text-zinc-500 hover:text-zinc-700 dark:text-zinc-400 dark:hover:text-zinc-200"
                    >
                        <FiX className="w-6 h-6" />
                    </button>
                </div>

                {/* Navigation */}
                <nav className="p-4 space-y-1 overflow-y-auto h-[calc(100vh-4rem)]">
                    {menuItems.map((item) => {
                        const isActive = pathname === item.path;
                        const Icon = item.icon;

                        return (
                            <Link
                                key={item.path}
                                href={item.path}
                                className={`flex items-center gap-3 px-4 py-3 rounded-lg transition-all duration-200 group ${isActive
                                    ? 'bg-gradient-to-r from-[var(--brand-start)]/10 to-[var(--brand-end)]/10 text-[var(--brand-start)]'
                                    : 'text-zinc-600 dark:text-zinc-400 hover:bg-zinc-50 dark:hover:bg-zinc-800 hover:text-zinc-900 dark:hover:text-zinc-100'
                                    }`}
                            >
                                <Icon
                                    className={`w-5 h-5 ${isActive ? 'text-[var(--brand-start)]' : 'text-zinc-400 group-hover:text-zinc-600 dark:group-hover:text-zinc-300'
                                        }`}
                                />
                                <span className={`font-medium ${isActive ? 'font-semibold' : ''}`}>
                                    {item.name}
                                </span>
                                {isActive && (
                                    <div className="ml-auto w-1.5 h-1.5 rounded-full bg-[var(--brand-start)]" />
                                )}
                            </Link>
                        );
                    })}
                </nav>
            </aside>
        </>
    );
};

export default Sidebar;
