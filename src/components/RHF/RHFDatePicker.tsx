import { Control, Controller, FieldValues } from 'react-hook-form';
import { DatePicker, DatePickerSlotProps } from '@mui/x-date-pickers';
import {} from '@/steps/BasicInfo';

interface RHFDatePickerProps {
  name: string;
  label: string;
  rules: Record<string, string>;
  // control: Control<BasicInfoFields>;
  slotProps?: DatePickerSlotProps<true> | undefined;
  // sx?:
}
export default function RHFDatePicker({
  name,
  label,
  rules,
  // control,
  slotProps,
}: RHFDatePickerProps) {
  return (
    <Controller
      name={name}
      // control={control}
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
          // slotProps: textField, popper, day, layout
        />
      )}
    />
  );
}
