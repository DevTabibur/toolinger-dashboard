'use client';

import { useFormik } from 'formik';
import { toFormikValidationSchema } from 'zod-formik-adapter';
import { resetPasswordSchema } from '@/schemas/auth.schema';
import { useResetPasswordMutation } from '@/redux/api/auth.api';
import toast from 'react-hot-toast';
import { useRouter, useSearchParams } from 'next/navigation';
import { Input } from '@/components/ui';
import Link from 'next/link';
import { useState } from 'react';
const ResetForm = () => {
    const router = useRouter();
    const searchParams = useSearchParams();
    const [resetPassword, { isLoading }] = useResetPasswordMutation();
    const [isSubmitted, setIsSubmitted] = useState(false);

    const token = searchParams.get('token');
    const email = searchParams.get('email');
    console.log(token, email);

    const formik = useFormik({
        initialValues: {
            otp: '',
            password: '',
        },
        validationSchema: toFormikValidationSchema(resetPasswordSchema) ,
        onSubmit: async (values) => {
            const payload = {
                ...values,
                email: email,
            };

            console.log("payload", payload)
            try {
                const res: any = await resetPassword(payload);
                console.log("res", res)

                if (res?.data?.status === 'false' || res?.error) {
                    toast.error(res?.data?.message || res?.error?.data?.message || "Something went wrong");
                }

                if (res?.data?.success === true) {
                    toast.success(res?.data?.message || "Password reset successfully");
                    setIsSubmitted(true);
                    router.push('/auth/login');
                }
            } catch (error: any) {
                toast.error(error?.message || "Something went wrong");
            }
        },
    });

    return (
        <div className="w-full max-w-md p-8 space-y-6 bg-white  shadow-xl dark:bg-zinc-900 border border-zinc-100 dark:border-zinc-800 transition-colors duration-300">
            <div className="text-center space-y-2">
                <h1 className="text-3xl font-bold text-zinc-900 dark:text-white tracking-tight">
                    Reset Password
                </h1>
                <p className="text-zinc-500 dark:text-zinc-400">
                    Enter your new password below
                </p>
            </div>

            <form onSubmit={formik.handleSubmit} className="space-y-6">
                {/* New Password Field */}
                <div className="space-y-2">
                    <Input
                        id="otp"
                        label="OTP"
                        type="text"
                        placeholder="123456"
                        error={
                            formik.touched.otp && formik.errors.otp
                                ? formik.errors.otp
                                : undefined
                        }
                        {...formik.getFieldProps('otp')}
                        className="focus:ring-[var(--brand-start)] dark:focus:ring-[var(--brand-start)] focus:ring-2 dark:focus:ring-2 focus:outline-none transition-all duration-200"
                    />
                </div>

                {/* Confirm Password Field */}
                <div className="space-y-2">
                    <Input
                        id="password"
                        label="New Password"
                        type="password"
                        placeholder="••••••••"
                        error={formik.touched.password && formik.errors.password ? formik.errors.password : undefined}
                        {...formik.getFieldProps('password')}
                        className="focus:ring-[var(--brand-start)] dark:focus:ring-[var(--brand-start)] focus:ring-2 dark:focus:ring-2 focus:outline-none transition-all duration-200"
                    />
                </div>

                {/* Submit Button */}
                <button
                    type="submit"
                    disabled={isLoading}
                    className="w-full py-3.5 px-4 text-white font-semibold bg-gradient-to-r from-[var(--brand-start)] to-[var(--brand-end)] hover:opacity-90 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-[var(--brand-start)] disabled:opacity-50 disabled:cursor-not-allowed transform active:scale-[0.98] transition-all duration-200 shadow-lg shadow-cyan-500/20"
                >
                    {isLoading ? (
                        <span className="flex items-center justify-center gap-2">
                            <svg className="animate-spin h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                            </svg>
                            Resetting...
                        </span>
                    ) : (
                        'Reset Password'
                    )}
                </button>

                {/* Back to Login Link */}
                <p className="text-center text-sm text-zinc-600 dark:text-zinc-400">
                    Back to{' '}
                    <Link
                        href="/auth/login"
                        className="font-semibold text-[var(--brand-start)] hover:text-[var(--brand-end)] transition-colors"
                    >
                        Sign in
                    </Link>
                </p>
            </form>
        </div>

    )
}

export default ResetForm