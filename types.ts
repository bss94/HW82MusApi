export interface ArtistMutation {
  name: string;
  information: string;
  photo: string | null;
}

export interface AlbumMutation {
  title: string;
  artist: string;
  date: string;
  image: string | null;
}

export interface TrackMutation {
  title: string;
  album: string;
  time: string;
}