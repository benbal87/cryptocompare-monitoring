import { createSlice, PayloadAction } from '@reduxjs/toolkit'

export interface ApiKeyStateType {
  apiKey: string | undefined
}

const initialState: ApiKeyStateType = {
  apiKey: undefined,
}

const apiKeySlice = createSlice({
  name: 'apiKey',
  initialState,
  reducers: {
    updateApiKey: (state, action: PayloadAction<string>) => {
      state.apiKey = action.payload
    }
  }
})

export const {
  updateApiKey,
} = apiKeySlice.actions

export default apiKeySlice.reducer
