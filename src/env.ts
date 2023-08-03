import { createEnv } from '@t3-oss/env-core';
import { z } from 'zod';

export const env = createEnv({
  skipValidation: true,
  server: {
    NODE_ENV: z.enum(['development', 'test', 'production']),
    VERCEL_URL: z.string().optional(),
    SPOTIFY_CLIENT_ID: z.string(),
    SPOTIFY_CLIENT_SECRET: z.string(),
    CLERK_SECRET_KEY: z.string(),
    CLERK_USER_ID: z.string(),
    REDIS_URL: z.string().url(),
    GENIUS_ACCESS_TOKEN: z.string(),
  },
  runtimeEnv: import.meta.env,
});
