/* eslint-disable @typescript-eslint/no-explicit-any */
'use client';

import { useState, useEffect } from 'react';
import { DashboardBreadcrumb, Button, Input, Select, Modal } from '@/components/ui';
import { useLanguage } from '@/context/LanguageContext';
import { FiSearch, FiPlus, FiEdit2, FiTrash2, FiEye, FiCalendar, FiUser } from 'react-icons/fi';
import Image from 'next/image';
import { useGetAllBlogsQuery, useDeleteBlogMutation } from '@/redux/api/blog.api';
import { useDebounce } from '@/hooks/useDebounce';
import { getImageUrl } from '@/helpers/config/envConfig';
import { useRouter } from 'next/navigation';
import toast from 'react-hot-toast';

const BlogPageClient = () => {
    const { t } = useLanguage();
    const router = useRouter();

    // State
    const [searchQuery, setSearchQuery] = useState('');
    const [statusFilter, setStatusFilter] = useState('all');
    const [sortBy, setSortBy] = useState('latest');
    const [currentPage, setCurrentPage] = useState(1);
    const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
    const [blogToDelete, setBlogToDelete] = useState<any>(null);
    const itemsPerPage = 9;

    // Debounce search query
    const debouncedSearchQuery = useDebounce(searchQuery, 500);

    // Build query params
    const queryParams: any = {
        page: currentPage,
        limit: itemsPerPage,
    };

    // Add search term if exists
    if (debouncedSearchQuery) {
        queryParams.searchTerm = debouncedSearchQuery;
    }

    // Add status filter if not 'all'
    if (statusFilter !== 'all') {
        queryParams.status = statusFilter;
    }

    // Add sorting
    if (sortBy === 'latest') {
        queryParams.sortBy = 'createdAt';
        queryParams.sortOrder = 'desc';
    } else if (sortBy === 'oldest') {
        queryParams.sortBy = 'createdAt';
        queryParams.sortOrder = 'asc';
    } else if (sortBy === 'title') {
        queryParams.sortBy = 'title';
        queryParams.sortOrder = 'asc';
    }

    // Fetch blogs with query params
    const { data, isLoading, isFetching } = useGetAllBlogsQuery(queryParams);
    const [deleteBlog, { isLoading: isDeleting }] = useDeleteBlogMutation();

    // Extract data from API response
    const blogs = data?.data?.data || [];
    const meta = data?.data?.meta || { page: 1, limit: itemsPerPage, total: 0 };
    const totalPages = Math.ceil(meta.total / meta.limit);

    // Reset to page 1 when filters change
    useEffect(() => {
        setCurrentPage(1);
    }, [debouncedSearchQuery, statusFilter, sortBy]);

    // Handle delete
    const handleDeleteClick = (blog: any) => {
        setBlogToDelete(blog);
        setIsDeleteModalOpen(true);
    };

    const handleConfirmDelete = async () => {
        if (!blogToDelete) return;

        try {
            const res = await deleteBlog(blogToDelete._id).unwrap();
            // console.log('detelet', res);
            if(res.statusCode==200){
                toast.success(res.message);
            }else{
                toast.error(res.message);
            }
            setIsDeleteModalOpen(false);
            setBlogToDelete(null);
        } catch (error) {
            console.error('Failed to delete blog:', error);
        }
    };

    // Handle view blog
    const handleViewBlog = (blog: any) => {
        // Navigate to blog details page or open in new tab
        window.open(`/blog/${blog.slug}`, '_blank');
    };

    // Handle edit blog
    const handleEditBlog = (blog: any) => {
        // Navigate to edit page
        router.push(`/dashboard/cms/blog/edit/${blog._id}`);
    };

    // Format date
    const formatDate = (dateString: string) => {
        const date = new Date(dateString);
        return date.toLocaleDateString('en-US', { day: '2-digit', month: 'short', year: 'numeric' });
    };

    // Get image URL
    const getFullImageUrl = (imagePath: string) => {
        if (!imagePath) return '/placeholder-blog.jpg';
        if (imagePath.startsWith('http')) return imagePath;
        return `${getImageUrl()}/${imagePath}`;
    };

    // Get status display
    const getStatusDisplay = (status: string) => {
        if (status === 'draft') return 'draft';
        if (status === 'published') return 'published';
        if (status === 'scheduled') return 'scheduled';
        if (status === 'private') return 'private';
        if (status === 'pending_review') return 'pending_review';
        if (status === 'archived') return 'archived';
        return status;
    };

    return (
        <>
            {/* Header */}
            <div className="flex flex-row items-center justify-between gap-4">
                <div>
                    <h1 className="text-2xl font-semibold text-zinc-900 dark:text-zinc-100">
                        {t("Blogs")}
                    </h1>
                    <p className="text-sm text-zinc-500 mt-1">
                        {t("Manage your blogs")}
                    </p>
                </div>

                <Button
                    icon={<FiPlus className="w-4 h-4" />}
                    className="bg-[var(--primary)] hover:bg-[var(--primary-dark)] text-[var(--primary-foreground)] border-none"
                    onClick={() => router.push('/dashboard/cms/blog/create')}
                >
                    {t("Add Blog")}
                </Button>
            </div>

            {/* Breadcrumb */}
            <DashboardBreadcrumb items={[{ label: t("Content (CMS)") }, { label: t("Blog") }]} />

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
                            { label: t("Select Status (All)"), value: "all" },
                            { label: t("Draft"), value: "draft" },
                            { label: t("Published"), value: "published" },
                            { label: t("Pending Review"), value: "pending_review" },
                            { label: t("Schedule"), value: "schedule" },
                            { label: t("Archived"), value: "archived" },
                            { label: t("Private"), value: "private" },
                            
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

            {/* Loading State */}
            {(isLoading || isFetching) && (
                <div className="border border-zinc-200 bg-white dark:border-zinc-800 dark:bg-zinc-900/50 p-12 text-center">
                    <p className="text-zinc-500">{t("Loading blogs...")}</p>
                </div>
            )}

            {/* Blog Grid */}
            {!isLoading && !isFetching && (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {blogs.map((blog: any) => (
                        <div
                            key={blog._id}
                            className="border border-zinc-200 bg-white dark:border-zinc-800 dark:bg-zinc-900/50 overflow-hidden hover:shadow-lg transition-shadow"
                        >
                            {/* Image */}
                            <div className="relative h-48 bg-zinc-100 dark:bg-zinc-800">
                                <Image
                                    src={getFullImageUrl(blog.blogFeaturedImage)}
                                    alt={blog.title}
                                    fill
                                    className="object-cover"
                                />
                                {/* Category Badge */}
                                {blog.categories && blog.categories.length > 0 && (
                                    <div className="absolute top-3 left-3">
                                        <span className="px-3 py-1 text-xs font-medium bg-blue-500 text-white">
                                            {blog.isFeatured ? 'Featured' : 'Blog'}
                                        </span>
                                    </div>
                                )}
                                {/* Status Badge */}
                                <div className="absolute top-3 right-3">
                                    <span
                                        className={`px-3 py-1 text-xs font-medium ${blog.status === 'published'
                                            ? 'bg-green-500 text-white'
                                            : 'bg-zinc-500 text-white'
                                            }`}
                                    >
                                        {t(getStatusDisplay(blog.status))}
                                    </span>
                                </div>
                            </div>

                            {/* Content */}
                            <div className="p-4">
                                {/* Meta */}
                                <div className="flex items-center gap-4 text-xs text-zinc-500 mb-3">
                                    <div className="flex items-center gap-1">
                                        <FiCalendar className="w-3 h-3" />
                                        <span>{formatDate(blog.createdAt)}</span>
                                    </div>
                                    <div className="flex items-center gap-1">
                                        <FiUser className="w-3 h-3" />
                                        <span>{blog.author?.id || 'Unknown'}</span>
                                    </div>
                                </div>

                                {/* Title */}
                                <h3 className="text-base font-medium text-zinc-900 dark:text-zinc-100 mb-4 line-clamp-2">
                                    {blog.title}
                                </h3>

                                {/* Actions */}
                                <div className="flex items-center gap-2 pt-3 border-t border-zinc-200 dark:border-zinc-800">
                                    <button
                                        onClick={() => handleViewBlog(blog)}
                                        className="flex-1 flex items-center justify-center gap-1.5 px-3 py-2 text-xs font-medium text-zinc-700 dark:text-zinc-300 bg-zinc-50 dark:bg-zinc-800 hover:bg-zinc-100 dark:hover:bg-zinc-700 border border-zinc-200 dark:border-zinc-700 transition-colors"
                                    >
                                        <FiEye className="w-3.5 h-3.5" />
                                        {t("View")}
                                    </button>
                                    <button
                                        onClick={() => handleEditBlog(blog)}
                                        className="flex-1 flex items-center justify-center gap-1.5 px-3 py-2 text-xs font-medium text-white bg-[var(--primary)] hover:bg-[var(--primary-dark)] border border-[var(--primary)] transition-colors"
                                    >
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
            )}

            {/* No Results */}
            {!isLoading && !isFetching && blogs.length === 0 && (
                <div className="border border-zinc-200 bg-white dark:border-zinc-800 dark:bg-zinc-900/50 p-12 text-center">
                    <p className="text-zinc-500">{t("No blogs found")}</p>
                </div>
            )}

            {/* Pagination */}
            {!isLoading && !isFetching && totalPages > 1 && (
                <div className="flex items-center justify-between border-t border-zinc-200 dark:border-zinc-800 pt-4">
                    <p className="text-sm text-zinc-500">
                        {t("Showing")} {(meta.page - 1) * meta.limit + 1} {t("to")}{' '}
                        {Math.min(meta.page * meta.limit, meta.total)} {t("of")}{' '}
                        {meta.total} {t("results")}
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
                        {t("Are you sure you want to delete blog?")} <br />
                        <strong>{blogToDelete?.title}</strong>
                    </p>

                    {/* Buttons */}
                    <div className="flex gap-3 justify-center">
                        <Button
                            variant="outline"
                            onClick={() => setIsDeleteModalOpen(false)}
                            className="bg-zinc-900 text-white hover:bg-zinc-800 border-none px-6"
                            disabled={isDeleting}
                        >
                            {t("Cancel")}
                        </Button>
                        <Button
                            onClick={handleConfirmDelete}
                            className="bg-red-600 hover:bg-red-700 text-white border-none px-6"
                            disabled={isDeleting}
                        >
                            {isDeleting ? t("Deleting...") : t("Yes, Delete")}
                        </Button>
                    </div>
                </div>
            </Modal>
        </>
    );
};

export default BlogPageClient;