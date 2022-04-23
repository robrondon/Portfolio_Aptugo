import { createBrowserHistory } from 'history'
import React from 'react'
import { hydrate, render } from 'react-dom'
import { Router } from 'react-router-dom'
import App from './App'
import ScrollToTop from './components/ScrollToTop'
import * as serviceWorker from './serviceWorker'

const hist = createBrowserHistory()

const rootElement = document.getElementById('app')
const app = (
  <Router history={hist}>
    <ScrollToTop />
    <App />
  </Router>
)

if (rootElement.hasChildNodes()) {
  hydrate(app, rootElement)
} else {
  render(app, rootElement)
}

serviceWorker.register()
