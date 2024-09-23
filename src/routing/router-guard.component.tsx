import React, { useEffect } from 'react'
import { useDispatch } from 'react-redux'
import { Navigate, RouteProps } from 'react-router-dom'
import { showSnackbar } from '../redux/snackbar/snackbar.reducer.ts'

type RouterGuardProps<T = object> = RouteProps & {
  component: React.ComponentType<T>
  isAuthenticated: boolean
  fallbackNavigation?: string
}

const RouterGuard: React.FC<RouterGuardProps> = <T extends object>({
  component: Component,
  isAuthenticated,
  fallbackNavigation = '/',
  ...rest
}: RouterGuardProps<T>) => {
  const dispatch = useDispatch()

  useEffect(() => {
    if (!isAuthenticated) {
      dispatch(
        showSnackbar({
          isOpen: true,
          message: 'You are not authorized to access this page.',
          position: { vertical: 'bottom', horizontal: 'left' },
          severity: 'warning',
          autoHideDuration: 6000
        })
      );
    }
  }, [isAuthenticated, dispatch])

  return isAuthenticated
    ? <Component {...(rest as T)} />
    : <Navigate to={fallbackNavigation} />
}

export type { RouterGuardProps }
export default RouterGuard
