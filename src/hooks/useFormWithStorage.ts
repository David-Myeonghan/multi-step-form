import { useSetAtom, useStore, WritableAtom } from 'jotai';
import { useForm, UseFormProps, FieldValues } from 'react-hook-form';
import { useEffect } from 'react';

// 하나의 관심사: 폼과 Storage 동기화 매커니즘, '무엇을 동기화할지'는 외부에서 결정
export default function useFormWithStorage<T extends FieldValues>(
  storageAtom: WritableAtom<Partial<T>, [Partial<T>], void>,
  options?: UseFormProps<T>,
) {
  const store = useStore();
  const storedValues = store.get(storageAtom); // 구독 없이 한 번만 읽기
  const setStoredValues = useSetAtom(storageAtom); // 쓰기 전용 (리렌더링 안 함)

  // atom 값과 defaultValues 병합
  const methods = useForm<T>({
    ...options,
    defaultValues: {
      ...options?.defaultValues,
      ...storedValues,
    } as any,
  });

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
