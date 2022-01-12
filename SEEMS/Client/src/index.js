import React from 'react'

import ReactDOM from 'react-dom'
import { Provider } from 'react-redux'

import { ThemeProvider } from '@mui/material'

import App from './App'
import store from './App/store'
import './index.css'
import seemsTheme from './theme/seemsTheme'

ReactDOM.render(
    <React.StrictMode>
        <ThemeProvider theme={seemsTheme}>
            <Provider store={store}>
                <App />
            </Provider>
        </ThemeProvider>
    </React.StrictMode>,
    document.getElementById('root')
)
