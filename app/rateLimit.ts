import {Ratelimit} from '@upstash/ratelimit';
import {Redis} from '@upstash/redis';

const rateLimit = new Ratelimit({
  redis: Redis.fromEnv(),
  limiter: Ratelimit.fixedWindow(10, '1d'),
  prefix: 'FILTER_COFFEE_AI_RATE_LIMIT__',
});

export {rateLimit};
