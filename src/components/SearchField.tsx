import clsx from "clsx";
import { BiSearch } from "react-icons/bi";
import { MdClear } from "react-icons/md";
import { Input, type InputProps } from "../ui/Input";

export interface SearchFieldProps {
  inputProps?: InputProps;
  onClear?: () => void;
}

export default function SearchField(props: SearchFieldProps) {
  return (
    <div className="relative">
      <Input
        placeholder="Пошук за іменем або нікнеймом"
        autoComplete="off"
        prefixNode={<BiSearch />}
        {...props.inputProps}
        className="pr-10"
        variant="rounded"
      />
      <div
        className={clsx(
          "absolute inset-y-0 right-0 flex cursor-pointer items-center pr-2 ",
          { hidden: props.inputProps?.value === "" }
        )}
        onClick={() => props.onClear?.()}
      >
        <MdClear className="h-10 w-10 p-2" />
      </div>
    </div>
  );
}
