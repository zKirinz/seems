import { Link } from 'react-router-dom'

import { Avatar, CssBaseline, Grid } from '@mui/material'
import AppBar from '@mui/material/AppBar'
import Toolbar from '@mui/material/Toolbar'
import { Box } from '@mui/system'

import logo from '../../assets/images/logo.png'
import RightNavBar from './RightNavBar'

const Header = () => {
    return (
        <AppBar position="fixed">
            <Toolbar>
                <Grid container>
                    <CssBaseline />
                    <Grid item xs={12} sm={6} md={6}>
                        <Box
                            sx={{
                                display: { xs: 'flex' },
                                justifyContent: { xs: 'center', sm: 'flex-start' },
                            }}
                        >
                            <Link to="/home">
                                <Avatar
                                    sx={{ height: 80, width: 200 }}
                                    src={logo}
                                    alt="logo"
                                ></Avatar>
                            </Link>
                        </Box>
                    </Grid>
                    <Grid item xs={12} sm={6} md={6}>
                        <RightNavBar />
                    </Grid>
                </Grid>
            </Toolbar>
        </AppBar>
    )
}

export default Header
