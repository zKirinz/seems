import { useEffect } from 'react'

import { BrowserRouter } from 'react-router-dom'
import { useSetRecoilState } from 'recoil'

import { ThemeProvider } from '@mui/material'

import SnackbarProvider from '../HOCs/SnackbarContext'
import authAtom from '../recoil/auth'
import Routes from '../routes'
import seemsTheme from '../theme/seemsTheme'
import LocalStorageUtils from '../utils/LocalStorageUtils'

const App = () => {
    const setAuth = useSetRecoilState(authAtom)

    useEffect(() => {
        const token = LocalStorageUtils.getToken()
        const user = LocalStorageUtils.getUser()
        if (user && typeof user === 'object') {
            setAuth({ token, email: user.email, role: user.role, exp: user.exp })
        }
    }, [setAuth])

    return (
        <ThemeProvider theme={seemsTheme}>
            <SnackbarProvider>
                <BrowserRouter>{Routes}</BrowserRouter>
            </SnackbarProvider>
        </ThemeProvider>
    )
}

export default App
