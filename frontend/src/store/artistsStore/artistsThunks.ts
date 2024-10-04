import {createAsyncThunk} from '@reduxjs/toolkit';
import {Artist, ArtistMutation} from '../../types.ts';
import axiosApi from '../../axiosApi.ts';
import {RootState} from '../../app/store.ts';


export const fetchArtists = createAsyncThunk<Artist[],void,{ state: RootState }>(
  'artists/fetchArtists',
  async (_arg,{getState}) => {
    const token = getState().users.user?.token;
    const {data: artists} = await axiosApi.get<Artist[]>('/artists',{headers: {'Authorization': `Bearer ${token}`}});
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
export const toggleArtistPublic = createAsyncThunk<void, string, { state: RootState }>(
  'artists/toggleArtistPublic',
  async (id, {getState}) => {
    const token = getState().users.user?.token;
    await axiosApi.patch(`/artists/${id}/togglePublished`,{} ,{headers: {'Authorization': `Bearer ${token}`}});
  }
);