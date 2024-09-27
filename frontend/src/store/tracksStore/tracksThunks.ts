import {createAsyncThunk} from '@reduxjs/toolkit';
import {AlbumsTracks, TrackMutation} from '../../types.ts';
import axiosApi from '../../axiosApi.ts';
import {RootState} from '../../app/store.ts';

export const fetchTracks = createAsyncThunk<AlbumsTracks, string | undefined>(
  'tracks/fetchTracks',
  async (albumId) => {
    const {data: albumsTracks} = await axiosApi.get(`/tracks${albumId ? `?album=${albumId}` : ''}`);
    return albumsTracks;
  }
);
export const createTracks = createAsyncThunk<void, TrackMutation, { state: RootState }>(
  'tracks/createTracks',
  async (trackMutation, {getState}) => {
    const token = getState().users.user?.token;
    await axiosApi.post('/tracks', trackMutation, {headers: {'Authorization': `Bearer ${token}`}});
  }
);
export const deleteTrack = createAsyncThunk<void, string, { state: RootState }>(
  'tracks/deleteTrack',
  async (id, {getState}) => {
    const token = getState().users.user?.token;
    await axiosApi.delete(`/tracks/${id}`, {headers: {'Authorization': `Bearer ${token}`}});
  }
);

export const toggleTrackPublic = createAsyncThunk<void, string, { state: RootState }>(
  'tracks/toggleTrackPublic',
  async (id, {getState}) => {
    const token = getState().users.user?.token;
    await axiosApi.patch(`/tracks/${id}/togglePublished`, {}, {headers: {'Authorization': `Bearer ${token}`}});
  }
);