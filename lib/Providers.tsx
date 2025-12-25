'use client';

import { store } from '@/redux/store';
import React from 'react';
import { Provider } from 'react-redux';
import ClientThemeProvider from '../components/ClientThemeProvider';
import ClientLanguageProvider from '@/components/ClientLanguageProvider';
import { AuthProvider } from '@/context/AuthContext';

const Providers = ({ children }: { children: React.ReactNode }) => {
  return (
    <Provider store={store}>
      <AuthProvider>
        <ClientLanguageProvider>
          <ClientThemeProvider>
            {children}
          </ClientThemeProvider>
        </ClientLanguageProvider>
      </AuthProvider>
    </Provider>
  );
};

export default Providers;