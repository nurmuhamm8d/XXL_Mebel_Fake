'use client';

import React from 'react';
import { ChakraProvider, defaultSystem } from '@chakra-ui/react';
import { Provider as ReduxProvider } from 'react-redux';
import { store } from '@/store/store';

type ProvidersProps = {
  children: React.ReactNode;
};

export function Providers({ children }: ProvidersProps) {
  return (
    <ChakraProvider value={defaultSystem}>
      <ReduxProvider store={store}>{children}</ReduxProvider>
    </ChakraProvider>
  );
}
