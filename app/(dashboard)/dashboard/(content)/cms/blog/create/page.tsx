"use client";

import React, { useEffect, useState } from "react";
import { useFormik } from "formik";
import { toFormikValidationSchema } from "zod-formik-adapter";
import { z } from "zod";
import {
  FiSave,
  FiEye,
  FiSettings,
  FiImage,
  FiTag,
  FiHash,
  FiGlobe,
  FiType,
  FiPlus,
  FiFileText,
  FiCheck,
  FiClock,
  FiLock,
  FiEyeOff,
  FiArchive,
  FiAlertCircle,
  FiX,
  FiFolder,
  FiLink
} from "react-icons/fi";
import { clsx } from "clsx";
import toast from "react-hot-toast";
import Link from "next/link";

// Components
import {
  Button,
  Input,
  Textarea,
  Select,
  Label,
  FileUpload,
  DatePicker,
  Card,
  Modal,
  DashboardBreadcrumb
} from "@/components/ui";

// Redux
import { useGetAllCategoriesQuery, useCreateCategoryMutation } from "@/redux/api/blogCategory.api";
import { useGetAllTagsQuery } from "@/redux/api/blogTag.api";
import { useLanguage } from "@/context/LanguageContext";
import { BlogPostSchema } from "@/schemas/blogPost.schema";
import { categorySchema } from "@/schemas/blogCategory.schema";
import { BLOG_STATUS } from "@/constants/blogStatus.constant";

type BlogPostFormValues = z.infer<typeof BlogPostSchema>;
type CategoryFormValues = z.infer<typeof categorySchema>;

