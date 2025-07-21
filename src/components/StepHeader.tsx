import { Box, Typography } from '@mui/material';
import React from 'react';

const HEADER_STEPS = [
  { title: '📚 도서 기본 정보', description: '도서 기본 정보를 입력해주세요.' },
  { title: '📚 도서 추천', description: '읽은 도서에 별점을 매겨주세요' },
  { title: '📚 독후감', description: '도서를 읽은 소감을 작성해주세요.' },
  { title: '📚 인용구', description: '추천하고 싶은 문장이 있으신가요?' },
  { title: '📚 공개 여부', description: '읽은 도서를 친구들과 나눠보세요.' },
] as const;
interface StepHeaderProps {
  currentStep: 1 | 2 | 3 | 4 | 5;
}
export default function StepHeader({ currentStep }: StepHeaderProps) {
  const { title, description } = HEADER_STEPS[currentStep - 1];
  return (
    <Box>
      <Typography variant="h5">{title}</Typography>
      <Typography variant="subtitle1">Step {currentStep} / 5</Typography>
      <Typography variant="subtitle1">{description}</Typography>
    </Box>
  );
}
