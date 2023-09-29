import { Layout } from '@/components';
import { type NextPageWithLayout } from './_app';
import { Button } from '@/components/ui/Button';
import Link from 'next/link';

const NotFound: NextPageWithLayout = () => {
  return (
    <div className='flex flex-col items-center justify-center'>
      <div className='h-32' />
      <h1 className='text-4xl'>404</h1>
      <div className='h-4' />
      <p className='font-light'>Упс... На жаль, цю сторінку не знайдено</p>
      <div className='h-4' />
      <Button className='rounded-full' asChild>
        <Link href='/'>На головну</Link>
      </Button>
    </div>
  );
};

export default NotFound;

NotFound.getLayout = (page) => {
  return <Layout>{page}</Layout>;
};
