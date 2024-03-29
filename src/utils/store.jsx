import { configureStore, getDefaultMiddleware } from '@reduxjs/toolkit';
import { save, load } from 'redux-localstorage-simple';
import {
  pangolinReducers,
  PANGOLIN_PERSISTED_KEYS,
} from '@pangolindex/components';

const PERSISTED_KEYS = [...PANGOLIN_PERSISTED_KEYS];

const store = configureStore({
  reducer: {
    ...pangolinReducers,
  },
  middleware: [
    ...getDefaultMiddleware({ thunk: false }),
    save({ states: PERSISTED_KEYS }),
  ],
  preloadedState: load({ states: PERSISTED_KEYS }),
});

export default store;
