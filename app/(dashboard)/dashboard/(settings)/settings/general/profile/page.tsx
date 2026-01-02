// 'use client';

// import React, { useState, useRef } from 'react';
// import { useFormik } from 'formik';
// import { toFormikValidationSchema } from 'zod-formik-adapter';
// import * as z from 'zod';
// import { FiUser, FiSettings, FiX, FiCamera } from 'react-icons/fi';
// import { DashboardBreadcrumb, Input, Button } from '@/components/ui';
// import { profileSchema } from '@/schemas/profile.schema';
// import Image from 'next/image';
// import { useLanguage } from '@/context/LanguageContext';
// import { useGetSingleUserByIdQuery, useUpdateProfileMutation } from '@/redux/api/user.api';
// import Loader from '@/components/ui/Loader';
// import { useAuth } from '@/context/AuthContext';

// type ProfileFormInputs = z.infer<typeof profileSchema>;

// const ProfilePage = () => {
//     const { t } = useLanguage();
//     const [imagePreview, setImagePreview] = useState<string | null>(null);
//     const [imageFile, setImageFile] = useState<File | null>(null);
//     const fileInputRef = useRef<HTMLInputElement>(null);
//     const [updateProfile, { isLoading }] = useUpdateProfileMutation()
//     const { user } = useAuth()
//     const { data, isLoading: isSingleUserLoading } = useGetSingleUserByIdQuery(user?.userId)
//     console.log("single user", data?.data?.firstName)
//     console.log(user?.userId)
//     const formik = useFormik<ProfileFormInputs>({
//         initialValues: {
//             firstName: data?.data?.firstName || '',
//             lastName: data?.data?.lastName || '',
//             email: data?.data?.email || '',
//             phoneNumber: data?.data?.phoneNumber || '',
//             // userName: '',
//             // password: ''
//         },
//         validationSchema: toFormikValidationSchema(profileSchema),
//         onSubmit: (values) => {
//             const formData = {
//                 userId: user?.userId,
//                 ...values,
//                 image: imageFile,
//             };
//             console.log('Profile Data:', formData);
//             const res = updateProfile(formData)
//             console.log('Profile Response:', res);
//             // Handle form submission
//         },
//     });

//     const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
//         const file = e.target.files?.[0];
//         if (file) {
//             if (file.size > 2 * 1024 * 1024) {
//                 alert(t('File size exceeds 2MB'));
//                 return;
//             }
//             if (!['image/jpeg', 'image/png'].includes(file.type)) {
//                 alert(t('Invalid file format. Only JPG and PNG are allowed.'));
//                 return;
//             }

//             setImageFile(file);
//             const reader = new FileReader();
//             reader.onloadend = () => {
//                 setImagePreview(reader.result as string);
//             };
//             reader.readAsDataURL(file);
//         }
//     };

//     const handleRemoveImage = () => {
//         setImagePreview(null);
//         setImageFile(null);
//         if (fileInputRef.current) {
//             fileInputRef.current.value = '';
//         }
//     };

//     const triggerFileInput = () => {
//         fileInputRef.current?.click();
//     };

//     if (isLoading || isSingleUserLoading) {
//         return <Loader />
//     }

//     return (
//         <div className="space-y-6">
//             <DashboardBreadcrumb items={[{ label: t("Settings") }, { label: t("General") }, { label: t("Profile") }]} />

//             <div className=" border border-zinc-200 bg-white dark:border-zinc-800 dark:bg-zinc-900/50">
//                 <div className="border-b border-zinc-200 px-6 py-4 dark:border-zinc-800">
//                     <h3 className="text-lg font-medium text-zinc-900 dark:text-zinc-100">{t("Profile")}</h3>
//                 </div>
//                 <div className="p-6">
//                     <div className="mb-8 flex items-center justify-between">
//                         <div className="flex items-center gap-2 text-zinc-900 dark:text-zinc-100">
//                             <FiUser className="h-5 w-5 text-[var(--brand-start)]" />
//                             <span className="font-semibold">{t("Basic Information")}</span>
//                         </div>

//                     </div>

//                     <div className="mb-8 flex flex-col gap-6 sm:flex-row sm:items-start">
//                         <div className="relative h-24 w-24 shrink-0 overflow-hidden  border border-zinc-200 bg-zinc-50 dark:border-zinc-800 dark:bg-zinc-800">
//                             {imagePreview ? (
//                                 <>
//                                     <Image
//                                         src={imagePreview}
//                                         alt="Profile Preview"
//                                         fill
//                                         className="object-cover"
//                                     />
//                                     <button
//                                         onClick={handleRemoveImage}
//                                         className="absolute right-1 top-1 flex h-5 w-5 items-center justify-center rounded-full bg-[var(--brand-start)] text-white hover:bg-[var(--brand-start)]/90"
//                                     >
//                                         <FiX className="h-3 w-3" />
//                                     </button>
//                                 </>
//                             ) : (
//                                 <div className="flex h-full w-full items-center justify-center text-zinc-400">
//                                     <FiUser className="h-8 w-8" />
//                                 </div>
//                             )}
//                         </div>

