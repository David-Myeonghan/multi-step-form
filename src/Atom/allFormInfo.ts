import { atomWithStorage, createJSONStorage } from 'jotai/utils';
import { MultiStepFormValues } from '@/schemas';

const storage = createJSONStorage<Partial<MultiStepFormValues>>(() => sessionStorage);
export const allFormInfoAtom = atomWithStorage<Partial<MultiStepFormValues>>(
  'allFormInfo',
  {},
  storage,
);
