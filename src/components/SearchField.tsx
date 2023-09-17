import clsx from "clsx";
import { BiSearch } from "react-icons/bi";
import { MdClear } from "react-icons/md";
import { Input, type InputProps } from "@/components/ui/Input";

export interface SearchFieldProps {
  inputProps?: InputProps;
  onClear?: () => void;
}

function ClearIcon({
  hidden,
  onClear,
}: {
  hidden: boolean;
  onClear?: () => void;
}) {
  return (
    <div className={clsx("cursor-pointer", { hidden })} onClick={onClear}>
      <MdClear />
    </div>
  );
}

export default function SearchField(props: SearchFieldProps) {
  return (
    <div className="relative">
      <Input
        placeholder="Пошук за іменем або нікнеймом"
        autoComplete="off"
        {...props.inputProps}
        className="pr-10"
        variant="rounded"
        prefixNode={<BiSearch />}
        suffixNode={
          <ClearIcon
            onClear={props.onClear}
            hidden={props.inputProps?.value === ""}
          />
        }
      />
    </div>
  );
}
