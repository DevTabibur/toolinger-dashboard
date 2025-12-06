'use client';

import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import Link from 'next/link';
import { forgotPasswordSchema } from '@/schemas/auth.schema';
import { Input } from '@/components/ui';

type ForgotPasswordInputs = z.infer<typeof forgotPasswordSchema>;
const ForgotPassword = () => {
    const [isLoading, setIsLoading] = useState(false);
    const [isSubmitted, setIsSubmitted] = useState(false);

    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm<ForgotPasswordInputs>({
        resolver: zodResolver(forgotPasswordSchema),
        defaultValues: {
            email: '',
        },
    });

    const onSubmit = async (data: ForgotPasswordInputs) => {
        setIsLoading(true);
        // Simulate API call
        console.log('Forgot Password Form Data:', data);
        setTimeout(() => {
            setIsLoading(false);
            setIsSubmitted(true);
        }, 2000);
    };
    return (
        <>
            <div className="w-full max-w-md p-8 space-y-6 bg-white  shadow-xl dark:bg-zinc-900 border border-zinc-100 dark:border-zinc-800 transition-colors duration-300">
                <div className="text-center space-y-2">
                    <h1 className="text-3xl font-bold text-zinc-900 dark:text-white tracking-tight">
                        Reset Password
                    </h1>
                    <p className="text-zinc-500 dark:text-zinc-400">
                        Enter your email to receive reset instructions
                    </p>
                </div>

                {!isSubmitted ? (
                    <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
                        {/* Email Field */}
                        <div className="space-y-2">
                            <Input
                                id="email"
                                label="Email Address"
                                type="email"
                                placeholder="you@example.com"
                                error={errors.email?.message}
                                {...register('email')}
                                className="focus:ring-[var(--brand-start)] dark:focus:ring-[var(--brand-start)] focus:ring-2 dark:focus:ring-2 focus:outline-none transition-all duration-200"
                            />
                        </div>

                        {/* Submit Button */}
                        <button
                            type="submit"
                            disabled={isLoading}
                            className="w-full py-3.5 px-4  text-white font-semibold bg-gradient-to-r from-[var(--brand-start)] to-[var(--brand-end)] hover:opacity-90 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-[var(--brand-start)] disabled:opacity-50 disabled:cursor-not-allowed transform active:scale-[0.98] transition-all duration-200 shadow-lg shadow-cyan-500/20"
                        >
                            {isLoading ? (
                                <span className="flex items-center justify-center gap-2">
                                    <svg className="animate-spin h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                                    </svg>
                                    Sending...
                                </span>
                            ) : (
                                'Send Reset Link'
                            )}
                        </button>

                        {/* Back to Login Link */}
                        <p className="text-center text-sm text-zinc-600 dark:text-zinc-400">
                            Remember your password?{' '}
                            <Link
                                href="/auth/login"
                                className="font-semibold text-[var(--brand-start)] hover:text-[var(--brand-end)] transition-colors"
                            >
                                Sign in
                            </Link>
                        </p>
                    </form>
                ) : (
                    <div className="text-center space-y-6">
                        <div className="p-4  bg-green-50 dark:bg-green-900/20 text-green-600 dark:text-green-400 text-sm">
                            If an account exists for that email, we have sent password reset instructions.
                        </div>
                        <button
                            onClick={() => setIsSubmitted(false)}
                            className="text-sm font-medium text-[var(--brand-start)] hover:text-[var(--brand-end)]"
                        >
                            Try another email
                        </button>
                        <p className="text-sm text-zinc-600 dark:text-zinc-400">
                            Back to{' '}
                            <Link
                                href="/auth/login"
                                className="font-semibold text-[var(--brand-start)] hover:text-[var(--brand-end)] transition-colors"
                            >
                                Sign in
                            </Link>
                        </p>
                    </div>
                )}
            </div>
        </>
    )
}

export default ForgotPassword