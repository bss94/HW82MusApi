import {createSlice} from '@reduxjs/toolkit';
import {TrackHistory} from '../../types.ts';
import {trackHistoryCreate} from './trackHistoryThunks.ts';


export interface TrackHistoryState {
  trackHistory: TrackHistory[];
  historyCreating: boolean;
}

const initialState: TrackHistoryState = {
  trackHistory: [],
  historyCreating: false,
};

export const trackHistorySlice = createSlice({
  name: 'trackHistory',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(trackHistoryCreate.pending, (state) => {
      state.historyCreating = true;
    })
      .addCase(trackHistoryCreate.rejected, (state) => {
        state.historyCreating = false;
        console.log('xxx');
      })
      .addCase(trackHistoryCreate.fulfilled, (state) => {
        state.historyCreating = false;
      });
  },
  selectors: {}
});

export const trackHistoryReducer = trackHistorySlice.reducer;
export const {} = trackHistorySlice.selectors;