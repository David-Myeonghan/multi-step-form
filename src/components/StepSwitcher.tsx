import { ReactNode } from 'react';

interface StepSwitcherProps {
  value: number;
  cases: Record<number, ReactNode>;
  fallback: ReactNode;
}
export default function StepSwitcher({ value, cases, fallback = null }: StepSwitcherProps) {
  return <>{cases[value] ?? fallback}</>;
}
