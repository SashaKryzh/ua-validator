import Header from "./Header";
import Footer from "./Footer";
import Head from "next/head";

interface LayoutProps {
  title?: string;
  children: React.ReactNode;
}

export default function Layout({
  title = "Ukrainian validator",
  children,
}: LayoutProps) {
  return (
    <div className="flex min-h-screen flex-col">
      <Head>
        <title>{title}</title>
        <meta property="og:title" content={title} key="title" />
      </Head>
      <Header />
      <div className="grow">{children}</div>
      <Footer />
    </div>
  );
}
