import { Box } from '@mui/material'

import Copyright from '../Copyright'

const index = () => {
    return (
        <Box
            sx={{
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
                mt: 3,
                bgcolor: (theme) => theme.palette.grey[900],
                p: 2,
            }}
            component="footer"
        >
            <Box mt={2}>
                <Copyright />
            </Box>
        </Box>
    )
}

export default index
