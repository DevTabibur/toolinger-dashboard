/* eslint-disable @typescript-eslint/no-explicit-any */
'use client';

import React, { useState, useMemo } from 'react';
import { DashboardBreadcrumb, Button, Input, Select, Modal, Switch, Table, TableHeader, TableBody, TableRow, TableHead, TableCell } from '@/components/ui';
import { useLanguage } from '@/context/LanguageContext';
import { FiSearch, FiPlus, FiEdit2, FiTrash2 } from 'react-icons/fi';

// Dummy FAQ data
const DUMMY_FAQS = [
  {
    id: 1,
    question: 'What is a POS platform?',
    answer: 'A software system that processes sales, manages inventory',
    category: 'General',
    status: true
  },
  {
    id: 2,
    question: 'Who uses it?',
    answer: 'Retailers, restaurants, and service businesses.',
    category: 'General',
    status: true
  },
  {
    id: 3,
    question: 'What are the key features?',
    answer: 'Billing, inventory tracking, CRM, employee management, and reports.',
    category: 'Features',
    status: true
  },
  {
    id: 4,
    question: 'Does it support multiple payment methods?',
    answer: 'Yes, including cash, credit/debit cards, mobile wallets, and online payments.',
    category: 'Features',
    status: true
  },
  {
    id: 5,
    question: 'Does it support barcode scanning?',
    answer: 'Yes, barcode scanners can be integrated for faster checkouts.',
    category: 'Features',
    status: true
  },
  {
    id: 6,
    question: 'Does it work with thermal receipt printers?',
    answer: 'Yes, many POS platforms support thermal and standard receipt printers.',
    category: 'Hardware',
    status: true
  },
  {
    id: 7,
    question: 'Is a POS platform secure?',
    answer: 'Yes, it uses encryption, authentication, and secure payment processing.',
    category: 'Secure',
    status: true
  },
  {
    id: 8,
    question: 'Can a POS platform track inventory?',
    answer: 'Yes, it helps track stock levels, manage suppliers, and set reorder alerts.',
    category: 'Features',
    status: true
  },
  {
    id: 9,
    question: 'Can a POS platform generate reports?',
    answer: 'Yes, it provides sales, inventory, and customer analytics reports.',
    category: 'Australia',
    status: true
  },
  {
    id: 10,
    question: 'Does it work with thermal receipt printers?',
    answer: 'Yes, many POS platforms support thermal and standard receipt printers.',
    category: 'Hardware',
    status: true
  },
];

