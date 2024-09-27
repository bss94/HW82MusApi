import {createAsyncThunk} from '@reduxjs/toolkit';
import axiosApi from '../../axiosApi.ts';
import {Album, AlbumMutation} from '../../types.ts';
import {RootState} from '../../app/store.ts';

export const fetchAlbums = createAsyncThunk<Album[], string>(
  'albums/fetchAlbums',
  async (artistId) => {
    const {data: albums} = await axiosApi.get<Album[]>(`/albums?artist=${artistId}`);
    return albums;
  }
);

export const createAlbums = createAsyncThunk<void, AlbumMutation, { state: RootState }>(
  'albums/createAlbums',
  async (albumMutation, {getState}) => {
    const token = getState().users.user?.token;
    const formData = new FormData();
    formData.append('title', albumMutation.title.trim().toLowerCase());
    formData.append('artist', albumMutation.artist);
    formData.append('date', albumMutation.date.toString());
    if (albumMutation.image) {
      formData.append('image', albumMutation.image);
    }
    await axiosApi.post('/albums', formData, {headers: {'Authorization': `Bearer ${token}`}});
  }
);