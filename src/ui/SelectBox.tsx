import clsx from 'clsx';

export interface SelectBoxProps<T>
  extends React.SelectHTMLAttributes<HTMLDivElement> {
  label: string;
  value1?: T;
  groupValue?: T;
  selected?: boolean;
  handleClick?: (value: T | string) => void;
}

export default function SelectBox<T>(props: SelectBoxProps<T>) {
  const selected = props.selected || props.value1 === props.groupValue;

  return (
    <div
      {...props}
      className={clsx(
        'flex items-center justify-center border-2 border-black p-2 text-h7',
        selected ? 'border-opacity-100' : 'border-opacity-5',
        props.className,
      )}
      onClick={() => {
        props.handleClick?.(
          typeof props.value1 !== 'undefined' ? props.value1 : props.label,
        );
      }}
    >
      {props.label}
    </div>
  );
}
