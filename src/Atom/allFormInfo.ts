import { atomWithStorage, createJSONStorage } from 'jotai/utils';

const storage = createJSONStorage(() => sessionStorage);
export const allFormInfoAtom = atomWithStorage('allFormInfo', {}, storage);
