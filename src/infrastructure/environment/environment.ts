import { z } from 'zod';

export const environmentSchema = z.object({
  DATABASE_URL: z.string().url(),
  PORT: z.coerce.number().optional().default(3333),
  JWT_SECRET: z.string(),
});

export type Environment = z.infer<typeof environmentSchema>;
