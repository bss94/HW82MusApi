import {createSlice} from '@reduxjs/toolkit';
import {Artist} from '../../types.ts';
import {createArtists, fetchArtists} from './artistsThunks.ts';

export interface ArtistsState {
  artists: Artist[];
  artistsFetching: boolean;
  artistsCreating: boolean;
}

const initialState: ArtistsState = {
  artists: [],
  artistsFetching: false,
  artistsCreating: false
};

export const artistsSlice = createSlice({
  name: 'artists',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(fetchArtists.pending, (state) => {
      state.artistsFetching = true;
    })
      .addCase(fetchArtists.fulfilled, (state, {payload: artists}) => {
        state.artists = artists;
        state.artistsFetching = false;
      })
      .addCase(fetchArtists.rejected, (state) => {
        state.artistsFetching = false;
      });
    builder.addCase(createArtists.pending, (state) => {
      state.artistsCreating = true;
    })
      .addCase(createArtists.rejected, (state) => {
        state.artistsCreating = false;
      })
      .addCase(createArtists.fulfilled, (state) => {
        state.artistsCreating = false;
      });

  },
  selectors: {
    selectArtists: (state) => state.artists,
    selectArtistsFetching: (state) => state.artistsFetching,
    selectArtistCreating: (state) => state.artistsCreating,
  }
});

export const artistsReducer = artistsSlice.reducer;
export const {
  selectArtists,
  selectArtistsFetching,
  selectArtistCreating
} = artistsSlice.selectors;