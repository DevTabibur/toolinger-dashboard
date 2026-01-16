'use client';

import React, { useEffect, useState } from 'react';
import { DashboardBreadcrumb, Button, Input, Select, Table, TableHeader, TableBody, TableRow, TableHead, TableCell, Modal } from '@/components/ui';
import { useLanguage } from '@/context/LanguageContext';
import { FiSearch, FiPlus, FiEye, FiTrash2 } from 'react-icons/fi';
import Link from 'next/link';
import { formatDate } from '@/utils/dateFormatter';
import { SortableTableHead } from '@/components/ui/Table/Table';
import { useDeleteSentMessageMutation, useGetAllSentMessagesQuery, useSendEmailMutation } from '@/redux/api/sentMessage.api';
import { useDebounce } from '@/hooks/useDebounce';
import Loader from '@/components/ui/Loader';
import toast from 'react-hot-toast';


const SendMailPage = () => {
    const { t } = useLanguage();
    const [searchQuery, setSearchQuery] = useState('');
    const [sortBy, setSortBy] = useState<string | null>(null);
    const [sortOrder, setSortOrder] = useState<'asc' | 'desc'>('asc');
    const [statusFilter, setStatusFilter] = useState<string | null>(null);
    const [rowsPerPage, setRowsPerPage] = useState(10);
    const [currentPage, setCurrentPage] = useState(1);
    const [isViewModalOpen, setIsViewModalOpen] = useState(false);
    // const [sendEMail, { isLoading }] = useSendEmailMutation()
    const debouncedSearch = useDebounce(searchQuery, 500);
    const { data: sentMessages, isLoading } = useGetAllSentMessagesQuery({
        page: currentPage,
        limit: rowsPerPage,
        searchTerm: debouncedSearch || undefined,
        sortBy,
        sortOrder,
        status: statusFilter || undefined,
    })
    const [deleteSentMessage, { isLoading: isDeletingMessage }] = useDeleteSentMessageMutation()


    // Pagination
    const totalPages = Math.ceil(
        (sentMessages?.data?.meta?.total || 0) / rowsPerPage
    );
    // Reset to page 1 when filters change
    useEffect(() => {
        setCurrentPage(1);
    }, [searchQuery, statusFilter, rowsPerPage]);

    // console.log("sentMessages", sentMessages)
    const handleSort = (column: string) => {
        if (sortBy === column) {
            setSortOrder(prev => (prev === 'asc' ? 'desc' : 'asc'));
        } else {
            setSortBy(column);
            setSortOrder('asc');
        }
    };

    const handleDeleteMessage = async (_id: any) => {
        const res = await deleteSentMessage(_id)
        // console.log("res", res)
        if (res?.data?.statusCode == 200) {
            toast.success("Message deleted successfully")
        } else {
            toast.error("Failed to delete message")
        }
    }

    if (isLoading) {
        return <Loader />
    }

    return (
        <div className="space-y-6">
            {/* Header */}
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                <div>
                    <h1 className="text-2xl font-semibold text-zinc-900 dark:text-zinc-100">{t("Send Message")}</h1>
                    <p className="text-sm text-zinc-500 mt-1">{t("Manage customer send message list")}</p>
                </div>
                <Link
                    href="/dashboard/user-management/send-message/send"
                    className="bg-[var(--primary)] hover:bg-[var(--primary-dark)] text-[var(--primary-foreground)] border-none cursor-pointer"
                >
                    <Button className="flex items-center cursor-pointer" icon={<FiPlus className="w-4 h-4 mr-2" />}>
                        {t("Send New Message")}
                    </Button>
                </Link>
            </div>

            <DashboardBreadcrumb items={[{ label: t("User Management") }, { label: t("Send Message") }]} />

            {/* Filters */}
            <div className="border border-zinc-200 bg-white dark:border-zinc-800 dark:bg-zinc-900/50 p-4 pl-0">
                <div className="flex flex-col md:flex-row md:items-center gap-4 justify-between">
                    <div className="relative flex-1 max-w-md">
                        <Input
                            placeholder={t("Search by subject")}
                            value={searchQuery}
                            onChange={(e) => setSearchQuery(e.target.value)}
                            className="pl-6 focus:outline-none focus:ring-2 focus:ring-[var(--primary)] focus:border-[var(--primary)]"
                        />
                    </div>
                    <div className="flex items-center gap-3 flex-wrap">

                        <Select
                            value={statusFilter as any}
                            onChange={(e) => setStatusFilter(e.target.value)}
                            options={[
                                { label: t("All Status"), value: "" },
                                { label: t("Sent"), value: "sent" },
                                { label: t("Failed"), value: "failed" },
                            ]}
                            className="w-36"
                        />
                    </div>
                </div>
            </div>

            {/* Table */}
            <div className="border border-zinc-200 bg-white dark:border-zinc-800 dark:bg-zinc-900/50 overflow-hidden">
                <Table>
                    <TableHeader>
                        <TableRow>
                            <SortableTableHead label={t("SL")} column="sl" activeColumn={sortBy} order={sortOrder} onSort={handleSort} />
                            <SortableTableHead label={t("Subject")} column="subject" activeColumn={sortBy} order={sortOrder} onSort={handleSort} />
                            <SortableTableHead label={t("To")} column="to" activeColumn={sortBy} order={sortOrder} onSort={handleSort} />
                            <SortableTableHead label={t("Status")} column="status" activeColumn={sortBy} order={sortOrder} onSort={handleSort} />
                            <SortableTableHead label={t("Date")} column="sentAt" activeColumn={sortBy} order={sortOrder} onSort={handleSort} />
                            <TableHead className="text-right">{t("Actions")}</TableHead>
                        </TableRow>
                    </TableHeader>
                    <TableBody>
                        {sentMessages?.data?.data?.map((mail: any, idx: number) => (
                            <TableRow key={mail.id}>
                                <TableCell className="font-medium text-[var(--primary)]">{idx + 1}</TableCell>
                                <TableCell className="font-medium text-zinc-900 dark:text-zinc-100">{mail.subject}</TableCell>
                                <TableCell className="text-zinc-500">{mail.to}</TableCell>
                                <TableCell>
                                    <span
                                        className={`px-3 py-1 text-xs font-medium rounded-lg ${mail.status === 'sent'
                                            ? 'bg-[var(--primary)] dark:bg-[var(--primary-dark)] text-white'
                                            : 'bg-red-600 dark:bg-red-700 text-white'
                                            }`}
                                    >
                                        {mail.status === 'sent' ? t("Sent") : t("Failed")}
                                    </span>
                                </TableCell>
                                <TableCell className="text-zinc-500">{formatDate(mail.sentAt)}</TableCell>
                                <TableCell>
                                    <div className="flex items-center justify-end gap-2">
                                        <button onClick={() => setIsViewModalOpen(true)} className="p-2 text-zinc-600 cursor-pointer hover:bg-zinc-100 dark:hover:bg-zinc-800 rounded-md">
                                            <FiEye className="w-5 h-5" />
                                        </button>
                                        <button onClick={() => handleDeleteMessage(mail?._id)} className="p-2 text-red-600 cursor-pointer hover:bg-red-50 dark:hover:bg-red-900/20 rounded-md">
                                            <FiTrash2 className="w-5 h-5" />
                                        </button>
                                    </div>
                                </TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
                {/* No Results */}
                {sentMessages?.data?.meta?.total === 0 && (
                    <div className="p-12 text-center">
                        <p className="text-zinc-500">{t("No Messages found")}</p>
                    </div>
                )}

            </div>



            {/* Pagination */}
            <div className="flex flex-col sm:flex-row items-center justify-between gap-4 border-t border-zinc-200 dark:border-zinc-800 pt-4">

                {/* LEFT: Row per page */}
                <div className="flex items-center gap-2 text-sm text-zinc-500 whitespace-nowrap">
                    <span className="whitespace-nowrap">
                        {t("Row Per Page")}:
                    </span>

                    <Select
                        value={rowsPerPage.toString()}
                        onChange={(e) => setRowsPerPage(Number(e.target.value))}
                        options={[
                            { label: "10", value: "10" },
                            { label: "20", value: "20" },
                            { label: "50", value: "50" },
                        ]}
                        className="w-16 shrink-0"
                    />

                    <span className="whitespace-nowrap">
                        {t("Entries")}
                    </span>
                </div>


                {/* RIGHT: Pagination */}
                <div className="flex items-center gap-2">
                    {/* previous / pages / next (unchanged) */}
                    <div className="flex items-center gap-2">
                        <button
                            onClick={() => setCurrentPage(prev => Math.max(1, prev - 1))}
                            disabled={currentPage === 1}
                            className="px-3 py-1.5 text-sm border border-zinc-200 dark:border-zinc-700 text-zinc-600 dark:text-zinc-400 hover:bg-zinc-100 dark:hover:bg-zinc-800 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
                        >
                            {t("Previous")}
                        </button>

                        <div className="flex items-center gap-1">
                            {Array.from({ length: Math.min(5, totalPages) }, (_, i) => {
                                let pageNum;
                                if (totalPages <= 5) {
                                    pageNum = i + 1;
                                } else if (currentPage <= 3) {
                                    pageNum = i + 1;
                                } else if (currentPage >= totalPages - 2) {
                                    pageNum = totalPages - 4 + i;
                                } else {
                                    pageNum = currentPage - 2 + i;
                                }

                                return (
                                    <button
                                        key={pageNum}
                                        onClick={() => setCurrentPage(pageNum)}
                                        className={`w-8 h-8 text-sm border transition-colors ${currentPage === pageNum
                                            ? 'bg-[var(--primary)] text-[var(--primary-foreground)] border-[var(--primary)]'
                                            : 'border-zinc-200 dark:border-zinc-700 text-zinc-600 dark:text-zinc-400 hover:bg-zinc-100 dark:hover:bg-zinc-800'
                                            }`}
                                    >
                                        {pageNum}
                                    </button>
                                );
                            })}
                        </div>

                        <button
                            onClick={() => setCurrentPage(prev => Math.min(totalPages, prev + 1))}
                            disabled={currentPage === totalPages}
                            className="px-3 py-1.5 text-sm border border-zinc-200 dark:border-zinc-700 text-zinc-600 dark:text-zinc-400 hover:bg-zinc-100 dark:hover:bg-zinc-800 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
                        >
                            {t("Next")}
                        </button>
                    </div>
                </div>
            </div>


            {/* View User Modal */}
            <Modal size='xl' isOpen={isViewModalOpen} onClose={() => setIsViewModalOpen(false)}>
                <h1>Hello World</h1>
            </Modal>


        </div>
    );
};

export default SendMailPage;