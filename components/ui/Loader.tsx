import React from 'react';

interface LoaderProps {
    size?: 'sm' | 'md' | 'lg' | 'xl';
    className?: string;
}

const Loader = ({ size = 'md', className = '' }: LoaderProps) => {
    const sizeClasses = {
        sm: 'w-5 h-5 border-2',
        md: 'w-8 h-8 border-3',
        lg: 'w-12 h-12 border-4',
        xl: 'w-16 h-16 border-4',
    };

    return (
        <div
            className={`rounded-full animate-spin border-t-transparent ${sizeClasses[size]} ${className}`}
            style={{
                borderColor: 'var(--accent-color)',
                borderTopColor: 'transparent',
            }}
        />
    );
};

export default Loader;
