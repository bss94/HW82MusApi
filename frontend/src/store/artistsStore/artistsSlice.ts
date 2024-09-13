import {createSlice} from '@reduxjs/toolkit';
import {Artist} from '../../types.ts';
import {fetchArtists} from './artistsThunks.ts';

export interface ArtistsState {
  artists: Artist[];
  artistsFetching: boolean;
}

const initialState: ArtistsState = {
  artists: [],
  artistsFetching: false,
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
  },
  selectors: {
    selectArtists: (state) => state.artists,
    selectArtistsFetching: (state) => state.artistsFetching,
  }
});

export const artistsReducer = artistsSlice.reducer;
export const {
  selectArtists,
  selectArtistsFetching
} = artistsSlice.selectors;