'use client';

import React, { useState, useRef } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import { FiUser, FiSettings, FiX, FiCamera } from 'react-icons/fi';
import { DashboardBreadcrumb, Input, Button } from '@/components/ui';
import { profileSchema } from '@/schemas/profile.schema';
import Image from 'next/image';
import { useLanguage } from '@/context/LanguageContext';

type ProfileFormInputs = z.infer<typeof profileSchema>;

const ProfilePage = () => {
    const { t } = useLanguage();
    const [imagePreview, setImagePreview] = useState<string | null>(null);
    const fileInputRef = useRef<HTMLInputElement>(null);

    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm<ProfileFormInputs>({
        resolver: zodResolver(profileSchema),
        defaultValues: {
            firstName: 'Jeffry',
            lastName: 'Jordan',
            email: 'jeffry@example.com',
            phoneNumber: '+17468314286',
            userName: 'Jeffry Jordan',
            password: 'password123',
        },
    });

    const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (file) {
            if (file.size > 2 * 1024 * 1024) {
                alert(t('File size exceeds 2MB'));
                return;
            }
            if (!['image/jpeg', 'image/png'].includes(file.type)) {
                alert(t('Invalid file format. Only JPG and PNG are allowed.'));
                return;
            }

            const reader = new FileReader();
            reader.onloadend = () => {
                setImagePreview(reader.result as string);
            };
            reader.readAsDataURL(file);
        }
    };

    const handleRemoveImage = () => {
        setImagePreview(null);
        if (fileInputRef.current) {
            fileInputRef.current.value = '';
        }
    };

    const triggerFileInput = () => {
        fileInputRef.current?.click();
    };

    const onSubmit = (data: ProfileFormInputs) => {
        console.log('Profile Data:', data);
        // Handle form submission
    };

    return (
        <div className="space-y-6">
            <DashboardBreadcrumb items={[{ label: t("Settings") }, { label: t("General") }, { label: t("Profile") }]} />

            <div className=" border border-zinc-200 bg-white dark:border-zinc-800 dark:bg-zinc-900/50">
                <div className="border-b border-zinc-200 px-6 py-4 dark:border-zinc-800">
                    <h3 className="text-lg font-medium text-zinc-900 dark:text-zinc-100">{t("Profile")}</h3>
                </div>
                <div className="p-6">
                    <div className="mb-8 flex items-center justify-between">
                        <div className="flex items-center gap-2 text-zinc-900 dark:text-zinc-100">
                            <FiUser className="h-5 w-5 text-[var(--brand-start)]" />
                            <span className="font-semibold">{t("Basic Information")}</span>
                        </div>

                    </div>

                    <div className="mb-8 flex flex-col gap-6 sm:flex-row sm:items-start">
                        <div className="relative h-24 w-24 shrink-0 overflow-hidden  border border-zinc-200 bg-zinc-50 dark:border-zinc-800 dark:bg-zinc-800">
                            {imagePreview ? (
                                <>
                                    <Image
                                        src={imagePreview}
                                        alt="Profile Preview"
                                        fill
                                        className="object-cover"
                                    />
                                    <button
                                        onClick={handleRemoveImage}
                                        className="absolute right-1 top-1 flex h-5 w-5 items-center justify-center rounded-full bg-[var(--brand-start)] text-white hover:bg-[var(--brand-start)]/90"
                                    >
                                        <FiX className="h-3 w-3" />
                                    </button>
                                </>
                            ) : (
                                <div className="flex h-full w-full items-center justify-center text-zinc-400">
                                    <FiUser className="h-8 w-8" />
                                </div>
                            )}
                        </div>

                        <div className="space-y-3">
                            <input
                                type="file"
                                ref={fileInputRef}
                                onChange={handleImageChange}
                                className="hidden"
                                accept="image/png, image/jpeg"
                            />
                            <Button onClick={triggerFileInput} className="bg-[var(--brand-start)] hover:bg-[var(--brand-start)]/90 text-white" size="sm">
                                {t("Change Image")}
                            </Button>
                            <p className="text-xs text-zinc-500">
                                {t("Upload an image below 2 MB, Accepted File format JPG, PNG")}
                            </p>
                        </div>
                    </div>

                    <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
                        <div className="grid gap-6 md:grid-cols-2">
                            <Input
                                label={t("First Name")}
                                placeholder="Jeffry"
                                required
                                error={errors.firstName?.message ? t(errors.firstName.message) : undefined}
                                {...register('firstName')}
                            />
                            <Input
                                label={t("Last Name")}
                                placeholder="Jordan"
                                required
                                error={errors.lastName?.message ? t(errors.lastName.message) : undefined}
                                {...register('lastName')}
                            />
                            <Input
                                label={t("Email")}
                                type="email"
                                placeholder="jeffry@example.com"
                                required
                                error={errors.email?.message ? t(errors.email.message) : undefined}
                                {...register('email')}
                            />
                            <Input
                                label={t("Phone Number")}
                                placeholder="+17468314286"
                                required
                                error={errors.phoneNumber?.message ? t(errors.phoneNumber.message) : undefined}
                                {...register('phoneNumber')}
                            />
                            <Input
                                label={t("User Name")}
                                placeholder="Jeffry Jordan"
                                required
                                error={errors.userName?.message ? t(errors.userName.message) : undefined}
                                {...register('userName')}
                            />
                            <Input
                                label={t("Password")}
                                type="password"
                                placeholder="••••••••"
                                required
                                error={errors.password?.message ? t(errors.password.message) : undefined}
                                {...register('password')}
                            />
                        </div>

                        <div className="flex justify-end gap-3 pt-4">
                            <Button type="button" variant="outline">
                                {t("Cancel")}
                            </Button>
                            <Button type="submit" className="bg-[var(--primary)] hover:bg-[var(--primary-dark)] text-[var(--primary-foreground)]">
                                {t("Save Changes")}
                            </Button>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    );
};

export default ProfilePage;