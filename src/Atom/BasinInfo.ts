import { atomWithStorage, createJSONStorage } from 'jotai/utils';

const storage = createJSONStorage(() => sessionStorage);
export const basicInfoAtom = atomWithStorage('basicInfo', {}, storage);
