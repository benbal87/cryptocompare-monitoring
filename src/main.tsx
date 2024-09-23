import { ThemeProvider } from '@mui/material/styles'
import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { Provider } from 'react-redux'
import { PersistGate } from 'redux-persist/integration/react'
import AppComponent from './app.component.tsx'
import { storePersist, store } from './redux/store'
import './index.css'
import darkTheme from './theme.ts'

const rootElement = document.getElementById('root')!

const renderApp = () => {
  createRoot(rootElement).render(
    <StrictMode>
      <Provider store={store}>
        <PersistGate loading={null} persistor={storePersist}>
          <ThemeProvider theme={darkTheme}>
            <AppComponent />
          </ThemeProvider>
        </PersistGate>
      </Provider>
    </StrictMode>
  )
}

renderApp()
