'use client';

import { useSelector } from 'react-redux';
import { RootState } from '@/redux/store';
import Loader from './ui/Loader';

const GlobalLoader = () => {
    const isLoading = useSelector((state: RootState) => state.ui.isLoading);

    if (!isLoading) return null;

    return (
        <div className="fixed inset-0 z-[9999] flex items-center justify-center bg-white/50 dark:bg-black/50 backdrop-blur-sm">
            <Loader size="xl" />
        </div>
    );
};

export default GlobalLoader;
