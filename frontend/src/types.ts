
export interface Artist{
  _id: string;
  name: string;
  information?: string;
  photo: string | null;
}

export interface Album{
  _id: string;
  artist: string;
  title: string;
  date: number;
  image: string | null;
}
export interface Track{
  _id: string;
  title: string;
  album: string;
  time: string;
  trackNumber: number;
}
export interface AlbumsArtist{
  _id: string;
  name: string;
}
export type AlbumWithoutArtist = Omit<Album, "artist">;
export interface AlbumWithArtistName extends AlbumWithoutArtist{
  artist:AlbumsArtist
}
export interface AlbumsTracks{
  album: AlbumWithArtistName;
  tracks: Track[];
}