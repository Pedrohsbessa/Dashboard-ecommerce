import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import './globals.css';
import { ClerkProvider, UserButton } from '@clerk/nextjs';
import { dark } from '@clerk/themes';
import { ModalProvider } from '@/provider/modal-provider';
import ToastProvider from '@/provider/toast-provider';

const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
   title: 'Admin Dashboard',
   description: 'Admin Dashboard',
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
   return (
      <ClerkProvider appearance={{ baseTheme: dark }}>
         <html lang="en">
            <body className={`${inter.className}`}>
               <ToastProvider />
               <ModalProvider />
               {children}
            </body>
         </html>
      </ClerkProvider>
   );
}
