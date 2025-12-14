import { Box, Stack, Typography } from '@mui/material';
import RHFTextField from '@/components/RHF/RHFTextField';
import RHFRadio from '@/components/RHF/RHFRadio';

const IS_PUBLIC_STATUS = [
  { value: true, label: '공개 - 다른 사용자들이 내 리뷰를 볼 수 있습니다.' },
  { value: false, label: '비공개 - 나만 볼 수 있습니다.' },
];

export default function QuotationSharing() {
  return (
    <Stack gap={3}>
      {/* Quotation */}
      <Stack gap={2}>
        <Stack gap={1} alignItems="flex-start">
          <Typography>기억에 남는 인용구</Typography>
          <RHFTextField
            label="책에서 인상 깊었던 문장이나 구절을 적어주세요"
            name="quotation"
            multiline={true}
            rows={5}
          />
        </Stack>

        {/* Quotation Page */}
        <Stack gap={2} direction="row" justifyContent={'space-between'}>
          <Stack sx={{ width: '100%' }}>
            <Typography>인용구 페이지</Typography>
            <RHFTextField label="" name="quotationPage" />
          </Stack>
          <Stack sx={{ width: '100%' }}>
            <Typography>전체 페이지 수</Typography>
            <RHFTextField label="" name="totalPage" />
          </Stack>
        </Stack>
      </Stack>

      <Stack>
        <RHFRadio radioTitle="리뷰 공개 설정" name="isPublic" radioGroupList={IS_PUBLIC_STATUS} />
      </Stack>
    </Stack>
  );
}
