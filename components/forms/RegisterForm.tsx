'use client';
import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import { FaRegEye } from 'react-icons/fa';
import { IoIosEyeOff } from 'react-icons/io';
import Link from 'next/link';
import { useAuth } from '@/context/AuthContext';


// Zod Schema
const registerSchema = z.object({
    firstName: z.string().min(2, { message: 'First name must be at least 2 characters' }),
    lastName: z.string().optional(),
    email: z.string().email({ message: 'Invalid email address' }),
    password: z.string().min(6, { message: 'Password must be at least 6 characters' }),
    confirmPassword: z.string(),
}).refine((data) => data.password === data.confirmPassword, {
    message: "Passwords don't match",
    path: ["confirmPassword"],
});

type RegisterFormInputs = z.infer<typeof registerSchema>;

const RegisterForm = () => {
    const [showPassword, setShowPassword] = useState(false);
    const [showConfirmPassword, setShowConfirmPassword] = useState(false);
    const { register: registerUser, isLoading } = useAuth();

    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm<RegisterFormInputs>({
        resolver: zodResolver(registerSchema),
        defaultValues: {
            firstName: '',
            lastName: '',
            email: '',
            password: '',
            confirmPassword: '',
        },
    });

    const onSubmit = async (data: RegisterFormInputs) => {
        // setIsLoading(true);
        const registerData = {
            firstName: data.firstName,
            lastName: data.lastName,
            email: data.email,
            password: data.confirmPassword,
        }

        try {
            await registerUser(registerData);
        } catch (error: any) {
            console.log("error", error)
        }
    };

    return (
        <div className="w-full max-w-md p-8 space-y-6 bg-white  shadow-xl dark:bg-zinc-900 border border-zinc-100 dark:border-zinc-800 transition-colors duration-300">
            <div className="text-center space-y-2">
                <h1 className="text-3xl font-bold text-zinc-900 dark:text-white tracking-tight">
                    Create Account
                </h1>
                <p className="text-zinc-500 dark:text-zinc-400">
                    Join us and start your journey
                </p>
            </div>

            <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
                {/* Name Field */}
                <div className='grid md:grid-cols-2 gap-2'>
                    <div className="space-y-2">
                        <label
                            htmlFor="firstName"
                            className="block text-sm font-medium text-zinc-700 dark:text-zinc-300"
                        >
                            First Name
                        </label>
                        <input
                            id="firstName"
                            type="text"
                            placeholder="John"
                            {...register('firstName')}
                            className={`w-full px-4 py-3  bg-zinc-50 dark:bg-zinc-800 border ${errors.firstName
                                ? 'border-red-500 focus:ring-red-500'
                                : 'border-zinc-200 dark:border-zinc-700 focus:ring-[var(--brand-start)]'
                                } text-zinc-900 dark:text-white placeholder-zinc-400 focus:outline-none focus:ring-2 transition-all duration-200`}
                        />
                        {errors.firstName && (
                            <p className="text-sm text-red-500 animate-pulse">
                                {errors.firstName.message}
                            </p>
                        )}
                    </div>
                    <div className="space-y-2">
                        <label
                            htmlFor="lastName"
                            className="block text-sm font-medium text-zinc-700 dark:text-zinc-300"
                        >
                            Last Name
                        </label>
                        <input
                            id="lastName"
                            type="text"
                            placeholder="John"
                            {...register('lastName')}
                            className={`w-full px-4 py-3  bg-zinc-50 dark:bg-zinc-800 border ${errors.lastName
                                ? 'border-red-500 focus:ring-red-500'
                                : 'border-zinc-200 dark:border-zinc-700 focus:ring-[var(--brand-start)]'
                                } text-zinc-900 dark:text-white placeholder-zinc-400 focus:outline-none focus:ring-2 transition-all duration-200`}
                        />
                        {errors.lastName && (
                            <p className="text-sm text-red-500 animate-pulse">
                                {errors.lastName.message}
                            </p>
                        )}
                    </div>
                </div>


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
                    <label
                        htmlFor="password"
                        className="block text-sm font-medium text-zinc-700 dark:text-zinc-300"
                    >
                        Password
                    </label>
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

                {/* Confirm Password Field */}
                <div className="space-y-2">
                    <label
                        htmlFor="confirmPassword"
                        className="block text-sm font-medium text-zinc-700 dark:text-zinc-300"
                    >
                        Confirm Password
                    </label>
                    <div className="relative">
                        <input
                            id="confirmPassword"
                            type={showConfirmPassword ? 'text' : 'password'}
                            placeholder="••••••••"
                            {...register('confirmPassword')}
                            className={`w-full px-4 py-3  bg-zinc-50 dark:bg-zinc-800 border ${errors.confirmPassword
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
                    {errors.confirmPassword && (
                        <p className="text-sm text-red-500 animate-pulse">
                            {errors.confirmPassword.message}
                        </p>
                    )}
                </div>

                {/* Submit Button */}
                <button
                    type="submit"
                    disabled={isLoading}
                    className="w-full py-3.5 px-4 cursor-pointer  text-white font-semibold bg-gradient-to-r from-[var(--brand-start)] to-[var(--brand-end)] hover:opacity-90 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-[var(--brand-start)] disabled:opacity-50 disabled:cursor-not-allowed transform active:scale-[0.98] transition-all duration-200 shadow-lg shadow-cyan-500/20 mt-2"
                >
                    {isLoading ? (
                        <span className="flex items-center justify-center gap-2">
                            <svg className="animate-spin h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                            </svg>
                            Creating Account...
                        </span>
                    ) : (
                        'Sign Up'
                    )}
                </button>

                {/* Login Link */}
                <p className="text-center text-sm text-zinc-600 dark:text-zinc-400">
                    Already have an account?{' '}
                    <Link
                        href="/auth/login"
                        className="font-semibold text-[var(--brand-start)] hover:text-[var(--brand-end)] transition-colors"
                    >
                        Sign in
                    </Link>
                </p>
            </form>
        </div>
    );
};

export default RegisterForm;