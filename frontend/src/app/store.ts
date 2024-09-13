import {configureStore} from '@reduxjs/toolkit';
import {artistsReducer} from '../store/artistsStore/artistsSlice.ts';
import {albumsReducer} from '../store/albumsStore/albumsSlice.ts';
import {tracksReducer} from '../store/tracksStore/tracksSlice.ts';


export const store = configureStore({
  reducer: {
    artists:artistsReducer,
    albums:albumsReducer,
    tracks:tracksReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;