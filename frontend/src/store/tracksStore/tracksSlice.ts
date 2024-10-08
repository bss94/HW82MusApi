import { createSlice } from '@reduxjs/toolkit';
import { Track } from '../../types.ts';
import { createTracks, deleteTrack, fetchTracks, toggleTrackPublic } from './tracksThunks.ts';

export interface TracksState {
  artist: string | null;
  album: string | null;
  tracks: Track[];
  fetchingTracks: boolean;
  creatingTracks: boolean;
  deletingTrack: string | false;
  publishedTrack: string | false;
}

const initialState: TracksState = {
  artist: null,
  album: null,
  tracks: [],
  fetchingTracks: false,
  creatingTracks: false,
  deletingTrack: false,
  publishedTrack: false,
};

export const tracksSlice = createSlice({
  name: 'tracks',
  initialState,
  reducers: {
    resetTracks: (state) => {
      state.tracks = [];
      state.album = null;
      state.artist = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchTracks.pending, (state) => {
        state.fetchingTracks = true;
      })
      .addCase(fetchTracks.fulfilled, (state, { payload: albumsTracks }) => {
        state.tracks = albumsTracks.tracks;
        if (albumsTracks.album) {
          state.album = albumsTracks.album.title;
          state.artist = albumsTracks.album.artist.name;
        }
        state.fetchingTracks = false;
      })
      .addCase(fetchTracks.rejected, (state) => {
        state.fetchingTracks = false;
      });
    builder
      .addCase(createTracks.pending, (state) => {
        state.creatingTracks = true;
      })
      .addCase(createTracks.fulfilled, (state) => {
        state.creatingTracks = false;
      })
      .addCase(createTracks.rejected, (state) => {
        state.creatingTracks = false;
      });
    builder
      .addCase(deleteTrack.pending, (state, { meta: { arg: id } }) => {
        state.deletingTrack = id;
      })
      .addCase(deleteTrack.fulfilled, (state) => {
        state.deletingTrack = false;
      })
      .addCase(deleteTrack.rejected, (state) => {
        state.deletingTrack = false;
      });
    builder
      .addCase(toggleTrackPublic.pending, (state, { meta: { arg: id } }) => {
        state.publishedTrack = id;
      })
      .addCase(toggleTrackPublic.fulfilled, (state) => {
        state.publishedTrack = false;
      })
      .addCase(toggleTrackPublic.rejected, (state) => {
        state.publishedTrack = false;
      });
  },
  selectors: {
    selectAlbum: (state) => state.album,
    selectArtist: (state) => state.artist,
    selectTracks: (state) => state.tracks,
    selectTracksFetching: (state) => state.fetchingTracks,
    selectTracksCreating: (state) => state.creatingTracks,
    selectTrackDeleting: (state) => state.deletingTrack,
    selectTrackPublished: (state) => state.publishedTrack,
  },
});

export const tracksReducer = tracksSlice.reducer;
export const {
  selectAlbum,
  selectTracks,
  selectArtist,
  selectTracksFetching,
  selectTracksCreating,
  selectTrackDeleting,
  selectTrackPublished,
} = tracksSlice.selectors;
export const { resetTracks } = tracksSlice.actions;
