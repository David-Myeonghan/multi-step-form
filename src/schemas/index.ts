import { basicInfoSchema } from '@/schemas/BasicInfoSchema';
import { recommendationSchema } from '@/schemas/recommendationSchema';

export const schemasByStep = {
  1: basicInfoSchema,
  2: recommendationSchema,
  3: basicInfoSchema, //
  4: basicInfoSchema, //
};
