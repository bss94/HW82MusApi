import {createSlice} from '@reduxjs/toolkit';
import {Artist} from '../../types.ts';
import {createArtists, deleteArtist, fetchArtists, toggleArtistPublic} from './artistsThunks.ts';

export interface ArtistsState {
  artists: Artist[];
  artistsFetching: boolean;
  artistsCreating: boolean;
  deletingArtist:string|false;
  publicationArtist: string|false;
}

const initialState: ArtistsState = {
  artists: [],
  artistsFetching: false,
  artistsCreating: false,
  deletingArtist: false,
  publicationArtist:false
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
    builder.addCase(deleteArtist.pending, (state,{meta:{arg:id}}) => {
      state.deletingArtist = id;
    })
      .addCase(deleteArtist.rejected, (state) => {
        state.deletingArtist = false;
      })
      .addCase(deleteArtist.fulfilled, (state) => {
        state.deletingArtist = false;
      });
    builder.addCase(toggleArtistPublic.pending, (state,{meta:{arg:id}}) => {
      state.publicationArtist = id;
    })
      .addCase(toggleArtistPublic.rejected, (state) => {
        state.publicationArtist = false;
      })
      .addCase(toggleArtistPublic.fulfilled, (state) => {
        state.publicationArtist = false;
      });

  },
  selectors: {
    selectArtists: (state) => state.artists,
    selectArtistsFetching: (state) => state.artistsFetching,
    selectArtistCreating: (state) => state.artistsCreating,
    selectArtistDeleting:(state)=>state.deletingArtist,
    selectPublishArtist:(state)=>state.publicationArtist,
  }
});

export const artistsReducer = artistsSlice.reducer;
export const {
  selectArtists,
  selectArtistsFetching,
  selectArtistCreating,
  selectArtistDeleting,
  selectPublishArtist
} = artistsSlice.selectors;