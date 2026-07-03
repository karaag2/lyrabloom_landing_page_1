"use client";

import { ThemeProvider } from '../components/theme-provider';
import '../i18n';

export function Providers({ children }: { children: React.ReactNode }) {
  return (
    <ThemeProvider defaultTheme="system" storageKey="lyrabloom-theme">
      {children}
    </ThemeProvider>
  );
}
