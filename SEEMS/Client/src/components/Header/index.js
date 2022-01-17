import React from 'react'

import { CssBaseline, Grid } from '@mui/material'
import AppBar from '@mui/material/AppBar'
import Toolbar from '@mui/material/Toolbar'

import logo from '../../assets/images/logo.png'
import LeftNavBar from './LeftNavBar'
import RightNavBar from './RightNavBar'

const Header = ({ paths, internalLinks }) => {
    return (
        <React.Fragment>
            <AppBar position="fixed">
                <Toolbar>
                    <Grid container>
                        <CssBaseline />
                        <Grid item xs={12} sm={4} md={4}>
                            <LeftNavBar logo={logo} />
                        </Grid>
                        <Grid item xs={12} sm={8} md={8}>
                            <RightNavBar paths={paths} internalLinks={internalLinks} />
                        </Grid>
                    </Grid>
                </Toolbar>
            </AppBar>
        </React.Fragment>
    )
}

export default Header
