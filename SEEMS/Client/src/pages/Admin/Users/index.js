import { useState } from 'react'

import { Typography, Box } from '@mui/material'

import UserFilter from './UserFilter'
import UserTable from './UserTable'

const Users = () => {
    const [emailFilter, setEmailFilter] = useState('')
    const [roleFilter, setRoleFilter] = useState('All')
    const [organizationFilter, setOrganizationFilter] = useState('All')
    const [statusFilter, setStatusFilter] = useState('All')

    return (
        <Box component="main" minHeight="65vh" mt={8.5} mb={10} mx={16} pt={8}>
            <Typography variant="h3" color="primary" align="center" mb={5} fontWeight={700}>
                Users Management
            </Typography>
            <UserFilter
                emailSubmitHandler={(email) => setEmailFilter(email)}
                role={roleFilter}
                roleSubmitHandler={(role) => setRoleFilter(role)}
                organization={organizationFilter}
                organizationSubmitHandler={(organization) => setOrganizationFilter(organization)}
                status={statusFilter}
                statusSubmitHandler={(status) => setStatusFilter(status)}
            />
            <UserTable
                emailFilter={emailFilter}
                roleFilter={roleFilter}
                organizationFilter={organizationFilter}
                statusFilter={statusFilter}
            />
        </Box>
    )
}

export default Users
