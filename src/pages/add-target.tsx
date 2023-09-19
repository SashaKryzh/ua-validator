import { Head, Layout } from '@/components';
import InputField from '@/components/InputField';
import { Button } from '@/components/ui/Button';
import { GradientContainer } from '@/ui/GradientContainer';
import Spacer from '@/ui/Spacer';
import { trpc } from '@/utils/trpc';
import { type Shape } from '@/utils/yupShape';
import { Form, Formik } from 'formik';
import { MdNotificationsNone } from 'react-icons/md';
import * as Yup from 'yup';
import type { NextPageWithLayout } from './_app';

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

interface EmailForm {
  email: string;
}

const validationSchema = Yup.object<Shape<EmailForm>>({
  email: Yup.string().email('Невалідний email').required('Уведіть Ваш email'),
});

function NotifyUser() {
  const mutation = trpc.waitingList.add.useMutation();

  function handleSubmit(values: EmailForm) {
    mutation.mutate(values);
  }

  return (
    <Formik
      initialValues={{ email: '' }}
      onSubmit={handleSubmit}
      validationSchema={validationSchema}
    >
      {({}) => (
        <Form>
          <GradientContainer className='px-10'>
            <div className='h-6' />
            <div className='flex items-center justify-center'>
              <MdNotificationsNone size={50} />
            </div>
            <div className='h-4' />
            <div className='text-center font-light'>
              Ми повідомимо, коли цей функціонал буде додано
            </div>
            <div className='h-4' />
            <InputField name='email' type='email' placeholderLabel='Email' />
            <div className='h-6' />
            <Button type='submit' className='w-full rounded-full py-6'>
              Повідомте мене
            </Button>
            <div className='h-8' />
          </GradientContainer>
        </Form>
      )}
    </Formik>
  );
}
