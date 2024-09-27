import {createSlice} from '@reduxjs/toolkit';
import {createAlbums, fetchAlbums} from './albumsThunks.ts';
import {Album} from '../../types.ts';


export interface AlbumsState {
  albums: Album[];
  albumsFetching: boolean;
  albumCreating: boolean;
}

const initialState: AlbumsState = {
  albums: [],
  albumsFetching: false,
  albumCreating: false
};

export const albumsSlice = createSlice({
  name: 'albums',
  initialState,
  reducers: {
    resetAlbums: (state) => {
      state.albums = [];
    }
  },
  extraReducers: (builder) => {
    builder.addCase(fetchAlbums.pending, (state) => {
      state.albumsFetching = true;
    })
      .addCase(fetchAlbums.fulfilled, (state, {payload: albums}) => {
        state.albums = albums;
        state.albumsFetching = false;
      })
      .addCase(fetchAlbums.rejected, (state) => {
        state.albumsFetching = false;
      });
    builder.addCase(createAlbums.pending, (state) => {
      state.albumCreating = true;
    })
      .addCase(createAlbums.fulfilled, (state) => {
        state.albumCreating = false;
      })
      .addCase(createAlbums.rejected, (state) => {
        state.albumCreating = false;
      });
  },
  selectors: {
    selectAlbums: (state) => state.albums,
    selectAlbumsFetching: (state) => state.albumsFetching,
    selectAlbumCreating: (state) => state.albumCreating
  }
});

export const albumsReducer = albumsSlice.reducer;
export const {
  selectAlbums,
  selectAlbumsFetching,
  selectAlbumCreating
} = albumsSlice.selectors;
export const {resetAlbums} = albumsSlice.actions;