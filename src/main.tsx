import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { Provider } from 'react-redux'
import AppComponent from './app.component.tsx'
import store from './redux/store'
import './index.css'

const rootElement = document.getElementById('root')!

const renderApp = () => {
  createRoot(rootElement).render(
    <StrictMode>
      <Provider store={store}>
        <AppComponent />
      </Provider>
    </StrictMode>
  )
}

renderApp()
