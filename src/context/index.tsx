import React from 'react';

import * as ApiProvider from './apiContext';
import * as LayoutProvider from './layoutContext';

export type ProvidersProps = {
  children: React.ReactNode;
  storageKey: string;
} & LayoutProvider.ProviderProps & ApiProvider.ProviderProps;

export const ContextProviders = ({ children, storageKey }: ProvidersProps) => {
  return (
    <LayoutProvider.LayoutProvider storageKey={storageKey}>
      <ApiProvider.ApiProvider storageKey={storageKey}>
        {children}
      </ApiProvider.ApiProvider>
    </LayoutProvider.LayoutProvider>
  );
};
