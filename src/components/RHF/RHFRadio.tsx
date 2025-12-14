import { FormControl, FormControlLabel, FormLabel, Radio, RadioGroup } from '@mui/material';
import { Controller, useFormContext } from 'react-hook-form';

interface RHFRadioProps {
  radioTitle: string;
  name: string;
  radioGroupList: Array<Record<'label' | 'value', any>>;
}
export default function RHFRadio({ radioTitle, name, radioGroupList }: RHFRadioProps) {
  const {
    control,
    formState: { errors },
  } = useFormContext();
  return (
    <FormControl error={!!errors[name]}>
      <FormLabel id="radio-buttons-reading-status-label">{radioTitle}</FormLabel>
      <Controller
        name={name}
        control={control}
        render={({ field: { ref, ...fieldProps } }) => (
          <RadioGroup row {...fieldProps} ref={ref}>
            {radioGroupList.map(({ label, value }) => (
              <FormControlLabel key={value} value={value} control={<Radio />} label={label} />
            ))}
          </RadioGroup>
        )}
      />
      {errors[name] && (
        <span
          style={{ color: '#d32f2f', fontSize: '0.75rem', marginTop: '3px', marginLeft: '14px' }}
        >
          {errors[name]?.message as string}
        </span>
      )}
    </FormControl>
  );
}
