import { FormProvider, UseFormReturn } from 'react-hook-form';

interface FormProviderProps {
  children: React.ReactNode;
  methods: UseFormReturn<any>;
  onSubmit: VoidFunction;
}

export default function RHFProvider({ children, methods, onSubmit }: FormProviderProps) {
  return (
    <FormProvider {...methods}>
      <form onSubmit={methods.handleSubmit(onSubmit)}>{children}</form>
    </FormProvider>
  );
}
