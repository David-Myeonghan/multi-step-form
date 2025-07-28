import { useFormContext } from 'react-hook-form';
import RHFTextField from '@/components/RHF/RHFTextField';
import StarBorderIcon from '@mui/icons-material/StarBorder';
import { Box, Stack, Typography } from '@mui/material';
import { useState } from 'react';

export default function Recommendation() {
  const {
    setValue,
    formState: { errors },
  } = useFormContext();
  console.log(errors);

  const [hoverRating, setHoverRating] = useState<number>(0);

  const handleStarClick = () => {
    setValue('rating', hoverRating);
  };
  const handleStarMouseEnter = (starValue: number, isHalf: boolean = false) => {
    const newRating = isHalf ? starValue - 0.5 : starValue;
    setHoverRating(newRating);
  };
  const handleMouseLeave = () => {
    setHoverRating(0);
  };

  return (
    <Stack gap={3}>
      <Stack gap={1} alignItems="center">
        <Typography>별점을 선택해주세요.</Typography>
        <Stack direction="row">
          {[1, 2, 3, 4, 5].map(star => (
            <div key={star}>
              {/*// left*/}
              <button
                onClick={handleStarClick}
                onMouseEnter={() => handleStarMouseEnter(star, true)}
                onMouseLeave={handleMouseLeave}
              />
              {/*// right*/}
              <button
                onClick={handleStarClick}
                onMouseEnter={() => handleStarMouseEnter(star, false)}
                onMouseLeave={handleMouseLeave}
              />
              <StarBorderIcon fontSize="large" color="disabled" />
            </div>
          ))}
        </Stack>

        <Box>12345</Box>
      </Stack>

      <Stack>
        <Box>
          <Typography>코멘트</Typography>
          <RHFTextField
            label="책에 대한 생각을 자유롭게 남겨주세요"
            name="review"
            multiline={true}
            rows={5}
          />
        </Box>
      </Stack>
    </Stack>
  );
}
