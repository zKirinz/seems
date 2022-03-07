import { useState } from 'react'

import { Typography, Box } from '@mui/material'

import UserFilter from './UserFilter'
import UserTable from './UserTable'

const CheckAttendance = () => {
    const [emailFilter, setEmailFilter] = useState('')

    return (
        <Box component="main" minHeight="65vh" mt={8.5} mb={10} mx={16} pt={8}>
            <Typography variant="h3" color="primary" align="center" mb={5} fontWeight={700}>
                Users Attendance
            </Typography>
            <UserFilter emailFilter={emailFilter} setEmailFilter={setEmailFilter} />
            <UserTable emailFilter={emailFilter} />
        </Box>
    )
}

export default CheckAttendance
