"use client";
import { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { useRouter } from 'next/navigation';
import { useUserLoginMutation, useUserLogoutMutation, useUserRegisterMutation } from '@/redux/api/auth.api';
import { storeUserInfo, getLoggedInUser, isLoggedIn, removeUserInfo } from '@/services/auth.services';
import { authKey } from '@/constants/storageKey.constant';
import toast from 'react-hot-toast';

interface User {
    _id?: string;
    id?: string;
    email?: string;
    role?: string;
    [key: string]: any;
}

interface AuthContextType {
    user: User | null;
    isAuthenticated: boolean;
    isLoading: boolean;
    login: (credentials: { email: string; password: string }) => Promise<void>;
    register: (data: any) => Promise<void>;
    logout: () => Promise<void>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider = ({ children }: { children: ReactNode }) => {
    const [user, setUser] = useState<User | null>(null);
    const [isAuthenticated, setIsAuthenticated] = useState<boolean>(false);
    const [isLoading, setIsLoading] = useState<boolean>(true);
    const router = useRouter();

    const [userLoginMutation] = useUserLoginMutation();
    const [userRegisterMutation] = useUserRegisterMutation();
    const [userLogoutMutation] = useUserLogoutMutation();

    // Check authentication status on mount
    useEffect(() => {
        const checkAuth = () => {
            try {
                const loggedIn = isLoggedIn();
                // console.log('loggedIn', loggedIn);
                if (loggedIn) {
                    const userData = getLoggedInUser();
                    if (userData) {
                        setUser(userData);
                        setIsAuthenticated(true);
                    } else {
                        setUser(null);
                        setIsAuthenticated(false);
                    }
                } else {
                    setUser(null);
                    setIsAuthenticated(false);
                }
            } catch (error) {
                console.error('Error checking authentication:', error);
                setUser(null);
                setIsAuthenticated(false);
            } finally {
                setIsLoading(false);
            }
        };

        checkAuth();
    }, []);

    const login = async (credentials: { email: string; password: string }) => {
        try {
            setIsLoading(true);
            const response = await userLoginMutation(credentials).unwrap();

            // Store the access token
            if (response?.data?.accessToken) {
                storeUserInfo({ accessToken: response.data.accessToken });

                // Get and set user data from decoded token
                const userData = getLoggedInUser();
                setUser(userData);
                setIsAuthenticated(true);

                // Redirect to dashboard
                router.push('/dashboard');
                toast.success("Login Successful");
            } else {
                throw new Error('No access token received');
            }
        } catch (error: any) {
            console.error('Login error:', error);
            // If the error has a message from backend, throw it so UI can display it
            throw error;
        } finally {
            setIsLoading(false);
        }
    };

    const register = async (data: any) => {
        try {
            setIsLoading(true);
            const res = await userRegisterMutation(data).unwrap();
            console.log("register res", res)

            if (res?.statusCode === 200) {
                toast.success("Register Successful");

                // If the registration response contains an access token, log the user in directly
                if (res?.data?.accessToken) {
                    storeUserInfo({ accessToken: res.data.accessToken });
                    const userData = getLoggedInUser();
                    setUser(userData);
                    setIsAuthenticated(true);
                    router.push('/dashboard');
                } else {
                    // Try to auto-login if password is present in data
                    if (data.email && data.password) {
                        // We rely on the login function to handle the rest (store token, redirect, etc.)
                        // Note: login() will set isLoading true/false again, which is fine.
                        await login({ email: data.email, password: data.password });
                    } else {
                        router.push('/auth/login');
                    }
                }
            } else if (res?.status === 'false') {
                toast.error(res?.message);
                throw new Error(res?.message);
            } else {
                toast.error("Something went wrong during registration!");
                throw new Error("Registration failed");
            }
        } catch (error: any) {
            console.error('Registration error:', error);
            throw error;
        } finally {
            setIsLoading(false);
        }
    };

    const logout = async () => {
        try {
            setIsLoading(true);

            // Call logout API
            const res = await userLogoutMutation({}).unwrap();

            if (res?.statusCode == 200) {
                removeUserInfo(authKey);
                setUser(null);
                setIsAuthenticated(false);
                router.push('/auth/login');
                toast.success("Logout Successful");
            }
        } catch (error) {
            console.error('Logout error:', error);
            // Force logout on error
            removeUserInfo(authKey);
            setUser(null);
            setIsAuthenticated(false);
            router.push('/auth/login');
        } finally {
            setIsLoading(false);
        }
    };


    return (
        <AuthContext.Provider value={{ user, isAuthenticated, isLoading, login, register, logout }}>
            {children}
        </AuthContext.Provider>
    );
};



export const useAuth = () => {
    const context = useContext(AuthContext);
    if (!context) {
        throw new Error('useAuth must be used within an AuthProvider');
    }
    return context;
};
