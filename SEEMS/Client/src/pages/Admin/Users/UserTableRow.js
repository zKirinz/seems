import React, { useState } from 'react'

import { Edit as EditIcon, TurnedIn as TurnedInIcon } from '@mui/icons-material'
import { Select, Avatar, Button, FormControl, MenuItem, TableCell, TableRow } from '@mui/material'
import { Box } from '@mui/system'

import { useSnackbar } from '../../../HOCs/SnackbarContext'
import { useUsersAction } from '../../../recoil/user'

const UserTableRow = ({
    id,
    userName,
    imageUrl,
    email,
    role,
    organization,
    active,
    resetHandler,
}) => {
    const userAction = useUsersAction()
    const [isEdit, setIsEdit] = useState(false)
    const [editedRole, setEditedRole] = useState(role)
    const [editedOrganization, setEditedOrganization] = useState(organization)
    const [editedActive, setEditedActive] = useState(active ? 'Active' : 'Inactive')
    const showSnackbar = useSnackbar()

    const onChangeEditRole = (roleTarget) => {
        if (roleTarget === 'Organizer') {
            setEditedOrganization('F-Code')
        } else if (roleTarget === 'User') {
            setEditedOrganization('None')
        }
        setEditedRole(roleTarget)
    }

    const saveEditHandler = () => {
        setIsEdit(false)
        userAction
            .updateUser({
                id,
                role: editedRole,
                organization: editedOrganization !== 'None' ? editedOrganization : 'FPT-er',
                active: editedActive === 'Active' ? true : false,
            })
            .then((res) => {
                console.log(res)
                resetHandler()
            })
            .catch(() => {
                showSnackbar({
                    severity: 'error',
                    children: 'Something went wrong, please try again later.',
                })
                setIsLoading(false)
            })
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
                {isEdit ? (
                    <FormControl variant="standard" sx={{ mx: 1 }}>
                        <Select
                            value={editedRole}
                            onChange={(e) => onChangeEditRole(e.target.value)}
                        >
                            <MenuItem value="User">User</MenuItem>
                            <MenuItem value="Organizer">Organizer</MenuItem>
                        </Select>
                    </FormControl>
                ) : (
                    role
                )}
            </TableCell>
            <TableCell align="center">
                {isEdit ? (
                    <FormControl variant="standard" sx={{ mx: 1 }}>
                        <Select
                            value={editedOrganization}
                            onChange={(e) => setEditedOrganization(e.target.value)}
                        >
                            {editedRole === 'Organizer' && <MenuItem value="DSC">DSC</MenuItem>}
                            {editedRole === 'Organizer' && (
                                <MenuItem value="F-Code">F-Code</MenuItem>
                            )}
                            {editedRole === 'User' && <MenuItem value="None">None</MenuItem>}
                        </Select>
                    </FormControl>
                ) : (
                    organization !== 'FPT-er' && organization
                )}
            </TableCell>
            <TableCell align="center">
                {isEdit ? (
                    <FormControl variant="standard" sx={{ mx: 1 }}>
                        <Select
                            value={editedActive}
                            onChange={(e) => setEditedActive(e.target.value)}
                        >
                            <MenuItem value="Active">Active</MenuItem>
                            <MenuItem value="Inactive">Inactive</MenuItem>
                        </Select>
                    </FormControl>
                ) : active ? (
                    'Active'
                ) : (
                    'Inactive'
                )}
            </TableCell>
            <TableCell align="center">
                {isEdit ? (
                    <Button
                        variant="outlined"
                        color="secondary"
                        startIcon={<TurnedInIcon />}
                        onClick={saveEditHandler}
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
