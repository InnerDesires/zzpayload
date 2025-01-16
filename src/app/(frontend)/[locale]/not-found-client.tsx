'use client'

import { useHeaderTheme } from '@/providers/HeaderTheme';
import React from 'react';

export const NotFoundClient = () => {
  const { setHeaderTheme } = useHeaderTheme();
  React.useEffect(() => {
    setHeaderTheme('light');
  }, [setHeaderTheme]);
  return <React.Fragment />
}