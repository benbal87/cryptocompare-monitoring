import { createSelector } from 'reselect'
import { RootState } from '../store.ts'
import { NavigationStateType } from './navigation.reducer'

const selectNavigation = (state: RootState): NavigationStateType =>
  state.navigation

export const selectNavigationData = createSelector(
  [selectNavigation],
  (navigation: NavigationStateType): NavigationStateType => navigation
)

export const selectIsNavbarOpen = createSelector(
  [selectNavigation],
  (navigation: NavigationStateType): boolean =>
    navigation.isNavbarOpen
)