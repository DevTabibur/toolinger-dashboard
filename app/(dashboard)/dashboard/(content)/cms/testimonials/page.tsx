/* eslint-disable @typescript-eslint/no-explicit-any */
'use client';

import React, { useState, useMemo } from 'react';
import { DashboardBreadcrumb, Button, Input, Select, Modal, Table, TableHeader, TableBody, TableRow, TableHead, TableCell } from '@/components/ui';
import { useLanguage } from '@/context/LanguageContext';
import { FiSearch, FiPlus, FiEdit2, FiTrash2, FiUpload } from 'react-icons/fi';
import Image from 'next/image';

// Dummy testimonials data
const DUMMY_TESTIMONIALS = [
  {
    id: 1,
    author: 'Carl Evans',
    avatar: '/avatars/avatar1.jpg',
    role: 'Manager',
    content: 'This POS system has streamlined our operations and improved efficiency!',
    rating: 5,
    createdDate: '24 Dec 2024'
  },
  {
    id: 2,
    author: 'Minerva Rameriz',
    avatar: '/avatars/avatar2.jpg',
    role: 'Salesman',
    content: 'The POS system makes processing sales fast and effortless',
    rating: 5,
    createdDate: '25 Dec 2024'
  },
  {
    id: 3,
    author: 'Robert Lamon',
    avatar: '/avatars/avatar3.jpg',
    role: 'Supervisor',
    content: 'Easy to track sales and team performance in real-time',
    rating: 5,
    createdDate: '24 Dec 2024'
  },
  {
    id: 4,
    author: 'Patricia Lewis',
    avatar: '/avatars/avatar4.jpg',
    role: 'Store Keeper',
    content: 'This system saves me time by automating many inventory tasks',
    rating: 5,
    createdDate: '27 Dec 2024'
  },
  {
    id: 5,
    author: 'Mark Joslyn',
    avatar: '/avatars/avatar5.jpg',
    role: 'Manager',
    content: 'It\'s easy to manage sales, inventory, and staff with this POS system!',
    rating: 5,
    createdDate: '28 Dec 2024'
  },
  {
    id: 6,
    author: 'Marsha Betts',
    avatar: '/avatars/avatar6.jpg',
    role: 'Inventory Manager',
    content: 'Real-time inventory updates make stock management a breeze',
    rating: 5,
    createdDate: '30 Dec 2024'
  },
  {
    id: 7,
    author: 'Daniel Jude',
    avatar: '/avatars/avatar7.jpg',
    role: 'Delivery Biker',
    content: 'POS integration makes tracking deliveries easy!',
    rating: 5,
    createdDate: '14 Dec 2024'
  },
  {
    id: 8,
    author: 'Emma Bates',
    avatar: '/avatars/avatar8.jpg',
    role: 'Cashier',
    content: 'Quick and easy to use - checkouts have never been faster!',
    rating: 5,
    createdDate: '24 Dec 2024'
  },
  {
    id: 9,
    author: 'Richard Fralick',
    avatar: '/avatars/avatar9.jpg',
    role: 'Accountant',
    content: 'Transaction tracking is simplified, making reconciliation faster.',
    rating: 5,
    createdDate: '10 Dec 2024'
  },
  {
    id: 10,
    author: 'Michelle Robison',
    avatar: '/avatars/avatar10.jpg',
    role: 'Manager',
    content: 'Our team is more organized, and customer checkouts are faster than ever.',
    rating: 5,
    createdDate: '16 Dec 2024'
  },
];

