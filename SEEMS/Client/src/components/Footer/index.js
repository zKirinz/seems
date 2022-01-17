import { Box } from '@mui/material'

import Copyright from '../Copyright'

const index = () => {
    return (
        <Box
            sx={{
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
                mt: 2,
                bgcolor: (theme) => theme.palette.grey[900],
                p: 4,
            }}
            component="footer"
        >
            <Box>
                <Copyright />
            </Box>
        </Box>
    )
}

export default index
