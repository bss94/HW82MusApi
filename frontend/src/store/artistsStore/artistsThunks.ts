import {createAsyncThunk} from '@reduxjs/toolkit';
import {Artist} from '../../types.ts';
import axiosApi from '../../axiosApi.ts';


export const fetchArtists = createAsyncThunk<Artist[]>(
  'artists/fetchArtists',
  async ()=>{
    const {data:artists} = await axiosApi.get<Artist[]>('/artists');
    return artists;
  }
)