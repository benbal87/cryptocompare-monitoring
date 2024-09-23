import { AlertColor, AlertPropsColorOverrides } from '@mui/material/Alert/Alert'
import { SnackbarOrigin } from '@mui/material/Snackbar/Snackbar'
import { OverridableStringUnion } from '@mui/types'
import { createSlice, PayloadAction } from '@reduxjs/toolkit'

interface SnackbarStateType {
  isOpen: boolean
  message: string
  position: SnackbarOrigin
  severity: OverridableStringUnion<AlertColor, AlertPropsColorOverrides>
  autoHideDuration: number
}

const initialState: SnackbarStateType = {
  isOpen: false,
  message: '',
  position: { vertical: 'bottom', horizontal: 'left' },
  severity: 'success',
  autoHideDuration: 5000
}

const snackbarSlice = createSlice({
  name: 'snackbar',
  initialState,
  reducers: {
    showSnackbar(state, action: PayloadAction<SnackbarStateType>) {
      state.isOpen = true
      state.message = action.payload.message
      state.severity = action.payload.severity
    },
    hideSnackbar(state) {
      state.isOpen = false
      state.message = ''
      state.severity = 'success'
    }
  }
})

export type { SnackbarStateType }
export const {
  showSnackbar,
  hideSnackbar
} = snackbarSlice.actions
export default snackbarSlice.reducer