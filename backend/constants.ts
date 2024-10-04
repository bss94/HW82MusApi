import TrackHistory from './models/TrackHistory';
import mongoose from 'mongoose';
import Track from './models/Track';
import Album from './models/Album';

export const clearTrackHistories = async (trackIds: mongoose.Types.ObjectId | string[]) => {
  const trackHistory = await TrackHistory.find({ track: trackIds });
  if (trackHistory) {
    const historiesIds: string[] = trackHistory.map((history) => history._id.toString());
    await TrackHistory.deleteMany({ _id: historiesIds });
  }
};

export const clearTracksAndChildren = async (albumIds: mongoose.Types.ObjectId | string[]) => {
  const tracks = await Track.find({ album: albumIds });
  if (tracks) {
    const trackIds: string[] = tracks.map((track) => track._id.toString());
    await clearTrackHistories(trackIds);
    await Track.deleteMany({ _id: trackIds });
  }
};

export const clearAlbumsAndChildren = async (artistId: mongoose.Types.ObjectId | string[]) => {
  const albums = await Album.find({ artist: artistId });
  if (albums) {
    const albumIds: string[] = albums.map((album) => album._id.toString());
    await clearTracksAndChildren(albumIds);
    await Album.deleteMany({ _id: albumIds });
  }
};
