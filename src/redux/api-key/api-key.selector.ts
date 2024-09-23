import { createSelector } from 'reselect'
import { validateApiKey } from '../../utils/app.utils.ts'
import { RootState } from '../store.ts'
import { ApiKeyStateType } from './api-key.reducer.ts'

const selectApiKeyState = (state: RootState): ApiKeyStateType => state.apiKey

export const selectApiKeyData = createSelector(
  [selectApiKeyState],
  (apiKey: ApiKeyStateType): ApiKeyStateType => apiKey
)

export const selectApiKey = createSelector(
  [selectApiKeyState],
  (apiKeySlice: ApiKeyStateType): string | undefined => apiKeySlice.apiKey
)

export const selectIfApiKeyValid = createSelector(
  [selectApiKeyState],
  (apiKeySlice: ApiKeyStateType): boolean => validateApiKey(apiKeySlice.apiKey)
)