import { Listbox, Transition } from '@headlessui/react';
import clsx from 'clsx';
import { useState } from 'react';
import { Input } from '../components/ui/Input';

export interface DropdownProps {
  placeholderLabel: string;
  selected?: string;
  options: string[];
  onChange?: (value: string) => void;
}

export default function Dropdown(props: DropdownProps) {
  const [selected, setSelected] = useState(props.selected);

  return (
    <Listbox
      as='div'
      value={selected}
      onChange={(value) => {
        setSelected(value);
        props.onChange?.(value);
      }}
    >
      <div className='relative'>
        <Listbox.Button as='div'>
          <Input
            disabled={true}
            placeholderLabel={props.placeholderLabel}
            value={selected}
          />
        </Listbox.Button>
        <Transition
          leave='transition ease-in-out duration-100'
          leaveFrom='opacity-100'
          leaveTo='opacity-0'
          className='absolute z-10 w-full bg-white p-2 shadow-md shadow-gray-400'
        >
          <Listbox.Options>
            {props.options.map((option) => (
              <Listbox.Option key={option} value={option}>
                {(props) => (
                  <div
                    className={clsx(
                      'px-2 py-2 text-h7',
                      props.selected && 'bg-black bg-opacity-5',
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
