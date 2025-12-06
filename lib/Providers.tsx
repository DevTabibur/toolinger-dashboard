'use client';

import { store } from '@/redux/store';
import React from 'react';
import { Provider } from 'react-redux';
import ClientThemeProvider from '../components/ClientThemeProvider';
import ClientLanguageProvider from '@/components/ClientLanguageProvider';

const Providers = ({ children }: { children: React.ReactNode }) => {
  return (
    <Provider store={store}>
      <ClientLanguageProvider>
        <ClientThemeProvider>
          {children}
        </ClientThemeProvider>
      </ClientLanguageProvider>
    </Provider>
  );
};

export default Providers;