import {createSlice} from '@reduxjs/toolkit';
import {fetchAlbums} from './albumsThunks.ts';


export interface AlbumsState {
  albums: [];
  albumsFetching: boolean;
}

const initialState: AlbumsState = {
  albums: [],
  albumsFetching: false,
};

export const albumsSlice = createSlice({
  name: 'albums',
  initialState,
  reducers: {},
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
  },
  selectors: {
    selectAlbums: (state) => state.albums,
    selectAlbumsFetching: (state) => state.albumsFetching,
  }
});

export const albumsReducer = albumsSlice.reducer;
export const {
  selectAlbums,
  selectAlbumsFetching
} = albumsSlice.selectors;