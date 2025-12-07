/* eslint-disable @typescript-eslint/no-explicit-any */
'use client';

import React, { useState, useMemo } from 'react';
import { DashboardBreadcrumb, Button, Input, Select, Modal, Table, TableHeader, TableBody, TableRow, TableHead, TableCell } from '@/components/ui';
import { useLanguage } from '@/context/LanguageContext';
import { FiSearch, FiTrash2 } from 'react-icons/fi';

// Dummy comments data
const DUMMY_COMMENTS = [
  {
    id: 1,
    comment: 'Thanks for the detailed guide on POS System',
    createdDate: '24 Dec 2024',
    rating: 5,
    blog: 'What is a POS System? A Beginner\'s Guide',
    author: 'Gertrude',
    status: 'unpublish'
  },
  {
    id: 2,
    comment: 'Thanks for sharing these insights!',
    createdDate: '10 Dec 2024',
    rating: 4,
    blog: 'Best POS Systems for Retail Businesses',
    author: 'Edward',
    status: 'unpublish'
  },
  {
    id: 3,
    comment: 'Helpful info on POS features - thank you!',
    createdDate: '27 Nov 2024',
    rating: 5,
    blog: 'Key Features of a Modern POS',
    author: 'Mark',
    status: 'unpublish'
  },
  {
    id: 4,
    comment: 'Fantastic content, thank you for sharing!',
    createdDate: '18 Nov 2024',
    rating: 5,
    blog: 'Integrating POS with E-Commerce',
    author: 'Nilda',
    status: 'unpublish'
  },
  {
    id: 5,
    comment: 'This really cleared things up, I appreciate it',
    createdDate: '06 Nov 2024',
    rating: 5,
    blog: 'AI & the Future of POS Systems',
    author: 'Rebecca',
    status: 'unpublish'
  },
  {
    id: 6,
    comment: 'Awesome post, thanks for sharing!',
    createdDate: '25 Oct 2024',
    rating: 5,
    blog: 'Retail vs Restaurant POS: Key Differences',
    author: 'Jimmy',
    status: 'unpublish'
  },
  {
    id: 7,
    comment: 'I learned a lot from this - thanks!',
    createdDate: '14 Oct 2024',
    rating: 5,
    blog: 'Understanding PCI Compliance for POS',
    author: 'Richard',
    status: 'unpublish'
  },
  {
    id: 8,
    comment: 'Great article on cloud-based POS!',
    createdDate: '02 Oct 2024',
    rating: 4,
    blog: 'Cloud vs On-Premise POS Solutions',
    author: 'Sarah',
    status: 'publish'
  },
  {
    id: 9,
    comment: 'Very informative, helped me a lot',
    createdDate: '20 Sep 2024',
    rating: 5,
    blog: 'Mobile POS: The Future of Retail',
    author: 'Michael',
    status: 'publish'
  },
  {
    id: 10,
    comment: 'Excellent breakdown of POS features',
    createdDate: '08 Sep 2024',
    rating: 5,
    blog: 'Top 10 POS Systems for Small Business',
    author: 'Jennifer',
    status: 'publish'
  },
];

