'use client';

import { store } from '@/redux/store';
import React from 'react';
import { Provider } from 'react-redux';
import ClientThemeProvider from '../components/ClientThemeProvider';

const Providers = ({ children }: { children: React.ReactNode }) => {
  return (
    <Provider store={store}>
      <ClientThemeProvider>
        {children}
      </ClientThemeProvider>
    </Provider>
  );
};

export default Providers;