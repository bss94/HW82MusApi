import { createAsyncThunk } from '@reduxjs/toolkit';
import { RootState } from '../../app/store.ts';
import axiosApi from '../../axiosApi.ts';
import { ITrackHistory, TrackHistory } from '../../types.ts';

export const trackHistoryCreate = createAsyncThunk<void, string, { state: RootState }>(
  'trackHistoryCreate',
  async (track, { getState }) => {
    const token = getState().users.user?.token;
    await axiosApi.post<TrackHistory>(
      '/track_history',
      { track: track },
      { headers: { Authorization: `Bearer ${token}` } },
    );
  },
);
export const fetchTrackHistory = createAsyncThunk<ITrackHistory[], void, { state: RootState }>(
  'fetchTrackHistory',
  async (_arg, { getState }) => {
    const token = getState().users.user?.token;
    const { data: trackHistory } = await axiosApi.get<ITrackHistory[]>('/track_history', {
      headers: { Authorization: `Bearer ${token}` },
    });
    return trackHistory;
  },
);
