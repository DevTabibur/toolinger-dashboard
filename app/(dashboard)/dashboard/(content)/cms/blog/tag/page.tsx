/* eslint-disable @typescript-eslint/no-explicit-any */
'use client';

import { useState, useEffect } from 'react';
import { DashboardBreadcrumb, Button, Input, Select, Modal, Switch, Table, TableHeader, TableBody, TableRow, TableHead, TableCell, Textarea } from '@/components/ui';
import { useLanguage } from '@/context/LanguageContext';
import { FiPlus, FiEdit2, FiTrash2 } from 'react-icons/fi';
import Link from 'next/link';
import { SortableTableHead } from '@/components/ui/Table/Table';
import { formatDate } from '@/utils/dateFormatter';
import { useDebounce } from '@/hooks/useDebounce';
import toast from 'react-hot-toast';
import Loader from '@/components/ui/Loader';
import { useDeleteTagMutation, useGetAllTagsQuery, useUpdateTagMutation } from '@/redux/api/blogTag.api';
import { TAG_STATUS_UI } from '@/utils/Blog_Tag_Status';


const BlogTagsPage = () => {
  const { t } = useLanguage();
  // State
  const [searchQuery, setSearchQuery] = useState('');
  const [sortBy, setSortBy] = useState<string | null>(null);
  const [sortOrder, setSortOrder] = useState<'asc' | 'desc'>('asc');
  const [currentPage, setCurrentPage] = useState(1);
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const [statusFilter, setStatusFilter] = useState<string | null>(null);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [tagToDelete, setTagToDelete] = useState<any>(null);
  const [tagToEdit, setTagToEdit] = useState<any>(null);
  const [editTagName, setEditTagName] = useState('');
  const [editTagSlug, setEditTagSlug] = useState('');
  // const [editTagStatus, setEditTagStatus] = useState<boolean>(false);
  const [editTagStatus, setEditTagStatus] = useState<string | null>(null);
  const [editTagDescription, setEditTagDescription] = useState('');
  const debouncedSearch = useDebounce(searchQuery, 500);
  const { data: tags, isLoading } = useGetAllTagsQuery({
    page: currentPage,
    limit: rowsPerPage,
    searchTerm: debouncedSearch || undefined,
    sortBy,
    sortOrder,
    status: statusFilter || undefined,
  });
  const [deleteTag, { isLoading: deleteLoading }] = useDeleteTagMutation();
  const [updateTag, { isLoading: updateLoading }] = useUpdateTagMutation();


  // Pagination
const totalPages = Math.ceil(
  (tags?.data?.meta?.total || 0) / rowsPerPage
);


  // Reset to page 1 when filters change
  useEffect(() => {
    setCurrentPage(1);
  }, [searchQuery, sortBy, rowsPerPage]);


  // Handle delete
  const handleDeleteClick = (tag: any) => {
    setTagToDelete(tag);
    setIsDeleteModalOpen(true);
  };

  const handleConfirmDelete = async () => {
    const res = await deleteTag(tagToDelete?._id)
    // console.log("delete", res)
    if (res?.data?.statusCode == 200) {
      toast.success("Tag deleted successfully")
    } else {
      toast.error("Tag deleted failed")
    }
    setIsDeleteModalOpen(false);
    setTagToDelete(null);
  };
  // Handle edit
  const handleEditClick = (tag: any) => {
    setTagToEdit(tag);
    setEditTagName(tag?.name);
    setEditTagSlug(tag?.slug);
    setEditTagStatus(tag?.status);
    setEditTagDescription(tag?.description);
    setIsEditModalOpen(true);
  };

  const handleSaveEdit = async () => {

    const res = await updateTag({
      tagId: tagToEdit?._id,
      data: {
        name: editTagName,
        status: editTagStatus,
        slug: editTagSlug,
        description: editTagDescription
      }
      ,
    })
    // console.log("update res ==>", res)
    if (res?.data?.statusCode == 200) {
      toast.success("Tag updated successfully")
    } else {
      toast.error("Tag updated failed")
    }
    setIsEditModalOpen(false);
    setTagToEdit(null);
  };

  const handleSort = (column: string) => {
    if (sortBy === column) {
      setSortOrder(prev => (prev === 'asc' ? 'desc' : 'asc'));
    } else {
      setSortBy(column);
      setSortOrder('asc');
    }
  };



  if (isLoading || deleteLoading || updateLoading) {
    return <Loader />
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-semibold text-zinc-900 dark:text-zinc-100">{t("Blog Tags")}</h1>
          <p className="text-sm text-zinc-500 mt-1">{t("Manage your tags")}</p>
        </div>
        <Link
          href="/dashboard/cms/blog/tag/create"
          className="bg-[var(--primary)] hover:bg-[var(--primary-dark)] text-[var(--primary-foreground)] border-none cursor-pointer"
        >
          <Button className="flex items-center cursor-pointer" icon={<FiPlus className="w-4 h-4 mr-2" />}>

            {t("Add Tag")}
          </Button>
        </Link>
      </div>
      {/* breadcurmb */}
      <DashboardBreadcrumb items={[{ label: t("Content (CMS)") }, { label: t("Blog") }, { label: t("Blog Tags") }]} />



      {/* Filters */}
      <div className="border border-zinc-200 bg-white dark:border-zinc-800 dark:bg-zinc-900/50  p-4 pl-0">
        <div className="flex flex-col md:flex-row md:items-center gap-4 justify-between">

          {/* LEFT: Search */}
          <div className="relative flex-1 max-w-md">
            {/* <FiSearch className="absolute left-3 top-1/2 -translate-y-1/2 text-zinc-400 w-4 h-4" /> */}
            <Input
              placeholder={t("Search by name or slug")}
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-6 focus:outline-none focus:ring-2 focus:ring-[var(--primary)] focus:border-[var(--primary)]"
            />
          </div>

          {/* RIGHT: Filters */}
          <div className="flex items-center gap-3 flex-wrap">

            {/* Sort by */}
            {/* <Select
              value={sortBy || ''}
              onChange={(e) => setSortBy(e.target.value)}
              options={[
                { label: t("Sort By") + ": " + t("Name"), value: "name" },
                { label: t("Sort By") + ": " + t("Created Date"), value: "createdAt" },
              ]}
              className="w-44"
            /> */}

            {/* Status filter (optional but recommended) */}
            <Select
              value={statusFilter as any}
              onChange={(e) => setStatusFilter(e.target.value)}
              options={[
                { label: t("All Status"), value: "" },
                { label: t("Active"), value: "active" },
                { label: t("Inactive"), value: "inactive" },
                { label: t("Pending"), value: "pending" },
                { label: t("Blocked"), value: "blocked" },
                { label: t("Rejected"), value: "rejected" },
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
              <SortableTableHead
                label={t("sl")}
                column="sl"
                activeColumn={sortBy}
                order={sortOrder}
                onSort={handleSort}
              />
              <SortableTableHead
                label={t("Tag")}
                column="name"
                activeColumn={sortBy}
                order={sortOrder}
                onSort={handleSort}
              />
              <SortableTableHead
                label={t("slug")}
                column="slug"
                activeColumn={sortBy}
                order={sortOrder}
                onSort={handleSort}
              />
              <SortableTableHead
                label={t("description")}
                column="description"
                activeColumn={sortBy}
                order={sortOrder}
                onSort={handleSort}
              />
              <SortableTableHead
                label={t("Status")}
                column="status"
                activeColumn={sortBy}
                order={sortOrder}
                onSort={handleSort}
              />
              <SortableTableHead
                label={t("Created By")}
                column="createdBy"
                activeColumn={sortBy}
                order={sortOrder}
                onSort={handleSort}
              />
              <SortableTableHead
                label={t("Created Date")}
                column="createdAt"
                activeColumn={sortBy}
                order={sortOrder}
                onSort={handleSort}
              />
              <TableHead className="text-right">{t("Actions")}</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {tags?.data?.data?.map((tag: any, idx: number) => (
              <TableRow key={tag.id}>
                <TableCell className="font-medium text-[var(--primary)]">{idx + 1}</TableCell>
                <TableCell className="font-medium text-[var(--primary)]">{ tag?.name}</TableCell>
                <TableCell className="font-medium text-[var(--primary)]">{tag?.slug}</TableCell>
                <TableCell className="font-medium text-[var(--primary)]">{tag?.description ? tag.description : '—'}</TableCell>

                {/* {tags?.data?.data?.map((tag, index) => (
                  <TableCell key={index}>
                    <span
                      className={`px-3 py-1 text-xs font-medium rounded-lg ${statusConfig.className}`}
                    >
                      {t(statusConfig.label)}
                    </span>
                  </TableCell>
                ))} */}
                <TableCell>
                  <TableCell>
                    {(() => {
                      const normalizedStatus = tag?.status.toLowerCase();

                      const statusConfig =
                        TAG_STATUS_UI[normalizedStatus] || TAG_STATUS_UI.inactive;

                      return (
                        <span
                          className={`px-3 py-1 text-xs font-medium rounded-lg ${statusConfig.className}`}
                        >
                          {t(statusConfig.label)}
                        </span>
                      );
                    })()}
                  </TableCell>




                </TableCell>
                <TableCell className="text-zinc-500">{tag?.createdBy ? tag?.createdBy : '—'}</TableCell>
                <TableCell className="text-zinc-500">  {formatDate(tag?.createdAt)}</TableCell>
                <TableCell>
                  {tag?.isSystem ? (
                    ""
                  ) : (
                    <div className="flex items-center justify-end gap-2">
                      <button
                        onClick={() => handleEditClick(tag)}
                        className="p-2 text-zinc-600 cursor-pointer"
                      >
                        <FiEdit2 className="w-5 h-5" />
                      </button>
                      <button
                        onClick={() => handleDeleteClick(tag)}
                        className="p-2 text-orange-600 cursor-pointer"
                      >
                        <FiTrash2 className="w-5 h-5" />
                      </button>
                    </div>
                  )}
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>

        {/* No Results */}
        {tags?.data?.meta?.total === 0 && (
          <div className="p-12 text-center">
            <p className="text-zinc-500">{t("No tags found")}</p>
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
              className="bg-zinc-900 text-white hover:bg-zinc-800 border-none px-6 cursor-pointer"
            >
              {t("Cancel")}
            </Button>
            <Button
              onClick={handleConfirmDelete}
              className="bg-[var(--primary)] hover:bg-[var(--primary-dark)] text-[var(--primary-foreground)] border-none px-6 cursor-pointer"
            >
              {t("Yes, Delete")}
            </Button>
          </div>
        </div>
      </Modal>

      {/* Edit tag Modal */}
      <Modal size='xl' isOpen={isEditModalOpen} onClose={() => setIsEditModalOpen(false)}>
        <div>
          <h3 className="text-lg font-semibold text-zinc-900 dark:text-zinc-100 mb-4">
            {t("Edit Blog Tag")}
          </h3>

          <div className="space-y-4">
            <div className='grid md:grid-cols-2 gap-4'>
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
                  {t("Slug")} <span className="text-red-500">*</span>
                </label>
                <Input
                  value={editTagSlug}
                  onChange={(e) => setEditTagSlug(e.target.value)}
                  placeholder={t("Enter tag slug")}
                />
              </div>
            </div>
            <div>
              <Textarea
                label="Description"
                value={editTagDescription}
                onChange={(e) => setEditTagDescription(e.target.value)}
                rows={4}
              />
            </div>



            <div>
              <label className="block text-sm font-medium text-zinc-700 dark:text-zinc-300 mb-1.5">
                {t("Status")}
              </label>
              
              <Select
                value={editTagStatus as any}
                onChange={(e) => setEditTagStatus(e.target.value as any)}
                options={[
                  { label: t("All Status"), value: "" },
                  { label: t("Active"), value: "active" },
                  { label: t("Inactive"), value: "inactive" },
                  { label: t("Pending"), value: "pending" },
                  { label: t("Blocked"), value: "blocked" },
                  { label: t("Rejected"), value: "rejected" },
                ]}
                className="w-36"
                defaultValue={editTagStatus as any}
              />
            </div>
          </div>

          <div className="flex gap-3 justify-end mt-6">
            <Button
              variant="outline"
              onClick={() => setIsEditModalOpen(false)}
              className="bg-zinc-900 text-white hover:bg-zinc-800 border-none px-6 cursor-pointer"
            >
              {t("Cancel")}
            </Button>
            <Button
              onClick={handleSaveEdit}
              className="bg-[var(--primary)] hover:bg-[var(--primary-dark)] text-[var(--primary-foreground)] border-none px-6 cursor-pointer"
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