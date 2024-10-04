import { createSlice } from '@reduxjs/toolkit';
import { ITrackHistory } from '../../types.ts';
import { fetchTrackHistory, trackHistoryCreate } from './trackHistoryThunks.ts';

export interface TrackHistoryState {
  trackHistory: ITrackHistory[];
  historyCreating: boolean;
  historyFetching: boolean;
}

const initialState: TrackHistoryState = {
  trackHistory: [],
  historyCreating: false,
  historyFetching: false,
};

export const trackHistorySlice = createSlice({
  name: 'trackHistory',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(trackHistoryCreate.pending, (state) => {
        state.historyCreating = true;
      })
      .addCase(trackHistoryCreate.rejected, (state) => {
        state.historyCreating = false;
      })
      .addCase(trackHistoryCreate.fulfilled, (state) => {
        state.historyCreating = false;
      });
    builder
      .addCase(fetchTrackHistory.pending, (state) => {
        state.historyFetching = true;
      })
      .addCase(fetchTrackHistory.rejected, (state) => {
        state.historyFetching = false;
      })
      .addCase(fetchTrackHistory.fulfilled, (state, { payload: trackHistory }) => {
        state.historyFetching = false;
        state.trackHistory = trackHistory;
      });
  },
  selectors: {
    selectTrackHistory: (state) => state.trackHistory,
    selectTrackHistoryCreating: (state) => state.historyCreating,
    selectTrackHistoryFetching: (state) => state.historyFetching,
  },
});

export const trackHistoryReducer = trackHistorySlice.reducer;
export const { selectTrackHistory, selectTrackHistoryFetching, selectTrackHistoryCreating } =
  trackHistorySlice.selectors;
