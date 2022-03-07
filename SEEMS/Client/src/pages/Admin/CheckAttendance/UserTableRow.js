import React, { useState } from 'react'

import { Avatar, Checkbox, TableCell, TableRow } from '@mui/material'
import { Box } from '@mui/system'

import { useSnackbar } from '../../../HOCs/SnackbarContext'
import { useUsersAction } from '../../../recoil/user'

const UserTableRow = ({ userName, imageUrl, email, attend, reservationId, resetHandler }) => {
    const userAction = useUsersAction()
    const [attendStatus, setAttendStatus] = useState(attend)
    const showSnackbar = useSnackbar()

    const attendSubmitHandler = async (e) => {
        await setAttendStatus(e.target.checked)
        await userAction
            .takeUserAttendOfEvent({
                reservationId: reservationId,
                attend: e.target.checked,
            })
            .then(() => {
                showSnackbar({
                    severity: 'success',
                    children: `User ${email}'s attendance status changed successfully.`,
                })
            })
            .catch(() => {
                showSnackbar({
                    severity: 'error',
                    children: 'Something went wrong, please try again later.',
                })
                setAttendStatus(!e.target.checked)
                return
            })

        showSnackbar({
            severity: 'success',
            children: `Update user ${email} successfully.`,
        })
        resetHandler()
    }

    return (
        <TableRow>
            <TableCell component="th" scope="row">
                <Box display="flex" justifyContent="center" alignItems="center">
                    <Avatar alt={userName} src={imageUrl} sx={{ width: 36, height: 36, mr: 2 }} />
                    {userName}
                </Box>
            </TableCell>
            <TableCell align="center">{email}</TableCell>
            <TableCell align="center">
                <Checkbox checked={attendStatus} onChange={attendSubmitHandler} />
            </TableCell>
        </TableRow>
    )
}

export default UserTableRow
