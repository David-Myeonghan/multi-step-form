import { Stack, Box, Typography } from '@mui/material';
import React from 'react';

const HEADER_STEPS = [
  { title: '📚 도서 기본 정보', description: '도서 기본 정보를 입력해주세요.' },
  { title: '📚 도서 추천', description: '도서를 읽은 소감을 작성해주세요.' },
  { title: '📚 인용구 및 공개 여부', description: '인용구와 공개 설정을 선택해주세요.' },
] as const;
interface StepHeaderProps {
  currentStep: 1 | 2 | 3;
}
export default function StepHeader({ currentStep }: StepHeaderProps) {
  const { title, description } = HEADER_STEPS[currentStep - 1];
  return (
    <Stack>
      <Typography variant="h5">{title}</Typography>
      <Typography variant="subtitle1">Step {currentStep} / 3</Typography>
      <Typography variant="subtitle1">{description}</Typography>
    </Stack>
  );
}
