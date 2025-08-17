import { TextField } from '@mui/material';
import { SxProps } from '@mui/material/styles';
import { useFormContext } from 'react-hook-form';
import { ReactNode } from 'react';

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
  const {
    register,
    formState: { errors },
  } = useFormContext();

  const fieldError = errors[name];

  return (
    <TextField
      label={label}
      {...register(name)}
      error={!!fieldError}
      helperText={fieldError?.message as ReactNode}
      sx={sx}
      multiline={multiline}
      rows={rows}
    />
  );
}
