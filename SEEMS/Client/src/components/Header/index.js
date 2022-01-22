import React from 'react'

import { Grid } from '@mui/material'
import AppBar from '@mui/material/AppBar'
import Toolbar from '@mui/material/Toolbar'

import logo from '../../assets/images/logo.png'
import LeftNavBar from './LeftNavBar'
import MiddleNavBar from './MiddleNavBar'
import RightNavBar from './RightNavBar'

const Header = () => {
    return (
        <React.Fragment>
            <AppBar sx={{ position: { sm: 'fixed', xs: 'static' } }}>
                <Toolbar>
                    <Grid container>
                        <Grid item sm={3} xs={12}>
                            <LeftNavBar logo={logo} />
                        </Grid>
                        <Grid item sm={6} xs={0}>
                            <MiddleNavBar />
                        </Grid>
                        <Grid item sm={3} xs={0}>
                            <RightNavBar />
                        </Grid>
                    </Grid>
                </Toolbar>
            </AppBar>
        </React.Fragment>
    )
}

export default Header
