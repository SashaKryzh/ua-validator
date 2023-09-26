import clsx from 'clsx';
import { BiSearch } from 'react-icons/bi';
import { MdClear } from 'react-icons/md';
import { Input, type InputProps } from '@/components/ui/Input';

export interface SearchFieldProps extends InputProps {
  onClear?: () => void;
}

export default function SearchField({ onClear, ...props }: SearchFieldProps) {
  return (
    <div className='relative'>
      <Input
        placeholder='Пошук за іменем, нікнеймом або URL'
        autoComplete='off'
        className='pr-10'
        variant='rounded'
        prefixNode={<BiSearch />}
        suffixNode={
          <ClearIcon onClear={onClear} hidden={props?.value === ''} />
        }
        {...props}
      />
    </div>
  );
}

function ClearIcon({
  hidden,
  onClear,
}: {
  hidden: boolean;
  onClear?: () => void;
}) {
  return (
    <div className={clsx('cursor-pointer', { hidden })} onClick={onClear}>
      <MdClear />
    </div>
  );
}
