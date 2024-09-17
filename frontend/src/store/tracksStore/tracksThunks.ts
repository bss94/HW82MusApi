import {createAsyncThunk} from '@reduxjs/toolkit';
import {AlbumsTracks} from '../../types.ts';
import axiosApi from '../../axiosApi.ts';

export const fetchTracks = createAsyncThunk<AlbumsTracks, string>(
  'tracks/fetchTracks',
  async (albumId) => {
    const {data: albumsTracks} = await axiosApi.get(`/tracks?album=${albumId}`);
    return albumsTracks;
  }
);