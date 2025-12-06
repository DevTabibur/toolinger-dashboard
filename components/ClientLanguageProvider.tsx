'use client';

import { LanguageProvider } from '@/context/LanguageContext';
import React from 'react';

const ClientLanguageProvider = ({ children }: { children: React.ReactNode }) => {
    return (
        <LanguageProvider>
            {children}
        </LanguageProvider>
    );
};

export default ClientLanguageProvider;
