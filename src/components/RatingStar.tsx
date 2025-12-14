import { Stack, Typography } from '@mui/material';
import { useState } from 'react';
import StarBorderIcon from '@mui/icons-material/StarBorder';
import { useFormContext, useWatch } from 'react-hook-form';

interface RatingStarProps {
  name: string;
}
export default function RatingStar({ name }: RatingStarProps) {
  const {
    control,
    setValue,
    formState: { isReady, errors },
  } = useFormContext();

  const [hoverRating, setHoverRating] = useState<number>(0);

  const ratingValue = useWatch({ control, name });

  const handleStarClick = (starValue: number, isHalf: boolean = false) => {
    const newRating = isHalf ? starValue - 0.5 : starValue;
    isReady && setValue(name, newRating);
  };

  const handleStarMouseEnter = (starValue: number, isHalf: boolean = false) => {
    const newRating = isHalf ? starValue - 0.5 : starValue;
    setHoverRating(newRating);
  };
  const handleMouseLeave = () => {
    setHoverRating(0);
  };

  return (
    <Stack alignItems="center">
      <Stack direction="row">
        {[1, 2, 3, 4, 5].map(star => (
          <Stack
            key={star}
            direction="row"
            justifyContent="center"
            alignItems="center"
            sx={{ position: 'relative' }}
          >
            {/* left star */}
            <button
              type="button"
              onClick={() => handleStarClick(star, true)}
              onMouseEnter={() => handleStarMouseEnter(star, true)}
              onMouseLeave={handleMouseLeave}
              style={{
                all: 'unset',
                boxSizing: 'border-box',
                position: 'absolute',
                left: 0,
                width: '16px',
                height: '28px',
                backgroundColor: (hoverRating || ratingValue) >= star - 0.5 ? '#FFFF00AA' : '',
              }}
            />
            <StarBorderIcon fontSize="large" color="disabled" />

            {/* right star */}
            <button
              type="button"
              onClick={() => handleStarClick(star, false)}
              onMouseEnter={() => handleStarMouseEnter(star, false)}
              onMouseLeave={handleMouseLeave}
              style={{
                all: 'unset',
                boxSizing: 'border-box',
                position: 'absolute',
                right: 0,
                width: '18px',
                height: '32px',
                backgroundColor: (hoverRating || ratingValue) >= star ? '#FFFF00AA' : '',
              }}
            />
          </Stack>
        ))}
      </Stack>
      <Typography color={errors[name] && '#d32f2f'}>{hoverRating || ratingValue} / 5</Typography>
      {errors[name] && (
        <span
          style={{ color: '#d32f2f', fontSize: '0.75rem', marginTop: '3px', marginLeft: '14px' }}
        >
          {errors[name]?.message as string}
        </span>
      )}
    </Stack>
  );
}
