import {createAsyncThunk} from '@reduxjs/toolkit';
import axiosApi from '../../axiosApi.ts';
import {Album} from '../../types.ts';

export const fetchAlbums = createAsyncThunk<Album[],string>(
  'albums/fetchAlbums',
  async (artistId)=>{
    const {data:albums} = await axiosApi.get<Album[]>(`/albums?artist=${artistId}`);
    console.log(albums);
    return albums;
  }
)