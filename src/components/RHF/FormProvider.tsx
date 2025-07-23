import { FieldValues, FormProvider as Form, UseFormReturn } from 'react-hook-form';

interface FormProviderProps {
  children: React.ReactNode;
  methods: UseFormReturn<FieldValues, any, FieldValues>;
  onSubmit: (data: unknown) => void;
}

export default function FormProvider({ children, methods, onSubmit }: FormProviderProps) {
  return (
    <Form {...methods}>
      <form onSubmit={methods.handleSubmit(onSubmit)}>{children}</form>
    </Form>
  );
}
