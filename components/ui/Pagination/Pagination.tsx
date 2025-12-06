"use client";
import React from "react";
import { FiChevronLeft, FiChevronRight } from "react-icons/fi";
import clsx from "clsx";

type PaginationProps = {
    currentPage: number;
    totalPages: number;
    onPageChange: (page: number) => void;
    className?: string;
};

const Pagination = ({ currentPage, totalPages, onPageChange, className }: PaginationProps) => {
    const pages = Array.from({ length: totalPages }, (_, i) => i + 1);

    const visiblePages = pages.filter((page) => {
        if (totalPages <= 7) return true;
        if (page === 1 || page === totalPages) return true;
        if (page >= currentPage - 1 && page <= currentPage + 1) return true;
        return false;
    });

    const getPageContent = (page: number, index: number, array: number[]) => {
        const prevPage = array[index - 1];
        if (prevPage && page - prevPage > 1) {
            return (
                <React.Fragment key={`ellipsis-${page}`}>
                    <span className="px-2 text-zinc-400">...</span>
                    <PageButton page={page} isActive={currentPage === page} onClick={() => onPageChange(page)} />
                </React.Fragment>
            );
        }
        return <PageButton key={page} page={page} isActive={currentPage === page} onClick={() => onPageChange(page)} />;
    };

    return (
        <div className={clsx("flex items-center gap-1", className)}>
            <button
                onClick={() => onPageChange(currentPage - 1)}
                disabled={currentPage === 1}
                className="p-2 border border-zinc-200 dark:border-zinc-700 rounded-lg disabled:opacity-50 disabled:cursor-not-allowed hover:bg-zinc-50 dark:hover:bg-zinc-800 transition-colors"
                aria-label="Previous page"
            >
                <FiChevronLeft className="w-4 h-4" />
            </button>

            {visiblePages.map((page, index) => getPageContent(page, index, visiblePages))}

            <button
                onClick={() => onPageChange(currentPage + 1)}
                disabled={currentPage === totalPages}
                className="p-2 border border-zinc-200 dark:border-zinc-700 rounded-lg disabled:opacity-50 disabled:cursor-not-allowed hover:bg-zinc-50 dark:hover:bg-zinc-800 transition-colors"
                aria-label="Next page"
            >
                <FiChevronRight className="w-4 h-4" />
            </button>
        </div>
    );
};

const PageButton = ({ page, isActive, onClick }: { page: number; isActive: boolean; onClick: () => void }) => (
    <button
        onClick={onClick}
        className={clsx(
            "w-9 h-9 flex items-center justify-center rounded-lg text-sm font-medium transition-colors border",
            isActive
                ? "bg-[var(--primary)] border-[var(--primary)] text-white"
                : "bg-white dark:bg-zinc-800 border-zinc-200 dark:border-zinc-700 text-zinc-700 dark:text-zinc-300 hover:bg-zinc-50 dark:hover:bg-zinc-700"
        )}
    >
        {page}
    </button>
);

/*
 * How to use:
 * 
 * import { Pagination } from "@/components/ui";
 * 
 * <Pagination 
 *   currentPage={1} 
 *   totalPages={10} 
 *   onPageChange={(page) => console.log(page)} 
 * />
 */

export default Pagination;
