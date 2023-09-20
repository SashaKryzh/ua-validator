import { createServerSideHelpers } from '@trpc/react-query/server';
import { createContextInner } from './context';
import { appRouter } from './router/_app';
import superjson from 'superjson';

export async function ssgInit() {
  const ssg = createServerSideHelpers({
    router: appRouter,
    ctx: await createContextInner({}),
    transformer: superjson,
  });

  return ssg;
}
