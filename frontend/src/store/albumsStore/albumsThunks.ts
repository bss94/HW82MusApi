import {createAsyncThunk} from '@reduxjs/toolkit';
import axiosApi from '../../axiosApi.ts';

export const fetchAlbums = createAsyncThunk<[],string>(
  'albums/fetchAlbums',
  async (artistId)=>{
    const {data:albums} = await axiosApi.get<[]>(`/albums?artist=${artistId}`);
    console.log(albums);
    return albums;
  }
)