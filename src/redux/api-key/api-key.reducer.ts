import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit'

export interface ApiKeyStateType {
  apiKey: string | undefined
}

const initialState: ApiKeyStateType = {
  apiKey: undefined
}

export const updateApiKeyThunk = createAsyncThunk(
  'apikey/update',
  (stateToUpdate: ApiKeyStateType) => Promise.resolve(stateToUpdate)
)

const apiKeySlice = createSlice({
  name: 'apiKey',
  initialState,
  reducers: {
    updateApiKey: (state, action: PayloadAction<string>) => {
      state.apiKey = action.payload
    }
  },
  extraReducers: builder => {
    builder.addCase(updateApiKeyThunk.fulfilled, (state, action) => ({
      ...state,
      ...action.payload
    }))
  }
})

export const {
  updateApiKey
} = apiKeySlice.actions

export default apiKeySlice.reducer