const BlogCommentsPage = () => {
  const { t } = useLanguage();

  // State
  const [searchQuery, setSearchQuery] = useState('');
  const [sortBy, setSortBy] = useState('latest');
  const [statusFilter, setStatusFilter] = useState('all');
  const [currentPage, setCurrentPage] = useState(1);
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [commentToDelete, setCommentToDelete] = useState<any>(null);

  // Filter and sort comments
  const filteredAndSortedComments = useMemo(() => {
    let filtered = [...DUMMY_COMMENTS];

    // Apply search filter
    if (searchQuery) {
      filtered = filtered.filter(comment =>
        comment.comment.toLowerCase().includes(searchQuery.toLowerCase()) ||
        comment.blog.toLowerCase().includes(searchQuery.toLowerCase()) ||
        comment.author.toLowerCase().includes(searchQuery.toLowerCase())
      );
    }

    // Apply status filter
    if (statusFilter !== 'all') {
      filtered = filtered.filter(comment => comment.status === statusFilter);
    }

    // Apply sorting
    if (sortBy === 'latest') {
      filtered.sort((a, b) => new Date(b.createdDate).getTime() - new Date(a.createdDate).getTime());
    } else if (sortBy === 'oldest') {
      filtered.sort((a, b) => new Date(a.createdDate).getTime() - new Date(b.createdDate).getTime());
    }

    return filtered;
  }, [searchQuery, sortBy, statusFilter]);

  // Pagination
  const totalPages = Math.ceil(filteredAndSortedComments.length / rowsPerPage);
  const paginatedComments = filteredAndSortedComments.slice(
    (currentPage - 1) * rowsPerPage,
    currentPage * rowsPerPage
  );

  // Reset to page 1 when filters change
  React.useEffect(() => {
    setCurrentPage(1);
  }, [searchQuery, sortBy, statusFilter, rowsPerPage]);

  // Handle delete
  const handleDeleteClick = (comment: any) => {
    setCommentToDelete(comment);
    setIsDeleteModalOpen(true);
  };

  const handleConfirmDelete = () => {
    console.log('Deleting comment:', commentToDelete);
    setIsDeleteModalOpen(false);
    setCommentToDelete(null);
  };

  // Render star rating
  const renderStars = (rating: number) => {
    return (
      <div className="flex items-center gap-0.5">
        {[1, 2, 3, 4, 5].map((star) => (
          <span key={star} className={star <= rating ? 'text-yellow-500' : 'text-zinc-300'}>
            ★
          </span>
        ))}
      </div>
    );
  };

  return (
    <div className="space-y-6">
      <DashboardBreadcrumb items={[{ label: t("Content (CMS)") }, { label: t("Blog") }, { label: t("Blog Comments") }]} />

      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-semibold text-zinc-900 dark:text-zinc-100">{t("Blog Comments")}</h1>
          <p className="text-sm text-zinc-500 mt-1">{t("Manage your blog tags")}</p>
        </div>
      </div>

      {/* Filters */}
      <div className="border border-zinc-200 bg-white dark:border-zinc-800 dark:bg-zinc-900/50 p-4">
        <div className="flex flex-col sm:flex-row gap-4 justify-between">
          {/* Search */}
          <div className="relative flex-1 max-w-md">
            <FiSearch className="absolute left-3 top-1/2 -translate-y-1/2 text-zinc-400 w-4 h-4" />
            <Input
              placeholder={t("Search")}
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-10"
            />
          </div>

          {/* Sort */}
          <Select
            value={sortBy}
            onChange={(e) => setSortBy(e.target.value)}
            options={[
              { label: t("Sort By") + ": " + t("Latest"), value: "latest" },
              { label: t("Sort By") + ": " + t("Oldest"), value: "oldest" },
            ]}
            className="w-full sm:w-48"
          />
        </div>
      </div>

      {/* Table */}
      <div className="border border-zinc-200 bg-white dark:border-zinc-800 dark:bg-zinc-900/50 overflow-hidden">
        <div className="overflow-x-auto">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead className="min-w-[250px]">{t("Comments")}</TableHead>
                <TableHead className="min-w-[120px]">{t("Created Date")}</TableHead>
                <TableHead className="min-w-[120px]">{t("Ratings")}</TableHead>
                <TableHead className="min-w-[200px]">{t("Blog")}</TableHead>
                <TableHead className="min-w-[100px]">{t("By")}</TableHead>
                <TableHead className="min-w-[150px]">{t("Status")}</TableHead>
                <TableHead className="text-right min-w-[80px]">{t("Actions")}</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {paginatedComments.map((comment) => (
                <TableRow key={comment.id}>
                  <TableCell className="font-medium text-zinc-900 dark:text-zinc-100">
                    {comment.comment}
                  </TableCell>
                  <TableCell className="text-zinc-500">{comment.createdDate}</TableCell>
                  <TableCell>{renderStars(comment.rating)}</TableCell>
                  <TableCell className="text-[var(--primary)]">{comment.blog}</TableCell>
                  <TableCell className="text-zinc-600 dark:text-zinc-400">{comment.author}</TableCell>
                  <TableCell>
                    <Select
                      value={comment.status}
                      onChange={(e) => console.log('Status changed:', e.target.value)}
                      options={[
                        { label: t("Unpublish"), value: "unpublish" },
                        { label: t("Publish"), value: "publish" },
                      ]}
                      className="w-32"
                    />
                  </TableCell>
                  <TableCell>
                    <div className="flex items-center justify-end">
                      <button
                        onClick={() => handleDeleteClick(comment)}
                        className="p-2 text-red-600 hover:bg-red-50 dark:hover:bg-red-900/20 transition-colors"
                      >
                        <FiTrash2 className="w-4 h-4" />
                      </button>
                    </div>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>

        {/* No Results */}
        {paginatedComments.length === 0 && (
          <div className="p-12 text-center">
            <p className="text-zinc-500">{t("No comments found")}</p>
          </div>
        )}
      </div>

      {/* Pagination */}
      <div className="flex flex-col sm:flex-row items-center justify-between gap-4 border-t border-zinc-200 dark:border-zinc-800 pt-4">
        <div className="flex items-center gap-2">
          <span className="text-sm text-zinc-500">{t("Row Per Page")}:</span>
          <Select
            value={rowsPerPage.toString()}
            onChange={(e) => setRowsPerPage(Number(e.target.value))}
            options={[
              { label: "10", value: "10" },
              { label: "20", value: "20" },
              { label: "50", value: "50" },
            ]}
            className="w-20"
          />
          <span className="text-sm text-zinc-500 ml-4">{t("Entries")}</span>
        </div>

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

      {/* Delete Confirmation Modal */}
      <Modal isOpen={isDeleteModalOpen} onClose={() => setIsDeleteModalOpen(false)}>
        <div className="text-center">
          <div className="mx-auto flex items-center justify-center h-16 w-16 bg-red-100 dark:bg-red-900/20 mb-4">
            <FiTrash2 className="h-8 w-8 text-red-600" />
          </div>
          <h3 className="text-lg font-semibold text-zinc-900 dark:text-zinc-100 mb-2">
            {t("Delete Comment")}
          </h3>
          <p className="text-sm text-zinc-500 mb-6">
            {t("Are you sure you want to delete comment?")}
          </p>
          <div className="flex gap-3 justify-center">
            <Button
              variant="outline"
              onClick={() => setIsDeleteModalOpen(false)}
              className="bg-zinc-900 text-white hover:bg-zinc-800 border-none px-6"
            >
              {t("Cancel")}
            </Button>
            <Button
              onClick={handleConfirmDelete}
              className="bg-[var(--primary)] hover:bg-[var(--primary-dark)] text-[var(--primary-foreground)] border-none px-6"
            >
              {t("Yes, Delete")}
            </Button>
          </div>
        </div>
      </Modal>
    </div>
  );
};

export default BlogCommentsPage;