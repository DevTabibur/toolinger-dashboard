/* eslint-disable @typescript-eslint/no-explicit-any */
'use client';
import {  useState } from 'react';
import {
    DashboardBreadcrumb,
    Button,
    Input,
    Select,
} from '@/components/ui';
import { useLanguage } from '@/context/LanguageContext';
import {
    FiX,
    FiInfo,
    FiAlertCircle,
    FiPlus,
} from 'react-icons/fi';
import {  User } from 'lucide-react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import toast from 'react-hot-toast';
import { Formik, Form, Field } from 'formik';
import { toFormikValidationSchema } from 'zod-formik-adapter';
import { registerSchema } from '@/schemas/auth.schema';
import { IoIosEyeOff } from 'react-icons/io';
import { FaRegEye } from 'react-icons/fa';
import { useUserRegisterMutation } from '@/redux/api/auth.api';


const initialValues = {
    firstName: '',
    lastName: '',
    status: '',
    email: '',
    password: '',
    confirmPassword: '',
};

const CreateUserPage = () => {
    const { t } = useLanguage();
    const router = useRouter();
    const [showPassword, setShowPassword] = useState(false);
    const [showConfirmPassword, setShowConfirmPassword] = useState(false);
    const [userRegisterMutation] = useUserRegisterMutation();



    return (
        <div className="space-y-6">
            {/* Header */}
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                <div>
                    <h1 className="text-2xl font-semibold text-zinc-900 dark:text-zinc-100">
                        {t('Create User')}
                    </h1>
                    <p className="text-sm text-zinc-500 mt-1">
                        {t('Add a new User')}
                    </p>
                </div>

                <Link
                    href="/dashboard/user-management/user"
                    className="bg-[var(--primary)] hover:bg-[var(--primary-dark)] text-[var(--primary-foreground)] border-none cursor-pointer"
                >
                    <Button className='cursor-pointer' icon={<FiPlus className="w-4 h-4 mr-2" />}>
                        {t('Manage User')}
                    </Button>
                </Link>
            </div>

            <DashboardBreadcrumb
                items={[
                    { label: t('User Management') },
                    { label: t('User'), href: '/dashboard/user-management/user' },
                    { label: 'Create User' },
                ]}
            />

            {/* FORM */}
            <Formik
                initialValues={initialValues}
                validationSchema={toFormikValidationSchema(registerSchema)}
                onSubmit={async (values, { resetForm }) => {
                    try {

                        const payload = {
                            firstName: values.firstName,
                            lastName: values.lastName,
                            email: values.email,
                            password: values.password,
                            confirmPassword: values.confirmPassword,
                        };
                        // console.log("payload", payload)
                        const res = await userRegisterMutation(payload);
                        // console.log("res", res)
                        // console.log("res", res)
                        if (res?.data?.statusCode === 200) {
                            toast.success(res.data.message || 'User created successfully');
                            resetForm();
                        } else {
                            toast.error(res?.data?.message || 'Something went wrong');
                        }
                    } catch (error) {
                        console.error(error);
                        toast.error('Failed to create user');
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


                    return (
                        <Form className="space-y-6">
                            <div className="border border-zinc-200 bg-white dark:border-zinc-800 dark:bg-zinc-900/50 p-6">
                                <div className="space-y-6">
                                    {/* Name  */}
                                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                                        <div>
                                            <Input
                                                label="First Name"
                                                value={values.firstName}
                                                onChange={handleChange}
                                                name="firstName"
                                                error={touched.firstName ? errors.firstName : undefined}
                                                required
                                            />
                                            <p className="mt-1.5 text-xs text-zinc-500 flex items-start gap-1">
                                                <FiAlertCircle className="w-4 h-4 font-bold  flex-shrink-0 text-amber-500" />
                                                <span>First name is required</span>
                                            </p>
                                        </div>
                                        <div>
                                            <Input
                                                label="Last Name"
                                                value={values.lastName}
                                                onChange={handleChange}
                                                name="lastName"
                                                error={touched.lastName ? errors.lastName : undefined}
                                            />
                                            <p className="mt-1.5 text-xs text-zinc-500 flex items-start gap-1">
                                                <FiAlertCircle className="w-4 h-4 font-bold  flex-shrink-0 text-amber-500" />
                                                <span>Last name is optional, if you want to add last name</span>
                                            </p>
                                        </div>



                                    </div>
                                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                                        <div>
                                            <Input
                                                label="Email"
                                                value={values.email}
                                                onChange={handleChange}
                                                name="email"
                                                error={touched.email ? errors.email : undefined}
                                                required
                                            />
                                            <p className="mt-1.5 text-xs text-zinc-500 flex items-start gap-1">
                                                <FiAlertCircle className="w-4 h-4 font-bold  flex-shrink-0 text-amber-500" />
                                                <span>Email should be unique</span>
                                            </p>
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
                                                <span>Set user loggedin status</span>
                                            </p>
                                        </div>
                                    </div>

                                    <div className="grid md:grid-cols-2 gap-6">
                                        {/* Password */}
                                        <div>
                                            <label className="block text-sm font-medium text-zinc-700 dark:text-zinc-300 mb-1.5">
                                                Password
                                            </label>

                                            <div className="relative">
                                                <Field
                                                    id="password"
                                                    name="password"
                                                    type={showPassword ? 'text' : 'password'}
                                                    placeholder="••••••••"
                                                    className={`w-full px-4 py-3 bg-zinc-50 dark:bg-zinc-800 border ${errors.password && touched.password
                                                        ? 'border-red-500 focus:ring-red-500'
                                                        : 'border-zinc-200 dark:border-zinc-700 focus:ring-[var(--brand-start)]'
                                                        } text-zinc-900 dark:text-white placeholder-zinc-400 focus:outline-none focus:ring-2 transition-all duration-200 pr-10`}
                                                />

                                                <button
                                                    type="button"
                                                    onClick={() => setShowPassword(!showPassword)}
                                                    className="absolute right-3 top-1/2 -translate-y-1/2 text-zinc-400 hover:text-zinc-600 dark:hover:text-zinc-200 transition-colors"
                                                >
                                                    {showPassword ? (
                                                        <IoIosEyeOff className="w-5 h-5" />
                                                    ) : (
                                                        <FaRegEye className="w-5 h-5" />
                                                    )}
                                                </button>
                                            </div>

                                            {/* Helper / Error */}
                                            {errors.password && touched.password ? (
                                                <p className="mt-1.5 text-xs text-red-500 flex items-start gap-1">
                                                    <FiAlertCircle className="w-4 h-4 flex-shrink-0" />
                                                    <span>{errors.password}</span>
                                                </p>
                                            ) : (
                                                <p className="mt-1.5 text-xs text-zinc-500 flex items-start gap-1">
                                                    <FiAlertCircle className="w-4 h-4 flex-shrink-0 text-amber-500" />
                                                    <span>
                                                        Set a secure password for the user. Minimum 8 characters recommended.
                                                    </span>
                                                </p>
                                            )}
                                        </div>

                                        {/* Confirm Password */}
                                        <div>
                                            <label className="block text-sm font-medium text-zinc-700 dark:text-zinc-300 mb-1.5">
                                                Confirm Password
                                            </label>

                                            <div className="relative">
                                                <Field
                                                    id="confirmPassword"
                                                    name="confirmPassword"
                                                    type={showConfirmPassword ? 'text' : 'password'}
                                                    placeholder="••••••••"
                                                    className={`w-full px-4 py-3 bg-zinc-50 dark:bg-zinc-800 border ${errors.confirmPassword && touched.confirmPassword
                                                        ? 'border-red-500 focus:ring-red-500'
                                                        : 'border-zinc-200 dark:border-zinc-700 focus:ring-[var(--brand-start)]'
                                                        } text-zinc-900 dark:text-white placeholder-zinc-400 focus:outline-none focus:ring-2 transition-all duration-200 pr-10`}
                                                />

                                                <button
                                                    type="button"
                                                    onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                                                    className="absolute right-3 top-1/2 -translate-y-1/2 text-zinc-400 hover:text-zinc-600 dark:hover:text-zinc-200 transition-colors"
                                                >
                                                    {showConfirmPassword ? (
                                                        <IoIosEyeOff className="w-5 h-5" />
                                                    ) : (
                                                        <FaRegEye className="w-5 h-5" />
                                                    )}
                                                </button>
                                            </div>

                                            {/* Helper / Error */}
                                            {errors.confirmPassword && touched.confirmPassword ? (
                                                <p className="mt-1.5 text-xs text-red-500 flex items-start gap-1">
                                                    <FiAlertCircle className="w-4 h-4 flex-shrink-0" />
                                                    <span>{errors.confirmPassword}</span>
                                                </p>
                                            ) : (
                                                <p className="mt-1.5 text-xs text-zinc-500 flex items-start gap-1">
                                                    <FiAlertCircle className="w-4 h-4 flex-shrink-0 text-amber-500" />
                                                    <span>
                                                        Re-enter the password to confirm. Must match the password above.
                                                    </span>
                                                </p>
                                            )}
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
                                    icon={<User />}
                                >
                                    Create User
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
                            User Creation Guidelines
                        </h3>

                        <ul className="text-xs text-blue-800 dark:text-blue-200 space-y-1 list-disc list-inside">
                            <li>Provide accurate first and last name to help identify the user easily</li>
                            <li>Email address must be unique and will be used for login and notifications</li>
                            <li>Set a strong password with at least 8 characters for better security</li>
                            <li>Confirm password must exactly match the password entered above</li>
                            <li>Status determines whether the user can log in immediately</li>
                            <li>Inactive users will not be able to access the system until activated</li>
                        </ul>
                    </div>
                </div>
            </div>

        </div>
    );
};

export default CreateUserPage;










