import { Head, Layout } from '@/components';
import { GradientContainer } from '@/ui/GradientContainer';
import Spacer from '@/ui/Spacer';
import type { NextPageWithLayout } from './_app';
import { Input } from '@/components/ui/Input';
import { Button } from '@/components/ui/Button';

const AddTarget: NextPageWithLayout = () => {
  return (
    <main className='mx-auto max-w-screen-sm'>
      <Head title={'Додати людину'} />
      <Spacer className='h-12' />
      <div className='font-light'>
        <span className='font-normal'>На жаль, ця частина ще не готова</span>,
        але Ви можете відправити нам інформацію на пошту{' '}
        <a
          className='font-mono text-blue-600'
          href='mailto:sad.xprod@gmail.com'
        >
          sad.xprod@gmail.com
        </a>{' '}
        🙂
        <br />
        <br />
        Або...
        <br />
        <br />
      </div>
      <div className='h-2' />
      <NotifyUser />
    </main>
  );
};

AddTarget.getLayout = (page) => {
  return <Layout>{page}</Layout>;
};

export default AddTarget;

function NotifyUser() {
  return (
    <GradientContainer className='px-10 py-14'>
      <div className='text-center'>
        Ми вас повідомимо, коли цей функціонал буде додано
      </div>
      <div className='h-4' />
      <Input name='email' placeholderLabel='Email' placeholder=' ' />
      <div className='h-6' />
      <Button className='w-full rounded-full py-6'>Повідомте мене</Button>
    </GradientContainer>
  );
}
