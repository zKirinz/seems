import { useEffect, useState } from 'react'

import { useHistory, useParams } from 'react-router-dom'

import { Typography, Box } from '@mui/material'

import { useSnackbar } from '../../HOCs/SnackbarContext'
import useEventAction from '../../recoil/event/action'
import UserFilter from './UserFilter'
import UserTable from './UserTable'

const CheckAttendance = () => {
    const { id } = useParams()
    const history = useHistory()
    const showSnackbar = useSnackbar()
    const [emailFilter, setEmailFilter] = useState('')
    const { checkIsMyEvent } = useEventAction()

    useEffect(() => {
        checkIsMyEvent(id)
            .then((res) => {
                if (!res.data.data.isMine) {
                    history.push('/admin')
                }
            })
            .catch(() => {
                showSnackbar({
                    severity: 'error',
                    children: 'Something went wrong, please try again later.',
                })
            })
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])

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
