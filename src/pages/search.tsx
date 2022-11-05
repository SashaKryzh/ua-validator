import Layout from "@/components/Layout";
import SearchField from "@/components/SearchField";
import Target from "@/components/Target";
import { useScrollRestoration } from "@/utils/hooks/useScrollRestoration";
import { useFormik } from "formik";
import type { GetServerSideProps } from "next";
import { useRouter } from "next/router";
import type { NextPageWithLayout } from "./_app";

const Search: NextPageWithLayout<SearchProps> = ({ targets }) => {
  const router = useRouter();
  const formik = useFormik({
    initialValues: { query: router.query.q },
    onSubmit: (values) => {
      router.push(`/search?q=${values.query}`);
    },
  });

  return (
    <div className="flex flex-col items-center px-2">
      <div className="w-full max-w-screen-md">
        <div className="">
          <form onSubmit={formik.handleSubmit}>
            <SearchField
              inputProps={{
                onChange: formik.handleChange,
                value: formik.values.query,
              }}
            />
          </form>
        </div>
        <div className="h-2" />
        <div className="px-2">Filters</div>
        <div className="h-2" />
        <div className="grid grid-cols-2 gap-4 md:grid-cols-3">
          {targets.map((target) => (
            <Target key={target} target={target} />
          ))}
        </div>
      </div>
    </div>
  );
};

Search.getLayout = (page) => {
  return <Layout>{page}</Layout>;
};

type SearchProps = {
  targets: string[];
};

export const getServerSideProps: GetServerSideProps<SearchProps> = async (
  context
) => {
  const q = context.query.q;

  console.log(q);

  // TODO: fetch data from API
  const targets = ["Target1", "Target2", "Target3", "Target4", "Target5"];

  return {
    props: {
      targets,
    },
  };
};

export default Search;