//                         <div className="space-y-3">
//                             <input
//                                 type="file"
//                                 ref={fileInputRef}
//                                 onChange={handleImageChange}
//                                 className="hidden"
//                                 accept="image/png, image/jpeg"
//                             />
//                             <Button onClick={triggerFileInput} className="bg-[var(--brand-start)] hover:bg-[var(--brand-start)]/90 text-white" size="sm">
//                                 {t("Change Image")}
//                             </Button>
//                             <p className="text-xs text-zinc-500">
//                                 {t("Upload an image below 2 MB, Accepted File format JPG, PNG")}
//                             </p>
//                         </div>
//                     </div>

//                     <form onSubmit={formik.handleSubmit} className="space-y-6">
//                         <div className="grid gap-6 md:grid-cols-2">
//                             <Input
//                                 label={t("First Name")}
//                                 placeholder="Jeffry"
//                                 required
//                                 name="firstName"
//                                 value={formik.values.firstName}
//                                 onChange={formik.handleChange}
//                                 onBlur={formik.handleBlur}
//                                 error={formik.touched.firstName && formik.errors.firstName ? t(formik.errors.firstName) : undefined}
//                             />
//                             <Input
//                                 label={t("Last Name")}
//                                 placeholder="Jordan"
//                                 required
//                                 name="lastName"
//                                 value={formik.values.lastName}
//                                 onChange={formik.handleChange}
//                                 onBlur={formik.handleBlur}
//                                 error={formik.touched.lastName && formik.errors.lastName ? t(formik.errors.lastName) : undefined}
//                             />
//                             <Input
//                                 label={t("Email")}
//                                 type="email"
//                                 placeholder="mail"
//                                 required
//                                 name="email"
//                                 disabled
//                                 value={formik.values.email}
//                                 onChange={formik.handleChange}
//                                 onBlur={formik.handleBlur}
//                                 error={formik.touched.email && formik.errors.email ? t(formik.errors.email) : undefined}
//                             />
//                             <Input
//                                 label={t("Phone Number")}
//                                 placeholder="+17468314286"
//                                 required
//                                 name="phoneNumber"
//                                 value={formik.values.phoneNumber}
//                                 onChange={formik.handleChange}
//                                 onBlur={formik.handleBlur}
//                                 error={formik.touched.phoneNumber && formik.errors.phoneNumber ? t(formik.errors.phoneNumber) : undefined}
//                             />
//                             {/* <Input
//                                 label={t("User Name")}
//                                 placeholder="Jeffry Jordan"
//                                 required
//                                 name="userName"
//                                 value={formik.values.userName}
//                                 onChange={formik.handleChange}
//                                 onBlur={formik.handleBlur}
//                                 error={formik.touched.userName && formik.errors.userName ? t(formik.errors.userName) : undefined}
//                             /> */}
//                             {/* <Input
//                                 label={t("Password")}
//                                 type="password"
//                                 placeholder="••••••••"
//                                 required
//                                 name="password"
//                                 value={formik.values.password}
//                                 onChange={formik.handleChange}
//                                 onBlur={formik.handleBlur}
//                                 error={formik.touched.password && formik.errors.password ? t(formik.errors.password) : undefined}
//                             /> */}
//                         </div>

//                         <div className="flex justify-end gap-3 pt-4">
//                             <Button type="button" variant="outline">
//                                 {t("Cancel")}
//                             </Button>
//                             <Button type="submit" className="bg-[var(--primary)] hover:bg-[var(--primary-dark)] text-[var(--primary-foreground)]">
//                                 {t("Save Changes")}
//                             </Button>
//                         </div>
//                     </form>
//                 </div>
//             </div>
//         </div>
//     );
// };

// export default ProfilePage;




















//=======================================NWE CODE


"use client";

import React, { useState, useRef } from "react";
import { useFormik } from "formik";
import { toFormikValidationSchema } from "zod-formik-adapter";
import * as z from "zod";
import Image from "next/image";
import { FiUser, FiX } from "react-icons/fi";

import { DashboardBreadcrumb, Input, Button } from "@/components/ui";
import { useLanguage } from "@/context/LanguageContext";
import { useAuth } from "@/context/AuthContext";
import Loader from "@/components/ui/Loader";

import {
    useGetSingleUserByIdQuery,
    useUpdateProfileMutation,
} from "@/redux/api/user.api";

