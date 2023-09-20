import { cn } from '@/utils/utils';
import { type HTMLAttributes } from 'react';

enum Gradient {
  default,
}

export type GradientProps = HTMLAttributes<HTMLDivElement> & {
  gradient?: Gradient;
};

export function GradientContainer(props: GradientProps) {
  return (
    <div className='bg-gradient-to-br from-[#F1ACAC] via-[#BF98C6] to-[#2833D0] p-[0.20rem]'>
      <div className={cn('h-full w-full bg-white', props.className)}>
        {props.children}
      </div>
    </div>
  );
}
