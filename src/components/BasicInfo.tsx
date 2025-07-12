import {
  Box,
  Button,
  FormControl,
  FormControlLabel,
  FormLabel,
  Radio,
  RadioGroup,
  Stack,
  TextField,
} from '@mui/material';
import { DatePicker } from '@mui/x-date-pickers';
import { useForm } from 'react-hook-form';

const READING_STATUS = [
  { label: '읽고 싶은 책', value: 'WISHLIST' },
  { label: '읽는 중', value: 'READING' },
  { label: '읽음', value: 'COMPLETED' },
  { label: '보류 중', value: 'PAUSED' },
];

export interface StepComponentCommonProps {
  onNext: () => void;
  onPrevious: () => void;
}
export default function BasicInfo({ onNext, onPrevious }: StepComponentCommonProps) {
  const form = useForm();
  const { handleSubmit } = form;

  const handleNextClick = () => {
    console.log('next');
    // if ok,
    onNext();
  };
  const handlePreviousClick = () => {
    onPrevious();
  };

  return (
    <>
      <form onSubmit={handleSubmit(() => {})}>
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
        <Stack direction="row" justifyContent="space-between" sx={{ width: '100%', paddingTop: 3 }}>
          <Button onClick={handlePreviousClick} variant="contained">
            이전
          </Button>
          <Button onClick={handleNextClick} variant="contained">
            다음 ➡
          </Button>
        </Stack>
      </form>
    </>
  );
}
