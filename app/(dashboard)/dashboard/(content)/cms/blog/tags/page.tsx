/* eslint-disable @typescript-eslint/no-explicit-any */
'use client';

import React, { useState, useMemo } from 'react';
import { DashboardBreadcrumb, Button, Input, Select, Modal, Switch, Table, TableHeader, TableBody, TableRow, TableHead, TableCell } from '@/components/ui';
import { useLanguage } from '@/context/LanguageContext';
import { FiSearch, FiPlus, FiEdit2, FiTrash2 } from 'react-icons/fi';

// Dummy tag data
const DUMMY_TAGS = [
  { id: 1, name: 'PointOfSale', createdDate: '12 Sep 2024', status: true },
  { id: 2, name: 'Business', createdDate: '24 Oct 2024', status: true },
  { id: 3, name: 'RetailTech', createdDate: '18 Feb 2024', status: true },
  { id: 4, name: 'POSIntegration', createdDate: '17 Oct 2024', status: true },
  { id: 5, name: 'Payments', createdDate: '20 Jul 2024', status: true },
  { id: 6, name: 'Software', createdDate: '10 Apr 2024', status: true },
  { id: 7, name: 'Software Tips', createdDate: '29 Aug 2024', status: true },
  { id: 8, name: 'Features', createdDate: '22 Feb 2024', status: true },
  { id: 9, name: 'Budgeting', createdDate: '03 Nov 2024', status: true },
  { id: 10, name: 'Benefits', createdDate: '17 Dec 2024', status: true },
  { id: 11, name: 'Technology', createdDate: '05 Jan 2024', status: false },
  { id: 12, name: 'Innovation', createdDate: '15 Mar 2024', status: true },
];

