import { useState } from 'react'

import { Edit as EditIcon, TurnedIn as TurnedInIcon } from '@mui/icons-material'
import { Avatar, Button, TableCell, TableRow } from '@mui/material'
import { Box } from '@mui/system'

const UserTableRow = ({ userName, imageUrl, email, role, organization, active }) => {
    const [isEdit, setIsEdit] = useState(false)

    return (
        <TableRow>
            <TableCell component="th" scope="row">
                <Box display="flex" justifyContent="center" alignItems="center">
                    <Avatar alt={userName} src={imageUrl} sx={{ width: 36, height: 36, mr: 2 }} />
                    {userName}
                </Box>
            </TableCell>
            <TableCell align="center">{email}</TableCell>
            <TableCell align="center">{role}</TableCell>
            <TableCell align="center">{organization}</TableCell>
            <TableCell align="center">{active ? 'Active' : 'Inactive'}</TableCell>
            <TableCell align="center">
                {isEdit ? (
                    <Button
                        variant="outlined"
                        color="secondary"
                        startIcon={<TurnedInIcon />}
                        onClick={() => setIsEdit(false)}
                    >
                        Save
                    </Button>
                ) : (
                    <Button
                        variant="outlined"
                        color="primary"
                        startIcon={<EditIcon />}
                        onClick={() => setIsEdit(true)}
                    >
                        Edit
                    </Button>
                )}
            </TableCell>
        </TableRow>
    )
}

export default UserTableRow
