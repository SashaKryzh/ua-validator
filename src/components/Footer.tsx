import Link from 'next/link';

export default function Footer() {
  return (
    <footer className=' bg-black'>
      <div className='mx-auto flex  max-w-screen-md  flex-col px-2 py-6 sm:flex-row sm:items-center sm:justify-between'>
        <span className='text-center text-sm text-gray-300 sm:text-left'>
          © {new Date().getFullYear() + ' - '}
          <Link href='/' className='hover:underline'>
            UA Validator 🇺🇦
          </Link>
        </span>
        <div className='t flex flex-wrap items-center justify-center pt-3 text-sm text-gray-300 sm:pt-0'>
          <span className='mr-4'>Created by</span>
          <div className='flex gap-2'>
            <Link
              href='https://github.com/SashaKryzh'
              target='_blank'
              className='font-mono hover:underline'
            >
              @sashakryzh
            </Link>
            &
            <Link
              href='https://github.com/denitdao'
              target='_blank'
              className='font-mono hover:underline'
            >
              @denitdao
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
