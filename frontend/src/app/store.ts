import { combineReducers, configureStore } from '@reduxjs/toolkit';
import { artistsReducer } from '../store/artistsStore/artistsSlice.ts';
import { albumsReducer } from '../store/albumsStore/albumsSlice.ts';
import { tracksReducer } from '../store/tracksStore/tracksSlice.ts';
import { usersReducer } from '../store/usersStore/usersSlice.ts';
import storage from 'redux-persist/lib/storage';
import { FLUSH, PAUSE, PERSIST, persistReducer, persistStore, PURGE, REGISTER, REHYDRATE } from 'redux-persist';
import { trackHistoryReducer } from '../store/trackHistoryStore/trackHistorySlice.ts';

const userPersistConfig = {
  key: 'musApp:users',
  storage,
  whitelist: ['user'],
};

const rootReducer = combineReducers({
  artists: artistsReducer,
  albums: albumsReducer,
  tracks: tracksReducer,
  trackHistory: trackHistoryReducer,
  users: persistReducer(userPersistConfig, usersReducer),
});

export const store = configureStore({
  reducer: rootReducer,
  middleware: (getDefaultMiddleware) => {
    return getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
      },
    });
  },
});

export const persistor = persistStore(store);

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
