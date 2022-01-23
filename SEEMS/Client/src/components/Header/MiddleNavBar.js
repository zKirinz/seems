import { NavLink } from 'react-router-dom'

import { Event, Home, Receipt } from '@mui/icons-material'
import { Box, IconButton, Tooltip } from '@mui/material'
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
            <Box component={NavLink} to="/" sx={{ px: 2, py: 1.25 }} position="relative">
                <Tooltip title="Home">
                    <IconButton size="medium">
                        <Home fontSize="large" sx={{ color: grey[100] }} />
                    </IconButton>
                </Tooltip>
            </Box>
            <Box component={NavLink} to="/events" sx={{ px: 2, py: 1.25 }} position="relative">
                <Tooltip title="Event">
                    <IconButton size="medium">
                        <Event fontSize="large" sx={{ color: grey[100] }} />
                    </IconButton>
                </Tooltip>
            </Box>
            <Box component={NavLink} to="/receipt" sx={{ px: 2, py: 1.25 }} position="relative">
                <Tooltip title="Event">
                    <IconButton size="medium">
                        <Receipt fontSize="large" sx={{ color: grey[100] }} />
                    </IconButton>
                </Tooltip>
            </Box>
        </Box>
    )
}

export default MiddleNavBar
