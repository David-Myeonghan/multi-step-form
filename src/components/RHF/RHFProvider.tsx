import { FormProvider, UseFormReturn } from 'react-hook-form';
import { ReactNode } from 'react';

interface FormProviderProps<TFormValues> {
  children: ReactNode;
  methods: UseFormReturn<any>;
  onSubmit: (data: TFormValues) => void | Promise<void>;
}

export default function RHFProvider<TFormValues>({
  children,
  methods,
  onSubmit,
}: FormProviderProps<TFormValues>) {
  return (
    <FormProvider {...methods}>
      <form onSubmit={methods.handleSubmit(onSubmit)}>{children}</form>
    </FormProvider>
  );
}
