import { Listbox, Transition } from "@headlessui/react";
import clsx from "clsx";
import { useState } from "react";
import { Input } from "./Input";

export interface DropdownProps extends React.HTMLAttributes<HTMLDivElement> {
  placeholderLabel: string;
  selected?: string;
  options: string[];
}

export default function Dropdown(props: DropdownProps) {
  const [selected, setSelected] = useState(props.selected);

  return (
    <Listbox as="div" value={selected} onChange={setSelected}>
      <div className="relative">
        <Listbox.Button as="div">
          <Input
            disabled2={true}
            placeholderLabel={props.placeholderLabel}
            value={selected}
          />
        </Listbox.Button>
        <Transition
          leave="transition ease-in-out duration-100"
          leaveFrom="opacity-100"
          leaveTo="opacity-0"
          className="absolute z-10 w-full bg-white p-2 shadow-md shadow-gray-400"
        >
          <Listbox.Options>
            {props.options.map((option) => (
              <Listbox.Option key={option} value={option}>
                {(props) => (
                  <div
                    className={clsx(
                      "py-2 px-2 text-h7",
                      props.selected && "bg-black bg-opacity-5"
                    )}
                  >
                    {option}
                  </div>
                )}
              </Listbox.Option>
            ))}
          </Listbox.Options>
        </Transition>
      </div>
    </Listbox>
  );
}
