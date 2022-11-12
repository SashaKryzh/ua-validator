import clsx from "clsx";

export interface SelectBoxProps
  extends React.SelectHTMLAttributes<HTMLDivElement> {
  label: string;
  selected: boolean;
  onClick?: () => void;
}

export default function SelectBox(props: SelectBoxProps) {
  return (
    <div
      {...props}
      className={clsx(
        "flex items-center justify-center border-2 border-black p-2 text-h7",
        props.selected ? "border-opacity-100" : "border-opacity-5",
        props.className
      )}
      onClick={props.onClick}
    >
      {props.label}
    </div>
  );
}
