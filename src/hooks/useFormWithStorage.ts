import { useSetAtom, WritableAtom, useStore } from 'jotai';
import { useForm, UseFormProps, FieldValues } from 'react-hook-form';
import { useEffect } from 'react';

// 하나의 관심사: 폼과 Storage 동기화 매커니즘, '무엇을 동기화할지'는 외부에서 결정
export default function useFormWithStorage<T extends FieldValues>(
  storageAtom: WritableAtom<Partial<T>, [Partial<T>], void>,
  options?: UseFormProps<T>,
) {
  const store = useStore();
  const setStoredValues = useSetAtom(storageAtom); // 쓰기 전용 - 리렌더링 x

  // 초기값 없이 폼 생성
  const methods = useForm<T>({
    ...options,
    defaultValues: options?.defaultValues as any,
  });

  // sessionStorage에서 로드된 값으로 폼 리셋 - 마운트 시 한 번
  // { getOnInit: true } 옵션으로 atom이 즉시 초기화되어 store.get()으로 값 획득 가능
  useEffect(() => {
    const storedValues = store.get(storageAtom);

    if (Object.keys(storedValues).length > 0) {
      methods.reset({
        ...options?.defaultValues,
        ...storedValues,
      } as any);
    }
  }, []);

  // 폼 값 변경 감지 → atom에 자동 저장 (리렌더링 없이)
  // subscribe 사용으로 리렌더링 없이 값 감지
  useEffect(() => {
    const unsubscribe = methods.subscribe({
      formState: { values: true },
      callback: ({ values }) => {
        setStoredValues(values as Partial<T>);
      },
    });
    return unsubscribe;
  }, [methods.subscribe, setStoredValues]);

  // 제출 완료시 storage 비우는 함수
  const clearStorage = () => setStoredValues({});

  return { methods, clearStorage };
}
