import { prismadb } from '@/lib/prismadb';
import { auth } from '@clerk/nextjs';
import { redirect } from 'next/navigation';
import React, { use } from 'react';

type Props = { children: React.ReactNode };

export default async function SetupLayout({ children }: Props) {
   const { userId } = auth();

   if (!userId) {
      redirect('/sign-in');
   }

   const store = await prismadb.store.findFirst({
      where: {
         userId: userId,
      },
   });

   if (store) {
      redirect(`/${store.id}`);
   }
   return(
    <>
    {children}
    </>
   )
}
