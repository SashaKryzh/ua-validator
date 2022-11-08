import type { AppProps } from "next/app";

import { trpc } from "../utils/trpc";

import type { NextPage } from "next";
import type { ReactElement, ReactNode } from "react";
import "../styles/globals.css";
import { useRouter } from "next/router";
import { useScrollRestoration } from "@/utils/hooks/useScrollRestoration";

// eslint-disable-next-line @typescript-eslint/ban-types
export type NextPageWithLayout<P = {}, IP = P> = NextPage<P, IP> & {
  getLayout?: (page: ReactElement) => ReactNode;
};

type AppPropsWithLayout = AppProps & {
  Component: NextPageWithLayout;
};

const MyApp = ({ Component, pageProps }: AppPropsWithLayout) => {
  // TODO: make it work (see useScrollRestoration)
  const router = useRouter();
  useScrollRestoration(router);

  const getLayout = Component.getLayout ?? ((page) => page);

  return (
    <div className="font-eUkraine">
      {getLayout(<Component {...pageProps} />)}
    </div>
  );
};

export default trpc.withTRPC(MyApp);
