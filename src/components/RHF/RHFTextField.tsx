import { TextField } from '@mui/material';
import { useFormContext } from 'react-hook-form';

interface RHFTextFieldProps {
  name: string;
  label: string;
  sx?: sxProps;
  multiline?: boolean;
  rows?: number;
}
export default function RHFTextField({ name, label, sx = { width: '100%' }, multiline, rows }: RHFTextFieldProps) {
  const {
    register,
    formState: { errors },
  } = useFormContext();

  return (
    <TextField
      label={label}
      {...register(name)}
      error={!!errors.title}
      helperText={errors.title?.message}
      sx={sx}
      multiline={multiline}
      rows={rows}
    />
  );
}
