import './App.module.scss'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import AlertsComponent from './components/alerts/alerts.component.tsx'
import DashboardComponent from './components/dashboard/dashboard.component.tsx'
import HeaderComponent from './components/header/header.component.tsx'
import HomeComponent from './components/home/home.component.tsx'
import MonitorComponent from './components/monitor/monitor.component.tsx'
import Navigation from './components/navigation/navigation.component.tsx'
import PageNotFoundComponent
  from './components/page-not-found/page-not-found.component.tsx'

function AppComponent() {
  return (
    <BrowserRouter>
      <HeaderComponent />
      <Navigation />
      <Routes>
        <Route path="/" element={<HomeComponent />} />
        <Route path="/dashboard" element={<DashboardComponent />}>
          <Route path="monitor" element={<MonitorComponent />} />
          <Route path="alerts" element={<AlertsComponent />} />
        </Route>
        <Route path="*" element={<PageNotFoundComponent />} />
      </Routes>
    </BrowserRouter>
  )
}

export default AppComponent