const BlogTagsPage = () => {
  const { t } = useLanguage();

  // State
  const [searchQuery, setSearchQuery] = useState('');
  const [sortBy, setSortBy] = useState('latest');
  const [currentPage, setCurrentPage] = useState(1);
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [tagToDelete, setTagToDelete] = useState<any>(null);
  const [tagToEdit, setTagToEdit] = useState<any>(null);
  const [editTagName, setEditTagName] = useState('');
  const [editTagStatus, setEditTagStatus] = useState(true);

  // Filter and sort tags
  const filteredAndSortedTags = useMemo(() => {
    let filtered = [...DUMMY_TAGS];

    // Apply search filter
    if (searchQuery) {
      filtered = filtered.filter(tag =>
        tag.name.toLowerCase().includes(searchQuery.toLowerCase())
      );
    }

    // Apply sorting
    if (sortBy === 'latest') {
      filtered.sort((a, b) => new Date(b.createdDate).getTime() - new Date(a.createdDate).getTime());
    } else if (sortBy === 'oldest') {
      filtered.sort((a, b) => new Date(a.createdDate).getTime() - new Date(b.createdDate).getTime());
    } else if (sortBy === 'name') {
      filtered.sort((a, b) => a.name.localeCompare(b.name));
    }

    return filtered;
  }, [searchQuery, sortBy]);

  // Pagination
  const totalPages = Math.ceil(filteredAndSortedTags.length / rowsPerPage);
  const paginatedTags = filteredAndSortedTags.slice(
    (currentPage - 1) * rowsPerPage,
    currentPage * rowsPerPage
  );

  // Reset to page 1 when filters change
  React.useEffect(() => {
    setCurrentPage(1);
  }, [searchQuery, sortBy, rowsPerPage]);

  // Handle delete
  const handleDeleteClick = (tag: any) => {
    setTagToDelete(tag);
    setIsDeleteModalOpen(true);
  };

  const handleConfirmDelete = () => {
    console.log('Deleting tag:', tagToDelete);
    setIsDeleteModalOpen(false);
    setTagToDelete(null);
  };

  // Handle edit
  const handleEditClick = (tag: any) => {
    setTagToEdit(tag);
    setEditTagName(tag.name);
    setEditTagStatus(tag.status);
    setIsEditModalOpen(true);
  };

  const handleSaveEdit = () => {
    console.log('Saving tag:', { ...tagToEdit, name: editTagName, status: editTagStatus });
    setIsEditModalOpen(false);
    setTagToEdit(null);
  };

  return (
    <div className="space-y-6">
      <DashboardBreadcrumb items={[{ label: t("Content (CMS)") }, { label: t("Blog") }, { label: t("Blog Tags") }]} />

      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-semibold text-zinc-900 dark:text-zinc-100">{t("Blog Tags")}</h1>
          <p className="text-sm text-zinc-500 mt-1">{t("Manage your blog tags")}</p>
        </div>
        <Button className="bg-[var(--primary)] hover:bg-[var(--primary-dark)] text-[var(--primary-foreground)] border-none">
          <FiPlus className="w-4 h-4 mr-2" />
          {t("Add Tag")}
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

          {/* Sort */}
          <Select
            value={sortBy}
            onChange={(e) => setSortBy(e.target.value)}
            options={[
              { label: t("Sort By") + ": " + t("Latest"), value: "latest" },
              { label: t("Sort By") + ": " + t("Oldest"), value: "oldest" },
              { label: t("Sort By") + ": " + t("Name"), value: "name" },
            ]}
            className="w-full sm:w-48"
          />
        </div>
      </div>

      {/* Table */}
      <div className="border border-zinc-200 bg-white dark:border-zinc-800 dark:bg-zinc-900/50 overflow-hidden">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>{t("Tags")}</TableHead>
              <TableHead>{t("Created Date")}</TableHead>
              <TableHead>{t("Status")}</TableHead>
              <TableHead className="text-right">{t("Actions")}</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {paginatedTags.map((tag) => (
              <TableRow key={tag.id}>
                <TableCell className="font-medium text-[var(--primary)]">{tag.name}</TableCell>
                <TableCell className="text-zinc-500">{tag.createdDate}</TableCell>
                <TableCell>
                  <span className={`px-3 py-1 text-xs font-medium ${tag.status ? 'bg-green-500 text-white' : 'bg-zinc-500 text-white'}`}>
                    {tag.status ? t("Active") : t("Inactive")}
                  </span>
                </TableCell>
                <TableCell>
                  <div className="flex items-center justify-end gap-2">
                    <button
                      onClick={() => handleEditClick(tag)}
                      className="p-2 text-zinc-600 dark:text-zinc-400 hover:text-[var(--primary)] hover:bg-zinc-100 dark:hover:bg-zinc-800 transition-colors"
                    >
                      <FiEdit2 className="w-4 h-4" />
                    </button>
                    <button
                      onClick={() => handleDeleteClick(tag)}
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

        {/* No Results */}
        {paginatedTags.length === 0 && (
          <div className="p-12 text-center">
            <p className="text-zinc-500">{t("No tags found")}</p>
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
            {t("Delete Tag")}
          </h3>
          <p className="text-sm text-zinc-500 mb-6">
            {t("Are you sure you want to delete tag?")}
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

      {/* Edit Tag Modal */}
      <Modal isOpen={isEditModalOpen} onClose={() => setIsEditModalOpen(false)}>
        <div>
          <h3 className="text-lg font-semibold text-zinc-900 dark:text-zinc-100 mb-4">
            {t("Edit Blog Tag")}
          </h3>

          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-zinc-700 dark:text-zinc-300 mb-1.5">
                {t("Tag")} <span className="text-red-500">*</span>
              </label>
              <Input
                value={editTagName}
                onChange={(e) => setEditTagName(e.target.value)}
                placeholder={t("Enter tag name")}
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-zinc-700 dark:text-zinc-300 mb-1.5">
                {t("Status")}
              </label>
              <Switch
                checked={editTagStatus}
                onChange={setEditTagStatus}
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

export default BlogTagsPage;