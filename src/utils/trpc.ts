import { createReactQueryHooks } from '@trpc/react';

import { AppRouter } from '../../api/trpc/_router';

export const trpc = createReactQueryHooks<AppRouter>();
