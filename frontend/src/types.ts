export interface Artist {
  _id: string;
  name: string;
  information?: string;
  photo: string | null;
  isPublished: boolean;
  publisher: string;
}

export interface Album {
  _id: string;
  artist: string;
  title: string;
  date: number;
  image: string | null;
  isPublished: boolean;
  publisher: string;
}

export interface Track {
  _id: string;
  title: string;
  album: string;
  time: string;
  trackNumber: number;
  isPublished: boolean;
  publisher: string;
}

export interface AlbumsArtist {
  _id: string;
  name: string;
}

export type AlbumWithoutArtist = Omit<Album, 'artist'>;

export interface AlbumWithArtistName extends AlbumWithoutArtist {
  artist: AlbumsArtist;
}

export interface AlbumsTracks {
  album: AlbumWithArtistName;
  tracks: Track[];
}

export interface RegisterMutation {
  username: string;
  password: string;
  confirmPassword: string;
  displayName: string;
  avatar: File | null;
}

export interface LoginMutation {
  username: string;
  password: string;
}

export interface User {
  _id: string;
  username: string;
  token: string;
  role: string;
  displayName: string;
  avatar?: string;
}

export interface ValidationError {
  errors: {
    [key: string]: {
      name: string;
      message: string;
    };
  };
  message: string;
  name: string;
  _message: string;
}

export interface GlobalError {
  error: string;
}

export interface TrackHistory {
  _id: string;
  tracks: string;
  user: string;
  artist: string;
  datetime: Date;
}

export interface THTracks {
  _id: string;
  title: string;
}

export interface THArtist {
  _id: string;
  name: string;
}

export interface ITrackHistory {
  _id: string;
  track: THTracks;
  user: string;
  artist: THArtist;
  datetime: string;
}

export interface ArtistMutation {
  name: string;
  information: string;
  photo: File | null;
}

export interface AlbumMutation {
  artist: string;
  title: string;
  date: number;
  image: File | null;
}

export interface TrackMutation {
  title: string;
  album: string;
  time: string;
  trackNumber: number;
}
