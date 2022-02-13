import { useRecoilValue } from 'recoil'

import { Grid } from '@mui/material'
import AppBar from '@mui/material/AppBar'
import Toolbar from '@mui/material/Toolbar'

import logo from '../../assets/images/logo.png'
import authAtom from '../../recoil/auth'
import LeftNavBar from './LeftNavBar'
import MiddleNavBar from './MiddleNavBar'
import RightNavBar from './RightNavBar'

const Header = ({ isAdmin }) => {
    const auth = useRecoilValue(authAtom)

    return (
        <AppBar
            color={!isAdmin ? 'primary' : 'secondary'}
            sx={{ position: { sm: 'fixed', xs: 'static' } }}
        >
            <Toolbar>
                <Grid container alignItems="center">
                    <Grid item sm={3} xs={6}>
                        <LeftNavBar logo={logo} />
                    </Grid>
                    <Grid item sm={6} xs={0}>
                        <MiddleNavBar />
                    </Grid>
                    <Grid item sm={3} xs={6}>
                        <RightNavBar isAuth={auth?.email} />
                    </Grid>
                </Grid>
            </Toolbar>
        </AppBar>
    )
}

export default Header
