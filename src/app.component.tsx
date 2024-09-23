import { BrowserRouter, Navigate, Route, Routes } from 'react-router-dom'
import AlertsComponent from './components/alerts/alerts.component.tsx'
import DashboardComponent from './components/dashboard/dashboard.component.tsx'
import HeaderComponent from './components/header/header.component.tsx'
import HomeComponent from './components/home/home.component.tsx'
import MonitorComponent from './components/monitor/monitor.component.tsx'
import Navigation from './components/navigation/navigation.component.tsx'
import PageNotFoundComponent
  from './components/page-not-found/page-not-found.component.tsx'
import SnackBarComponent from './components/snackbar/snackbar.component.tsx'
import { selectIfApiKeyValid } from './redux/api-key/api-key.selector.ts'
import { useAppSelector } from './redux/hooks.ts'
import RouterGuard from './routing/router-guard.component.tsx'

const AppComponent = () => {
  const isApiKeyValid: boolean = useAppSelector(selectIfApiKeyValid)

  return (
    <BrowserRouter>
      <SnackBarComponent />
      <HeaderComponent />
      <Navigation />
      <Routes>
        <Route path="/home" element={<HomeComponent />} />
        <Route path="/dashboard" element={<DashboardComponent />}>
          <Route
            path="monitor"
            element={
              <RouterGuard
                component={MonitorComponent}
                isAuthenticated={isApiKeyValid}
                fallbackNavigation="/dashboard"
              />
            }
          />
          <Route
            path="alerts"
            element={
              <RouterGuard
                component={AlertsComponent}
                isAuthenticated={isApiKeyValid}
                fallbackNavigation="/dashboard"
              />
            }
          />
        </Route>
        <Route path="*" element={<PageNotFoundComponent />} />
        <Route path="/" element={<Navigate to="/home" />} />
      </Routes>
    </BrowserRouter>
  )
}

export default AppComponent
