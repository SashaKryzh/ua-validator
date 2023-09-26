import clsx from 'clsx';
import { BiSearch } from 'react-icons/bi';
import { MdClear } from 'react-icons/md';
import { Input, type InputProps } from '@/components/ui/Input';
import { forwardRef } from 'react';

export interface SearchFieldProps extends InputProps {
  onClear?: () => void;
}
const SearchField = forwardRef<HTMLInputElement, SearchFieldProps>(
  ({ onClear, ...props }, ref) => {
    return (
      <div className='relative'>
        <Input
          ref={ref}
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
  },
);

SearchField.displayName = 'SearchField';

export default SearchField;

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
