import { Layout, SearchField, TargetComponent } from "@/components";
import { findTargetsHandler } from "@/server/controller/target.controller";
import type { Target } from "@prisma/client";
import { useFormik } from "formik";
import type { GetServerSideProps } from "next";
import { useRouter } from "next/router";
import type { NextPageWithLayout } from "./_app";

interface SearchProps {
  targets: Target[];
}

const Search: NextPageWithLayout<SearchProps> = (props) => {
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
          {props.targets?.map((target) => (
            // TODO update Target with TargetSelect type
            <TargetComponent key={target.slug} target={target.slug} />
          ))}
        </div>
      </div>
    </div>
  );
};

Search.getLayout = (page) => {
  return <Layout>{page}</Layout>;
};

export const getServerSideProps: GetServerSideProps<SearchProps> = async (
  context
) => {
  const query = context.query.q as string;

  const targets = await findTargetsHandler({ query });

  return {
    props: {
      targets: targets,
    },
  };
};

export default Search;
