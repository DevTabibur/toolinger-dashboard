'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { SidebarMenuData } from '@/constants/SidebarMenu.constant';
import { FiChevronDown } from 'react-icons/fi';

const HorizontalNav = () => {
    const pathname = usePathname();

    return (
        <div className="bg-white dark:bg-zinc-900 border-b border-zinc-200 dark:border-zinc-800 px-4 lg:px-8 hidden lg:block">
            <nav className="flex items-center gap-1 overflow-x-auto scrollbar-hide">
                {SidebarMenuData.map((section) => (
                    <div key={section.title} className="flex items-center">
                        {section.items.map((item) => {
                            const Icon = item.icon;
                            const isActive = pathname === item.href;

                            return (
                                <Link
                                    key={item.title}
                                    href={item.href}
                                    className={`flex items-center gap-2 px-3 py-4 text-sm font-medium border-b-2 transition-colors whitespace-nowrap ${isActive
                                            ? 'border-[var(--brand-start)] text-[var(--brand-start)]'
                                            : 'border-transparent text-zinc-600 dark:text-zinc-400 hover:text-zinc-900 dark:hover:text-zinc-100'
                                        }`}
                                >
                                    <Icon className="w-4 h-4" />
                                    <span>{item.title}</span>
                                    {item.subItems && (
                                        <FiChevronDown className="w-3 h-3 ml-1" />
                                    )}
                                </Link>
                            );
                        })}
                    </div>
                ))}
            </nav>
        </div>
    );
};

export default HorizontalNav;