const TestimonialsPage = () => {
  const { t } = useLanguage();

  // State
  const [searchQuery, setSearchQuery] = useState('');
  const [sortBy, setSortBy] = useState('last7days');
  const [currentPage, setCurrentPage] = useState(1);
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [testimonialToDelete, setTestimonialToDelete] = useState<any>(null);
  const [testimonialToEdit, setTestimonialToEdit] = useState<any>(null);
  const [editAuthor, setEditAuthor] = useState('');
  const [editRole, setEditRole] = useState('');
  const [editRating, setEditRating] = useState('5');

  // Filter and sort testimonials
  const filteredAndSortedTestimonials = useMemo(() => {
    let filtered = [...DUMMY_TESTIMONIALS];

    // Apply search filter
    if (searchQuery) {
      filtered = filtered.filter(testimonial =>
        testimonial.author.toLowerCase().includes(searchQuery.toLowerCase()) ||
        testimonial.role.toLowerCase().includes(searchQuery.toLowerCase()) ||
        testimonial.content.toLowerCase().includes(searchQuery.toLowerCase())
      );
    }

    // Apply sorting
    if (sortBy === 'last7days') {
      filtered.sort((a, b) => new Date(b.createdDate).getTime() - new Date(a.createdDate).getTime());
    } else if (sortBy === 'oldest') {
      filtered.sort((a, b) => new Date(a.createdDate).getTime() - new Date(b.createdDate).getTime());
    }

    return filtered;
  }, [searchQuery, sortBy]);

  // Pagination
  const totalPages = Math.ceil(filteredAndSortedTestimonials.length / rowsPerPage);
  const paginatedTestimonials = filteredAndSortedTestimonials.slice(
    (currentPage - 1) * rowsPerPage,
    currentPage * rowsPerPage
  );

  // Reset to page 1 when filters change
  React.useEffect(() => {
    setCurrentPage(1);
  }, [searchQuery, sortBy, rowsPerPage]);

  // Handle delete
  const handleDeleteClick = (testimonial: any) => {
    setTestimonialToDelete(testimonial);
    setIsDeleteModalOpen(true);
  };

  const handleConfirmDelete = () => {
    console.log('Deleting testimonial:', testimonialToDelete);
    setIsDeleteModalOpen(false);
    setTestimonialToDelete(null);
  };

  // Handle edit
  const handleEditClick = (testimonial: any) => {
    setTestimonialToEdit(testimonial);
    setEditAuthor(testimonial.author);
    setEditRole(testimonial.role);
    setEditRating(testimonial.rating.toString());
    setIsEditModalOpen(true);
  };

  const handleSaveEdit = () => {
    console.log('Saving testimonial:', { ...testimonialToEdit, author: editAuthor, role: editRole, rating: editRating });
    setIsEditModalOpen(false);
    setTestimonialToEdit(null);
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
      <DashboardBreadcrumb items={[{ label: t("Content (CMS)") }, { label: t("Testimonials") }]} />

      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-semibold text-zinc-900 dark:text-zinc-100">{t("Testimonials")}</h1>
          <p className="text-sm text-zinc-500 mt-1">{t("Manage your testimonials")}</p>
        </div>
        <Button className="bg-[var(--primary)] hover:bg-[var(--primary-dark)] text-[var(--primary-foreground)] border-none">
          <FiPlus className="w-4 h-4 mr-2" />
          {t("Add Testimonial")}
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
              { label: t("Sort By") + ": " + t("Last 7 Days"), value: "last7days" },
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
                <TableHead className="min-w-[180px]">{t("Author")}</TableHead>
                <TableHead className="min-w-[120px]">{t("Role")}</TableHead>
                <TableHead className="min-w-[300px]">{t("Content")}</TableHead>
                <TableHead className="min-w-[120px]">{t("Ratings")}</TableHead>
                <TableHead className="min-w-[120px]">{t("Created Date")}</TableHead>
                <TableHead className="text-right min-w-[100px]">{t("Actions")}</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {paginatedTestimonials.map((testimonial) => (
                <TableRow key={testimonial.id}>
                  <TableCell>
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 bg-gradient-to-br from-[var(--primary)] to-[var(--primary-dark)] flex items-center justify-center text-white font-semibold">
                        {testimonial.author.charAt(0)}
                      </div>
                      <span className="font-medium text-zinc-900 dark:text-zinc-100">{testimonial.author}</span>
                    </div>
                  </TableCell>
                  <TableCell className="text-[var(--primary)]">{testimonial.role}</TableCell>
                  <TableCell className="text-zinc-600 dark:text-zinc-400">{testimonial.content}</TableCell>
                  <TableCell>{renderStars(testimonial.rating)}</TableCell>
                  <TableCell className="text-zinc-500">{testimonial.createdDate}</TableCell>
                  <TableCell>
                    <div className="flex items-center justify-end gap-2">
                      <button
                        onClick={() => handleEditClick(testimonial)}
                        className="p-2 text-zinc-600 dark:text-zinc-400 hover:text-[var(--primary)] hover:bg-zinc-100 dark:hover:bg-zinc-800 transition-colors"
                      >
                        <FiEdit2 className="w-4 h-4" />
                      </button>
                      <button
                        onClick={() => handleDeleteClick(testimonial)}
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
        {paginatedTestimonials.length === 0 && (
          <div className="p-12 text-center">
            <p className="text-zinc-500">{t("No testimonials found")}</p>
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
            {t("Delete Employee")}
          </h3>
          <p className="text-sm text-zinc-500 mb-6">
            {t("Are you sure you want to delete employee?")}
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

      {/* Edit Testimonial Modal */}
      <Modal isOpen={isEditModalOpen} onClose={() => setIsEditModalOpen(false)}>
        <div>
          <h3 className="text-lg font-semibold text-zinc-900 dark:text-zinc-100 mb-4">
            {t("Edit Testimonial")}
          </h3>

          <div className="space-y-4">
            {/* Image Upload */}
            <div>
              <div className="flex items-center justify-center w-full">
                <label className="flex flex-col items-center justify-center w-full h-32 border-2 border-zinc-300 border-dashed dark:border-zinc-700 cursor-pointer bg-zinc-50 dark:bg-zinc-800/50 hover:bg-zinc-100 dark:hover:bg-zinc-800 transition-colors">
                  <div className="flex flex-col items-center justify-center pt-5 pb-6">
                    <FiUpload className="w-8 h-8 mb-2 text-zinc-500" />
                    <p className="mb-1 text-sm text-zinc-500">
                      <span className="font-semibold">{t("Upload Image")}</span>
                    </p>
                    <p className="text-xs text-zinc-500">JPEG, PNG up to 2 MB</p>
                  </div>
                  <input type="file" className="hidden" accept="image/*" />
                </label>
              </div>
              <p className="text-xs text-zinc-500 mt-1.5">{t("Add image")}</p>
            </div>

            {/* Author */}
            <div>
              <label className="block text-sm font-medium text-zinc-700 dark:text-zinc-300 mb-1.5">
                {t("Author")} <span className="text-red-500">*</span>
              </label>
              <Input
                value={editAuthor}
                onChange={(e) => setEditAuthor(e.target.value)}
                placeholder={t("Author")}
              />
            </div>

            {/* Role */}
            <div>
              <label className="block text-sm font-medium text-zinc-700 dark:text-zinc-300 mb-1.5">
                {t("Role")} <span className="text-red-500">*</span>
              </label>
              <Select
                value={editRole}
                onChange={(e) => setEditRole(e.target.value)}
                options={[
                  { label: t("Manager"), value: "Manager" },
                  { label: t("Salesman"), value: "Salesman" },
                  { label: t("Supervisor"), value: "Supervisor" },
                  { label: t("Store Keeper"), value: "Store Keeper" },
                  { label: t("Inventory Manager"), value: "Inventory Manager" },
                  { label: t("Delivery Biker"), value: "Delivery Biker" },
                  { label: t("Cashier"), value: "Cashier" },
                  { label: t("Accountant"), value: "Accountant" },
                ]}
              />
            </div>

            {/* Ratings */}
            <div>
              <label className="block text-sm font-medium text-zinc-700 dark:text-zinc-300 mb-1.5">
                {t("Ratings")} <span className="text-red-500">*</span>
              </label>
              <Select
                value={editRating}
                onChange={(e) => setEditRating(e.target.value)}
                options={[
                  { label: "5 Star", value: "5" },
                  { label: "4 Star", value: "4" },
                  { label: "3 Star", value: "3" },
                  { label: "2 Star", value: "2" },
                  { label: "1 Star", value: "1" },
                ]}
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

export default TestimonialsPage;