import { profileSchema } from "@/schemas/profile.schema";
import { error } from "console";

type ProfileFormInputs = z.infer<typeof profileSchema>;

const ProfilePage = () => {
    const { t } = useLanguage();
    const { user } = useAuth();

    const fileInputRef = useRef<HTMLInputElement>(null);
    const [imagePreview, setImagePreview] = useState<string | null>(null);
    const [imageFile, setImageFile] = useState<File | null>(null);

    const { data, isLoading } = useGetSingleUserByIdQuery(user?.userId!, {
        skip: !user?.userId, // ✅ VERY IMPORTANT
    });

    const [updateProfile, { isLoading: isUpdating }] =
        useUpdateProfileMutation();

    const formik = useFormik<ProfileFormInputs>({
        enableReinitialize: true, // ✅ MAIN FIX
        initialValues: {
            firstName: data?.data?.firstName || "",
            lastName: data?.data?.lastName || "",
            email: data?.data?.email || "",
            phoneNumber: data?.data?.phoneNumber || "",
        },
        validationSchema: toFormikValidationSchema(profileSchema),
        onSubmit: async (values) => {
            const payload = {
                userId: user?.userId,
                data: {
                    firstName: values.firstName,
                    lastName: values.lastName,
                    phoneNumber: values.phoneNumber,
                    avatar: imageFile || undefined
                }
            };
            console.log("payload", payload)

            await updateProfile(payload);
        },
    });

    console.log("imageFile", imageFile)

    const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (!file) return;

        if (file.size > 2 * 1024 * 1024) {
            alert(t("Image must be under 2MB"));
            return;
        }

        setImageFile(file);
        setImagePreview(URL.createObjectURL(file));
    };

    const removeImage = () => {
        setImageFile(null);
        setImagePreview(null);
        if (fileInputRef.current) fileInputRef.current.value = "";
    };

    if (isLoading || !user) return <Loader />;

    return (
        <div className="space-y-6">
            <DashboardBreadcrumb
                items={[
                    { label: t("Settings") },
                    { label: t("General") },
                    { label: t("Profile") },
                ]}
            />

            <div className="border border-zinc-200 dark:border-zinc-800 bg-white dark:bg-zinc-900/50">
                <div className="border-b border-zinc-200 dark:border-zinc-800 px-6 py-4">
                    <h3 className="text-lg font-medium">{t("Profile")}</h3>
                </div>

                <div className="p-6 space-y-8">
                    {/* Avatar */}
                    <div className="flex items-center gap-6">
                        <div className="relative h-24 w-24 overflow-hidden border">
                            {imagePreview ? (
                                <>
                                    <Image
                                        src={imagePreview}
                                        alt="Avatar"
                                        fill
                                        className="object-cover"
                                    />
                                    <button
                                        type="button"
                                        onClick={removeImage}
                                        className="absolute top-1 right-1 bg-red-600 text-white rounded-full p-1"
                                    >
                                        <FiX size={12} />
                                    </button>
                                </>
                            ) : (
                                <div className="h-full w-full flex items-center justify-center bg-zinc-100 dark:bg-zinc-800">
                                    <FiUser size={32} />
                                </div>
                            )}
                        </div>

                        <div>
                            <input
                                ref={fileInputRef}
                                type="file"
                                hidden
                                accept="image/png,image/jpeg"
                                onChange={handleImageChange}
                            />
                            <Button
                                type="button"
                                size="sm"
                                onClick={() => fileInputRef.current?.click()}
                            >
                                {t("Change Image")}
                            </Button>
                        </div>
                    </div>

                    {/* Form */}
                    <form onSubmit={formik.handleSubmit} className="grid gap-6 md:grid-cols-2">
                        <Input
                            label={t("First Name")}
                            name="firstName"
                            value={formik.values.firstName}
                            onChange={formik.handleChange}
                            error={formik.touched.firstName && formik.errors.firstName as any}
                            required
                        />

                        <Input
                            label={t("Last Name")}
                            name="lastName"
                            value={formik.values.lastName}
                            onChange={formik.handleChange}
                            error={formik.touched.lastName && formik.errors.lastName as any}
                        />

                        <Input
                            label={t("Email")}
                            name="email"
                            value={formik.values.email}
                            disabled
                            helperText={t("Email cannot be changed")}
                        />

                        <Input
                            label={t("Phone Number")}
                            name="phoneNumber"
                            value={formik.values.phoneNumber}
                            onChange={formik.handleChange}
                            error={formik.touched.phoneNumber && formik.errors.phoneNumber as any}
                        />

                        <div className="col-span-full flex justify-end gap-3 pt-4">
                            <Button type="submit" loading={isUpdating}>
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
