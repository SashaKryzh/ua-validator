import Layout from "@/components/Layout";
import SearchField from "@/components/SearchField";
import { useFormik } from "formik";
import { useRouter } from "next/router";
import type { NextPageWithLayout } from "./_app";

const Home: NextPageWithLayout = () => {
  const router = useRouter();
  const formik = useFormik({
    initialValues: { query: "" },
    onSubmit: (values) => {
      router.push(`/search?q=${values.query}`);
    },
  });

  return (
    <div className="flex flex-col items-center">
      <div className="h-24" />
      <h1 className="text-3xl font-bold">Ukrainian validator</h1>
      <div className="h-6" />
      <div className="w-full max-w-xl px-6">
        <form onSubmit={formik.handleSubmit}>
          <SearchField
            inputProps={{
              name: "query",
              onChange: formik.handleChange,
              value: formik.values.query,
              autoFocus: true,
            }}
            onClear={() => formik.setFieldValue("query", "")}
          />
        </form>
      </div>
      <div className="h-8" />
      <p className="px-4 text-center text-xl">
        Перевір ставлення людини до війни в Україні 🇺🇦
      </p>
    </div>
  );
};

Home.getLayout = (page) => {
  return <Layout>{page}</Layout>;
};

export default Home;
