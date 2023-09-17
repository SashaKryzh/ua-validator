import clsx from 'clsx';

export interface PhotoProps {
  url?: string;
  className?: string;
  onClick?: () => void;
}

export default function Photo(props: PhotoProps) {
  return (
    <div
      className={clsx(
        'flex aspect-square items-center justify-center border-2 border-dashed p-5 text-h4 text-gray-400',
        props.className,
      )}
      onClick={props.onClick}
    >
      Фото
    </div>
  );
}