const BlogCreatePage = () => {
  const { t } = useLanguage();

  // API Hooks
  const { data: categoriesData } = useGetAllCategoriesQuery({});
  const { data: tagsData } = useGetAllTagsQuery({});
  const [createCategory, { isLoading: isCreatingCategory }] = useCreateCategoryMutation();
  console.log('categoriesData', categoriesData)
  console.log('tagsData', tagsData)
  // State
  const [previewMode, setPreviewMode] = useState(false);
  const [isCategoryModalOpen, setIsCategoryModalOpen] = useState(false);
  const [tagInput, setTagInput] = useState("");

  // Main Blog Form
  const formik = useFormik<BlogPostFormValues>({
    initialValues: {
      title: "",
      slug: "",
      content: "",
      status: "draft",
      excerpt: "",
      primaryCategory: "",
      secondaryCategories: [],
      tags: [],
      blogFeaturedImage: "",
      allowComments: true,
      isFeatured: false,
      isSponsored: false,
      sponsorName: "",
      sponsorUrl: "",
      seo: {
        title: "",
        description: "",
        keywords: [],
        noIndex: false,
        noFollow: false,
      },
    },
    validationSchema: toFormikValidationSchema(BlogPostSchema),
    onSubmit: async (values) => {
      console.log("Form Submitted:", values);
      toast.success(t("Blog post data logged to console!"));
    },
  });

  // Category Form
  const categoryFormik = useFormik<CategoryFormValues>({
    initialValues: {
      name: "",
      slug: "",
      parentId: null,
      createdBy: null,
      description: "",
      status: "active",
      isSystem: false,
    },
    validationSchema: toFormikValidationSchema(categorySchema),
    onSubmit: async (values) => {
      try {
        await createCategory(values).unwrap();
        toast.success(t("Category created successfully!"));
        setIsCategoryModalOpen(false);
        categoryFormik.resetForm();
      } catch (error: any) {
        toast.error(error?.data?.message || t("Failed to create category"));
      }
    },
  });

  // Auto-generate slug from title
  useEffect(() => {
    if (!formik.touched.slug && formik.values.title) {
      const slug = formik.values.title
        .toLowerCase()
        .replace(/[^a-z0-9]+/g, "-")
        .replace(/(^-|-$)+/g, "");
      formik.setFieldValue("slug", slug);
    }
  }, [formik.values.title, formik.touched.slug]);

  // Auto-generate category slug from name
  useEffect(() => {
    if (!categoryFormik.touched.slug && categoryFormik.values.name) {
      const slug = categoryFormik.values.name
        .toLowerCase()
        .replace(/[^a-z0-9]+/g, "-")
        .replace(/(^-|-$)+/g, "");
      categoryFormik.setFieldValue("slug", slug);
    }
  }, [categoryFormik.values.name, categoryFormik.touched.slug]);

  // Handlers
  const handleFileSelect = (files: File[]) => {
    if (files.length > 0) {
      const fakeUrl = URL.createObjectURL(files[0]);
      formik.setFieldValue("blogFeaturedImage", fakeUrl);
      toast.success(t("Image uploaded (simulated)"));
    }
  };

  const handleTagAdd = () => {
    const val = tagInput.trim();
    if (val && !formik.values.tags?.includes(val)) {
      formik.setFieldValue("tags", [...(formik.values.tags || []), val]);
      setTagInput("");
    }
  };

  const handleTagKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      e.preventDefault();
      handleTagAdd();
    }
  };

  const handleTagRemove = (index: number) => {
    const newTags = formik.values.tags?.filter((_, i) => i !== index);
    formik.setFieldValue("tags", newTags);
  };

  const handleCategoryToggle = (categoryId: string) => {
    const currentCategories = formik.values.secondaryCategories || [];
    const isSelected = currentCategories.includes(categoryId);

    if (isSelected) {
      formik.setFieldValue(
        "secondaryCategories",
        currentCategories.filter((id) => id !== categoryId)
      );
    } else {
      formik.setFieldValue("secondaryCategories", [...currentCategories, categoryId]);
    }
  };

  // Status configuration
  const statusConfig = {
    draft: {
      icon: FiFileText,
      label: t("Draft"),
      description: t("Save privately - only you can see"),
      color: "text-zinc-500",
      bgColor: "bg-zinc-50 dark:bg-zinc-800/50",
      borderColor: "border-zinc-200 dark:border-zinc-700",
      hoverBg: "hover:bg-zinc-100 dark:hover:bg-zinc-800",
    },
    published: {
      icon: FiCheck,
      label: t("Published"),
      description: t("Make live - visible to everyone"),
      color: "text-green-600 dark:text-green-500",
      bgColor: "bg-green-50 dark:bg-green-900/20",
      borderColor: "border-green-200 dark:border-green-800",
      hoverBg: "hover:bg-green-100 dark:hover:bg-green-900/30",
    },
    scheduled: {
      icon: FiClock,
      label: t("Scheduled"),
      description: t("Publish at a future date"),
      color: "text-blue-600 dark:text-blue-500",
      bgColor: "bg-blue-50 dark:bg-blue-900/20",
      borderColor: "border-blue-200 dark:border-blue-800",
      hoverBg: "hover:bg-blue-100 dark:hover:bg-blue-900/30",
    },
    private: {
      icon: FiLock,
      label: t("Private"),
      description: t("Only admin can access"),
      color: "text-purple-600 dark:text-purple-500",
      bgColor: "bg-purple-50 dark:bg-purple-900/20",
      borderColor: "border-purple-200 dark:border-purple-800",
      hoverBg: "hover:bg-purple-100 dark:hover:bg-purple-900/30",
    },
    pending_review: {
      icon: FiAlertCircle,
      label: t("Pending Review"),
      description: t("Awaiting approval"),
      color: "text-orange-600 dark:text-orange-500",
      bgColor: "bg-orange-50 dark:bg-orange-900/20",
      borderColor: "border-orange-200 dark:border-orange-800",
      hoverBg: "hover:bg-orange-100 dark:hover:bg-orange-900/30",
    },
    archived: {
      icon: FiArchive,
      label: t("Archived"),
      description: t("Hidden from public view"),
      color: "text-gray-600 dark:text-gray-500",
      bgColor: "bg-gray-50 dark:bg-gray-900/20",
      borderColor: "border-gray-200 dark:border-gray-800",
      hoverBg: "hover:bg-gray-100 dark:hover:bg-gray-900/30",
    },
  };

  // Custom Editor Toolbar
  const EditorToolbar = () => (
    <div className="flex items-center gap-1 p-2 border-b border-zinc-200 dark:border-zinc-700 bg-zinc-50 dark:bg-zinc-800/50 overflow-x-auto">
      {["Bold", "Italic", "Underline", "H1", "H2", "Link", "Quote", "List", "Code"].map((tool) => (
        <button
          key={tool}
          type="button"
          className="p-1.5 text-xs font-medium text-zinc-600 dark:text-zinc-400 hover:bg-zinc-200 dark:hover:bg-zinc-700 transition-colors whitespace-nowrap"
        >
          {tool}
        </button>
      ))}
    </div>
  );

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-semibold text-zinc-900 dark:text-zinc-100">
            {t("Create New Blog Post")}
          </h1>
          <p className="text-sm text-zinc-500 dark:text-zinc-400 mt-1">
            {t("Write and publish your latest article")}
          </p>
        </div>
        <Link
          href="/dashboard/cms/blog"
          className="bg-[var(--primary)] hover:bg-[var(--primary-dark)] text-[var(--primary-foreground)] border-none cursor-pointer"
        >
          <Button className="flex items-center cursor-pointer" icon={<FiPlus className="w-4 h-4 mr-2" />}>
            {t("All Blogs")}
          </Button>
        </Link>
      </div>

      {/* Breadcrumb */}
      <DashboardBreadcrumb
        items={[
          { label: t("Content (CMS)") },
          { label: t("Blog") },
          { label: t("Create Blog") }
        ]}
      />

      {/* Action Buttons */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div className="flex items-center gap-2">
          <Button variant="outline" onClick={() => setPreviewMode(!previewMode)}>
            <FiEye className="w-4 h-4 mr-2" />
            {previewMode ? t("Edit Mode") : t("Preview")}
          </Button>
        </div>
        <div className="flex items-center gap-2">
          <Button
            variant="outline"
            onClick={() => formik.resetForm()}
            className="text-zinc-600 dark:text-zinc-400"
          >
            {t("Reset")}
          </Button>
          <Button onClick={formik.submitForm} disabled={formik.isSubmitting}>
            <FiSave className="w-4 h-4 mr-2" />
            {formik.isSubmitting ? t("Saving...") : t("Save Post")}
          </Button>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
        {/* Main Content Area (Left - 3 cols) */}
        <div className="lg:col-span-3 space-y-6">
          {/* Title & Slug */}
          <div className="space-y-4 bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 p-6">
            <div className="space-y-1">
              <Label className="text-sm font-medium">
                {t("Blog Title")} <span className="text-red-500">*</span>
              </Label>
              <input
                placeholder={t("Enter blog title (English, हिन्दी)...")}
                name="title"
                value={formik.values.title}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                className="w-full text-3xl md:text-4xl font-bold bg-transparent placeholder-zinc-300 dark:placeholder-zinc-700 focus:ring-2 focus:ring-[var(--primary)]/20 focus:outline-none text-zinc-900 dark:text-zinc-100 px-0 border-0"
              />
              {formik.touched.title && formik.errors.title && (
                <p className="text-red-500 text-sm">{formik.errors.title}</p>
              )}
            </div>

            <div className="flex items-center gap-2 text-sm text-zinc-500 dark:text-zinc-400">
              <span className="font-medium whitespace-nowrap">{t("Permalink")}:</span>
              <div className="flex items-center gap-1 flex-1">
                <span className="text-zinc-400 dark:text-zinc-600">/blog/</span>
                <input
                  name="slug"
                  value={formik.values.slug}
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  className="bg-transparent border-b border-dashed border-zinc-300 dark:border-zinc-700 hover:border-[var(--primary)] focus:border-[var(--primary)] focus:outline-none text-zinc-700 dark:text-zinc-300 w-full max-w-sm transition-colors py-0.5"
                />
              </div>
            </div>
            {formik.touched.slug && formik.errors.slug && (
              <p className="text-red-500 text-sm">{formik.errors.slug}</p>
            )}
          </div>

          {/* Editor */}
          <Card className="min-h-[500px] flex flex-col p-0 overflow-hidden border-zinc-200 dark:border-zinc-800 shadow-sm">
            <EditorToolbar />
            <textarea
              name="content"
              value={formik.values.content}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              className="flex-1 w-full p-4 md:p-6 bg-white dark:bg-zinc-900 text-zinc-800 dark:text-zinc-200 resize-none focus:outline-none focus:ring-2 focus:ring-[var(--primary)]/20 font-serif text-lg leading-relaxed"
              placeholder={t("Start writing your amazing story...")}
            />
            {formik.touched.content && formik.errors.content && (
              <div className="p-2 bg-red-50 dark:bg-red-900/10 border-t border-red-100 dark:border-red-900/20 text-red-500 text-sm">
                {formik.errors.content}
              </div>
            )}
          </Card>

          {/* Excerpt */}
          <Card className="p-6">
            <div className="flex items-center gap-2 mb-4">
              <FiType className="w-4 h-4 text-zinc-500" />
              <h3 className="text-base font-semibold">{t("Excerpt")}</h3>
            </div>
            <Textarea
              name="excerpt"
              label={t("Short summary of the post")}
              placeholder={t("Write a short excerpt...")}
              rows={3}
              value={formik.values.excerpt}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
            />
            <p className="text-xs text-right mt-1 text-zinc-400">
              {formik.values.excerpt?.length || 0}/160
            </p>
          </Card>

          {/* SEO Settings */}
          <Card className="p-6">
            <div className="flex items-center gap-2 mb-6">
              <FiGlobe className="w-4 h-4 text-zinc-500" />
              <h3 className="text-base font-semibold">{t("SEO Settings")}</h3>
            </div>
            <div className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <Input
                  label={t("Meta Title")}
                  name="seo.title"
                  placeholder={formik.values.title}
                  value={formik.values.seo?.title}
                  onChange={formik.handleChange}
                />
                <Input
                  label={t("Focus Keywords (comma separated)")}
                  name="seo.keywords"
                  placeholder={t("e.g. react, nextjs, blog")}
                />
              </div>
              <Textarea
                label={t("Meta Description")}
                name="seo.description"
                placeholder={t("Search engine description...")}
                rows={3}
                value={formik.values.seo?.description}
                onChange={formik.handleChange}
              />
              <div className="flex items-center gap-6 pt-2">
                <label className="flex items-center gap-2 text-sm text-zinc-700 dark:text-zinc-300 cursor-pointer">
                  <input
                    type="checkbox"
                    name="seo.noIndex"
                    checked={formik.values.seo?.noIndex}
                    onChange={formik.handleChange}
                    className="w-4 h-4 border-zinc-300 text-[var(--primary)] focus:ring-[var(--primary)] focus:ring-2"
                  />
                  {t("No Index")}
                </label>
                <label className="flex items-center gap-2 text-sm text-zinc-700 dark:text-zinc-300 cursor-pointer">
                  <input
                    type="checkbox"
                    name="seo.noFollow"
                    checked={formik.values.seo?.noFollow}
                    onChange={formik.handleChange}
                    className="w-4 h-4 border-zinc-300 text-[var(--primary)] focus:ring-[var(--primary)] focus:ring-2"
                  />
                  {t("No Follow")}
                </label>
              </div>
            </div>
          </Card>
        </div>

        {/* Sidebar (Right - 1 col) */}
        <div className="lg:col-span-1 space-y-6">
          {/* Blog Status Card*/}
          <Card className="p-5 border border-zinc-200 dark:border-zinc-800 !overflow-visible">
            <h3 className="text-sm font-semibold uppercase tracking-wider text-zinc-500 mb-4">
              {t("Blog Status")}
            </h3>

            <div className="grid grid-cols-3 gap-2 mb-6">
              {['draft', 'published', 'scheduled', 'private', 'pending_review', 'archived'].map((status) => {
                const config = statusConfig[status as keyof typeof statusConfig];
                const Icon = config.icon;
                const isSelected = formik.values.status === status;

                return (
                  <button
                    key={status}
                    type="button"
                    onClick={() => formik.setFieldValue("status", status)}
                    title={config.description}
                    className={clsx(
                      "group relative flex flex-col items-center justify-center p-3 h-24 border transition-all duration-200",
                      "rounded-none",
                      isSelected
                        ? `${config.borderColor} ${config.bgColor} ring-1 ring-inset ${config.borderColor}`
                        : "border-zinc-200 dark:border-zinc-800 bg-transparent hover:border-zinc-300 dark:hover:border-zinc-600 hover:bg-zinc-50 dark:hover:bg-zinc-800/50"
                    )}
                  >
                    {isSelected && (
                      <div className={clsx("absolute top-1.5 right-1.5 w-2 h-2 rounded-full", config.color.replace(/text-/g, 'bg-'))} />
                    )}

                    <Icon
                      className={clsx(
                        "w-6 h-6 mb-2 transition-transform duration-200 group-hover:scale-110",
                        isSelected ? config.color : "text-zinc-400 group-hover:text-zinc-600 dark:group-hover:text-zinc-300"
                      )}
                    />

                    <span className={clsx(
                      "text-[10px] font-bold uppercase tracking-wide text-center leading-tight line-clamp-2",
                      isSelected ? config.color : "text-zinc-600 dark:text-zinc-400"
                    )}>
                      {config.label}
                    </span>
                  </button>
                );
              })}
            </div>

            {/* Current Status Display */}
            <div className="flex items-center justify-between text-sm py-3 border-t border-zinc-200 dark:border-zinc-800">
              <span className="text-zinc-500 dark:text-zinc-400 font-medium">{t("Current Status")}:</span>
              <span className={clsx("font-bold uppercase text-xs tracking-wider", statusConfig[formik.values.status as keyof typeof statusConfig].color)}>
                {statusConfig[formik.values.status as keyof typeof statusConfig].label}
              </span>
            </div>

            {/* Scheduled Date Picker */}
            {formik.values.status === 'scheduled' && (
              <div className="pt-4 border-t border-zinc-200 dark:border-zinc-800 animate-in fade-in slide-in-from-top-2 duration-200">
                <DatePicker
                  label={t("Schedule Date")}
                  value={formik.values.scheduledAt}
                  onChange={(date) => formik.setFieldValue("scheduledAt", date)}
                  showTime
                />
              </div>
            )}
          </Card>


          {/* URL & Category Card */}
          <Card className="p-5 border border-zinc-200 dark:border-zinc-800 !overflow-visible rounded-none">
            <div className="flex items-center gap-2 mb-4">
              <FiLink className="w-4 h-4 text-zinc-500" />
              <h3 className="text-sm font-semibold uppercase tracking-wider text-zinc-500">
                {t("URL & Category")}
              </h3>
            </div>

            <div className="space-y-4">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
                <Label className="text-sm font-medium mb-0">{t("URL Slug")} <span className="text-red-500">*</span></Label>
                <div className="flex items-center gap-2">
                  <button
                    type="button"
                    onClick={() => {
                      const slug = formik.values.title
                        .toLowerCase()
                        .replace(/[^a-z0-9]+/g, "-")
                        .replace(/(^-|-$)+/g, "");
                      formik.setFieldValue("slug", slug);
                      formik.setFieldTouched("slug", true);
                    }}
                    className="px-3 py-1 text-xs font-medium bg-blue-100 text-blue-700 dark:bg-blue-900/30 dark:text-blue-400 rounded-md hover:opacity-90 transition-opacity"
                  >
                    {t("Auto-generate")}
                  </button>
                  <button
                    type="button"
                    onClick={() => {
                      const slug = formik.values.title
                        .toLowerCase()
                        .replace(/[^\w\s-]/g, '')
                        .replace(/\s+/g, '-')
                        .replace(/-+/g, '-')
                        .replace(/^-+|-+$/g, '');
                      formik.setFieldValue("slug", slug);
                      formik.setFieldTouched("slug", true);
                    }}
                    className="px-3 py-1 text-xs font-medium border border-zinc-200 dark:border-zinc-700 text-zinc-700 dark:text-zinc-300 rounded-md hover:bg-zinc-50 dark:hover:bg-zinc-800 transition-colors"
                  >
                    {t("English Slug")}
                  </button>
                </div>
              </div>

              {/* Preview Box */}
              <div className="p-3 bg-zinc-50 dark:bg-zinc-800/50 border border-zinc-200 dark:border-zinc-700 rounded-lg text-sm text-zinc-500 break-all">
                <span className="opacity-70">yourstore.com/blog/</span>
                <span className="font-semibold text-zinc-900 dark:text-zinc-100">{formik.values.slug || 'slug'}</span>
              </div>

              {/* Info Box */}
              <div className="p-4 bg-yellow-50 dark:bg-yellow-900/10 border border-yellow-100 dark:border-yellow-900/20 rounded-lg">
                <div className="flex gap-2">
                  <div className="shrink-0 mt-0.5 text-yellow-600 dark:text-yellow-500">
                    <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                      <path strokeLinecap="round" strokeLinejoin="round" d="M12 18v-5.25m0-4.5h.005v.005h-.005v-.005zm0 13.5a9 9 0 110-18 9 9 0 010 18z" />
                    </svg>
                  </div>
                  <div className="space-y-1">
                    <p className="text-xs font-medium text-yellow-800 dark:text-yellow-500">{t("How slug works")}:</p>
                    <ul className="text-xs text-yellow-700 dark:text-yellow-600 space-y-1 list-disc pl-4">
                      <li>{t('Type with spaces (e.g., "new product")')}</li>
                      <li>{t('When you click outside, spaces become hyphens')}</li>
                      <li>{t('Special characters are automatically removed')}</li>
                    </ul>
                  </div>
                </div>
              </div>

              {/* Input */}
              <div className="space-y-1">
                <input
                  name="slug"
                  value={formik.values.slug}
                  onChange={formik.handleChange}
                  onBlur={(e) => {
                    formik.handleBlur(e);
                    const formatted = e.target.value
                      .toLowerCase()
                      .replace(/[^a-z0-9-]/g, "")
                      .replace(/-+/g, "-")
                      .replace(/^-+|-+$/g, "");
                    formik.setFieldValue("slug", formatted);
                  }}
                  placeholder={t("Enter slug (e.g. 'new-product')")}
                  className="w-full px-3 py-2 text-sm border border-zinc-200 dark:border-zinc-700 rounded-md bg-white dark:bg-zinc-900 focus:ring-2 focus:ring-[var(--primary)]/20 focus:border-[var(--primary)] outline-none transition-all"
                />
              </div>

              <div className="flex items-center gap-2 text-xs text-zinc-400">
                <div className="w-1.5 h-1.5 rounded-full bg-zinc-300 dark:bg-zinc-600" />
                {t("Will auto-generate from product name in English")}
              </div>
            </div>
          </Card>

          {/* Featured Image */}
          {/* <Card className="p-5">
            <div className="flex items-center gap-2 mb-4">
              <FiImage className="w-4 h-4 text-zinc-500" />
              <h3 className="text-sm font-semibold uppercase tracking-wider text-zinc-500">
                {t("Featured Image")}
              </h3>
            </div>
            {formik.values.blogFeaturedImage ? (
              <div className="relative group overflow-hidden border border-zinc-200 dark:border-zinc-700">
                <img
                  src={formik.values.blogFeaturedImage}
                  alt="Featured"
                  className="w-full h-48 object-cover"
                />
                <button
                  type="button"
                  onClick={() => formik.setFieldValue("blogFeaturedImage", "")}
                  className="absolute top-2 right-2 bg-white/90 dark:bg-zinc-800/90 p-1.5 text-red-500 shadow-sm opacity-0 group-hover:opacity-100 transition-opacity"
                >
                  <FiX className="w-4 h-4" />
                </button>
              </div>
            ) : (
              <FileUpload
                label={t("Upload featured image")}
                accept="image/*"
                onFileSelect={handleFileSelect}
              />
            )}
            {formik.touched.blogFeaturedImage && formik.errors.blogFeaturedImage && (
              <p className="text-red-500 text-xs mt-2">{formik.errors.blogFeaturedImage}</p>
            )}
          </Card> */}

          {/* Categories Card */}
          <Card className="p-5">
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center gap-2">
                <FiFolder className="w-4 h-4 text-zinc-500" />
                <h3 className="text-sm font-semibold uppercase tracking-wider text-zinc-500">
                  {t("Categories")}
                </h3>
              </div>
              <button
                type="button"
                onClick={() => setIsCategoryModalOpen(true)}
                className="text-[var(--primary)] hover:text-[var(--primary-dark)] text-xs font-medium flex items-center gap-1"
              >
                <FiPlus className="w-3 h-3" />
                {t("New")}
              </button>
            </div>

            <div className="space-y-3">
              {/* Primary Category Select */}
              {/* <Select
                label={t("Primary Category")}
                name="primaryCategory"
                options={categoriesData?.data?.map((c: any) => ({ label: c.name, value: c._id })) || []}
                value={formik.values.primaryCategory}
                onChange={formik.handleChange}
              />
              {formik.touched.primaryCategory && formik.errors.primaryCategory && (
                <p className="text-red-500 text-xs">{formik.errors.primaryCategory}</p>
              )} */}

              {/* All Categories Checkboxes */}
              <div className="pt-3 border-t border-zinc-200 dark:border-zinc-700">
                <Label className="text-xs uppercase text-zinc-400 mb-2 block">
                  {t("Additional Categories")}
                </Label>
                <div className="space-y-2 max-h-48 overflow-y-auto pr-1">
                  {categoriesData?.data?.data?.map((category: any) => (
                    <label
                      key={category._id}
                      className="flex items-center gap-2 cursor-pointer group"
                    >
                      <div className="relative flex items-center">
                        <input
                          type="checkbox"
                          checked={formik.values.secondaryCategories?.includes(category._id)}
                          onChange={() => handleCategoryToggle(category._id)}
                          className="peer appearance-none w-4 h-4 border border-zinc-300 dark:border-zinc-600 bg-white dark:bg-zinc-800 checked:bg-[var(--primary)] checked:border-[var(--primary)] transition-colors focus:ring-2 focus:ring-[var(--primary)]/20"
                        />
                        <svg
                          className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-2.5 h-2.5 text-white opacity-0 peer-checked:opacity-100 pointer-events-none transition-opacity"
                          viewBox="0 0 12 12"
                          fill="none"
                          stroke="currentColor"
                          strokeWidth="3"
                        >
                          <polyline points="1 9 4 12 11 1" />
                        </svg>
                      </div>
                      <span className="text-sm font-medium text-zinc-600 dark:text-zinc-300 group-hover:text-zinc-900 dark:group-hover:text-zinc-100 transition-colors">
                        {category.name}
                      </span>
                    </label>
                  ))}
                </div>
              </div>
            </div>
          </Card>

          {/* Tags Card */}
          <Card className="p-5">
            <div className="flex items-center gap-2 mb-4">
              <FiHash className="w-4 h-4 text-zinc-500" />
              <h3 className="text-sm font-semibold uppercase tracking-wider text-zinc-500">
                {t("Tags")}
              </h3>
            </div>
            <div className="space-y-3">
              <div className="flex gap-2">
                <input
                  placeholder={t("Add tags and press Enter")}
                  value={tagInput}
                  onChange={(e) => setTagInput(e.target.value)}
                  onKeyDown={handleTagKeyDown}
                  className="flex-1 px-3 py-2 text-sm border border-zinc-200 dark:border-zinc-700 bg-white dark:bg-zinc-800 focus:outline-none focus:ring-2 focus:ring-[var(--primary)]/20 focus:border-[var(--primary)] text-zinc-900 dark:text-zinc-100"
                />
                <Button
                  type="button"
                  size="sm"
                  onClick={handleTagAdd}
                  disabled={!tagInput.trim()}
                >
                  {t("Add")}
                </Button>
              </div>

              {/* Selected Tags */}
              {formik.values.tags && formik.values.tags.length > 0 && (
                <div className="flex flex-wrap gap-2">
                  {formik.values.tags.map((tag, idx) => (
                    <span
                      key={idx}
                      className="inline-flex items-center px-2 py-1 bg-zinc-100 dark:bg-zinc-800 text-xs font-medium text-zinc-700 dark:text-zinc-300 border border-zinc-200 dark:border-zinc-700"
                    >
                      #{tag}
                      <button
                        type="button"
                        onClick={() => handleTagRemove(idx)}
                        className="ml-1.5 hover:text-red-500 focus:outline-none"
                      >
                        <FiX className="w-3 h-3" />
                      </button>
                    </span>
                  ))}
                </div>
              )}

              {/* Most Used Tags */}
              <div className="pt-3 border-t border-zinc-200 dark:border-zinc-700">
                <p className="text-xs text-zinc-400 mb-2">{t("Most Used")}:</p>
                <div className="flex flex-wrap gap-2">
                  {/* {tagsData?.data?.slice(0, 5).map((tag: any) => (
                    <button
                      key={tag._id}
                      type="button"
                      onClick={() => {
                        if (!formik.values.tags?.includes(tag.name)) {
                          formik.setFieldValue("tags", [...(formik.values.tags || []), tag.name]);
                        }
                      }}
                      className="text-xs text-[var(--primary)] hover:underline focus:outline-none"
                    >
                      {tag.name}
                    </button>
                  ))} */}
                </div>
              </div>
            </div>
          </Card>
        </div>
      </div>

      {/* Create Category Modal */}
      <Modal
        isOpen={isCategoryModalOpen}
        onClose={() => {
          setIsCategoryModalOpen(false);
          categoryFormik.resetForm();
        }}
        title={t("Create New Category")}
        size="lg"
      >
        <form onSubmit={categoryFormik.handleSubmit} className="space-y-4">
          <Input
            label={t("Category Name")}
            name="name"
            placeholder={t("Enter category name")}
            value={categoryFormik.values.name}
            onChange={categoryFormik.handleChange}
            onBlur={categoryFormik.handleBlur}
            error={categoryFormik.touched.name && categoryFormik.errors.name ? categoryFormik.errors.name : undefined}
            required
          />

          <Input
            label={t("Slug")}
            name="slug"
            placeholder={t("category-slug")}
            value={categoryFormik.values.slug}
            onChange={categoryFormik.handleChange}
            onBlur={categoryFormik.handleBlur}
            error={categoryFormik.touched.slug && categoryFormik.errors.slug ? categoryFormik.errors.slug : undefined}
            required
          />

          <Textarea
            label={t("Description")}
            name="description"
            placeholder={t("Enter category description (optional)")}
            rows={3}
            value={categoryFormik.values.description}
            onChange={categoryFormik.handleChange}
            onBlur={categoryFormik.handleBlur}
          />

          {/* <Select
            label={t("Parent Category")}
            name="parentId"
            options={[
              { label: t("None (Top Level)"), value: "" },
              ...(categoriesData?.data?.map((c: any) => ({ label: c.name, value: c._id })) || [])
            ]}
            value={categoryFormik.values.parentId || ""}
            onChange={(e) => categoryFormik.setFieldValue("parentId", e.target.value || null)}
          /> */}

          <Select
            label={t("Status")}
            name="status"
            options={[
              { label: t("Active"), value: "active" },
              { label: t("Inactive"), value: "inactive" }
            ]}
            value={categoryFormik.values.status}
            onChange={categoryFormik.handleChange}
          />

          <div className="flex items-center justify-end gap-3 pt-4 border-t border-zinc-200 dark:border-zinc-700">
            <Button
              type="button"
              variant="outline"
              onClick={() => {
                setIsCategoryModalOpen(false);
                categoryFormik.resetForm();
              }}
            >
              {t("Cancel")}
            </Button>
            <Button
              type="submit"
              disabled={isCreatingCategory || !categoryFormik.isValid}
              loading={isCreatingCategory}
            >
              {isCreatingCategory ? t("Creating...") : t("Create Category")}
            </Button>
          </div>
        </form>
      </Modal>
    </div>
  );
};

export default BlogCreatePage;