import { Head, Layout, SearchField, TargetComponent } from "@/components";
import { trpc } from "@/utils/trpc";
import { useFormik } from "formik";
import { useRouter } from "next/router";
import type { NextPageWithLayout } from "./_app";

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

  const result = trpc.target.findByNameOrResource.useQuery({
    query: query,
  });

  return (
    <>
      <div className="flex flex-col items-center">
        <Head />
        {query === "" && <Heading />}
      </div>
      <div className="flex flex-col items-center">
        <div className="w-full max-w-screen-md ">
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
        <div className="grid w-full max-w-screen-md grid-cols-2 gap-4 md:grid-cols-3">
          {result.isLoading && <div>Loading...</div>}
          {result.data?.targets.map((target) => (
            <TargetComponent key={target.id} target={target} />
          ))}
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
      <h1 className="text-h1">🇺🇦 Ukrainian validator</h1>
      <div className="h-4" />
      <p className="px-4 text-center text-h3">
        Перевір ставлення людини до війни в Україні
      </p>
      <div className="h-14" />
    </>
  );
};

Home.getLayout = (page) => {
  return <Layout>{page}</Layout>;
};

export default Home;
