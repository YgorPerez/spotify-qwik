import { SpotifyWebApi } from 'spotify-web-api-ts-edge';
import { env } from '../../env.js';
import getSpotifyToken from './getSpotifyToken';

export const globalForSpotifyClient = globalThis as unknown as {
  spotifyApi: SpotifyWebApi;
};

export const spotifyClientOauth = async () => {
  if (!globalForSpotifyClient.spotifyApi) {
    globalForSpotifyClient.spotifyApi = new SpotifyWebApi({
      accessToken: await getSpotifyToken(),
      clientId: env.SPOTIFY_CLIENT_ID,
      clientSecret: env.SPOTIFY_CLIENT_SECRET,
    });
  }
  return globalForSpotifyClient.spotifyApi;
};
