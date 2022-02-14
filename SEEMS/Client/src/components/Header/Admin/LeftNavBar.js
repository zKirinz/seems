import { Link } from 'react-router-dom'

import { Avatar, Box } from '@mui/material'

const LeftNavBar = ({ logo }) => {
    return (
        <Box
            sx={{
                display: 'flex',
                justifyContent: 'flex-start',
                py: 0.5,
            }}
        >
            <Link to="/">
                <Box
                    sx={{
                        backgroundColor: (theme) => theme.palette.grey[100],
                        borderRadius: 12,
                        pb: 0.375,
                    }}
                >
                    <Avatar sx={{ height: 50, width: 150 }} src={logo} alt="logo"></Avatar>
                </Box>
            </Link>
        </Box>
    )
}

export default LeftNavBar
