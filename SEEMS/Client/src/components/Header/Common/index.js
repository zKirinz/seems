import { Grid } from '@mui/material'
import AppBar from '@mui/material/AppBar'
import Toolbar from '@mui/material/Toolbar'

import logo from '../../../assets/images/logo.png'
import LeftNavBar from './LeftNavBar'
import MiddleNavBar from './MiddleNavBar'
import RightNavBar from './RightNavBar'

const CommonHeader = () => {
    return (
        <AppBar color="primary" sx={{ position: { sm: 'fixed', xs: 'static' } }}>
            <Toolbar>
                <Grid container alignItems="center">
                    <Grid item sm={3} xs={6}>
                        <LeftNavBar logo={logo} />
                    </Grid>
                    <Grid item sm={6} xs={0}>
                        <MiddleNavBar />
                    </Grid>
                    <Grid item sm={3} xs={6}>
                        <RightNavBar />
                    </Grid>
                </Grid>
            </Toolbar>
        </AppBar>
    )
}

export default CommonHeader
