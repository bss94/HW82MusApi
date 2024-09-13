import {createSlice} from '@reduxjs/toolkit';
import {fetchAlbums} from './albumsThunks.ts';
import {Album} from '../../types.ts';


export interface AlbumsState {
  albums: Album[];
  albumsFetching: boolean;
}

const initialState: AlbumsState = {
  albums: [],
  albumsFetching: false,
};

export const albumsSlice = createSlice({
  name: 'albums',
  initialState,
  reducers: {
    resetAlbums:(state)=>{
      state.albums = []
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
export const {resetAlbums} = albumsSlice.actions