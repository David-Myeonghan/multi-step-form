import { TextField } from '@mui/material';
import { useFormContext } from 'react-hook-form';

interface RHFTextFieldProps {
  name: string;
  label: string;
  sx?: sxProps;
}
export default function RHFTextField({ name, label, sx = { width: '100%' } }: RHFTextFieldProps) {
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
    />
  );
}
