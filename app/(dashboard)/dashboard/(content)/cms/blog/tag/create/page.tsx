/* eslint-disable @typescript-eslint/no-explicit-any */
'use client';
import { useEffect, useState } from 'react';
import {
    DashboardBreadcrumb,
    Button,
    Input,
    Select,
    Textarea,
} from '@/components/ui';
import { useLanguage } from '@/context/LanguageContext';
import {
    FiX,
    FiInfo,
    FiAlertCircle,
    FiPlus,
} from 'react-icons/fi';
import { Tags } from 'lucide-react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import toast from 'react-hot-toast';
import { Formik, Form } from 'formik';
import { toFormikValidationSchema } from 'zod-formik-adapter';
import { useCreateTagMutation } from '@/redux/api/blogTag.api';
import { tagSchema } from '@/schemas/blogTag.schema';


const initialValues = {
    name: '',
    slug: '',
    description: '',
    // createdBy: '',
    status: 'pending' as 'active' | 'pending' | 'inactive' | 'blocked',
    isSystem: false,
};

const CreateTagPage = () => {
    const { t } = useLanguage();
    const router = useRouter();
    const [createTag,] = useCreateTagMutation();

    const [autoGenerateSlug, setAutoGenerateSlug] = useState(true);



    return (
        <div className="space-y-6">
            {/* Header */}
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                <div>
                    <h1 className="text-2xl font-semibold text-zinc-900 dark:text-zinc-100">
                        {t('Create Tag')}
                    </h1>
                    <p className="text-sm text-zinc-500 mt-1">
                        {t('Add a new blog tag to organize your content')}
                    </p>
                </div>

                <Link
                    href="/dashboard/cms/blog/tag"
                    className="bg-[var(--primary)] hover:bg-[var(--primary-dark)] text-[var(--primary-foreground)] border-none cursor-pointer"
                >
                    <Button className='cursor-pointer' icon={<FiPlus className="w-4 h-4 mr-2" />}>
                        {t('Manage Tag')}
                    </Button>
                </Link>
            </div>

            <DashboardBreadcrumb
                items={[
                    { label: t('Content (CMS)') },
                    { label: t('Blog') },
                    { label: t('Blog Tags'), href: '/dashboard/cms/blog/tag' },
                    { label: 'Create Tag' },
                ]}
            />

            {/* FORM */}
            <Formik
                initialValues={initialValues}
                validationSchema={toFormikValidationSchema(tagSchema)}
                onSubmit={async (values, { resetForm }) => {
                    try {

                        const payload = {
                            name: values.name,
                            slug: values.slug,
                            description: values.description?.trim() || undefined,
                            status: values.status,
                            isSystem: values.isSystem,
                        };
                        // console.log("payload", payload)
                        const res = await createTag(payload).unwrap();
                        // console.log("res", res)
                        if (res?.statusCode === 200) {
                            toast.success(res.message || 'Tag created successfully');
                            resetForm();
                        } else {
                            toast.error(res?.message || 'Something went wrong');
                        }
                    } catch (error) {
                        console.error(error);
                        toast.error('Failed to create tag');
                    }
                }}
            >
                {({
                    values,
                    errors,
                    touched,
                    handleChange,
                    setFieldValue,
                    isSubmitting,
                }) => {
                    /* Auto slug generation */
                    useEffect(() => {
                        if (autoGenerateSlug && values.name) {
                            const slug = values.name
                                .toLowerCase()
                                .trim()
                                .replace(/[^\w\s-]/g, '')
                                .replace(/\s+/g, '-')
                                .replace(/-+/g, '-');

                            setFieldValue('slug', slug);
                        }
                    }, [values.name, autoGenerateSlug]);

                    return (
                        <Form className="space-y-6">
                            <div className="border border-zinc-200 bg-white dark:border-zinc-800 dark:bg-zinc-900/50 p-6">
                                <div className="space-y-6">
                                    {/* Name + Slug */}
                                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                                        <div>
                                            <Input
                                                label="Tag Name"
                                                value={values.name}
                                                onChange={handleChange}
                                                name="name"
                                                error={touched.name ? errors.name : undefined}
                                                required
                                            />
                                            <p className="mt-1.5 text-xs text-zinc-500 flex items-start gap-1">
                                                <FiAlertCircle className="w-4 h-4 font-bold  flex-shrink-0 text-amber-500" />
                                                <span>The name is how it appears on your site</span>
                                            </p>
                                        </div>

                                        <div>
                                            <Input
                                                label="Slug"
                                                value={values.slug}
                                                onChange={(e) => {
                                                    setAutoGenerateSlug(false);
                                                    setFieldValue('slug', e.target.value);
                                                }}
                                                name="slug"
                                                error={touched.slug ? errors.slug : undefined}
                                                required
                                            />
                                            <p className="mt-1.5 text-xs text-zinc-500 flex items-start gap-1">
                                                <FiAlertCircle className="w-4 h-4 font-bold  flex-shrink-0 text-amber-500" />
                                                <span>The "slug" is the URL-friendly version of the name. It is usually all lowercase and contains only letters, numbers, and hyphens</span>
                                            </p>
                                        </div>

                                    </div>
                                    <div>
                                        <Select
                                            label="Status"
                                            options={[
                                                { label: 'Active', value: 'active' },
                                                { label: 'Inactive', value: 'inactive' },
                                                { label: 'Pending', value: 'pending' },
                                            ]}
                                            value={values.status}
                                            onChange={(e) =>
                                                setFieldValue('status', e.target.value)
                                            }
                                        />
                                        <p className="mt-1.5 text-xs text-zinc-500 flex items-start gap-1">
                                            <FiAlertCircle className="w-4 h-4 font-bold  flex-shrink-0 text-amber-500" />
                                            <span>Set tag visibility status</span>
                                        </p>
                                    </div>

                                    <div> {/* Description */}
                                        <Textarea
                                            label="Description"
                                            value={values.description}
                                            onChange={handleChange}
                                            name="description"
                                            error={touched.description ? errors.description : undefined}
                                            rows={4}
                                        />
                                        <div className="mt-1.5 flex items-start justify-between gap-2">
                                            <p className="text-xs text-zinc-500 flex items-start gap-1">
                                                <FiAlertCircle className="w-4 h-4 font-bold  flex-shrink-0 text-amber-500" />
                                                <span>The description is not prominent by default; however, some themes may show it</span>
                                            </p>
                                            <span className="text-xs text-zinc-400 flex-shrink-0">
                                                {/* {description.length}/500 */}
                                            </span>
                                        </div>

                                    </div>


                                    {/* System Tag */}
                                    <div className="border-t border-zinc-200 dark:border-zinc-800 pt-6">
                                        <div className="flex items-start gap-3">
                                            <input
                                                type="checkbox"
                                                checked={values.isSystem}
                                                onChange={(e) =>
                                                    setFieldValue('isSystem', e.target.checked)
                                                }
                                                className="mt-1 w-4 h-4"
                                            />
                                            <div>
                                                <p className="text-sm font-medium">System Tag</p>

                                                <p className="text-xs text-zinc-500 mt-1 flex items-start gap-1">
                                                    <FiAlertCircle className="w-4 h-4 font-bold  flex-shrink-0 text-amber-500" />
                                                    <span>System tags are protected and cannot be deleted by regular users</span>
                                                </p>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>

                            {/* Actions */}
                            <div className="flex justify-end gap-3">
                                <Button
                                    type="button"
                                    variant="outline"
                                    onClick={() => router.back()}
                                    icon={<FiX />}
                                >
                                    Cancel
                                </Button>

                                <Button
                                    type="submit"
                                    loading={isSubmitting}
                                    icon={<Tags />}
                                >
                                    Create Tag
                                </Button>
                            </div>
                        </Form>
                    );
                }}
            </Formik>
            {/* Info Panel */}
            <div className="border border-blue-200 bg-blue-50 dark:border-blue-900/50 dark:bg-blue-900/10 p-4">
                <div className="flex items-start gap-3">
                    <FiInfo className="w-5 h-5 text-blue-600 dark:text-blue-400 flex-shrink-0 mt-0.5" />
                    <div className="flex-1">
                        <h3 className="text-sm font-semibold text-blue-900 dark:text-blue-100 mb-1">
                            Tag Guidelines
                        </h3>
                        <ul className="text-xs text-blue-800 dark:text-blue-200 space-y-1 list-disc list-inside">
                            <li>Use clear, descriptive names that help users find related content</li>
                            <li>Keep tag names concise (2-50 characters)</li>
                            <li>Slugs are automatically generated but can be customized</li>
                            <li>Tags help group posts with similar topics across different categories</li>
                            <li>Descriptions are optional but can be used for tag archive pages</li>
                        </ul>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default CreateTagPage;










