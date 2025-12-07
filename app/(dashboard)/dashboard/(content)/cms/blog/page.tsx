/* eslint-disable @typescript-eslint/no-explicit-any */
'use client';

import React, { useState, useMemo } from 'react';
import { DashboardBreadcrumb, Button, Input, Select, Modal } from '@/components/ui';
import { useLanguage } from '@/context/LanguageContext';
import { FiSearch, FiPlus, FiEdit2, FiTrash2, FiEye, FiCalendar, FiUser } from 'react-icons/fi';
import Image from 'next/image';

// Dummy blog data
const DUMMY_BLOGS = [
  {
    id: 1,
    title: "What is a POS System? A Beginner's Guide",
    author: "Gertrude Biwott",
    date: "24 Dec 2024",
    category: "Featured",
    status: "Active",
    image: "https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?w=400&h=250&fit=crop",
  },
  {
    id: 2,
    title: "Best POS Systems for Retail Businesses",
    author: "Edward Marcus",
    date: "20 Dec 2024",
    category: "Featured",
    status: "Active",
    image: "https://images.unsplash.com/photo-1556740758-90de374c12ad?w=400&h=250&fit=crop",
  },
  {
    id: 3,
    title: "Key Features of a Modern POS",
    author: "Mark Phillips",
    date: "11 Dec 2024",
    category: "Featured",
    status: "Active",
    image: "https://images.unsplash.com/photo-1556742111-a301076d9d18?w=400&h=250&fit=crop",
  },
  {
    id: 4,
    title: "How to Choose the Right POS for Your Business",
    author: "Sarah Johnson",
    date: "05 Dec 2024",
    category: "Business",
    status: "Active",
    image: "https://images.unsplash.com/photo-1556740772-1a741367b93e?w=400&h=250&fit=crop",
  },
  {
    id: 5,
    title: "Top 10 POS Features Every Retailer Needs",
    author: "Michael Chen",
    date: "28 Nov 2024",
    category: "Featured",
    status: "Active",
    image: "https://images.unsplash.com/photo-1556741533-6e6a62bd8b49?w=400&h=250&fit=crop",
  },
  {
    id: 6,
    title: "Cloud-Based vs Traditional POS Systems",
    author: "Emily Davis",
    date: "15 Nov 2024",
    category: "Technology",
    status: "Active",
    image: "https://images.unsplash.com/photo-1556740714-a8395b3bf30f?w=400&h=250&fit=crop",
  },
  {
    id: 7,
    title: "POS Security Best Practices",
    author: "David Wilson",
    date: "08 Nov 2024",
    category: "Business",
    status: "Inactive",
    image: "https://images.unsplash.com/photo-1556740758-90de374c12ad?w=400&h=250&fit=crop",
  },
  {
    id: 8,
    title: "Integrating POS with Inventory Management",
    author: "Lisa Anderson",
    date: "01 Nov 2024",
    category: "Technology",
    status: "Active",
    image: "https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?w=400&h=250&fit=crop",
  },
  {
    id: 9,
    title: "Mobile POS Solutions for Small Businesses",
    author: "James Taylor",
    date: "25 Oct 2024",
    category: "Featured",
    status: "Active",
    image: "https://images.unsplash.com/photo-1556742111-a301076d9d18?w=400&h=250&fit=crop",
  },
];

