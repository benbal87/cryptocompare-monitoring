import { createSelector } from 'reselect'
import { RootState } from '../store.ts'
import { NavigationStateType } from './navigation.reducer'

const selectNavigationState = (state: RootState): NavigationStateType =>
  state.navigation

export const selectNavigationData = createSelector(
  [selectNavigationState],
  (navigation: NavigationStateType): NavigationStateType => navigation
)

export const selectIsNavbarOpen = createSelector(
  [selectNavigationState],
  (navigation: NavigationStateType): boolean =>
    navigation.isNavbarOpen
)