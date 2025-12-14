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
      render={({ field: { ref, ...fieldProps }, fieldState }) => (
        <TextField
          label={label}
          // inputRef와 나머지 props 분리해서 전달해야, focus 같은 fine-grained 설정 가능
          {...fieldProps}
          inputRef={ref}
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
