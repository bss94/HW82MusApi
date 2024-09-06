import { Model } from 'mongoose';

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

export interface UserFields {
  username: string;
  password: string;
  token: string;
}

export interface UserMethods {
  checkPassword(password: string): Promise<boolean>;
  generateToken(): void;
}

export type UserModel = Model<UserFields, {}, UserMethods>;