import { Head, Layout } from '@/components';
import { GradientContainer } from '@/ui/GradientContainer';
import Spacer from '@/ui/Spacer';
import type { NextPageWithLayout } from './_app';

const AddTarget: NextPageWithLayout = () => {
  return (
    <>
      <Head title={'Додати людину'} />
      <Spacer className='h-12' />
      <div className='mx-auto max-w-screen-sm px-2 '>
        <GradientContainer>
          <div className=' px-4 py-5 text-sm font-light'>
            <span className='font-normal'>
              На жаль, ця частина ще не готова
            </span>
            , але Ви можете відправити нам інформацію на пошту{' '}
            <a
              className='font-mono text-blue-600'
              href='mailto:sad.xprod@gmail.com'
            >
              sad.xprod@gmail.com
            </a>{' '}
            🙂
          </div>
        </GradientContainer>
      </div>
    </>
  );
};

AddTarget.getLayout = (page) => {
  return <Layout>{page}</Layout>;
};

export default AddTarget;
