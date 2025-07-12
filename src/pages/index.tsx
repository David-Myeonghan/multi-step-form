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

export default function Home() {
  return (
    <>
      <Paper elevation={3} sx={{ p: 3 }}>
        <Stack gap={3}>
          {/* Title */}
          <Box>
            <Typography variant="h5">📚 도서 기본 정보</Typography>
            <Typography variant="subtitle1">Step 1 / 5</Typography>
          </Box>
          {/* Basic Info */}
          <Box>
            <Typography variant="subtitle1">도서 기본 정보를 입력해주세요.</Typography>
            <TextField sx={{ width: '100%' }} label="책 제목" />
            <TextField sx={{ width: '100%' }} label="저자" />
          </Box>
          {/* Reading Status */}
          <Box>
            {/*<Typography>독서 상태</Typography>*/}
            <FormControl>
              <FormLabel id="demo-row-radio-buttons-group-label">독서 상태</FormLabel>
              <RadioGroup
                row
                aria-labelledby="demo-row-radio-buttons-group-label"
                name="row-radio-buttons-group"
              >
                <FormControlLabel value="female" control={<Radio />} label="읽고싶은 책" />
                <FormControlLabel value="male" control={<Radio />} label="읽는 중" />
                <FormControlLabel value="other" control={<Radio />} label="읽음" />
                <FormControlLabel value="disabled" control={<Radio />} label="보류 중" />
              </RadioGroup>
            </FormControl>
          </Box>
          {/* Start/End date */}
          <Stack>
            <Typography>독서 시작일</Typography>
            <DatePicker />
            <Typography>독서 종료일</Typography>
            <DatePicker />
          </Stack>
          {/* Actions */}
          <Stack direction="row" sx={{ width: '100%' }}>
            <Button>이전</Button>
            <Button>다음 ➡</Button>
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
