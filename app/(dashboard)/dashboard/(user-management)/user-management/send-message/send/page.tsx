'use client';

import React from 'react';
import { useFormik } from 'formik';
import { toFormikValidationSchema } from 'zod-formik-adapter';
import { DashboardBreadcrumb, Input, Button } from '@/components/ui';
import { useLanguage } from '@/context/LanguageContext';
import { SendMailFormValues, sendMailSchema } from '@/schemas/sendMail.schema';
import { FiBold, FiItalic, FiUnderline, FiLink, FiList, FiAlignLeft, FiAlignCenter, FiAlignRight, FiImage, FiCode, FiPlus } from 'react-icons/fi';
import toast from 'react-hot-toast';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { Mail } from 'lucide-react';

const SendMailCreatePage = () => {
    const { t } = useLanguage();
    const router = useRouter();

    const formik = useFormik<SendMailFormValues>({
        initialValues: {
            from: 'admin@toolinger.com',
            to: '',
            subject: '',
            message: '',
        },
        validationSchema: toFormikValidationSchema(sendMailSchema),
        onSubmit: async (values) => {
            console.log('Sending Mail:', values);
            // Simulate API call
            await new Promise(resolve => setTimeout(resolve, 1000));
            toast.success(t("Email sent successfully"));
            router.push('/dashboard/user-management/send-mail');
        },
    });

    return (
        <div className="space-y-6">


            {/* Header */}
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                <div>
                    <h1 className="text-2xl font-semibold text-zinc-900 dark:text-zinc-100">{t("Send Customer Mail")}</h1>
                    <p className="text-sm text-zinc-500 mt-1">{t("Compose and send message to customer")}</p>
                </div>
                <Link
                    href="/dashboard/user-management/send-message"
                    className="bg-[var(--primary)] hover:bg-[var(--primary-dark)] text-[var(--primary-foreground)] border-none cursor-pointer"
                >
                    <Button className="flex items-center cursor-pointer" icon={<Mail className="w-4 h-4 mr-2" />}>
                        {t("Manage  Message")}
                    </Button>
                </Link>
            </div>
            <DashboardBreadcrumb
                items={[
                    { label: t("User Management") },
                    { label: t("Send Message"), href: "/dashboard/user-management/send-message" },
                    { label: t("Create") }
                ]}
            />

            <div className="border border-zinc-200 bg-white dark:border-zinc-800 dark:bg-zinc-900/50 p-6 rounded-lg">
                <form onSubmit={formik.handleSubmit} className="space-y-6 max-w-4xl">

                    {/* From */}
                    <div className="grid gap-1.5">
                        <div className="flex items-center gap-1">
                            <label className="text-sm font-medium text-zinc-700 dark:text-zinc-300">{t("From")}</label>
                            <span className="text-red-500">*</span>
                        </div>
                        <div className="flex">
                            <div className="relative flex-1">
                                <Input
                                    name="from"
                                    value={formik.values.from}
                                    onChange={formik.handleChange}
                                    onBlur={formik.handleBlur}
                                    error={formik.touched.from && formik.errors.from ? t(formik.errors.from) : undefined}
                                    placeholder="Enter sender email"
                                    className="rounded-r-none"
                                />
                            </div>
                            <div className="bg-zinc-100 dark:bg-zinc-800 border border-l-0 border-zinc-200 dark:border-zinc-700 px-3 flex items-center text-sm text-zinc-500 rounded-r-md">
                                @toolinger.com
                            </div>
                        </div>
                        <p className="text-xs text-zinc-500">Sender address</p>
                    </div>

                    {/* To */}
                    <div className="grid gap-1.5">
                        <div className="flex items-center gap-1">
                            <label className="text-sm font-medium text-zinc-700 dark:text-zinc-300">{t("To")}</label>
                            <span className="text-red-500">*</span>
                        </div>
                        <Input
                            name="to"
                            value={formik.values.to}
                            onChange={formik.handleChange}
                            onBlur={formik.handleBlur}
                            error={formik.touched.to && formik.errors.to ? t(formik.errors.to) : undefined}
                            placeholder="Recipient address"
                        />
                    </div>

                    {/* Subject */}
                    <div className="grid gap-1.5">
                        <div className="flex items-center gap-1">
                            <label className="text-sm font-medium text-zinc-700 dark:text-zinc-300">{t("Subject")}</label>
                            <span className="text-red-500">*</span>
                        </div>
                        <Input
                            name="subject"
                            value={formik.values.subject}
                            onChange={formik.handleChange}
                            onBlur={formik.handleBlur}
                            error={formik.touched.subject && formik.errors.subject ? t(formik.errors.subject) : undefined}
                            placeholder="Enter email subject"
                        />
                    </div>

                    {/* Editor */}
                    <div className="space-y-1.5">
                        <div className="flex items-center justify-between">
                            <div className="flex items-center gap-1">
                                <label className="text-sm font-medium text-zinc-700 dark:text-zinc-300">{t("Message")}</label>
                            </div>
                        </div>

                        <div className={`border border-zinc-200 dark:border-zinc-700 rounded-lg overflow-hidden ${formik.touched.message && formik.errors.message ? 'border-red-500' : ''}`}>
                            {/* Fake Toolbar */}
                            <div className="bg-zinc-50 dark:bg-zinc-800 border-b border-zinc-200 dark:border-zinc-700 p-2 flex flex-wrap gap-2">
                                <ToolbarButton icon={<FiBold />} />
                                <ToolbarButton icon={<FiItalic />} />
                                <ToolbarButton icon={<FiUnderline />} />
                                <div className="w-px h-6 bg-zinc-300 dark:bg-zinc-600 mx-1" />
                                <ToolbarButton icon={<FiAlignLeft />} />
                                <ToolbarButton icon={<FiAlignCenter />} />
                                <ToolbarButton icon={<FiAlignRight />} />
                                <div className="w-px h-6 bg-zinc-300 dark:bg-zinc-600 mx-1" />
                                <ToolbarButton icon={<FiList />} />
                                <ToolbarButton icon={<FiLink />} />
                                <ToolbarButton icon={<FiImage />} />
                                <ToolbarButton icon={<FiCode />} />
                            </div>

                            {/* Textarea */}
                            <textarea
                                name="message"
                                value={formik.values.message}
                                onChange={formik.handleChange}
                                onBlur={formik.handleBlur}
                                className="w-full h-64 p-4 focus:outline-none bg-transparent resize-y text-zinc-900 dark:text-zinc-100"
                                placeholder="Start typing your email..."
                            />
                        </div>
                        {formik.touched.message && formik.errors.message && (
                            <p className="text-xs text-red-500">{t(formik.errors.message)}</p>
                        )}
                    </div>

                    {/* Actions */}
                    <div className="flex gap-3 pt-4">
                        <Button
                            type="submit"
                            className="bg-[var(--primary)] hover:bg-[var(--primary-dark)] text-[var(--primary-foreground)]"
                            loading={formik.isSubmitting}
                        >
                            {t("Send")}
                        </Button>
                        <Button
                            type="button"
                            variant="outline"
                            onClick={() => router.back()}
                        >
                            {t("Cancel")}
                        </Button>
                    </div>

                </form>
            </div>
        </div>
    );
};

const ToolbarButton = ({ icon }: { icon: React.ReactNode }) => (
    <button type="button" className="p-1.5 text-zinc-600 dark:text-zinc-400 hover:bg-zinc-200 dark:hover:bg-zinc-700 rounded transition-colors">
        {React.cloneElement(icon as React.ReactElement,
            //  { className: "w-4 h-4" }
        )}
    </button>
)

export default SendMailCreatePage;
