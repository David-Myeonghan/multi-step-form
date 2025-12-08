import { allFormInfoAtom } from '@/Atom/allFormInfo';
import { MultiStepFormValues, schemasByStep } from '@/schemas';
import { zodResolver } from '@hookform/resolvers/zod';
import { useAtom } from 'jotai';
import { useRouter } from 'next/router';
import { useForm } from 'react-hook-form';

export default function useFormWithStorage() {
  const router = useRouter();
  const [_allFormInfoStorage, setAllFormInfoStorage] = useAtom(allFormInfoAtom);

  const resolver = zodResolver(schemasByStep[stepNumber as keyof typeof schemasByStep] as any);

  const methods = useForm<MultiStepFormValues>({
    mode: 'onSubmit',
    shouldUnregister: false,
    defaultValues: {
      title: '',
      author: '',
      readingStatus: 'WISHLIST',
      publishedAt: null,
      readingStartedAt: null,
      readingFinishedAt: null,
      rating: 0,
      review: '',
      quotation: '',
      quotationPage: 1,
      totalPage: 1,
      isPublic: false,
    },
    resolver,
  });

  const clearStorage = () => {
    setAllFormInfoStorage({});
  };

  return { clearStorage };
}
