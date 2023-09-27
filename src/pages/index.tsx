import { Head, Layout, SearchField, TargetComponent } from '@/components';
import { LoadingSpinner } from '@/components/LoadingSpinner';
import { ssgInit } from '@/server/trpc/ssg-init';
import { trpc } from '@/utils/trpc';
import { useFormik } from 'formik';
import debounce from 'lodash.debounce';
import type { GetStaticProps, InferGetStaticPropsType } from 'next';
import { useRouter } from 'next/router';
import { useCallback, useEffect, useMemo, useRef, useState } from 'react';
import InfiniteScroll from 'react-infinite-scroll-component';
import type { NextPageWithLayout } from './_app';
import { HiOutlineFaceFrown } from 'react-icons/hi2';
import { Button } from '@/components/ui/Button';

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
  const isSearching = router.query.search !== undefined;
  const searchInUrl =
    typeof router.query.search === 'string' ? router.query.search : '';

  const [query, setQuery] = useState(searchInUrl);

  const searchFieldRef = useRef<HTMLInputElement>(null);

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

  const updateSearchInUrl = (query: string) => {
    if (query === '') {
      router.push('/');
    } else {
      router.push(`?search=${query}`);
    }
  };

  const handleSearch = useCallback((query: string) => {
    setQuery(query);
  }, []);

  const debounceSearch = useMemo(
    () => debounce(handleSearch, 500),
    [handleSearch],
  );

  const formik = useFormik({
    initialValues: { query: query },
    onSubmit: (values) => {
      searchFieldRef.current?.blur();
      handleSearch(values.query);
      updateSearchInUrl(values.query);
    },
  });

  const setFormikQueryValue = formik.setFieldValue;

  // Set formik value from url
  useEffect(() => {
    setFormikQueryValue('query', searchInUrl);
  }, [searchInUrl, setFormikQueryValue]);

  // Debounce search on formik value change
  useEffect(() => {
    debounceSearch(formik.values.query);
  }, [formik.values.query, debounceSearch]);

  const handleClear = () => {
    updateSearchInUrl('');
    formik.setFieldValue('query', '');
    handleSearch('');
    searchFieldRef.current?.blur();
  };

  return (
    <>
      <Head />
      <div className='flex flex-col items-center'>
        {!isSearching && <Heading />}
      </div>
      <div className='flex flex-col items-center'>
        <div className='w-full max-w-screen-md px-1.5'>
          <form onSubmit={formik.handleSubmit}>
            <SearchField
              ref={searchFieldRef}
              name='query'
              onChange={formik.handleChange}
              value={formik.values.query}
              onClear={handleClear}
              onBlur={() => {
                updateSearchInUrl(formik.values.query);
              }}
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
            {allLoadedTargets?.map((target, index) => (
              <TargetComponent
                key={target.id}
                target={target}
                imagePriority={index < 4}
              />
            ))}
            {allLoadedTargets?.length === 0 && (
              <EmptyResult onClear={handleClear} />
            )}
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

interface EmptyResultProps {
  onClear: () => void;
}

const EmptyResult: React.FC<EmptyResultProps> = (props) => {
  return (
    <div className='col-span-full flex flex-col items-center justify-center'>
      <HiOutlineFaceFrown className='h-16 w-16' />
      <div className='h-4' />
      <p className='text-center text-h2 font-light'>Нічого не знайдено</p>
      <div className='h-2' />
      <p className='text-center text-sm font-light'>
        Спробуйте, будь ласка, ще раз. Або напишіть нам на{' '}
        <a
          className='font-mono text-blue-600'
          href='mailto:sad.xprod@gmail.com'
        >
          sad.xprod@gmail.com
        </a>{' '}
        і ми виправимо помилку.
      </p>
      <div className='h-4' />
      <Button
        variant={'secondary'}
        className='rounded-full'
        onClick={props.onClear}
      >
        Прибрати пошук
      </Button>
    </div>
  );
};
