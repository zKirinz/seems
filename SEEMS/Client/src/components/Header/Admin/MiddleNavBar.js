import { NavLink } from 'react-router-dom'

import { Event as EventIcon, Home as HomeIcon, Person as PersonIcon } from '@mui/icons-material'
import { Box, Button, IconButton, Tooltip } from '@mui/material'
import { yellow, grey } from '@mui/material/colors'

const MiddleNavBar = () => {
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
                to="/admin"
                sx={{ px: 2, py: 1.25, position: 'relative' }}
                exact={true}
            >
                <Tooltip title="Home">
                    <IconButton size="medium">
                        <HomeIcon fontSize="large" sx={{ color: grey[100] }} />
                    </IconButton>
                </Tooltip>
            </Button>
            <Button
                component={NavLink}
                to="/admin/events"
                sx={{ px: 2, py: 1.25, position: 'relative' }}
            >
                <Tooltip title="Events">
                    <IconButton size="medium">
                        <EventIcon fontSize="large" sx={{ color: grey[100] }} />
                    </IconButton>
                </Tooltip>
            </Button>
            <Button
                component={NavLink}
                to="/admin/users"
                sx={{ px: 2, py: 1.25, position: 'relative' }}
                exact={true}
            >
                <Tooltip title="Users">
                    <IconButton size="medium">
                        <PersonIcon fontSize="large" sx={{ color: grey[100] }} />
                    </IconButton>
                </Tooltip>
            </Button>
        </Box>
    )
}

export default MiddleNavBar