const FAQPage = () => {
  const { t } = useLanguage();

  // State
  const [searchQuery, setSearchQuery] = useState('');
  const [categoryFilter, setCategoryFilter] = useState('all');
  const [sortBy, setSortBy] = useState('last7days');
  const [currentPage, setCurrentPage] = useState(1);
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [faqToDelete, setFaqToDelete] = useState<any>(null);
  const [faqToEdit, setFaqToEdit] = useState<any>(null);
  const [editCategory, setEditCategory] = useState('');
  const [editQuestion, setEditQuestion] = useState('');
  const [editAnswer, setEditAnswer] = useState('');
  const [editStatus, setEditStatus] = useState(true);

  // Get unique categories
  const categories = useMemo(() => {
    const uniqueCategories = Array.from(new Set(DUMMY_FAQS.map(faq => faq.category)));
    return uniqueCategories;
  }, []);

  // Filter and sort FAQs
  const filteredAndSortedFaqs = useMemo(() => {
    let filtered = [...DUMMY_FAQS];

    // Apply search filter
    if (searchQuery) {
      filtered = filtered.filter(faq =>
        faq.question.toLowerCase().includes(searchQuery.toLowerCase()) ||
        faq.answer.toLowerCase().includes(searchQuery.toLowerCase()) ||
        faq.category.toLowerCase().includes(searchQuery.toLowerCase())
      );
    }

    // Apply category filter
    if (categoryFilter !== 'all') {
      filtered = filtered.filter(faq => faq.category === categoryFilter);
    }

    // Apply sorting
    if (sortBy === 'last7days') {
      // For demo purposes, we'll keep the original order
      // In a real app, this would sort by date
    }

    return filtered;
  }, [searchQuery, categoryFilter, sortBy]);

  // Pagination
  const totalPages = Math.ceil(filteredAndSortedFaqs.length / rowsPerPage);
  const paginatedFaqs = filteredAndSortedFaqs.slice(
    (currentPage - 1) * rowsPerPage,
    currentPage * rowsPerPage
  );

  // Reset to page 1 when filters change
  React.useEffect(() => {
    setCurrentPage(1);
  }, [searchQuery, categoryFilter, sortBy, rowsPerPage]);

  // Handle delete
  const handleDeleteClick = (faq: any) => {
    setFaqToDelete(faq);
    setIsDeleteModalOpen(true);
  };

  const handleConfirmDelete = () => {
    console.log('Deleting FAQ:', faqToDelete);
    setIsDeleteModalOpen(false);
    setFaqToDelete(null);
  };

  // Handle edit
  const handleEditClick = (faq: any) => {
    setFaqToEdit(faq);
    setEditCategory(faq.category);
    setEditQuestion(faq.question);
    setEditAnswer(faq.answer);
    setEditStatus(faq.status);
    setIsEditModalOpen(true);
  };

  const handleSaveEdit = () => {
    console.log('Saving FAQ:', {
      ...faqToEdit,
      category: editCategory,
      question: editQuestion,
      answer: editAnswer,
      status: editStatus
    });
    setIsEditModalOpen(false);
    setFaqToEdit(null);
  };

  return (
    <div className="space-y-6">
      <DashboardBreadcrumb items={[{ label: t("Content (CMS)") }, { label: t("FAQ") }]} />

      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-semibold text-zinc-900 dark:text-zinc-100">{t("FAQ")}</h1>
          <p className="text-sm text-zinc-500 mt-1">{t("Manage your FAQ")}</p>
        </div>
        <Button className="bg-[var(--primary)] hover:bg-[var(--primary-dark)] text-[var(--primary-foreground)] border-none">
          <FiPlus className="w-4 h-4 mr-2" />
          {t("Add FAQ")}
        </Button>
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

          <div className="flex flex-col sm:flex-row gap-4">
            {/* Category Filter */}
            <Select
              value={categoryFilter}
              onChange={(e) => setCategoryFilter(e.target.value)}
              options={[
                { label: t("Category"), value: "all" },
                ...categories.map(cat => ({ label: cat, value: cat }))
              ]}
              className="w-full sm:w-40"
            />

            {/* Sort */}
            <Select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value)}
              options={[
                { label: t("Sort By") + ": " + t("Last 7 Days"), value: "last7days" },
              ]}
              className="w-full sm:w-48"
            />
          </div>
        </div>
      </div>

      {/* Table */}
      <div className="border border-zinc-200 bg-white dark:border-zinc-800 dark:bg-zinc-900/50 overflow-hidden">
        <div className="overflow-x-auto">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead className="min-w-[250px]">{t("Questions")}</TableHead>
                <TableHead className="min-w-[300px]">{t("Answers")}</TableHead>
                <TableHead className="min-w-[120px]">{t("Category")}</TableHead>
                <TableHead className="text-right min-w-[100px]">{t("Actions")}</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {paginatedFaqs.map((faq) => (
                <TableRow key={faq.id}>
                  <TableCell className="font-medium text-zinc-900 dark:text-zinc-100">
                    {faq.question}
                  </TableCell>
                  <TableCell className="text-zinc-600 dark:text-zinc-400">
                    {faq.answer}
                  </TableCell>
                  <TableCell className="text-[var(--primary)]">{faq.category}</TableCell>
                  <TableCell>
                    <div className="flex items-center justify-end gap-2">
                      <button
                        onClick={() => handleEditClick(faq)}
                        className="p-2 text-zinc-600 dark:text-zinc-400 hover:text-[var(--primary)] hover:bg-zinc-100 dark:hover:bg-zinc-800 transition-colors"
                      >
                        <FiEdit2 className="w-4 h-4" />
                      </button>
                      <button
                        onClick={() => handleDeleteClick(faq)}
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
        {paginatedFaqs.length === 0 && (
          <div className="p-12 text-center">
            <p className="text-zinc-500">{t("No FAQs found")}</p>
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
            {t("Delete Faq")}
          </h3>
          <p className="text-sm text-zinc-500 mb-6">
            {t("Are you sure you want to delete faq?")}
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

      {/* Edit FAQ Modal */}
      <Modal isOpen={isEditModalOpen} onClose={() => setIsEditModalOpen(false)}>
        <div>
          <h3 className="text-lg font-semibold text-zinc-900 dark:text-zinc-100 mb-4">
            {t("Edit Faq")}
          </h3>

          <div className="space-y-4">
            {/* Category */}
            <div>
              <label className="block text-sm font-medium text-zinc-700 dark:text-zinc-300 mb-1.5">
                {t("Category")} <span className="text-red-500">*</span>
              </label>
              <Select
                value={editCategory}
                onChange={(e) => setEditCategory(e.target.value)}
                options={categories.map(cat => ({ label: cat, value: cat }))}
              />
            </div>

            {/* Question */}
            <div>
              <label className="block text-sm font-medium text-zinc-700 dark:text-zinc-300 mb-1.5">
                {t("Question")} <span className="text-red-500">*</span>
              </label>
              <Input
                value={editQuestion}
                onChange={(e) => setEditQuestion(e.target.value)}
                placeholder={t("Question")}
              />
            </div>

            {/* Answer */}
            <div>
              <label className="block text-sm font-medium text-zinc-700 dark:text-zinc-300 mb-1.5">
                {t("Answer")} <span className="text-red-500">*</span>
              </label>
              <textarea
                value={editAnswer}
                onChange={(e) => setEditAnswer(e.target.value)}
                placeholder={t("Answer")}
                rows={4}
                className="w-full px-3 py-2 border border-zinc-300 dark:border-zinc-700 bg-white dark:bg-zinc-900 text-zinc-900 dark:text-zinc-100 focus:outline-none focus:ring-2 focus:ring-[var(--primary)] focus:border-transparent"
              />
            </div>

            {/* Status */}
            <div>
              <label className="block text-sm font-medium text-zinc-700 dark:text-zinc-300 mb-1.5">
                {t("Status")}
              </label>
              <Switch
                checked={editStatus}
                onChange={setEditStatus}
              />
            </div>
          </div>

          <div className="flex gap-3 justify-end mt-6">
            <Button
              variant="outline"
              onClick={() => setIsEditModalOpen(false)}
              className="bg-zinc-900 text-white hover:bg-zinc-800 border-none px-6"
            >
              {t("Cancel")}
            </Button>
            <Button
              onClick={handleSaveEdit}
              className="bg-[var(--primary)] hover:bg-[var(--primary-dark)] text-[var(--primary-foreground)] border-none px-6"
            >
              {t("Save Changes")}
            </Button>
          </div>
        </div>
      </Modal>
    </div>
  );
};

export default FAQPage;
