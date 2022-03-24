import { BrowserRouter } from 'react-router-dom'

import { Box, ThemeProvider, Typography, useMediaQuery } from '@mui/material'
import { useTheme } from '@mui/material/styles'

import SnackbarProvider from '../HOCs/SnackbarContext'
import { useAuthAction } from '../recoil/auth'
import Routes from '../routes'
import seemsTheme from '../theme/seemsTheme'

const App = () => {
    const authAction = useAuthAction()
    authAction.autoLogin()

    const theme = useTheme()
    const matches = useMediaQuery(theme.breakpoints.up('lg'))

    return (
        <ThemeProvider theme={seemsTheme}>
            <SnackbarProvider>
                {matches ? (
                    <BrowserRouter>{Routes}</BrowserRouter>
                ) : (
                    <Box
                        display="flex"
                        height="100vh"
                        flexDirection="column"
                        justifyContent="center"
                        alignItems="center"
                        m={3}
                    >
                        <Typography variant="body1" textAlign="center" color="primary">
                            This application does not support small view,
                        </Typography>
                        <Typography variant="body1" textAlign="center" color="secondary">
                            Please use Desktop view to have the best experience!
                        </Typography>
                    </Box>
                )}
            </SnackbarProvider>
        </ThemeProvider>
    )
}

export default App
