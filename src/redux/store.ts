import { Action, configureStore, ThunkAction } from '@reduxjs/toolkit'
import logger from 'redux-logger'
import apiKeyReducer from './api-key/api-key.reducer.ts'
import navigationReducer from './navigation/navigation.reducer.ts'
import snackbarReducer from './snackbar/snackbar.reducer.ts'

const store = configureStore({
  reducer: {
    navigation: navigationReducer,
    apiKey: apiKeyReducer,
    snackbar: snackbarReducer
  },
  middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(logger)
})

export type AppDispatch = typeof store.dispatch
export type RootState = ReturnType<typeof store.getState>
export type AppThunk<ReturnType = void> = ThunkAction<
  ReturnType,
  RootState,
  unknown,
  Action<string>
>

export default store
