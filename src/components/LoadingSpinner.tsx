import { TailSpin } from 'react-loader-spinner';

export interface LoadingSpinnerProps
  extends React.HTMLAttributes<HTMLDivElement> {
  height?: number;
  width?: number;
  color?: string;
}

export function LoadingSpinner({
  height,
  width,
  color,
  ...props
}: LoadingSpinnerProps) {
  return (
    <div {...props}>
      <TailSpin
        height={height ?? 50}
        width={width ?? 50}
        color={color ?? '#000'}
        ariaLabel='Loading...'
        visible={true}
      />
    </div>
  );
}
