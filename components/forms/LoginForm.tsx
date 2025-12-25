'use client';

import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import { FaRegEye } from 'react-icons/fa';
import { IoIosEyeOff } from 'react-icons/io';
import Link from 'next/link';
import { loginSchema } from '@/schemas/auth.schema';
import toast from 'react-hot-toast';
import { useAuth } from '@/context/AuthContext';
import { useRouter } from 'next/navigation';



type LoginFormInputs = z.infer<typeof loginSchema>;

const LoginForm = () => {
    const [showPassword, setShowPassword] = useState(false);
    const { login, isLoading } = useAuth();
    const router = useRouter();

    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm<LoginFormInputs>({
        resolver: zodResolver(loginSchema),
        defaultValues: {
            email: '',
            password: '',
            rememberMe: false,
        },
    });

    const onSubmit = async (data: LoginFormInputs) => {
        try {
            await login(data);
            toast.success("Login Complete!");
            // Redirect is handled in AuthContext
        } catch (error: any) {
            // console.error("Login failed in form:", error);
            if (error?.status === 404) {
                toast.error("Credentials do not match!");
            } else if (error?.data?.message) {
                toast.error(error.data.message);
            } else {
                toast.error("Something went wrong");
            }
        }
    };

    return (
        <div className="w-full max-w-md p-8 space-y-6 bg-white  shadow-xl dark:bg-zinc-900 border border-zinc-100 dark:border-zinc-800 transition-colors duration-300">
            <div className="text-center space-y-2">
                <h1 className="text-3xl font-bold text-zinc-900 dark:text-white tracking-tight">
                    Welcome Back
                </h1>
                <p className="text-zinc-500 dark:text-zinc-400">
                    Sign in to access your dashboard
                </p>
            </div>

            <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
                {/* Email Field */}
                <div className="space-y-2">
                    <label
                        htmlFor="email"
                        className="block text-sm font-medium text-zinc-700 dark:text-zinc-300"
                    >
                        Email Address
                    </label>
                    <input
                        id="email"
                        type="email"
                        placeholder="you@example.com"
                        {...register('email')}
                        className={`w-full px-4 py-3  bg-zinc-50 dark:bg-zinc-800 border ${errors.email
                            ? 'border-red-500 focus:ring-red-500'
                            : 'border-zinc-200 dark:border-zinc-700 focus:ring-[var(--brand-start)]'
                            } text-zinc-900 dark:text-white placeholder-zinc-400 focus:outline-none focus:ring-2 transition-all duration-200`}
                    />
                    {errors.email && (
                        <p className="text-sm text-red-500 animate-pulse">
                            {errors.email.message}
                        </p>
                    )}
                </div>

                {/* Password Field */}
                <div className="space-y-2">
                    <div className="flex items-center justify-between">
                        <label
                            htmlFor="password"
                            className="block text-sm font-medium text-zinc-700 dark:text-zinc-300"
                        >
                            Password
                        </label>
                        <Link
                            href="/auth/forgot-password"
                            className="text-sm font-medium text-[var(--brand-start)] hover:text-[var(--brand-end)] transition-colors"
                        >
                            Forgot password?
                        </Link>
                    </div>
                    <div className="relative">
                        <input
                            id="password"
                            type={showPassword ? 'text' : 'password'}
                            placeholder="••••••••"
                            {...register('password')}
                            className={`w-full px-4 py-3  bg-zinc-50 dark:bg-zinc-800 border ${errors.password
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
                    {errors.password && (
                        <p className="text-sm text-red-500 animate-pulse">
                            {errors.password.message}
                        </p>
                    )}
                </div>

                {/* Remember Me */}
                <div className="flex items-center">
                    <input
                        id="remember-me"
                        type="checkbox"
                        {...register('rememberMe')}
                        className="w-4 h-4  border-zinc-300 text-[var(--brand-start)] focus:ring-[var(--brand-start)] dark:border-zinc-600 dark:bg-zinc-700"
                    />
                    <label
                        htmlFor="remember-me"
                        className="ml-2 block text-sm text-zinc-700 dark:text-zinc-300"
                    >
                        Remember me
                    </label>
                </div>

                {/* Submit Button */}
                <button
                    type="submit"
                    disabled={isLoading}
                    className="w-full py-3.5 px-4  text-white font-semibold bg-gradient-to-r from-[var(--brand-start)] to-[var(--brand-end)] hover:opacity-90 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-[var(--brand-start)] disabled:opacity-50 disabled:cursor-not-allowed transform active:scale-[0.98] transition-all duration-200 shadow-lg shadow-cyan-500/20 cursor-pointer"
                >
                    {isLoading ? (
                        <span className="flex items-center justify-center gap-2">
                            <svg className="animate-spin h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                            </svg>
                            Signing in...
                        </span>
                    ) : (
                        'Sign In'
                    )}
                </button>

                {/* Sign Up Link */}
                <p className="text-center text-sm text-zinc-600 dark:text-zinc-400">
                    Don&apos;t have an account?{' '}
                    <Link
                        href="/auth/register"
                        className="font-semibold text-[var(--brand-start)] hover:text-[var(--brand-end)] transition-colors"
                    >
                        Sign up
                    </Link>
                </p>
            </form>
        </div>
    );
};

export default LoginForm;