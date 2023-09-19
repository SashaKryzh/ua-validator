import { z } from 'zod';

export const addToWaitListSchema = z.object({ email: z.string().email() });

export type AddToWaitListSchema = z.infer<typeof addToWaitListSchema>;
