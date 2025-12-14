import { TextField } from '@mui/material';
import { SxProps } from '@mui/material/styles';
import { Controller, useFormContext } from 'react-hook-form';

interface RHFTextFieldProps {
  name: string;
  label: string;
  sx?: SxProps;
  multiline?: boolean;
  rows?: number;
}
export default function RHFTextField({
  name,
  label,
  sx = { width: '100%' },
  multiline,
  rows,
}: RHFTextFieldProps) {
  const { control } = useFormContext();

  return (
    <Controller
      name={name}
      control={control}
      render={({ field, fieldState }) => (
        <TextField
          label={label}
          {...field}
          inputRef={field.ref}
          error={!!fieldState.error}
          helperText={fieldState.error?.message}
          sx={sx}
          multiline={multiline}
          rows={rows}
        />
      )}
    />
  );
}
