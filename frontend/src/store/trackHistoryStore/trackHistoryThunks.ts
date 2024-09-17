import {createAsyncThunk} from '@reduxjs/toolkit';
import {RootState} from '../../app/store.ts';
import axiosApi from '../../axiosApi.ts';
import {TrackHistory} from '../../types.ts';


export const trackHistoryCreate = createAsyncThunk<void, string, { state: RootState }>(
  'trackHistoryCreate',
  async (track, {getState}) => {
    const token = getState().users.user?.token;
    if (token) {
      await axiosApi.post<TrackHistory>('/track_history', {track: track}, {headers: {'Authorization': `Bearer ${token}`}});
    } else {
      throw new Error('Unauthorized');
    }
  }
);