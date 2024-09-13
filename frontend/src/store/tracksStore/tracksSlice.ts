import {createSlice} from '@reduxjs/toolkit';
import {Track} from '../../types.ts';
import {fetchTracks} from './tracksThunks.ts';

export interface TracksState {
  artist: string | null;
  album: string | null;
  tracks: Track[];
  fetchingTracks: boolean;
}

const initialState: TracksState = {
  artist: null,
  album: null,
  tracks: [],
  fetchingTracks: false,
};

export const tracksSlice = createSlice({
  name: 'tracks',
  initialState,
  reducers: {
    resetTracks: (state) => {
      state.tracks = [];
      state.album = null;
      state.artist = null;
    }
  },
  extraReducers: (builder) => {
    builder.addCase(fetchTracks.pending, (state) => {
      state.fetchingTracks = true;
    })
      .addCase(fetchTracks.fulfilled, (state, {payload: albumsTracks}) => {
        state.tracks = albumsTracks.tracks;
        state.album = albumsTracks.album.title;
        state.artist = albumsTracks.album.artist.name;
        state.fetchingTracks = false;

      })
      .addCase(fetchTracks.rejected, (state) => {
        state.fetchingTracks = false;
      });
  },
  selectors: {
    selectAlbum: (state) => state.album,
    selectArtist: (state) => state.artist,
    selectTracks: (state) => state.tracks,
    selectTracksFetching: (state) => state.fetchingTracks
  }
});

export const tracksReducer = tracksSlice.reducer;
export const {
  selectAlbum,
  selectTracks,
  selectArtist,
  selectTracksFetching,
} = tracksSlice.selectors;
export const {resetTracks} = tracksSlice.actions;