const BlogPage = () => {
  const { t } = useLanguage();

  // State
  const [searchQuery, setSearchQuery] = useState('');
  const [statusFilter, setStatusFilter] = useState('all');
  const [sortBy, setSortBy] = useState('latest');
  const [currentPage, setCurrentPage] = useState(1);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [blogToDelete, setBlogToDelete] = useState<any>(null);
  const itemsPerPage = 6;

  // Handle delete
  const handleDeleteClick = (blog: any) => {
    setBlogToDelete(blog);
    setIsDeleteModalOpen(true);
  };

  const handleConfirmDelete = () => {
    // Here you would actually delete the blog
    console.log('Deleting blog:', blogToDelete);
    setIsDeleteModalOpen(false);
    setBlogToDelete(null);
  };

  // Filter and sort blogs
  const filteredAndSortedBlogs = useMemo(() => {
    let filtered = [...DUMMY_BLOGS];

    // Apply search filter
    if (searchQuery) {
      filtered = filtered.filter(blog =>
        blog.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        blog.author.toLowerCase().includes(searchQuery.toLowerCase()) ||
        blog.category.toLowerCase().includes(searchQuery.toLowerCase())
      );
    }

    // Apply status filter
    if (statusFilter !== 'all') {
      filtered = filtered.filter(blog => blog.status.toLowerCase() === statusFilter.toLowerCase());
    }

    // Apply sorting
    if (sortBy === 'latest') {
      filtered.sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());
    } else if (sortBy === 'oldest') {
      filtered.sort((a, b) => new Date(a.date).getTime() - new Date(b.date).getTime());
    } else if (sortBy === 'title') {
      filtered.sort((a, b) => a.title.localeCompare(b.title));
    }

    return filtered;
  }, [searchQuery, statusFilter, sortBy]);

  // Pagination
  const totalPages = Math.ceil(filteredAndSortedBlogs.length / itemsPerPage);
  const paginatedBlogs = filteredAndSortedBlogs.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  // Reset to page 1 when filters change
  React.useEffect(() => {
    setCurrentPage(1);
  }, [searchQuery, statusFilter, sortBy]);

  return (
    <div className="space-y-6">
      <DashboardBreadcrumb items={[{ label: t("Content (CMS)") }, { label: t("Blog") }]} />

      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-semibold text-zinc-900 dark:text-zinc-100">{t("Blogs")}</h1>
          <p className="text-sm text-zinc-500 mt-1">{t("Manage your blogs")}</p>
        </div>
        <Button className="bg-[var(--primary)] hover:bg-[var(--primary-dark)] text-[var(--primary-foreground)] border-none">
          <FiPlus className="w-4 h-4 mr-2" />
          {t("Add Blog")}
        </Button>
      </div>

      {/* Filters */}
      <div className="border border-zinc-200 bg-white dark:border-zinc-800 dark:bg-zinc-900/50 p-4">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {/* Search */}
          <div className="relative">
            <FiSearch className="absolute left-3 top-1/2 -translate-y-1/2 text-zinc-400 w-4 h-4" />
            <Input
              placeholder={t("Search")}
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-10"
            />
          </div>

          {/* Status Filter */}
          <Select
            value={statusFilter}
            onChange={(e) => setStatusFilter(e.target.value)}
            options={[
              { label: t("Select Status"), value: "all" },
              { label: t("Active"), value: "active" },
              { label: t("Inactive"), value: "inactive" },
            ]}
          />

          {/* Sort */}
          <Select
            value={sortBy}
            onChange={(e) => setSortBy(e.target.value)}
            options={[
              { label: t("Sort By") + ": " + t("Latest"), value: "latest" },
              { label: t("Sort By") + ": " + t("Oldest"), value: "oldest" },
              { label: t("Sort By") + ": " + t("Title"), value: "title" },
            ]}
          />
        </div>
      </div>

      {/* Blog Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {paginatedBlogs.map((blog) => (
          <div
            key={blog.id}
            className="border border-zinc-200 bg-white dark:border-zinc-800 dark:bg-zinc-900/50 overflow-hidden hover:shadow-lg transition-shadow"
          >
            {/* Image */}
            <div className="relative h-48 bg-zinc-100 dark:bg-zinc-800">
              <Image
                src={blog.image}
                alt={blog.title}
                fill
                className="object-cover"
              />
              {/* Category Badge */}
              <div className="absolute top-3 left-3">
                <span className="px-3 py-1 text-xs font-medium bg-blue-500 text-white">
                  {blog.category}
                </span>
              </div>
              {/* Status Badge */}
              <div className="absolute top-3 right-3">
                <span
                  className={`px-3 py-1 text-xs font-medium ${blog.status === 'Active'
                    ? 'bg-green-500 text-white'
                    : 'bg-zinc-500 text-white'
                    }`}
                >
                  {t(blog.status)}
                </span>
              </div>
            </div>

            {/* Content */}
            <div className="p-4">
              {/* Meta */}
              <div className="flex items-center gap-4 text-xs text-zinc-500 mb-3">
                <div className="flex items-center gap-1">
                  <FiCalendar className="w-3 h-3" />
                  <span>{blog.date}</span>
                </div>
                <div className="flex items-center gap-1">
                  <FiUser className="w-3 h-3" />
                  <span>{blog.author}</span>
                </div>
              </div>

              {/* Title */}
              <h3 className="text-base font-medium text-zinc-900 dark:text-zinc-100 mb-4 line-clamp-2">
                {blog.title}
              </h3>

              {/* Actions */}
              <div className="flex items-center gap-2 pt-3 border-t border-zinc-200 dark:border-zinc-800">
                <button className="flex-1 flex items-center justify-center gap-1.5 px-3 py-2 text-xs font-medium text-zinc-700 dark:text-zinc-300 bg-zinc-50 dark:bg-zinc-800 hover:bg-zinc-100 dark:hover:bg-zinc-700 border border-zinc-200 dark:border-zinc-700 transition-colors">
                  <FiEye className="w-3.5 h-3.5" />
                  {t("View")}
                </button>
                <button className="flex-1 flex items-center justify-center gap-1.5 px-3 py-2 text-xs font-medium text-white bg-[var(--primary)] hover:bg-[var(--primary-dark)] border border-[var(--primary)] transition-colors">
                  <FiEdit2 className="w-3.5 h-3.5" />
                  {t("Edit")}
                </button>
                <button
                  onClick={() => handleDeleteClick(blog)}
                  className="flex-1 flex items-center justify-center gap-1.5 px-3 py-2 text-xs font-medium text-white bg-red-600 hover:bg-red-700 border border-red-600 transition-colors"
                >
                  <FiTrash2 className="w-3.5 h-3.5" />
                  {t("Delete")}
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* No Results */}
      {paginatedBlogs.length === 0 && (
        <div className="border border-zinc-200 bg-white dark:border-zinc-800 dark:bg-zinc-900/50 p-12 text-center">
          <p className="text-zinc-500">{t("No blogs found")}</p>
        </div>
      )}

      {/* Pagination */}
      {totalPages > 1 && (
        <div className="flex items-center justify-between border-t border-zinc-200 dark:border-zinc-800 pt-4">
          <p className="text-sm text-zinc-500">
            {t("Showing")} {(currentPage - 1) * itemsPerPage + 1} {t("to")}{' '}
            {Math.min(currentPage * itemsPerPage, filteredAndSortedBlogs.length)} {t("of")}{' '}
            {filteredAndSortedBlogs.length} {t("results")}
          </p>
          <div className="flex items-center gap-2">
            <Button
              variant="outline"
              onClick={() => setCurrentPage(prev => Math.max(1, prev - 1))}
              disabled={currentPage === 1}
              className="border-zinc-200 dark:border-zinc-700"
            >
              {t("Previous")}
            </Button>
            {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
              <button
                key={page}
                onClick={() => setCurrentPage(page)}
                className={`px-3 py-1.5 text-sm border transition-colors ${currentPage === page
                  ? 'bg-[var(--primary)] text-[var(--primary-foreground)] border-[var(--primary)]'
                  : 'border-zinc-200 dark:border-zinc-700 text-zinc-600 dark:text-zinc-400 hover:bg-zinc-100 dark:hover:bg-zinc-800'
                  }`}
              >
                {page}
              </button>
            ))}
            <Button
              variant="outline"
              onClick={() => setCurrentPage(prev => Math.min(totalPages, prev + 1))}
              disabled={currentPage === totalPages}
              className="border-zinc-200 dark:border-zinc-700"
            >
              {t("Next")}
            </Button>
          </div>
        </div>
      )}

      {/* Delete Confirmation Modal */}
      <Modal isOpen={isDeleteModalOpen} onClose={() => setIsDeleteModalOpen(false)}>
        <div className="text-center">
          {/* Icon */}
          <div className="mx-auto flex items-center justify-center h-16 w-16 bg-red-100 dark:bg-red-900/20 mb-4">
            <FiTrash2 className="h-8 w-8 text-red-600" />
          </div>

          {/* Title */}
          <h3 className="text-lg font-semibold text-zinc-900 dark:text-zinc-100 mb-2">
            {t("Delete Blog")}
          </h3>

          {/* Message */}
          <p className="text-sm text-zinc-500 mb-6">
            {t("Are you sure you want to delete blog?")}
          </p>

          {/* Buttons */}
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
              className="bg-red-600 hover:bg-red-700 text-white border-none px-6"
            >
              {t("Yes, Delete")}
            </Button>
          </div>
        </div>
      </Modal>
    </div>
  );
};

export default BlogPage;