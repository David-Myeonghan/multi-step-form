import { Controller, useFormContext } from 'react-hook-form';
import { DatePicker, DatePickerSlotProps } from '@mui/x-date-pickers';

interface RHFDatePickerProps {
  name: string;
  label: string;
  rules?: Record<string, string>;
  slotProps?: DatePickerSlotProps<true> | undefined;
}
export default function RHFDatePicker({ name, label, rules, slotProps }: RHFDatePickerProps) {
  const { control } = useFormContext();

  return (
    <Controller
      name={name}
      control={control}
      rules={rules}
      render={({ field, fieldState }) => (
        <DatePicker
          label={label}
          {...field}
          slotProps={{
            textField: {
              fullWidth: true,
              error: !!fieldState.error,
              helperText: fieldState.error?.message,
            },
            ...slotProps,
          }}
        />
      )}
    />
  );
}
