import { z } from 'zod';
export const quoteSharingSchema = z
  .object({
    quotation: z.string().optional(),
    quotationPage: z.coerce.number().min(1, '1 이상의 페이지 번호를 입력해주세요'),
    totalPage: z.coerce.number().min(1, '1 이상의 페이지 번호를 입력해주세요'),
    isPublic: z.boolean(),
  })
  .refine(
    data => {
      if (data.quotation && data.quotation.trim() !== '') {
        return data.quotationPage <= data.totalPage;
      }
      return true;
    },
    {
      message: '인용구 페이지 번호는 전체 페이지 수보다 적거나 같아야 합니다.',
      path: ['quotationPage'],
    },
  );
