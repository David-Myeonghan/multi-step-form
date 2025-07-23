import { FormControl, FormControlLabel, FormLabel, Radio, RadioGroup } from '@mui/material';
import { Controller, useFormContext } from 'react-hook-form';

interface RHFRadioProps {
  radioTitle: string;
  name: string;
  radioGroupList: Array<Record<'label' | 'title', string>>;
}
export default function RHFRadio({ radioTitle, name, radioGroupList }: RHFRadioProps) {
  const {
    control,
    formState: { errors },
  } = useFormContext();
  return (
    <FormControl error={!!errors.readingStatus}>
      <FormLabel id="radio-buttons-reading-status-label">{radioTitle}</FormLabel>
      <Controller
        name={name}
        control={control}
        render={({ field }) => (
          <RadioGroup row {...field}>
            {radioGroupList.map(({ label, value }) => (
              <FormControlLabel key={value} value={value} control={<Radio />} label={label} />
            ))}
          </RadioGroup>
        )}
      />
    </FormControl>
  );
}
