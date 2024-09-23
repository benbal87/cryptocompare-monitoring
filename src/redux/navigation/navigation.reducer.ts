import { createSlice, PayloadAction } from '@reduxjs/toolkit'

export interface NavigationStateType {
  isNavbarOpen: boolean
}

const initialState: NavigationStateType = {
  isNavbarOpen: false
}

const navigationSlice = createSlice({
  name: 'navigation',
  initialState,
  reducers: {
    toggleNavbar: (
      state,
      action: PayloadAction<boolean | undefined>
    ) => {
      state.isNavbarOpen = action.payload ?? !state.isNavbarOpen
    }
  }
})

export const {
  toggleNavbar
} = navigationSlice.actions

export default navigationSlice.reducer
