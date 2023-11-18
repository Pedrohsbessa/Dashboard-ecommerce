'use client';

import * as z from 'zod';
import { Button } from '@/components/ui/button';
import { Heading } from '@/components/ui/headong';
import { Store } from '@prisma/client';
import { SeparatorHorizontal, Trash } from 'lucide-react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { useState } from 'react';
import { Separator } from '@/components/ui/separator';
import {
   Form,
   FormControl,
   FormField,
   FormItem,
   FormLabel,
   FormMessage,
} from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import toast from 'react-hot-toast';
import axios from 'axios';
import { useParams, useRouter } from 'next/navigation';
import { AlertModal } from '@/components/modals/alert-modal';

interface SettingsFormPage {
   initialData: Store;
}

const formSchema = z.object({
   name: z
      .string()
      .min(1, { message: 'Por favor, insira pelo menos um caractere ' }),
});

type SettingsFormValues = z.infer<typeof formSchema>;

export const SettingsForm: React.FC<SettingsFormPage> = ({ initialData }) => {
   const params = useParams();
   const router = useRouter();
   const [open, setOpen] = useState(false);
   const [loading, setLoading] = useState(false);

   const form = useForm<SettingsFormValues>({
      resolver: zodResolver(formSchema),
      defaultValues: initialData,
   });

   const onSubmit = async (data: SettingsFormValues) => {
      try {
         setLoading(true);
         await axios.patch(`/api/stores/${params.storeId}`, data);
         router.refresh();
         toast.success('Loja atualizada!');
      } catch (error) {
         toast.error('Algum erro aconteceu.');
      } finally {
         setLoading(false);
      }
   };

   const onDelete = async () => {
      try {
         
      } catch (error) {
         toast.error('Remova todos os produtos e categorias primeiro.');
      }
   };

   return (
      <>
         <AlertModal
            isOpen={open}
            onClose={() => setOpen(false)}
            onConfirm={() => {}}
            loading={loading}
         />
         <div className="flex items-center justify-between">
            <Heading
               title="Configurações"
               description="Gerencia as configurações de sua loja"
            />
            <Button
               disabled={loading}
               variant="destructive"
               size="icon"
               onClick={() => setOpen(true)}
            >
               <Trash className="h-4 w-4" />
            </Button>
         </div>
         <Separator />
         <Form {...form}>
            <form
               onSubmit={form.handleSubmit(onSubmit)}
               className="space-y-8 w-full"
            >
               <div className="grid grid-cols-3 gap-8">
                  <FormField
                     control={form.control}
                     render={({ field }) => (
                        <FormItem>
                           <FormLabel>Loja:</FormLabel>
                           <FormControl>
                              <Input
                                 disabled={loading}
                                 placeholder="Nome da Loja"
                                 {...field}
                              />
                           </FormControl>
                           <FormMessage></FormMessage>
                        </FormItem>
                     )}
                     name="name"
                  />
               </div>
               <Button disabled={loading} className="ml-aut" type="submit">
                  Salvar Mudanças
               </Button>
            </form>
         </Form>
      </>
   );
};
