import { router } from '../trpc';
import { jobRouter } from './job';
import { nationalityRouter } from './nationality';
import { targetRouter } from './target';
import { viewOnWarRouter } from './viewOnWar';

export const appRouter = router({
  target: targetRouter,
  viewOnWar: viewOnWarRouter,
  job: jobRouter,
  nationality: nationalityRouter,
});

// export type definition of API
export type AppRouter = typeof appRouter;
