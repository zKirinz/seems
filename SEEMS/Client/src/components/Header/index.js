import React from 'react'

import { CssBaseline, Grid } from '@mui/material'
import AppBar from '@mui/material/AppBar'
import Toolbar from '@mui/material/Toolbar'

import logo from '../../assets/images/logo.png'
import LeftNavBar from './LeftNavBar'
import RightNavBar from './RightNavBar'

const Header = ({ paths }) => {
    return (
        <React.Fragment>
            <AppBar position="fixed" color="secondary">
                <Toolbar>
                    <Grid container>
                        <CssBaseline />
                        <Grid item xs={12} sm={6} md={6}>
                            <LeftNavBar logo={logo} />
                        </Grid>
                        <Grid item xs={12} sm={6} md={6}>
                            <RightNavBar paths={paths} />
                        </Grid>
                    </Grid>
                </Toolbar>
            </AppBar>
        </React.Fragment>
    )
}

export default Header
