import {
  Box,
  Button,
  FormControl,
  FormControlLabel,
  FormLabel,
  Paper,
  Radio,
  RadioGroup,
  Stack,
  TextField,
  Typography,
} from '@mui/material';
import { DatePicker } from '@mui/x-date-pickers';
import { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import { useForm } from 'react-hook-form';

const READING_STATUS = [
  { label: '읽고 싶은 책', value: 'WISHLIST' },
  { label: '읽는 중', value: 'READING' },
  { label: '읽음', value: 'COMPLETED' },
  { label: '보류 중', value: 'PAUSED' },
];

// 1024px 기준
export default function Home() {
  const router = useRouter();
  const [step, setStep] = useState(1);

  const form = useForm();

  useEffect(() => {
    if (router.isReady === false) {
      return;
    }
    if (!router.query.step) {
      router.replace(
        {
          pathname: router.pathname,
          query: { ...router.query, step },
        },
        undefined,
        { shallow: true },
      );
    }
  }, [router.isReady]);

  return (
    <>
      <Paper elevation={3} sx={{ p: 3 }}>
        <Stack gap={3}>
          {/* Title */}
          <Box>
            <Typography variant="h5">📚 도서 기본 정보</Typography>
            <Typography variant="subtitle1">Step {step} / 5</Typography>
            <Typography variant="subtitle1">도서 기본 정보를 입력해주세요.</Typography>
          </Box>
          {/* Basic Info */}
          <Box>
            <Stack gap={2}>
              <Box>
                <TextField sx={{ width: '100%' }} label="책 제목" />
              </Box>
              <Stack direction="row" gap={2}>
                <TextField sx={{ width: '100%' }} label="저자" />
                <DatePicker label="도서 출판일" sx={{ width: '100%' }} />
              </Stack>
            </Stack>
          </Box>
          {/* Reading Status */}
          <Box>
            <FormControl>
              <FormLabel id="radio-buttons-reading-status-label">독서 상태</FormLabel>
              <RadioGroup
                row
                aria-labelledby="radio-buttons-reading-status-label"
                name="reading-status"
              >
                {READING_STATUS.map(({ label, value }) => (
                  <FormControlLabel key={value} value={value} control={<Radio />} label={label} />
                ))}
              </RadioGroup>
            </FormControl>
          </Box>
          {/* Start/End date */}
          <Stack direction="row" justifyContent="space-between" gap={2}>
            <DatePicker label="독서 시작일" sx={{ width: '100%' }} />
            <DatePicker label="독서 종료일" sx={{ width: '100%' }} />
          </Stack>
          {/* Actions */}
          <Stack direction="row" justifyContent="space-between" sx={{ width: '100%' }}>
            <Button variant="contained">이전</Button>
            <Button variant="contained">다음 ➡</Button>
          </Stack>
        </Stack>
      </Paper>
    </>
  );
}

// 1 단계:
// 도서 기본 정보 - 이름, 저자, 출판 년,월,일
// 독서 상태
// --> 읽고 싶은 책 / 읽는 중 / 읽음 / 보류중
// --> 독서(할) 시작일, 독서 종료일 (독서 상태에 종속적)
