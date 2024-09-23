import { Action, configureStore, ThunkAction } from '@reduxjs/toolkit'
import { combineReducers } from 'redux'
import logger from 'redux-logger'
import { persistReducer, persistStore } from 'redux-persist'
import storage from 'redux-persist/lib/storage'
import apiKeyReducer from './api-key/api-key.reducer.ts'
import navigationReducer from './navigation/navigation.reducer.ts'
import snackbarReducer from './snackbar/snackbar.reducer.ts'

const persistConfig = {
  key: 'root',
  storage
}

const rootReducer = combineReducers({
  navigation: navigationReducer,
  apiKey: apiKeyReducer,
  snackbar: snackbarReducer
})

const persistedReducer = persistReducer(persistConfig, rootReducer)

const store = configureStore({
  reducer: persistedReducer,
  middleware: (getDefaultMiddleware) => getDefaultMiddleware({
    serializableCheck: {
      ignoredActions: ['persist/PERSIST', 'persist/REHYDRATE']
    }
  }).concat(logger)
})

const storePersist = persistStore(store)

export type AppDispatch = typeof store.dispatch
export type RootState = ReturnType<typeof store.getState>
export type AppThunk<ReturnType = void> = ThunkAction<
  ReturnType,
  RootState,
  unknown,
  Action<string>
>

export { store, storePersist }
