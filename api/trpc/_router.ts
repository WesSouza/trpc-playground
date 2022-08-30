import * as trpc from '@trpc/server';
import { z } from 'zod';

import { getColors, vote } from './_db';

export const appRouter = trpc
  .router()
  .query('getColors', {
    resolve() {
      return getColors();
    },
  })
  .mutation('vote', {
    input: z.string(),
    resolve({ input }) {
      return vote(input);
    },
  });

export type AppRouter = typeof appRouter;
