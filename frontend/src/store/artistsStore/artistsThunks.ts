import {createAsyncThunk} from '@reduxjs/toolkit';
import {Artist, ArtistMutation} from '../../types.ts';
import axiosApi from '../../axiosApi.ts';
import {RootState} from '../../app/store.ts';


export const fetchArtists = createAsyncThunk<Artist[]>(
  'artists/fetchArtists',
  async () => {
    const {data: artists} = await axiosApi.get<Artist[]>('/artists');
    return artists;
  }
);
export const createArtists = createAsyncThunk<void, ArtistMutation, { state: RootState }>(
  'artists/createArtists',
  async (artistMutation, {getState}) => {
    const token = getState().users.user?.token;
    const formData = new FormData();
    formData.append('name', artistMutation.name.trim().toLowerCase());
    if (artistMutation.information.trim() !== '') {
      formData.append('information', artistMutation.information.trim());
    }
    if (artistMutation.photo) {
      formData.append('photo', artistMutation.photo);
    }
    await axiosApi.post('/artists', formData, {headers: {'Authorization': `Bearer ${token}`}});
  }
);
export const deleteArtist = createAsyncThunk<void, string, { state: RootState }>(
  'artists/deleteArtist',
  async (id, {getState}) => {
    const token = getState().users.user?.token;
    await axiosApi.delete(`/artists/${id}`, {headers: {'Authorization': `Bearer ${token}`}});
  }
);