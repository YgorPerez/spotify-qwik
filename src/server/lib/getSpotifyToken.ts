import { env } from '~/env.js';
import { UserTokenSchema } from '~/schemas/clerkSchemas';
import { redis } from './redis';

const getSpotifyToken = async (userId = env.CLERK_USER_ID) => {
  const cachedToken = await redis.get(userId);
  if (cachedToken !== '' && cachedToken && typeof cachedToken === 'string') {
    return cachedToken;
  }

  const userTokenResponse = await fetch(
    `https://api.clerk.dev/v1/users/${userId}/oauth_access_tokens/oauth_spotify`,
    {
      method: 'get',
      headers: new Headers({
        Authorization: `Bearer ${env.CLERK_SECRET_KEY}`,
        'Content-Type': 'application/x-www-form-urlencoded',
      }),
    },
  );
  if (!userTokenResponse.ok) {
    throw new Error(`Response error on fetch access token from user: ${userId}`);
  }

  const userToken = await userTokenResponse.json();

  const validatedUserToken = UserTokenSchema.safeParse(userToken);
  if (!validatedUserToken.success || !validatedUserToken.data[0]?.token) {
    throw new Error(`User token not found id: ${userId}`);
  }
  const token = validatedUserToken.data[0]?.token;
  const ONE_HOUR_IN_SECONDS = 60 * 60;
  await redis.set(userId, token, { ex: ONE_HOUR_IN_SECONDS });

  return token;
};

export default getSpotifyToken;
