import { Layout, SearchField, TargetComponent } from "@/components";
import { trpc } from "@/utils/trpc";
import { useFormik } from "formik";
import { useRouter } from "next/router";
import type { NextPageWithLayout } from "./_app";

const Search: NextPageWithLayout = () => {
  const router = useRouter();

  const query = typeof router.query.q === "string" ? router.query.q : "";

  const formik = useFormik({
    initialValues: { query: (router.query.q as string) || "" },
    onSubmit: (values) => {
      router.replace(`/search?q=${values.query}`);
    },
  });

  const targets = trpc.target.findByNameOrResource.useQuery({ query: query });

  return (
    <div className="flex flex-col items-center px-2">
      <div className="w-full max-w-screen-md">
        <div className="">
          <form onSubmit={formik.handleSubmit}>
            <SearchField
              inputProps={{
                id: "query",
                onChange: formik.handleChange,
                value: formik.values.query,
              }}
              onClear={() => { formik.setFieldValue("query", ""); }}
            />
          </form>
        </div>
        <div className="h-2" />
        <div className="grid grid-cols-2 gap-4 md:grid-cols-3">
          {targets.isLoading && <div>Loading...</div>}
          {targets.data?.map((target) => (
            <TargetComponent key={target.id} target={target} />
          ))}
        </div>
      </div>
    </div>
  );
};

Search.getLayout = (page) => {
  return <Layout>{page}</Layout>;
};

export default Search;
