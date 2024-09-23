import { createSelector } from 'reselect'
import { RootState } from '../store.ts'
import { SnackbarStateType } from './snackbar.reducer.ts'

const selectSnackbarState = (state: RootState) => state.snackbar

export const selectSnackbarData = createSelector(
  [selectSnackbarState],
  (snackbarState: SnackbarStateType): SnackbarStateType => snackbarState
)

export const selectIsSnackbarOpen = createSelector(
  [selectSnackbarState],
  (snackbarState: SnackbarStateType): boolean => snackbarState.isOpen
)