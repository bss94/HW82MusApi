import {createSlice} from '@reduxjs/toolkit';

export interface TracksState {
  tracks:[];
  fetchingTracks:boolean;
}
const initialState: TracksState = {

}

export const tracksSlice = createSlice({
  name: 'tracks',
  initialState,
  reducers:{},
  extraReducers:()=>{},
  selectors:{}
})