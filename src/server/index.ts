import { server$ } from "@builder.io/qwik-city";
import { PagingArtistsType, PagingSimplifiedAlbumsType, PagingTracksType, SearchContentSchema } from "~/schemas/spotifySchema";
import { spotifyClientOauth } from "./lib/spotify-api";

interface GetSearch {
  searchTerm: string,
  cursor?: {albums: number,tracks: number,artists: number},
  mediaType?: ("track" | "album" | "artist")[],
  limit?: number,
  includeExternalAudio?: boolean
}

const getSearch = server$(async ({cursor, mediaType = ["track", "album", "artist"], limit, searchTerm, includeExternalAudio}: GetSearch) => {
  const spotifyApi = await spotifyClientOauth()
  type Promises = [
    Promise<PagingSimplifiedAlbumsType> | undefined,
    Promise<PagingTracksType> | undefined,
    Promise<PagingArtistsType> | undefined,
  ];
  const promises: Promises = [undefined, undefined, undefined];
  if (
    mediaType?.includes('album') ||
    (!mediaType && (cursor ? Boolean(cursor.albums) : true))
  ) {
    promises[0] = spotifyApi.search.searchAlbums(searchTerm, {
      limit: limit || 15,
      offset: cursor?.albums ?? 0,
    });
  }
  if (
    mediaType?.includes('track') ||
    (!mediaType && (cursor ? Boolean(cursor.tracks) : true))
  ) {
    promises[1] = spotifyApi.search.searchTracks(searchTerm, {
      limit: limit || 15,
      offset: cursor?.tracks ?? 0,
      include_external: includeExternalAudio ? 'audio' : undefined,
    });
  }
  if (
    mediaType?.includes('artist') ||
    (!mediaType && (cursor ? Boolean(cursor.artists) : true))
  ) {
    promises[2] = spotifyApi.search.searchArtists(searchTerm, {
      limit: limit || 15,
      offset: cursor?.artists ?? 0,
    });
  }
  const [albumsSearchContent, tracksSearchContent, artistsSearchContent] =
    await Promise.all(promises);
  const validatedSearchContent = SearchContentSchema.safeParse({
    albums: albumsSearchContent,
    tracks: tracksSearchContent,
    artists: artistsSearchContent,
  });
  if (!validatedSearchContent.success) {
    console.error({
      albumsSearchContent,
      tracksSearchContent,
      artistsSearchContent,
    });
    throw new Error('returned type from spotify-web-api-ts-edge not valid'
    );
  }
  const {data} = validatedSearchContent;

  const albumOffset =
    Number(
      new URLSearchParams(data?.albums?.next ?? undefined).get('offset'),
    ) || null;
  const trackOffset =
    Number(
      new URLSearchParams(data?.tracks?.next ?? undefined).get('offset'),
    ) || null;
  const artistOffset =
    Number(
      new URLSearchParams(data?.artists?.next ?? undefined).get('offset'),
    ) || null;

  const nextCursor =
    !albumOffset && !trackOffset && !artistOffset
      ? null
      : {
          albums: albumOffset,
          tracks: trackOffset,
          artists: artistOffset,
        };

  console.log(  {albums: data?.albums?.items,
    tracks: data?.tracks?.items,
    artists: data?.artists?.items,
    nextCursor}
  )

  return {
    albums: data?.albums?.items,
    tracks: data?.tracks?.items,
    artists: data?.artists?.items,
    nextCursor,
  };
});

export { getSearch };

