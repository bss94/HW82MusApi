import mongoose, {Model} from 'mongoose';

export interface ArtistMutation {
  name: string;
  information: string;
  photo: string | null;
}

export interface AlbumMutation {
  title: string;
  artist: string;
  date: number;
  image: string | null;
}

export interface TrackMutation {
  title: string;
  album: string;
  time: string;
  trackNumber: number;
}

export interface TrackHistoryMutation {
  user: mongoose.Types.ObjectId;
  track: string;
  artist: mongoose.Types.ObjectId;
  datetime: Date;
}

export interface UserFields {
  username: string;
  password: string;
  token: string;
  role:string
}

export interface UserMethods {
  checkPassword(password: string): Promise<boolean>;

  generateToken(): void;
}

export type UserModel = Model<UserFields, {}, UserMethods>;