'use client';
import * as z from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import axios from 'axios';
import { toast } from 'react-hot-toast';

import { useStoreModal } from '@/hooks/use-store-modal';
import { Modal } from '../ui/modal';
import { useForm } from 'react-hook-form';
import {
   Form,
   FormControl,
   FormField,
   FormItem,
   FormLabel,
   FormMessage,
} from '../ui/form';
import { Input } from '../ui/input';
import { Button } from '../ui/button';
import { useState } from 'react';

const formSchema = z.object({
   name: z.string().min(1),
});

export const StoreModal = () => {
   const storeModal = useStoreModal();

   const [loading, setLoading] = useState(false);

   const form = useForm<z.infer<typeof formSchema>>({
      resolver: zodResolver(formSchema),
      defaultValues: {
         name: '',
      },
   });
   const onSubmit = async (values: z.infer<typeof formSchema>) => {
      console.log(values);
      try {
         setLoading(true);

         const response = await axios.post('/api/stores', values);
         toast.success('A loja foi criada');
         window.location.assign(`/${response.data.id}`);
      } catch (error) {
         toast.error('Algo está errado');
      } finally {
         setLoading(false);
      }
   };
   return (
      <Modal
         title="Crie uma loja"
         description="Adicione a nova loja para gerenciar produtos e categorias"
         isOpen={storeModal.isOpen}
         onClose={storeModal.onClose}
      >
         <div className="space-y-4 py-2 pb-2">
            <Form {...form}>
               <form onSubmit={form.handleSubmit(onSubmit)}>
                  <FormField
                     control={form.control}
                     name="name"
                     render={({ field }) => (
                        <FormItem>
                           <FormLabel>Nome</FormLabel>
                           <FormControl>
                              <Input
                                 disabled={loading}
                                 placeholder="E-commerce"
                                 {...field}
                              />
                           </FormControl>
                           <FormMessage />
                        </FormItem>
                     )}
                  />
                  <div className="pt-6 space-x-2 flex items-center justify-end">
                     <Button
                        disabled={loading}
                        variant={'destructive'}
                        onClick={storeModal.onClose}
                     >
                        Cancelar
                     </Button>
                     <Button disabled={loading} type="submit">
                        Criar
                     </Button>
                  </div>
               </form>
            </Form>
         </div>
      </Modal>
   );
};