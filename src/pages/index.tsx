import { Head, Layout, SearchField, TargetComponent } from "@/components";
import { trpc } from "@/utils/trpc";
import { useFormik } from "formik";
import { useRouter } from "next/router";
import InfiniteScroll from "react-infinite-scroll-component";
import type { NextPageWithLayout } from "./_app";

// TODO: Save scroll !!!

const Home: NextPageWithLayout = () => {
  const router = useRouter();

  const query =
    typeof router.query.search === "string" ? router.query.search : "";

  const formik = useFormik({
    initialValues: { query: "" },
    onSubmit: (values) => {
      router.replace(`?search=${values.query}`);
    },
  });

  const result = trpc.target.findByNameOrResource.useInfiniteQuery(
    {
      query: query,
    },
    {
      getNextPageParam: (lastPage) => lastPage.cursor,
    }
  );

  const allLoadedTargets = result.data?.pages.flatMap((page) => page.targets);

  return (
    <>
      <div className="flex flex-col items-center">
        <Head />
        {query === "" && <Heading />}
      </div>
      <div className="flex flex-col items-center">
        <div className="w-full max-w-screen-md px-1.5">
          <form onSubmit={formik.handleSubmit}>
            <SearchField
              inputProps={{
                name: "query",
                onChange: formik.handleChange,
                value: formik.values.query,
              }}
              onClear={() => formik.setFieldValue("query", "")}
            />
          </form>
        </div>
        <div className="h-8" />
        <div className="w-full max-w-screen-md px-2">
          <InfiniteScroll
            dataLength={allLoadedTargets?.length ?? 1}
            loader={<Loading />}
            next={result.fetchNextPage}
            hasMore={result.hasNextPage ?? true}
            className="grid grid-cols-2 gap-4 md:grid-cols-3"
          >
            {allLoadedTargets?.map((target) => (
              <TargetComponent key={target.id} target={target} />
            ))}
            {allLoadedTargets?.length === 0 && <Empty />}
          </InfiniteScroll>
        </div>
      </div>
      <div className="h-8" />
    </>
  );
};

const Heading = () => {
  return (
    <>
      <div className="h-14" />
      <h1 className="text-h1 ">🇺🇦 Ukrainian validator</h1>
      <div className="h-4" />
      <p className="px-4 text-center text-h3 font-light">
        Перевір ставлення людини до війни в Україні
      </p>
      <div className="h-14" />
    </>
  );
};

const Loading = () => {
  return (
    <div className="col-span-full flex justify-center p-4">Loading...</div>
  );
};

const Empty = () => {
  return <>Empty</>;
};

Home.getLayout = (page) => {
  return <Layout>{page}</Layout>;
};

export default Home;
