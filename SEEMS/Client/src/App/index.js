import { Provider } from 'react-redux'
import { BrowserRouter } from 'react-router-dom'

import { ThemeProvider } from '@mui/material'

import Routes from '../routes'
import seemsTheme from '../theme/seemsTheme'
import store from './store'

const App = () => {
    return (
        <ThemeProvider theme={seemsTheme}>
            <Provider store={store}>
                <BrowserRouter>{Routes}</BrowserRouter>
            </Provider>
        </ThemeProvider>
    )
}

export default App
