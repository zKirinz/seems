import { NavLink } from 'react-router-dom'
import { useRecoilValue } from 'recoil'

import { Event, Home, Info } from '@mui/icons-material'
import { Box, Button, IconButton, Tooltip } from '@mui/material'
import { yellow, grey } from '@mui/material/colors'

import authAtom from '../../../recoil/auth'

const MiddleNavBar = () => {
    const auth = useRecoilValue(authAtom)
    const isAuth = !!auth.email

    return (
        <Box
            sx={{
                display: { xs: 'none', sm: 'flex' },
                justifyContent: 'center',
                '& > .active .MuiSvgIcon-root': {
                    color: yellow[300],
                },
                '& > .active:after': {
                    content: '""',
                    display: 'block',
                    position: 'absolute',
                    width: '100%',
                    height: '3px',
                    backgroundColor: yellow[300],
                    left: 0,
                    bottom: 0,
                },
            }}
        >
            <Button
                component={NavLink}
                to="/"
                sx={{ px: 2, py: 1.25, position: 'relative' }}
                exact={true}
            >
                <Tooltip title="Home">
                    <IconButton size="medium">
                        <Home fontSize="large" sx={{ color: grey[100] }} />
                    </IconButton>
                </Tooltip>
            </Button>
            {isAuth && (
                <Button
                    component={NavLink}
                    to="/events"
                    sx={{ px: 2, py: 1.25, position: 'relative' }}
                >
                    <Tooltip title="Events">
                        <IconButton size="medium">
                            <Event fontSize="large" sx={{ color: grey[100] }} />
                        </IconButton>
                    </Tooltip>
                </Button>
            )}
            <Button component={NavLink} to="/about" sx={{ px: 2, py: 1.25, position: 'relative' }}>
                <Tooltip title="About">
                    <IconButton size="medium">
                        <Info fontSize="large" sx={{ color: grey[100] }} />
                    </IconButton>
                </Tooltip>
            </Button>
        </Box>
    )
}

export default MiddleNavBar
