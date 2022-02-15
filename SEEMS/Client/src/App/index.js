import { BrowserRouter } from 'react-router-dom'

import { ThemeProvider } from '@mui/material'

import SnackbarProvider from '../HOCs/SnackbarContext'
import { useAuthAction } from '../recoil/auth'
import Routes from '../routes'
import seemsTheme from '../theme/seemsTheme'

const App = () => {
    const authAction = useAuthAction()
    authAction.autoLogin()

    return (
        <ThemeProvider theme={seemsTheme}>
            <SnackbarProvider>
                <BrowserRouter>{Routes}</BrowserRouter>
            </SnackbarProvider>
        </ThemeProvider>
    )
}

export default App
