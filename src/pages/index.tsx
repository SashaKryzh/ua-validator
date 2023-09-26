import { Head, Layout, SearchField, TargetComponent } from '@/components';
import { LoadingSpinner } from '@/components/LoadingSpinner';
import { ssgInit } from '@/server/trpc/ssg-init';
import { trpc } from '@/utils/trpc';
import { useFormik } from 'formik';
import debounce from 'lodash.debounce';
import type { GetStaticProps, InferGetStaticPropsType } from 'next';
import { useRouter } from 'next/router';
import { useCallback, useEffect, useMemo, useState } from 'react';
import InfiniteScroll from 'react-infinite-scroll-component';
import type { NextPageWithLayout } from './_app';

// TODO: Save scroll !!!

// Prefetching example:
// https://trpc.io/docs/client/nextjs/ssg
// https://github.com/trpc/examples-next-prisma-todomvc/blob/main/src/pages/%5Bfilter%5D.tsx

type HomeProps = InferGetStaticPropsType<typeof getStaticProps>;

export const getStaticProps: GetStaticProps = async () => {
  const ssg = await ssgInit();

  await ssg.target.findByNameOrResource.prefetchInfinite({
    query: '',
  });

  return {
    props: {
      trpcState: ssg.dehydrate(),
    },
    revalidate: 60 * 60 * 24 * 7, // 1 week
  };
};

const Home: NextPageWithLayout<HomeProps> = () => {
  const router = useRouter();
  const query =
    typeof router.query.search === 'string' ? router.query.search : '';

  const result = trpc.target.findByNameOrResource.useInfiniteQuery(
    {
      query: query,
    },
    {
      getNextPageParam: (lastPage) => lastPage.cursor,
      refetchOnMount: false,
      refetchOnWindowFocus: false,
      keepPreviousData: true,
    },
  );
  const allLoadedTargets = result.data?.pages.flatMap((page) => page.targets);

  const handleSearch = useCallback(
    (nextQuery: string) => {
      console.log('Replace url');

      if (nextQuery === query) {
        return;
      } else if (nextQuery !== '') {
        router.replace(`?search=${nextQuery}`);
      } else {
        router.replace('/');
      }
    },
    [query, router],
  );

  const formik = useFormik({
    initialValues: { query: query },
    onSubmit: (values) => {
      handleSearch(values.query);
    },
  });

  const setQueryValue = formik.setFieldValue;

  useEffect(() => {
    setQueryValue('query', query);
  }, [query, setQueryValue]);

  const debounceSearch = useMemo(
    () => debounce(handleSearch, 500),
    [handleSearch],
  );

  useEffect(() => {
    console.log('Call debounce');
    debounceSearch(formik.values.query);
  }, [formik.values.query, debounceSearch]);

  return (
    <>
      <Head />
      <div className='flex flex-col items-center'>
        {query === '' && <Heading />}
      </div>
      <div className='flex flex-col items-center'>
        <div className='w-full max-w-screen-md px-1.5'>
          <form onSubmit={formik.handleSubmit}>
            <SearchField
              name='query'
              onChange={formik.handleChange}
              value={formik.values.query}
              onClear={() => formik.setFieldValue('query', '')}
            />
          </form>
        </div>
        <div className='h-8' />
        <div className='w-full max-w-screen-md px-2'>
          <InfiniteScroll
            dataLength={allLoadedTargets?.length ?? 1}
            loader={<Loading />}
            next={result.fetchNextPage}
            hasMore={result.hasNextPage ?? true}
            className='grid grid-cols-2 gap-4 md:grid-cols-3'
            scrollThreshold={0.69}
          >
            {allLoadedTargets?.map((target) => (
              <TargetComponent key={target.id} target={target} />
            ))}
            {allLoadedTargets?.length === 0 && <Empty />}
          </InfiniteScroll>
        </div>
      </div>
      <div className='h-8' />
    </>
  );
};

Home.getLayout = (page) => {
  return <Layout>{page}</Layout>;
};

export default Home;

const Heading = () => {
  return (
    <>
      <div className='h-14' />
      <h1 className='text-h1 '>🇺🇦 Ukrainian validator</h1>
      <div className='h-4' />
      <p className='px-4 text-center text-h3 font-light'>
        Перевір ставлення людини до війни в Україні
      </p>
      <div className='h-14' />
    </>
  );
};

const Loading = () => {
  return <LoadingSpinner className='col-span-full flex justify-center p-5' />;
};

const Empty = () => {
  return <>Empty</>;
};
