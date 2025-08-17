import { FieldValues, FormProvider, UseFormReturn } from 'react-hook-form';

type FormMethods<T extends FieldValues> = UseFormReturn<T, any, T>;

interface FormProviderProps<T extends FieldValues> {
  children: React.ReactNode;
  methods: FormMethods<T>;
  onSubmit: (data: T) => void;
}

export default function RHFProvider<T extends FieldValues>({
  children,
  methods,
  onSubmit,
}: FormProviderProps<T>) {
  return (
    <FormProvider {...methods}>
      <form onSubmit={methods.handleSubmit(onSubmit)}>{children}</form>
    </FormProvider>
  );
}
