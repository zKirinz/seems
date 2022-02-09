import { BrowserRouter } from 'react-router-dom'
import { RecoilRoot } from 'recoil'

import Layout from '../components/Layout'
import { ThemeProvider } from '@mui/material'

import Routes from '../routes'
import seemsTheme from '../theme/seemsTheme'

const App = () => {
    return (
        <ThemeProvider theme={seemsTheme}>
            <RecoilRoot>
                <BrowserRouter>
                    <Layout>{Routes}</Layout>
                </BrowserRouter>
            </RecoilRoot>
        </ThemeProvider>
    )
}

export default App
