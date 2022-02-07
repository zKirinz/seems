import { Provider } from 'react-redux'
import { BrowserRouter } from 'react-router-dom'

import Layout from '../components/Layout'
import { ThemeProvider } from '@mui/material'

import Routes from '../routes'
import seemsTheme from '../theme/seemsTheme'
import store from './store'

const App = () => {
    return (
        <ThemeProvider theme={seemsTheme}>
            <Provider store={store}>
                <BrowserRouter>
                    <Layout>{Routes}</Layout>
                </BrowserRouter>
            </Provider>
        </ThemeProvider>
    )
}

export default App
