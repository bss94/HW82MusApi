import {createSlice} from '@reduxjs/toolkit';
import {createAlbums, deleteAlbum, fetchAlbums} from './albumsThunks.ts';
import {Album} from '../../types.ts';


export interface AlbumsState {
  albums: Album[];
  albumsFetching: boolean;
  albumCreating: boolean;
  deletingAlbum:string|false;
  publishingAlbum:string|false;
}

const initialState: AlbumsState = {
  albums: [],
  albumsFetching: false,
  albumCreating: false,
  deletingAlbum: false,
  publishingAlbum:false
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
    builder.addCase(deleteAlbum.pending, (state,{meta:{arg:id}}) => {
      state.deletingAlbum = id;
    })
      .addCase(deleteAlbum.fulfilled, (state) => {
        state.deletingAlbum = false;
      })
      .addCase(deleteAlbum.rejected, (state) => {
        state.deletingAlbum = false;
      });
  },
  selectors: {
    selectAlbums: (state) => state.albums,
    selectAlbumsFetching: (state) => state.albumsFetching,
    selectAlbumCreating: (state) => state.albumCreating,
    selectAlbumDeleting: (state) => state.deletingAlbum,
    selectAlbumPublishing: (state) => state.publishingAlbum
  }
});

export const albumsReducer = albumsSlice.reducer;
export const {
  selectAlbums,
  selectAlbumsFetching,
  selectAlbumCreating,
  selectAlbumDeleting,
  selectAlbumPublishing
} = albumsSlice.selectors;
export const {resetAlbums} = albumsSlice.actions;