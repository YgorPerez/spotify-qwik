import { Ratelimit } from '@upstash/ratelimit';
import { env } from '../../env.js';
import { redis } from './redis';

const rateLimitCache = new Map();

const ratelimiter = async ({
  userId,
}: {
  userId: string;
}) => {
  if (env.NODE_ENV === 'production' && userId) {
    const ratelimit = new Ratelimit({
      redis: redis,
      limiter: Ratelimit.slidingWindow(50, '10 s'),
      timeout: 1000, // 1 second
      analytics: true,
      ephemeralCache: rateLimitCache,
    });
    const { success } = await ratelimit.limit(userId);
    if (!success) {
      Error('Ratelimit, Wait 10s and try again');
    }
  }
};

export default ratelimiter;
