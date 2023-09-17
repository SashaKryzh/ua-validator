import clsx from 'clsx';

export interface ChipProps {
  label: string;
  selected: boolean;
  onClick?: () => void;
}

export default function Chip(props: ChipProps) {
  return (
    <div
      className={clsx(
        'flex items-center justify-center rounded-full border-2 bg-black px-4 py-2 text-h5',
        props.selected
          ? 'border-black bg-opacity-0'
          : 'border-transparent bg-opacity-5',
      )}
      onClick={props.onClick}
    >
      {props.label}
    </div>
  );
}
