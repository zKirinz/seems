import { BrowserRouter } from 'react-router-dom'
import { RecoilRoot } from 'recoil'

import { ThemeProvider } from '@mui/material'

import Routes from '../routes'
import seemsTheme from '../theme/seemsTheme'

const App = () => {
    return (
        <ThemeProvider theme={seemsTheme}>
            <RecoilRoot>
                <BrowserRouter>{Routes}</BrowserRouter>
            </RecoilRoot>
        </ThemeProvider>
    )
}

export default App
