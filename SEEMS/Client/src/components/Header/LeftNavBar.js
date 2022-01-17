import { Link } from 'react-router-dom'

import { Avatar, Box } from '@mui/material'

const LeftNavBar = ({ logo }) => {
    return (
        <Box
            sx={{
                display: { xs: 'flex' },
                justifyContent: { xs: 'center', sm: 'flex-start' },
            }}
        >
            <Link to="/home">
                <Box
                    sx={{
                        backgroundColor: (theme) => theme.palette.grey[100],
                        borderRadius: (theme) => theme.shape.borderRadius,
                    }}
                >
                    <Avatar sx={{ height: 80, width: 200 }} src={logo} alt="logo"></Avatar>
                </Box>
            </Link>
        </Box>
    )
}

export default LeftNavBar
